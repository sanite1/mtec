import { ApiResponse, ApiError } from "../../../../lib/network/axios";
import api from "../../../../lib/network/api";
import { useMutation, useQuery } from "@tanstack/react-query";
import { IStoreCreate, IStoreDetails } from "../types/store";
import { getDecodedJwt } from "../auth";
import { toast } from "sonner";
import { removeEmptyFields } from "../utils/utils";

// -------------------- CREATE STORE --------------------
export async function createStore(
  payload: IStoreCreate,
): Promise<ApiResponse<IStoreDetails>> {
  const formData = new FormData();
  const refinedPayload = removeEmptyFields(payload);
  if (payload.logoUrl) {
    refinedPayload.logoUrl = payload.logoUrl;
  }
  Object.entries(refinedPayload).forEach(([key, value]) => {
    if (value === undefined || value === null) return;

    // ✅ If it's a File, append directly
    if (value instanceof File) {
      formData.append(key, value);
      return;
    }

    // ✅ If it's an object, JSON stringify
    if (typeof value === "object") {
      formData.append(key, JSON.stringify(value));
      return;
    }

    // ✅ Normal string/number
    formData.append(key, String(value));
  });

  const response = await api.post<ApiResponse<IStoreDetails>>(
    "/store",
    formData,
    { headers: { "Content-Type": "multipart/form-data" } },
  );

  return response;
}

export function useCreateStore() {
  return useMutation({
    mutationFn: createStore,
    onSuccess: () => {
      toast.success("Store Details Created Successfully");
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

// -------------------- UPDATE STORE --------------------
export async function updateStore(
  storeId: string,
  payload: Partial<IStoreDetails>,
): Promise<ApiResponse<IStoreDetails>> {
  const formData = new FormData();
  const user = getDecodedJwt();

  Object.entries(payload).forEach(([key, value]) => {
    if (value === undefined || value === null) return;

    if (typeof value === "object" && !(value instanceof File)) {
      formData.append(key, JSON.stringify(value));
    } else {
      formData.append(key, String(value));
    }
  });

  formData.append("userId", user?.id);

  const response = await api.patch<ApiResponse<IStoreDetails>>(
    `/store/${storeId}`,
    formData,
    { headers: { "Content-Type": "multipart/form-data" } },
  );

  return response;
}

export function useUpdateStore() {
  return useMutation({
    mutationFn: ({ storeId, payload }: any) => updateStore(storeId, payload),
    onSuccess: () => {
      toast.success("Store Details Updated Successfully");
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

// -------------------- DELETE STORE --------------------
export async function deleteStore(id: string): Promise<ApiResponse> {
  const response = await api.delete<ApiResponse>(`/store/${id}`);
  return response;
}
export function useDeleteStore() {
  return useMutation<ApiResponse, ApiError, string>({
    mutationKey: ["delete-store"],
    mutationFn: (id) => deleteStore(id),
    onSuccess: (response) => {
      toast.success(response.message);
    },
    onError: (error) => {
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

// -------------------- GET STORE BY ID --------------------
export async function fetchStoreById(userId: string): Promise<IStoreDetails> {
  const response = await api.get<ApiResponse<IStoreDetails>>(
    `/store/${userId}`,
  );
  return response.data;
}

export const useFetchStoreById = (userId: string) => {
  return useQuery({
    queryKey: ["store-details", userId],
    queryFn: () => fetchStoreById(userId),
    enabled: !!userId,
    retry: 1,
    meta: {
      onError: (error: ApiError) => {
        toast.error(error?.message || "Failed to fetch store details");
      },
    },
  });
};

// -------------------- GET STORE BY ID --------------------
export async function resolveSlug(slug: string): Promise<IStoreDetails> {
  const response = await api.get<ApiResponse<IStoreDetails>>(
    `/store/resolve/${slug}`,
  );
  return response.data;
}

export const useResolveSlug = (slug: string) => {
  return useQuery({
    queryKey: ["store-resolve", slug],
    queryFn: () => resolveSlug(slug),
    enabled: !!slug,
    retry: 1,
    meta: {
      onError: (error: ApiError) => {
        toast.error(error?.message || "Failed to resolve store details");
      },
    },
  });
};
