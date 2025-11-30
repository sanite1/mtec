import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { ApiResponse, ApiError } from "../../../../lib/network/axios";
import api from "../../../../lib/network/api";
import { CreateOrderPayload, Order } from "../types/orders";

// ✅ FUNCTION
export async function createOrder(payload: CreateOrderPayload): Promise<Order> {
  const response = await api.post<ApiResponse<Order>>(
    "/order/user-storefront",
    payload,
  );

  return response.data;
}

// ✅ HOOK (like useCreateProduct)
export function useCreateOrder() {
  return useMutation<Order, ApiError, CreateOrderPayload>({
    mutationFn: createOrder,
    onSuccess: () => {
      toast.success("Order created successfully!");
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

// Fetch single order by ID
export const fetchOrderById = async (orderId: string) => {
  const res = await api.get<ApiResponse<Order>>(
    `/order/user-storefront/${orderId}`,
  );
  return res.data;
};

// Hook to fetch a single order by ID
export const useOrderById = (orderId: string) => {
  return useQuery<Order, ApiError>({
    queryKey: ["orderById", orderId],
    queryFn: () => fetchOrderById(orderId),
    enabled: !!orderId,
    retry: 1,
    meta: {
      onError: (error: ApiError) => {
        toast.error(error?.message || "Failed to fetch order details");
      },
    },
  });
};
