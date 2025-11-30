import api from "../../../../lib/network/api";
import { ApiError, ApiResponse } from "../../../../lib/network/axios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { OnboardingData } from "../types/onboardingSteps";

// ----------------- API -----------------
export const fetchOnboardingProgress = async (
  userId: string,
): Promise<OnboardingData> => {
  const res = await api.get<ApiResponse<OnboardingData>>(
    `/onboarding/${userId}`,
  );
  return res.data;
};

// ----------------- Hook -----------------
export const useOnboardingProgress = (userId: string) => {
  return useQuery<OnboardingData, ApiError>({
    queryKey: ["onboardingProgress", userId],
    queryFn: () => fetchOnboardingProgress(userId),
    enabled: !!userId,
  });
};

// ✅ Update a specific onboarding step
export const updateOnboardingStep = async (
  userId: string,
  key: string,
  completed: boolean,
) => {
  const { data } = await api.patch<ApiResponse>(`/onboarding/step/${key}`, {
    completed,
    userId,
  });
  return data;
};

// ✅ Hook for PATCH /api/onboarding/step/:key
export const useUpdateOnboardingStep = (userId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ key, completed }: { key: string; completed: boolean }) =>
      updateOnboardingStep(userId, key, completed),
    onSuccess: () => {
      // Refresh onboarding progress data
      queryClient.invalidateQueries({
        queryKey: ["onboardingProgress", userId],
      });
      toast.success("Onboarding Step Completed");
    },
    onError: (error: ApiError) => {
      const errorMessage =
        error.response?.data?.fields?.[0].message ||
        error.response?.data?.message ||
        "Something went wrong. Please try again.";

      toast.error(errorMessage);
    },
  });
};
