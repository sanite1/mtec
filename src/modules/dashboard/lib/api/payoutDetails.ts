import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { ApiResponse, ApiError } from "../../../../lib/network/axios";
import api from "../../../../lib/network/api";
import { getDecodedJwt } from "../auth";
import {
  CreatePayoutDetailsRequest,
  IPayoutDetails,
  UpdatePayoutDetailsRequest,
} from "../types/payoutDetails";

export async function createPayoutDetails(
  payload: CreatePayoutDetailsRequest,
): Promise<IPayoutDetails> {
  const user = getDecodedJwt();

  const response = await api.post<ApiResponse<IPayoutDetails>>(
    "/payout-details",
    {
      ...payload,
      userId: user?.id,
    },
  );

  return response.data;
}

export function useCreatePayoutDetails() {
  return useMutation({
    mutationFn: createPayoutDetails,
    onSuccess: () => {
      toast.success("Payout details created successfully");
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
}

// lib/api/payoutDetails.ts
export async function updatePayoutDetails(
  payoutId: string,
  payload: UpdatePayoutDetailsRequest,
): Promise<IPayoutDetails> {
  const response = await api.patch<ApiResponse<IPayoutDetails>>(
    `/payout-details/${payoutId}`,
    payload,
  );

  return response.data;
}

export function useUpdatePayoutDetails() {
  return useMutation<
    IPayoutDetails,
    ApiError,
    { payoutId: string; payload: UpdatePayoutDetailsRequest }
  >({
    mutationFn: ({ payoutId, payload }) =>
      updatePayoutDetails(payoutId, payload),
    onSuccess: () => {
      toast.success("Payout details updated successfully");
    },
    onError: (error: ApiError) => {
      const errorMessage =
        error.response?.data?.fields?.[0].message ||
        error.response?.data?.message ||
        "Something went wrong. Please try again.";

      toast.error("Request Failed", { description: errorMessage });
    },
  });
}

// lib/api/payoutDetails.ts
export async function deletePayoutDetails(id: string): Promise<ApiResponse> {
  const response = await api.delete<ApiResponse>(`/payout-details/${id}`);
  return response;
}

export function useDeletePayoutDetails() {
  return useMutation<ApiResponse, ApiError, string>({
    mutationKey: ["delete-payout-details"],
    mutationFn: (id) => deletePayoutDetails(id),
    onSuccess: (response) => {
      toast.success(response.message);
    },
    onError: (error: ApiError) => {
      const msg =
        error.response?.data?.fields?.[0].message ||
        error.response?.data?.message ||
        "Something went wrong. Please try again.";

      toast.error("Request Failed", { description: msg });
    },
  });
}

// lib/api/payoutDetails.ts
export async function fetchPayoutDetails(
  userId: string,
): Promise<IPayoutDetails> {
  const res = await api.get<ApiResponse<IPayoutDetails>>(
    `/payout-details/${userId}`,
  );

  return res.data;
}

export function useFetchPayoutDetails(userId: string) {
  return useQuery<IPayoutDetails, ApiError>({
    queryKey: ["payoutDetails", userId],
    queryFn: () => fetchPayoutDetails(userId),
    enabled: !!userId,
    retry: 1,
    meta: {
      onError: (error: ApiError) => {
        toast.error(error?.message || "Failed to fetch payout details");
      },
    },
  });
}
