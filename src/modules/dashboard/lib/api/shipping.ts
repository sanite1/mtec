import { ApiResponse, ApiError } from "../../../../lib/network/axios";
import api from "../../../../lib/network/api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  Shipping,
  ShippingFilters,
  ShippingResponseData,
  ShippingForm,
} from "../types/shipping";
import { removeEmptyFields } from "../utils/utils";
import { toast } from "sonner";

export const fetchStoreShipping = async (
  userId: string,
  filters?: ShippingFilters,
): Promise<ShippingResponseData> => {
  const params = new URLSearchParams();

  if (filters?.search) params.append("search", filters.search);
  if (filters?.page) params.append("page", String(filters.page));
  if (filters?.limit) params.append("limit", String(filters.limit));
  if (filters?.isActive !== undefined)
    params.append("isActive", String(filters.isActive));

  const res = await api.get<ApiResponse<ShippingResponseData>>(
    `/shipping/${userId}?${params.toString()}`,
  );

  return res.data;
};

export const useStoreShipping = (userId: string, filters?: ShippingFilters) => {
  return useQuery<ShippingResponseData, ApiError>({
    queryKey: ["storeShipping", userId, filters],
    queryFn: () => fetchStoreShipping(userId, filters),
    enabled: !!userId,
    retry: 1,
  });
};

export const createShipping = async (
  data: ShippingForm & { userId: string },
) => {
  const payload = removeEmptyFields(data);

  const res = await api.post<ApiResponse<Shipping>>(`/shipping`, payload);
  return res.data;
};

export const useCreateShipping = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: ShippingForm & { userId: string }) =>
      createShipping(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["storeShipping"] });
      toast.success("Shipping Method Created Successfully");
    },
    onError: (error: ApiError) => {
      const errorMessage =
        error.response?.data?.message ||
        "Something went wrong. Please try again.";
      toast.error("Request Failed", { description: errorMessage });
    },
  });
};

export const updateShipping = async ({
  id,
  data,
}: {
  id: string;
  data: ShippingForm;
}) => {
  const payload = removeEmptyFields(data);

  const res = await api.patch<ApiResponse<Shipping>>(
    `/shipping/${id}`,
    payload,
  );

  return res.data;
};

export const useUpdateShipping = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: ShippingForm }) =>
      updateShipping({ id, data }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["storeShipping"] });
      toast.success("Shipping Method Updated Successfully");
    },
    onError: (error: ApiError) => {
      const errorMessage =
        error.response?.data?.message ||
        "Something went wrong. Please try again.";
      toast.error("Request Failed", { description: errorMessage });
    },
  });
};

export const deleteShipping = async (id: string) => {
  const res = await api.delete<ApiResponse<Shipping>>(`/shipping/${id}`);
  return res.data;
};

export const useDeleteShipping = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteShipping(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["storeShipping"] });
      toast.success("Shipping Method Deleted Successfully");
    },
    onError: (error: ApiError) => {
      const errorMessage =
        error.response?.data?.message ||
        "Something went wrong. Please try again.";
      toast.error("Request Failed", { description: errorMessage });
    },
  });
};
