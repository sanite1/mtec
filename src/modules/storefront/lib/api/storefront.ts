import { useQuery } from "@tanstack/react-query";
import api from "../../../../lib/network/api";
import { ApiResponse, ApiError } from "../../../../lib/network/axios";
import { StorefrontResponse } from "../types/storefront";
import { toast } from "sonner";

export const fetchStorefront = async (
  userId: string,
): Promise<StorefrontResponse> => {
  const res = await api.get<ApiResponse<StorefrontResponse>>(
    `/storefront/user-storefront/${userId}`,
  );
  return res.data;
};

export const useStorefront = (userId: string) =>
  useQuery<StorefrontResponse, ApiError>({
    queryKey: ["storefront", userId],
    queryFn: () => fetchStorefront(userId),
    enabled: !!userId,
    retry: 1,
    meta: {
      onError: (error: ApiError) => {
        const errorMessage =
          error.response?.data?.message ||
          "Something went wrong. Please try again.";

        toast.error(errorMessage);
      },
    },
  });
