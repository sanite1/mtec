import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  CreateOrderPayload,
  Order,
  OrderFilters,
  OrderResponseData,
  OrderStatsResponseData,
} from "../types/orders";
import { ApiResponse, ApiError } from "../../../../lib/network/axios";
import api from "../../../../lib/network/api";
import { getDecodedJwt } from "../auth";

// ✅ FUNCTION
export async function createOrder(payload: CreateOrderPayload): Promise<Order> {
  const user = getDecodedJwt();
  const finalPayload = {
    ...payload,
    userId: payload.userId ?? user?.id,
  };

  const response = await api.post<ApiResponse<Order>>("/order", finalPayload);

  return response.data;
}

// ✅ HOOK (like useCreateProduct)
export function useCreateOrder() {
  return useMutation<Order, ApiError, CreateOrderPayload>({
    mutationFn: createOrder,
    onSuccess: (data) => {
      console.log({ description: "✅ Order created successfully!", data });
    },
    onError: (error) => {
      console.log({
        description: `❌ Order creation failed: ${error.message}`,
        variant: "destructive",
      });
    },
  });
}

// API call
export const fetchUserOrders = async (
  userId: string,
  filters?: OrderFilters,
): Promise<OrderResponseData> => {
  const params = new URLSearchParams();

  if (filters?.status) params.append("status", filters.status);
  if (filters?.search) params.append("search", filters.search);
  if (filters?.page) params.append("page", String(filters.page));
  if (filters?.limit) params.append("limit", String(filters.limit));
  if (filters?.startDate) params.append("startDate", filters.startDate);
  if (filters?.endDate) params.append("endDate", filters.endDate);

  const res = await api.get<ApiResponse<OrderResponseData>>(
    `/order/all/${userId}?${params.toString()}`,
  );

  return res.data;
};

// ----------------- Hook -----------------
export const useUserOrders = (userId: string, filters?: OrderFilters) => {
  return useQuery<OrderResponseData, ApiError>({
    queryKey: ["userOrders", userId, filters],
    queryFn: () => fetchUserOrders(userId, filters),
    enabled: !!userId,
    retry: 1,
    meta: {
      onError: (error: ApiError) => {
        toast.error(error?.message || "Failed to fetch orders");
      },
    },
  });
};

// Fetch single order by ID
export const fetchOrderById = async (orderId: string) => {
  const res = await api.get<ApiResponse<Order>>(`/order/${orderId}`);
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

// Fetch order stats for dashboard
export const fetchOrderStats = async (userId: string) => {
  const res = await api.get<ApiResponse<OrderStatsResponseData>>(
    `/order/stats/${userId}`,
  );
  return res.data;
};

// Hook to fetch order stats
export const useOrderStats = (userId: string) => {
  return useQuery<OrderStatsResponseData, ApiError>({
    queryKey: ["orderStats", userId],
    queryFn: () => fetchOrderStats(userId),
    enabled: !!userId,
    retry: 1,
    meta: {
      onError: (error: ApiError) => {
        toast.error(error?.message || "Failed to fetch order statistics");
      },
    },
  });
};

// Delete or cancel an order
export const cancelOrder = async (orderId: string) => {
  const res = await api.delete<ApiResponse<Order>>(`/order/${orderId}`);
  return res.data;
};

// Hook to delete/cancel an order
export const useCancelOrder = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (orderId: string) => cancelOrder(orderId),
    onSuccess: () => {
      toast.success("Order deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["userOrders"] });
    },
    onError: (error: ApiError) => {
      toast.error(error?.message || "Failed to delete order");
    },
  });
};

// api/orders.ts
export const updateOrderStatus = async (id: string, status: string) => {
  const res = await api.patch<ApiResponse<Order>>(`/order/${id}/status`, {
    status,
  });
  return res.data;
};

// hook
export const useUpdateOrderStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, status }: { id: string; status: string }) =>
      updateOrderStatus(id, status),
    onSuccess: () => {
      toast.success("Order status updated successfully");
      queryClient.invalidateQueries({ queryKey: ["userOrders"] });
    },
    onError: (error: ApiError) => {
      toast.error(error?.message || "Failed to update order status");
    },
  });
};

// api/orders.ts
export const updatePaymentStatus = async (
  id: string,
  paymentStatus: string,
) => {
  const res = await api.patch<ApiResponse<Order>>(`/order/${id}/payment`, {
    paymentStatus,
  });
  return res.data;
};

// hook
export const useUpdatePaymentStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      paymentStatus,
    }: {
      id: string;
      paymentStatus: string;
    }) => updatePaymentStatus(id, paymentStatus),
    onSuccess: () => {
      toast.success("Payment status updated successfully");
      queryClient.invalidateQueries({ queryKey: ["userPaymentsStatus"] });
    },
    onError: (error: ApiError) => {
      toast.error(error?.message || "Failed to update payment status");
    },
  });
};
