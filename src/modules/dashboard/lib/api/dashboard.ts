import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { ApiResponse, ApiError } from "../../../../lib/network/axios";
import api from "../../../../lib/network/api";
import { getDecodedJwt } from "../auth";
import {
  DashboardStatsResponseData,
  SalesOverviewResponse,
  SalesRangeFilter,
} from "../types/dashboard";

// Fetch dashboard stats for dashboard
export const fetchDashboardStats = async (userId: string) => {
  const res = await api.get<ApiResponse<DashboardStatsResponseData>>(
    `/dashboard/stats/${userId}`,
  );
  return res.data;
};

// Hook to fetch dashboard stats
export const useDashboardStats = (userId: string) => {
  return useQuery<DashboardStatsResponseData, ApiError>({
    queryKey: ["dashboardStats", userId],
    queryFn: () => fetchDashboardStats(userId),
    enabled: !!userId,
    retry: 1,
    meta: {
      onError: (error: ApiError) => {
        toast.error(error?.message || "Failed to fetch dashboard statistics");
      },
    },
  });
};

// Fetch dashboard sales overview for dashboard (WITH FILTER)
export const fetchDashboardSalesOverview = async (
  userId: string,
  filter: SalesRangeFilter,
) => {
  const res = await api.get<ApiResponse<SalesOverviewResponse>>(
    `/dashboard/sales-overview/${userId}?filter=${filter}`,
  );

  return res.data;
};

// Hook to fetch dashboard sales overview (WITH FILTER)
export const useDashboardSalesOverview = (
  userId: string,
  filter: SalesRangeFilter,
) => {
  return useQuery<SalesOverviewResponse, ApiError>({
    queryKey: ["dashboardSalesOverview", userId, filter], // ✅ filter now part of cache
    queryFn: () => fetchDashboardSalesOverview(userId, filter),
    enabled: !!userId && !!filter,
    retry: 1,
    meta: {
      onError: (error: ApiError) => {
        toast.error(
          error?.message || "Failed to fetch dashboard sales overview",
        );
      },
    },
  });
};
