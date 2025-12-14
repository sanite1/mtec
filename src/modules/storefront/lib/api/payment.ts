// api/payment.ts
import api from "../../../../lib/network/api";
import { ApiResponse } from "../../../../lib/network/axios";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { ApiError } from "../../../../lib/network/axios";
import { InitializePaymentResponse } from "../types/payment";

export async function initializePayment(
  orderId: string,
): Promise<InitializePaymentResponse> {
  const response = await api.post<ApiResponse<InitializePaymentResponse>>(
    `/payment/initialize/${orderId}`,
    {},
  );
  console.log("response", response);

  return response.data;
}

export function useInitializePayment() {
  return useMutation({
    mutationFn: initializePayment,
    onError: (error: ApiError) => {
      const message =
        error.response?.data?.message || "Unable to initialize payment";

      toast.error("Payment Error", { description: message });
    },
  });
}
