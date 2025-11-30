import { useMutation, useQuery } from "@tanstack/react-query";
import api from "../../../../lib/network/api";
import { ApiResponse, ApiError } from "../../../../lib/network/axios";
import {
  BannerPayload,
  NewsletterPayload,
  StorefrontResponse,
  UpdateStorefrontPayload,
} from "../types/storefront";
import { toast } from "sonner";

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
          error.response?.data?.fields?.[0].message ||
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

  Object.entries(payload).forEach(([key, value]) => {
    if (value === undefined || value === null) return;

    /* ----------------------------------------
       ✅ TOP-LEVEL FILES
      -----------------------------------------*/
    if (
      (key === "bannerImage" || key === "newsletterImg") &&
      value instanceof File
    ) {
      formData.append(key, value);
      return;
    }

    /* ----------------------------------------
       ✅ BANNER (FLATTENED – SAFE)
      -----------------------------------------*/
    if (key === "banner" && typeof value === "object") {
      const banner = value as BannerPayload;

      // if (banner?.image instanceof File) {
      //   formData.append("bannerImage", banner.image);
      // }

      if (typeof banner?.title === "string") {
        formData.append("banner[title]", banner.title);
      }

      if (typeof banner?.subtext === "string") {
        formData.append("banner[subtext]", banner.subtext);
      }

      return;
    }

    /* ----------------------------------------
       ✅ NEWSLETTER (FLATTENED – SAFE)
      -----------------------------------------*/
    if (key === "newsletter" && typeof value === "object") {
      const newsletter = value as NewsletterPayload;

      if (newsletter?.img instanceof File) {
        formData.append("newsletterImg", newsletter.img);
      }

      if (typeof newsletter?.headline === "string") {
        formData.append("newsletter[headline]", newsletter.headline);
      }

      if (typeof newsletter?.subtext === "string") {
        formData.append("newsletter[subtext]", newsletter.subtext);
      }

      return;
    }

    /* ----------------------------------------
       ✅ ALL OTHER OBJECTS (FLATTEN, NO RAW OBJECTS)
      -----------------------------------------*/
    if (typeof value === "object" && !(value instanceof File)) {
      Object.entries(value).forEach(([subKey, subValue]) => {
        if (subValue === undefined || subValue === null) return;

        // ✅ ABSOLUTE SAFETY CAST
        formData.append(
          `${key}[${subKey}]`,
          String(
            typeof subValue === "object" ? JSON.stringify(subValue) : subValue,
          ),
        );
      });
      return;
    }

    /* ----------------------------------------
       ✅ PRIMITIVES ONLY
      -----------------------------------------*/
    formData.append(key, String(value));
  });

  const res = await api.put<ApiResponse<StorefrontResponse>>(
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
        error.response?.data?.fields?.[0].message ||
        error.response?.data?.message ||
        "Something went wrong. Please try again.";

      toast.error("Update Failed", {
        description: msg,
      });
    },
  });
