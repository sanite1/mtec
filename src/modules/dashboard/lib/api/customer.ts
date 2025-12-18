import { ApiResponse, ApiError } from "../../../../lib/network/axios";
import api from "../../../../lib/network/api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  Customer,
  CustomerFilters,
  CustomerResponseData,
  CustomerStatsResponseData,
} from "../types/customer";
import { CustomerForm } from "../../components/customers/EditSidebar";
import { removeEmptyFields } from "../utils/utils";
import { getDecodedJwt } from "../auth";
import { Order } from "../types/orders";
import { toast } from "sonner";

// API call
export const fetchStoreCustomers = async (
  userId: string,
  filters?: CustomerFilters,
): Promise<CustomerResponseData> => {
  const params = new URLSearchParams();

  if (filters?.search) params.append("search", filters.search);
  if (filters?.page) params.append("page", String(filters.page));
  if (filters?.limit) params.append("limit", String(filters.limit));
  if (filters?.subscribed !== undefined)
    params.append("subscribed", String(filters.subscribed));
  if (filters?.startDate) params.append("startDate", filters.startDate);
  if (filters?.endDate) params.append("endDate", filters.endDate);

  const res = await api.get<ApiResponse<CustomerResponseData>>(
    `/customer/all/${userId}?${params.toString()}`,
  );

  return res.data;
};

export const useStoreCustomers = (
  userId: string,
  filters?: CustomerFilters,
) => {
  return useQuery<CustomerResponseData, ApiError>({
    queryKey: ["storeCustomers", userId, filters],
    queryFn: () => fetchStoreCustomers(userId, filters),
    enabled: !!userId,
    retry: 1,
  });
};

// Fetch customer stats for dashboard
export const fetchCustomerStats = async (userId: string) => {
  const res = await api.get<ApiResponse<CustomerStatsResponseData>>(
    `/customer/stats/${userId}`,
  );
  return res.data;
};

// Hook to fetch customer stats
export const useCustomerStats = (userId: string) => {
  return useQuery<CustomerStatsResponseData, ApiError>({
    queryKey: ["customerStats", userId],
    queryFn: () => fetchCustomerStats(userId),
    enabled: !!userId,
    retry: 1,
  });
};

// Delete or cancel an customer
export const deleteCustomer = async ({
  customerId,
  userId,
}: {
  customerId: string;
  userId: string;
}) => {
  const res = await api.delete<ApiResponse<Customer>>(
    `/customer/${customerId}/${userId}`,
  );
  return res.data;
};

export const useDeleteCustomer = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      customerId,
      userId,
    }: {
      customerId: string;
      userId: string;
    }) => deleteCustomer({ customerId, userId }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["storeCustomers"] });
      toast.success("Customer Deleted Successfully");
    },
    onError: (error: ApiError) => {
      const errorMessage =
        error.response?.data?.fields?.[0].message ||
        error.response?.data?.message ||
        "Something went wrong. Please try again.";

      toast.error("Request Failed", {
        description: errorMessage,
      });
    },
  });
};

export const updateCustomer = async ({
  customerId,
  data,
}: {
  customerId: string;
  data: CustomerForm; // use your CustomerForm type if imported
}) => {
  // ensure empty fields are removed before sending
  console.log(data);

  const payload = removeEmptyFields(data);
  console.log(payload);

  const res = await api.patch<ApiResponse<Customer>>(
    `/customer/${customerId}`,
    payload,
  );

  return res.data;
};

export const useUpdateCustomer = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      customerId,
      data,
    }: {
      customerId: string;
      data: CustomerForm;
    }) => updateCustomer({ customerId, data }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["storeCustomers"] });
      queryClient.invalidateQueries({ queryKey: ["storeCustomerDetails"] });
      toast.success("Customer Updated Successfully");
    },
    onError: (error: ApiError) => {
      const errorMessage =
        error.response?.data?.fields?.[0].message ||
        error.response?.data?.message ||
        "Something went wrong. Please try again.";

      toast.error("Request Failed", {
        description: errorMessage,
      });
    },
  });
};

export const createCustomer = async (data: any) => {
  const user = getDecodedJwt();
  const cleanedData = removeEmptyFields(data);
  const payload = { userId: user?.id, ...cleanedData };

  const res = await api.post<ApiResponse<Customer>>(`/customer`, payload);
  return res.data;
};

export const useCreateCustomer = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: any) => createCustomer(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["storeCustomers"] });
      toast.success("Customer Created Successfully");
    },
    onError: (error: ApiError) => {
      const errorMessage =
        error.response?.data?.fields?.[0].message ||
        error.response?.data?.message ||
        "Something went wrong. Please try again.";

      toast.error("Request Failed", {
        description: errorMessage,
        className: "bg-neutral-900 text-white border border-red-400",
      });
    },
  });
};

export const getCustomerById = async (
  customerId: string,
): Promise<Customer> => {
  const res = await api.get<ApiResponse<Customer>>(
    `/api/customers/${customerId}`,
  );
  return res.data;
};

export const useGetCustomerById = (customerId: string) => {
  return useQuery({
    queryKey: ["customer", customerId],
    queryFn: () => getCustomerById(customerId),
    enabled: !!customerId, // only run when ID exists
  });
};

export const getCustomerOrders = async ({
  customerId,
  userId,
}: {
  customerId: string;
  userId: string;
}): Promise<Order[]> => {
  const res = await api.get<ApiResponse<Order[]>>(
    `/api/customers/${customerId}/orders/${userId}`,
  );
  return res.data;
};

export const useCustomerOrders = (customerId: string, userId: string) => {
  return useQuery({
    queryKey: ["customerOrders", customerId, userId],
    queryFn: () => getCustomerOrders({ customerId, userId }),
    enabled: !!customerId && !!userId, // only run when both exist
  });
};
