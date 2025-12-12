import { ApiResponse, ApiError } from "../../../../lib/network/axios";
import api from "../../../../lib/network/api";
import { useQuery } from "@tanstack/react-query";
import { ShippingFilters, ShippingResponseData } from "../types/shipping";

export const fetchStoreShipping = async (
  userId: string,
  filters?: ShippingFilters,
): Promise<ShippingResponseData> => {
  const params = new URLSearchParams();
  const selectedLocation =
    localStorage.getItem("selectedLocation") &&
    JSON.parse(localStorage.getItem("selectedLocation")!);

  if (filters?.search) params.append("search", filters.search);
  if (filters?.page) params.append("page", String(filters.page));
  if (filters?.limit) params.append("limit", String(filters.limit));
  params.append("isActive", "true");

  if (selectedLocation) {
    params.append("location", selectedLocation.locationName);
  }

  const res = await api.get<ApiResponse<ShippingResponseData>>(
    `/shipping/user-storefront/${userId}?${params.toString()}`,
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
