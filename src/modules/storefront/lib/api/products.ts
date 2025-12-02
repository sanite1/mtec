import api from "../../../../lib/network/api";
import { ApiResponse, ApiError } from "../../../../lib/network/axios";
import {
  ProductFilters,
  ProductDetails,
  ProductsResponse,
} from "../types/products";
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";

// ----------------- API -----------------
export const fetchUserProducts = async (
  userId: string,
  filters?: ProductFilters,
): Promise<ProductsResponse> => {
  const params = new URLSearchParams();

  // if (filters?.category) params.append("category", filters.category);
  // if (filters?.name) params.append("name", filters.name);
  // if (filters?.isActive !== undefined)
  //   params.append("isActive", String(filters.isActive));
  // if (filters?.page) params.append("page", String(filters.page));
  params.append("limit", String(100));

  const res = await api.get<ApiResponse<ProductsResponse>>(
    `/product/user-storefront/${userId}?${params.toString()}`,
  );

  return res.data;
};

// ----------------- Hook -----------------
export const useUserProducts = (userId: string, filters?: ProductFilters) => {
  return useQuery<ProductsResponse, ApiError>({
    queryKey: ["userProducts", userId, filters],
    queryFn: () => fetchUserProducts(userId, filters),
    enabled: !!userId,
    retry: 1,
    meta: {
      onError: (error: ApiError) => {
        toast.error(error?.message || "Failed to fetch products");
      },
    },
  });
};

export const fetchSingleProduct = async (
  userId: string,
  productId: string,
): Promise<ProductDetails> => {
  const res = await api.get<ApiResponse<ProductDetails>>(
    `/product/user-storefront/${userId}/${productId}`,
  );
  return res.data;
};

export const useFetchSingleProduct = (userId: string, productId: string) => {
  return useQuery<ProductDetails, ApiError>({
    queryKey: ["singleProduct", userId, productId],
    queryFn: () => fetchSingleProduct(userId, productId),
    enabled: !!userId && !!productId,
    retry: 1,
    meta: {
      onError: (error: ApiError) => {
        toast.error(error?.message || "Failed to fetch product details");
      },
    },
  });
};
