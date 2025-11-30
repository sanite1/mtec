import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { ApiResponse, ApiError } from "../../../../lib/network/axios";
import api from "../../../../lib/network/api";
import { Discount, VerifyDiscountPayload } from "../types/discount";

// ✅ FUNCTION
export async function verifyDiscount(
  payload: VerifyDiscountPayload,
): Promise<Discount> {
  const response = await api.post<ApiResponse<Discount>>(
    "/discount/user-storefront/verify",
    payload,
  );

  return response.data;
}

// ✅ HOOK (like useCreateProduct)
export function useVerifyDiscount() {
  return useMutation<Discount, ApiError, VerifyDiscountPayload>({
    mutationFn: verifyDiscount,
    onSuccess: () => {
      toast.success("Discount verified successfully!");
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
