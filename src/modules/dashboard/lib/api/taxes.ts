import { ApiResponse, ApiError } from "../../../../lib/network/axios";
import api from "../../../../lib/network/api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { Tax, TaxPayload, TaxFilters, TaxResponseData } from "../types/taxes";
import { removeEmptyFields } from "../utils/utils";

// 🔹 GET all taxes for user (paginated)
export const fetchStoreTaxes = async (
  userId: string,
  filters?: TaxFilters,
): Promise<TaxResponseData> => {
  const params = new URLSearchParams();

  if (filters?.search) params.append("search", filters.search);
  if (filters?.location) params.append("location", filters.location);
  if (filters?.page) params.append("page", String(filters.page));
  if (filters?.limit) params.append("limit", String(filters.limit));

  const res = await api.get<ApiResponse<TaxResponseData>>(
    `/taxes/${userId}?${params.toString()}`,
  );

  return res.data;
};

export const useStoreTaxes = (userId: string, filters?: TaxFilters) => {
  return useQuery<TaxResponseData, ApiError>({
    queryKey: ["storeTaxes", userId, filters],
    queryFn: () => fetchStoreTaxes(userId, filters),
    enabled: !!userId,
    retry: 1,
  });
};

// 🔹 CREATE tax
export const createTax = async (data: TaxPayload & { userId: string }) => {
  const payload = removeEmptyFields(data);
  const res = await api.post<ApiResponse<Tax>>(`/taxes`, payload);
  return res.data;
};

export const useCreateTax = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: TaxPayload & { userId: string }) => createTax(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["storeTaxes"] });
      toast.success("Tax Created Successfully");
    },
    onError: (error: ApiError) => {
      const errorMessage =
        error.response?.data?.fields?.[0].message ||
        error.response?.data?.message ||
        "Something went wrong. Please try again.";
      toast.error("Request Failed", { description: errorMessage });
    },
  });
};

// 🔹 UPDATE tax
export const updateTax = async ({
  id,
  data,
}: {
  id: string;
  data: Partial<TaxPayload>;
}) => {
  const payload = removeEmptyFields(data);
  const res = await api.patch<ApiResponse<Tax>>(`/taxes/${id}`, payload);
  return res.data;
};

export const useUpdateTax = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<TaxPayload> }) =>
      updateTax({ id, data }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["storeTaxes"] });
      toast.success("Tax Updated Successfully");
    },
    onError: (error: ApiError) => {
      const errorMessage =
        error.response?.data?.fields?.[0].message ||
        error.response?.data?.message ||
        "Something went wrong. Please try again.";
      toast.error("Request Failed", { description: errorMessage });
    },
  });
};

// 🔹 DELETE tax
export const deleteTax = async ({ id }: { id: string }) => {
  const res = await api.delete<ApiResponse<Tax>>(`/taxes/${id}`);
  return res.data;
};

export const useDeleteTax = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id }: { id: string }) => deleteTax({ id }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["storeTaxes"] });
      toast.success("Tax Deleted Successfully");
    },
    onError: (error: ApiError) => {
      const errorMessage =
        error.response?.data?.fields?.[0].message ||
        error.response?.data?.message ||
        "Something went wrong. Please try again.";
      toast.error("Request Failed", { description: errorMessage });
    },
  });
};
