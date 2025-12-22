import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { ApiResponse, ApiError } from "../../../../lib/network/axios";
import api from "../../../../lib/network/api";
import {
  PaymentFilters,
  PaymentResponseData,
  PaymentStatsResponseData,
} from "../types/payment";

// API call
export const fetchUserPayments = async (
  userId: string,
  filters?: PaymentFilters,
): Promise<PaymentResponseData> => {
  const params = new URLSearchParams();

  if (filters?.status) params.append("status", filters.status);
  if (filters?.search) params.append("search", filters.search);
  if (filters?.page) params.append("page", String(filters.page));
  if (filters?.limit) params.append("limit", String(filters.limit));
  if (filters?.startDate) params.append("startDate", filters.startDate);
  if (filters?.endDate) params.append("endDate", filters.endDate);

  const res = await api.get<ApiResponse<PaymentResponseData>>(
    `/payment/${userId}?${params.toString()}`,
  );

  return res.data;
};

// ----------------- Hook -----------------
export const useUserPayments = (userId: string, filters?: PaymentFilters) => {
  return useQuery<PaymentResponseData, ApiError>({
    queryKey: ["userPayments", userId, filters],
    queryFn: () => fetchUserPayments(userId, filters),
    enabled: !!userId,
    retry: 1,
    meta: {
      onError: (error: ApiError) => {
        toast.error(error?.message || "Failed to fetch payments");
      },
    },
  });
};

// Fetch payment stats for dashboard
export const fetchPaymentStats = async (userId: string) => {
  const res = await api.get<ApiResponse<PaymentStatsResponseData>>(
    `/payment/stats/${userId}`,
  );
  return res.data;
};

// Hook to fetch payment stats
export const usePaymentStats = (userId: string) => {
  return useQuery<PaymentStatsResponseData, ApiError>({
    queryKey: ["paymentStats", userId],
    queryFn: () => fetchPaymentStats(userId),
    enabled: !!userId,
    retry: 1,
    meta: {
      onError: (error: ApiError) => {
        toast.error(error?.message || "Failed to fetch payment statistics");
      },
    },
  });
};

export async function withdrawPayment(userId: string) {
  const response = await api.post<ApiResponse>(
    `/payment/withdraw/${userId}`,
    {},
  );
  console.log("response", response);

  return response.data;
}

export function useWithdrawPayment() {
  return useMutation({
    mutationFn: withdrawPayment,
    onError: (error: ApiError) => {
      const message =
        error.response?.data?.message || "Unable to withdraw payment";

      toast.error("Payment Error", { description: message });
    },
  });
}
