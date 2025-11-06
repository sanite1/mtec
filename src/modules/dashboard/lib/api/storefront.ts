import { useMutation, useQuery } from "@tanstack/react-query";
import api from "../../../../lib/network/api";
import { ApiResponse, ApiError } from "../../../../lib/network/axios";
import {
  StorefrontResponse,
  UpdateStorefrontPayload,
} from "../types/storefront";
import { toast } from "sonner";
import { getDecodedJwt } from "../auth";

export const fetchStorefront = async (
  userId: string,
): Promise<StorefrontResponse> => {
  const res = await api.get<ApiResponse<StorefrontResponse>>(
    `/storefront/${userId}`,
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

export const updateStorefront = async ({
  userId,
  payload,
}: {
  userId: string;
  payload: UpdateStorefrontPayload;
}): Promise<StorefrontResponse> => {
  const formData = new FormData();
  const user = getDecodedJwt();

  Object.entries(payload).forEach(([key, value]) => {
    if (!value) return;

    if (key === "banner" && typeof value === "object" && (value as any).image) {
      const banner = value as any;
      if (banner.image instanceof File) {
        formData.append("bannerImage", banner.image);
      }
      formData.append(
        "banner",
        JSON.stringify({ title: banner.title, subtext: banner.subtext }),
      );
      return;
    }

    if (
      key === "newsletter" &&
      typeof value === "object" &&
      (value as any).img
    ) {
      const newsletter = value as any;
      if (newsletter.img instanceof File) {
        formData.append("newsletterImg", newsletter.img);
      }
      formData.append(
        "newsletter",
        JSON.stringify({
          headline: newsletter.headline,
          subtext: newsletter.subtext,
        }),
      );
      return;
    }

    // ✅ default nested json fields
    if (typeof value === "object") {
      formData.append(key, JSON.stringify(value));
    } else {
      formData.append(key, String(value));
    }
  });

  formData.append("userId", user?.id);

  const res = await api.patch<ApiResponse<StorefrontResponse>>(
    `/storefront/${userId}`,
    formData,
    { headers: { "Content-Type": "multipart/form-data" } },
  );

  return res.data;
};

export const useUpdateStorefront = () =>
  useMutation<
    StorefrontResponse,
    ApiError,
    { userId: string; payload: UpdateStorefrontPayload }
  >({
    mutationFn: updateStorefront,

    onSuccess: () => {
      toast.success("Storefront updated successfully");
    },

    onError: (error: ApiError) => {
      const msg =
        error.response?.data?.message ||
        "Something went wrong. Please try again.";

      toast.error("Update Failed", {
        description: msg,
      });
    },
  });
