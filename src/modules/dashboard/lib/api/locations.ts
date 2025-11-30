import { ApiResponse, ApiError } from "../../../../lib/network/axios";
import api from "../../../../lib/network/api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  Location,
  LocationPayload,
  LocationFilters,
  LocationResponseData,
} from "../types/locations";
import { removeEmptyFields } from "../utils/utils";

// 🔹 GET all locations for user (paginated)
export const fetchStoreLocations = async (
  userId: string,
  filters?: LocationFilters,
): Promise<LocationResponseData> => {
  const params = new URLSearchParams();

  if (filters?.search) params.append("search", filters.search);
  if (filters?.page) params.append("page", String(filters.page));
  if (filters?.limit) params.append("limit", String(filters.limit));

  const res = await api.get<ApiResponse<LocationResponseData>>(
    `/location/${userId}?${params.toString()}`,
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

// 🔹 CREATE location
export const createLocation = async (
  data: LocationPayload & { userId: string },
) => {
  const payload = removeEmptyFields(data);
  const res = await api.post<ApiResponse<Location>>(`/location`, payload);
  return res.data;
};

export const useCreateLocation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: LocationPayload & { userId: string }) =>
      createLocation(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["storeLocations"] });
      toast.success("Location Created Successfully");
    },
    onError: (error: ApiError) => {
      const errorMessage =
        error.response?.data?.fields?.[0].message ||
        error.response?.data?.message ||
        "Something went wrong. Please try again.";
      toast.error("Request Failed", { description: errorMessage });
    },
  });
};

// 🔹 UPDATE location
export const updateLocation = async ({
  id,
  data,
}: {
  id: string;
  data: Partial<LocationPayload>;
}) => {
  const payload = removeEmptyFields(data);
  const res = await api.patch<ApiResponse<Location>>(
    `/location/${id}`,
    payload,
  );
  return res.data;
};

export const useUpdateLocation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: string;
      data: Partial<LocationPayload>;
    }) => updateLocation({ id, data }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["storeLocations"] });
      toast.success("Location Updated Successfully");
    },
    onError: (error: ApiError) => {
      const errorMessage =
        error.response?.data?.fields?.[0].message ||
        error.response?.data?.message ||
        "Something went wrong. Please try again.";
      toast.error("Request Failed", { description: errorMessage });
    },
  });
};

// 🔹 DELETE location
export const deleteLocation = async ({ id }: { id: string }) => {
  const res = await api.delete<ApiResponse<Location>>(`/location/${id}`);
  return res.data;
};

export const useDeleteLocation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id }: { id: string }) => deleteLocation({ id }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["storeLocations"] });
      toast.success("Location Deleted Successfully");
    },
    onError: (error: ApiError) => {
      const errorMessage =
        error.response?.data?.fields?.[0].message ||
        error.response?.data?.message ||
        "Something went wrong. Please try again.";
      toast.error("Request Failed", { description: errorMessage });
    },
  });
};
