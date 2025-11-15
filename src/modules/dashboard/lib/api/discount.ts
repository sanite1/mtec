import { ApiResponse, ApiError } from "../../../../lib/network/axios";
import api from "../../../../lib/network/api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { removeEmptyFields } from "../utils/utils";

import {
  Discount,
  DiscountPayload,
  DiscountFilters,
  DiscountResponseData,
  DiscountStats,
} from "../types/discount";

// ---------------------------------------
// FETCH DISCOUNTS
// ---------------------------------------
export const fetchDiscounts = async (
  userId: string,
  filters?: DiscountFilters,
): Promise<DiscountResponseData> => {
  const params = new URLSearchParams();

  if (filters?.search) params.append("search", filters.search);
  if (filters?.page) params.append("page", String(filters.page));
  if (filters?.limit) params.append("limit", String(filters.limit));
  if (filters?.isActive !== undefined)
    params.append("isActive", String(filters.isActive));

  const res = await api.get<ApiResponse<DiscountResponseData>>(
    `/discount/${userId}?${params.toString()}`,
  );

  return res.data;
};

export const useStoreDiscounts = (
  userId: string,
  filters?: DiscountFilters,
) => {
  return useQuery<DiscountResponseData, ApiError>({
    queryKey: ["storeDiscounts", userId, filters],
    queryFn: () => fetchDiscounts(userId, filters),
    enabled: !!userId,
    retry: 1,
  });
};

// ---------------------------------------
// CREATE DISCOUNT
// ---------------------------------------
export const createDiscount = async (
  data: DiscountPayload & { userId: string },
) => {
  const payload = removeEmptyFields(data);

  const res = await api.post<ApiResponse<Discount>>(`/discount`, payload);
  return res.data;
};

export const useCreateDiscount = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: DiscountPayload & { userId: string }) =>
      createDiscount(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["storeDiscounts"] });
      toast.success("Discount Created Successfully");
    },
    onError: (error: ApiError) => {
      const errorMessage =
        error.response?.data?.message ||
        "Something went wrong. Please try again.";
      toast.error("Request Failed", { description: errorMessage });
    },
  });
};

// ---------------------------------------
// UPDATE DISCOUNT
// ---------------------------------------
export const updateDiscount = async ({
  id,
  data,
}: {
  id: string;
  data: DiscountPayload;
}) => {
  const payload = removeEmptyFields(data);

  const res = await api.patch<ApiResponse<Discount>>(
    `/discount/${id}`,
    payload,
  );

  return res.data;
};

export const useUpdateDiscount = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: DiscountPayload }) =>
      updateDiscount({ id, data }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["storeDiscounts"] });
      toast.success("Discount Updated Successfully");
    },
    onError: (error: ApiError) => {
      const errorMessage =
        error.response?.data?.message ||
        "Something went wrong. Please try again.";
      toast.error("Request Failed", { description: errorMessage });
    },
  });
};

// ---------------------------------------
// DELETE DISCOUNT
// ---------------------------------------
export const deleteDiscount = async (id: string) => {
  const res = await api.delete<ApiResponse<Discount>>(`/discount/${id}`);
  return res.data;
};

export const useDeleteDiscount = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteDiscount(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["storeDiscounts"] });
      toast.success("Discount Deleted Successfully");
    },
    onError: (error: ApiError) => {
      const errorMessage =
        error.response?.data?.message ||
        "Something went wrong. Please try again.";
      toast.error("Request Failed", { description: errorMessage });
    },
  });
};

// ---------------------------------------
// GET DISCOUNT STATS
// ---------------------------------------
export const fetchDiscountStats = async (
  userId: string,
): Promise<DiscountStats> => {
  const res = await api.get<ApiResponse<DiscountStats>>(
    `/discount/stats/${userId}`,
  );

  return res.data;
};

export const useDiscountStats = (userId: string) => {
  return useQuery<DiscountStats, ApiError>({
    queryKey: ["discountStats", userId],
    queryFn: () => fetchDiscountStats(userId),
    enabled: !!userId,
    retry: 1,
  });
};
