import { ApiResponse, ApiError } from "../../../../lib/network/axios";
import api from "../../../../lib/network/api";
import { useQuery } from "@tanstack/react-query";
import { LocationFilters, LocationResponseData } from "../types/locations";

// 🔹 GET all locations for user (paginated)
export const fetchStoreLocations = async (
  userId: string,
  filters?: LocationFilters,
): Promise<LocationResponseData> => {
  const params = new URLSearchParams();

  if (filters?.search) params.append("search", filters.search);
  if (filters?.page) params.append("page", String(filters.page));
  params.append("limit", "100");

  const res = await api.get<ApiResponse<LocationResponseData>>(
    `/location/user-storefront/${userId}?${params.toString()}`,
  );

  return res.data;
};

export const useStoreLocations = (
  userId: string,
  filters?: LocationFilters,
) => {
  return useQuery<LocationResponseData, ApiError>({
    queryKey: ["storeLocations", userId, filters],
    queryFn: () => fetchStoreLocations(userId, filters),
    enabled: !!userId,
    retry: 1,
  });
};
