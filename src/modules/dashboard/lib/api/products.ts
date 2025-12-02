import api from "../../../../lib/network/api";
import { ApiResponse, ApiError } from "../../../../lib/network/axios";
import { getDecodedJwt } from "../auth";
import {
  ProductResponseData,
  ProductFilters,
  ProductDetailsResponse,
  ProductHistoryFilters,
  ProductHistoryResponse,
  CreateProductPayload,
  CreateProductResponse,
  UpdateQuantityPayload,
  Product,
} from "../types/products";
import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "sonner";

// ----------------- API -----------------
export const fetchUserProducts = async (
  userId: string,
  filters?: ProductFilters,
): Promise<ProductResponseData> => {
  const params = new URLSearchParams();

  if (filters?.category) params.append("category", filters.category);
  if (filters?.name) params.append("name", filters.name);
  if (filters?.isActive !== undefined)
    params.append("isActive", String(filters.isActive));
  if (filters?.page) params.append("page", String(filters.page));
  if (filters?.limit) params.append("limit", String(filters.limit));

  const res = await api.get<ApiResponse<ProductResponseData>>(
    `/product/${userId}?${params.toString()}`,
  );

  return res.data;
};

// ----------------- Hook -----------------
export const useUserProducts = (userId: string, filters?: ProductFilters) => {
  return useQuery<ProductResponseData, ApiError>({
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
): Promise<ProductDetailsResponse> => {
  const res = await api.get<ApiResponse<ProductDetailsResponse>>(
    `/product/${userId}/${productId}`,
  );
  return res.data;
};

export const useFetchSingleProduct = (userId: string, productId: string) => {
  return useQuery<ProductDetailsResponse, ApiError>({
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

// ----------------- API -----------------
export const fetchProductHistory = async (
  productId: string,
  filters?: ProductHistoryFilters,
): Promise<ProductHistoryResponse> => {
  const params = new URLSearchParams();

  if (filters?.page) params.append("page", String(filters.page));
  if (filters?.limit) params.append("limit", String(filters.limit));

  const res = await api.get<ApiResponse<ProductHistoryResponse>>(
    `/product/${productId}/history?${params.toString()}`,
  );

  return res.data;
};

// ----------------- Hook -----------------
export const useProductHistory = (
  productId: string,
  filters?: ProductHistoryFilters,
) => {
  return useQuery<ProductHistoryResponse, ApiError>({
    queryKey: ["productHistory", productId, filters],
    queryFn: () => fetchProductHistory(productId, filters),
    enabled: !!productId,
    retry: 1,
    meta: {
      onError: (error: ApiError) => {
        toast.error(error?.message || "Failed to fetch product history");
      },
    },
  });
};

export async function deleteProduct(id: string): Promise<ApiResponse> {
  const response = await api.delete<ApiResponse>(`/product/${id}`);
  return response;
}

export function useDeleteProduct() {
  return useMutation<ApiResponse, ApiError, string>({
    mutationKey: ["delete-product"],
    mutationFn: (id) => deleteProduct(id),
    onSuccess: (response) => {
      toast.success(response.message);
    },
    onError: (error: ApiError) => {
      const errorMessage =
        error.response?.data?.fields?.[0].message ||
        error.response?.data?.message ||
        "Something went wrong. Please try again.";

      toast("Request Failed", {
        description: errorMessage,
      });
    },
  });
}

// --- lib/api/products.ts ---
export async function createProduct(
  payload: CreateProductPayload,
): Promise<CreateProductResponse> {
  const formData = new FormData();
  const user = getDecodedJwt();

  Object.entries(payload).forEach(([key, value]) => {
    if (value === undefined || value === null) return;

    if (key === "images" && Array.isArray(value)) {
      // 🖼️ Append files correctly
      value.forEach((file) => formData.append("images", file));
    }

    // ✅ Handle variants/variations (filter out empty discountPrice)
    else if (
      (key === "variants" || key === "variations") &&
      Array.isArray(value)
    ) {
      value.forEach((variant, i) => {
        Object.entries(variant).forEach(([variantKey, variantValue]) => {
          // 🚫 Skip empty string discountPrice
          if (
            variantKey === "discountPrice" &&
            (variantValue === "" || variantValue === null)
          ) {
            return;
          }

          formData.append(
            `${key}[${i}][${variantKey}]`,
            String(variantValue ?? ""),
          );
        });
      });
    }

    // ✅ Properly send option groups
    else if (key === "variantsOptionGroup" && Array.isArray(value)) {
      value.forEach((group, i) => {
        formData.append(`${key}[${i}][id]`, group.id);
        formData.append(`${key}[${i}][name]`, group.name);
        group.values.forEach((val: any, j: any) => {
          formData.append(`${key}[${i}][values][${j}][id]`, val.id);
          formData.append(`${key}[${i}][values][${j}][value]`, val.value);
        });
      });
    }

    // ✅ Handle nested objects safely
    else if (typeof value === "object" && !(value instanceof File)) {
      formData.append(key, JSON.stringify(value));
    }

    // ✅ Default case (simple values)
    else {
      formData.append(key, String(value));
    }
  });

  formData.append("userId", user?.id);

  const response = await api.post<ApiResponse<CreateProductResponse>>(
    "/product/create",
    formData,
    { headers: { "Content-Type": "multipart/form-data" } },
  );

  return response.data;
}

// --- hooks/useCreateProduct.ts ---
export function useCreateProduct() {
  // const { toast } = Toaster();

  return useMutation({
    mutationFn: createProduct,
    onSuccess: () => {
      toast.success("Product Created Successfully");
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

// --- lib/api/products.ts ---
export async function updateProduct(
  productId: string,
  payload: CreateProductPayload, // same structure as create
): Promise<CreateProductResponse> {
  const formData = new FormData();
  const user = getDecodedJwt();

  Object.entries(payload).forEach(([key, value]) => {
    if (value === undefined || value === null) return;

    if (key === "images" && Array.isArray(value)) {
      // 🖼️ Append files correctly (can mix URLs and Files)
      value.forEach((file) => {
        if (file instanceof File) {
          formData.append("images", file);
        } else if (typeof file === "string") {
          // Append existing URLs as strings
          formData.append("existingImages", file);
        }
      });
    }

    // ✅ Handle variants/variations
    else if (
      (key === "variants" || key === "variations") &&
      Array.isArray(value)
    ) {
      value.forEach((variant, i) => {
        Object.entries(variant).forEach(([variantKey, variantValue]) => {
          if (
            variantKey === "discountPrice" &&
            (variantValue === "" || variantValue === null)
          ) {
            return;
          }

          formData.append(
            `${key}[${i}][${variantKey}]`,
            String(variantValue ?? ""),
          );
        });
      });
    }

    // ✅ Handle option groups
    else if (key === "variantsOptionGroup" && Array.isArray(value)) {
      value.forEach((group, i) => {
        formData.append(`${key}[${i}][id]`, group.id);
        formData.append(`${key}[${i}][name]`, group.name);
        group.values.forEach((val: any, j: any) => {
          formData.append(`${key}[${i}][values][${j}][id]`, val.id);
          formData.append(`${key}[${i}][values][${j}][value]`, val.value);
        });
      });
    }

    // ✅ Handle nested objects safely
    else if (typeof value === "object" && !(value instanceof File)) {
      formData.append(key, JSON.stringify(value));
    }

    // ✅ Default case (simple values)
    else {
      formData.append(key, String(value));
    }
  });

  formData.append("userId", user?.id);

  const response = await api.patch<ApiResponse<CreateProductResponse>>(
    `/product/${productId}`,
    formData,
    { headers: { "Content-Type": "multipart/form-data" } },
  );

  return response.data;
}

export function useUpdateProduct() {
  return useMutation<
    CreateProductResponse,
    ApiError,
    { productId: string; payload: CreateProductPayload }
  >({
    mutationFn: ({ productId, payload }) => updateProduct(productId, payload),
    onSuccess: () => {
      toast.success("Product Updated Successfully");
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

export async function updateProductQuantity(
  id: string,
  data: UpdateQuantityPayload,
): Promise<ApiResponse> {
  const response = await api.patch<ApiResponse<Product>>(
    `/product/${id}/quantity`,
    data,
  );
  return response;
}

// --- REACT QUERY HOOK ---
export function useUpdateProductQuantity() {
  return useMutation<
    ApiResponse,
    ApiError,
    { id: string; data: UpdateQuantityPayload }
  >({
    mutationKey: ["update-product-quantity"],
    mutationFn: ({ id, data }) => updateProductQuantity(id, data),
    onSuccess: () => {
      toast.success("Product Quantity Updated Successfully");
    },
    onError: (error: ApiError) => {
      const errorMessage =
        error.response?.data?.fields?.[0].message ||
        error.response?.data?.message ||
        "Something went wrong. Please try again.";

      toast.error("Request Failed", {
        description: errorMessage,
        className: "bg-red-600 text-white", // custom background + text
      });
    },
  });
}
