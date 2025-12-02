import { ApiResponse, ApiError } from "../../../../lib/network/axios";
import api from "../../../../lib/network/api";
import { useQuery } from "@tanstack/react-query";
import { TaxFilters, Tax } from "../types/taxes";

// 🔹 GET all taxes for user (paginated)
export const fetchStoreTaxes = async (userId: string): Promise<Tax> => {
  const params = new URLSearchParams();

  const selectedLocation =
    localStorage.getItem("selectedLocation") &&
    JSON.parse(localStorage.getItem("selectedLocation")!);
  console.log(selectedLocation);

  params.append("location", selectedLocation.locationName);

  const res = await api.get<ApiResponse<Tax>>(
    `/taxes/user-storefront/${userId}?${params.toString()}`,
  );

  return res.data;
};

export const useStoreTax = (userId: string) => {
  return useQuery<Tax, ApiError>({
    queryKey: ["storeTaxes", userId],
    queryFn: () => fetchStoreTaxes(userId),
    enabled: !!userId,
    retry: 1,
  });
};
