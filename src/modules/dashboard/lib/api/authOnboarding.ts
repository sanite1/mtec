// import axiosInstance from "../utils/axios";
import api from "../../../../lib/network/api";
import { ApiError, ApiResponse } from "../../../../lib/network/axios";
// import { setAuthToken, removeAuthToken } from "../utils/auth";
import Cookies from "js-cookie";
import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  DecodedUser,
  LoginPayload,
  LoginResponse,
  SignupPayload,
  UpdatePasswordPayload,
  UpdateUserPayload,
  UserData,
  forgotPasswordPayload,
  refreshResponse,
} from "../types/authOnboarding";
import { jwtDecode } from "jwt-decode";
import {
  getRefreshToken,
  removeAuthToken,
  setAuthToken,
  setRefreshToken,
} from "../auth";

export const login = async (
  payload: LoginPayload,
): Promise<ApiResponse<LoginResponse>> => {
  const res = await api.post<ApiResponse<LoginResponse>>(
    "/users/login",
    payload,
  );
  setAuthToken(res.data.accessToken);
  setRefreshToken(res.data.refreshToken);
  Cookies.set("authToken", res.data.accessToken, { expires: 7, path: "/" });

  // Decode new token and update localStorage
  const decodedUser: DecodedUser = jwtDecode(res.data.accessToken);
  localStorage.setItem("user", JSON.stringify(decodedUser));
  return res;
};

// Hooks
export const useLogin = () => {
  return useMutation<ApiResponse<LoginResponse>, ApiError, LoginPayload>({
    mutationFn: login,
    onSuccess: (response) => {
      toast.success("Login Successful", {
        description: " Redirecting you to dashboard...",
      });
    },
    onError: (error: ApiError) => {
      const errorMessage =
        error.response?.data?.message ||
        "Something went wrong. Please try again.";

      toast.error("Login Failed", {
        description: errorMessage,
      });
    },
  });
};

export const refresh = async (): Promise<ApiResponse<refreshResponse>> => {
  const res = await api.post<ApiResponse<refreshResponse>>("/users/refresh", {
    token: getRefreshToken(),
  });
  setAuthToken(res.data.accessToken);
  Cookies.set("authToken", res.data.accessToken, { expires: 7, path: "/" });

  // Decode new token and update localStorage
  const decodedUser: DecodedUser = jwtDecode(res.data.accessToken);
  localStorage.setItem("user", JSON.stringify(decodedUser));
  return res;
};

// Hooks
export const useRefresh = () => {
  return useMutation<ApiResponse<refreshResponse>, ApiError>({
    mutationFn: refresh,
    onSuccess: (response) => {
      toast.success("Refresh Successful");
    },
    onError: (error: ApiError) => {
      const errorMessage =
        error.response?.data?.message ||
        "Something went wrong. Please try again.";

      toast.error("Login Failed", {
        description: errorMessage,
      });
    },
  });
};

export const forgotPassword = async (
  payload: forgotPasswordPayload,
): Promise<ApiResponse> => {
  const res = await api.post<ApiResponse>("/users/forgot-password", payload);
  return res;
};

// Hooks
export const useForgotPassword = () => {
  return useMutation<ApiResponse, ApiError, forgotPasswordPayload>({
    mutationFn: forgotPassword,
    onSuccess: (response) => {
      toast.success("A reset link has been sent to your email.");
    },
    onError: (error: ApiError) => {
      const errorMessage =
        error.response?.data?.message ||
        "Something went wrong. Please try again.";

      toast.error("Request Faild", {
        description: errorMessage,
      });
    },
  });
};

// API Function
export const resetPassword = async (
  id: string,
  token: string,
  payload: { password: string },
): Promise<ApiResponse> => {
  const res = await api.patch<ApiResponse>(
    `/users/reset-password/${id}/${token}`,
    payload,
  );
  return res;
};

// Hooks
export const useResetPassword = () => {
  return useMutation<
    ApiResponse,
    ApiError,
    { id: string; token: string; password: string }
  >({
    mutationFn: ({ id, token, password }) =>
      resetPassword(id, token, { password }),
    onSuccess: (response) => {
      toast.success("Password Reset Successful", {
        description: response.message,
      });
    },
    onError: (error: ApiError) => {
      const errorMessage =
        error.response?.data?.message ||
        "Something went wrong. Please try again.";

      toast.error("Request Failed", {
        description: errorMessage,
      });
    },
  });
};

export const signup = async (payload: SignupPayload): Promise<ApiResponse> => {
  const formData = new FormData();

  // Append all fields except the file
  Object.entries(payload).forEach(([key, value]) => {
    if (key === "languages" || key === "certifications") {
      formData.append(key, JSON.stringify(value)); // send as string
    } else if (key !== "profilePicture") {
      formData.append(key, value as string);
    }
  });

  // Append file separately
  // if (payload.profilePicture instanceof File) {
  //   formData.append("profilePicture", payload.profilePicture);
  // }

  const res = await api.post<ApiResponse>("/users", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

  return res;
};

export const useSignup = () => {
  return useMutation<ApiResponse, ApiError, SignupPayload>({
    mutationFn: signup,
    onSuccess: (response) => {
      toast.success("Signup Successful", {
        description: response.message,
      });
    },
    onError: (error: ApiError) => {
      const errorMessage =
        error.response?.data?.message ||
        "Something went wrong. Please try again.";

      toast.error("Signup Failed", {
        description: errorMessage,
      });
    },
  });
};

// API Function
export const verifyAccount = async (
  id: string,
  token: string,
): Promise<ApiResponse> => {
  const res = await api.get<ApiResponse>(`/users/verify/${id}/${token}`);
  return res;
};

// Hook for Verification
export const useVerifyAccount = () => {
  return useMutation<ApiResponse, ApiError, { id: string; token: string }>({
    mutationFn: ({ id, token }) => verifyAccount(id, token),
    onSuccess: (response) => {
      toast.success("Verification Successful", {
        description: response.message,
      });
    },
    onError: (error) => {
      const errorMessage =
        error.response?.data?.message ||
        "Verification failed. Please try again.";
      toast.error("Verification Failed", {
        description: errorMessage,
      });
    },
  });
};

// Function to fetch user details by ID
export const fetchUserDetails = async (id: string): Promise<UserData> => {
  const res = await api.get<ApiResponse<UserData>>(`/users/${id}`);
  return res.data;
};

export const useUserDetails = (id: string) => {
  return useQuery({
    queryKey: ["userDetails", id],
    queryFn: () => fetchUserDetails(id),
    enabled: !!id, // Ensures query runs only when id is available
  });
};

export const updateUser = async (
  id: string,
  payload: UpdateUserPayload,
): Promise<ApiResponse<LoginResponse>> => {
  const formData = new FormData();

  // Append all fields except the file
  Object.entries(payload).forEach(([key, value]) => {
    if (key === "languages" || key === "certifications") {
      formData.append(key, JSON.stringify(value)); // send as string
    } else if (key !== "profilePicture") {
      formData.append(key, value as string);
    }
  });

  // Append file separately
  if (payload.profilePicture instanceof File) {
    formData.append("profilePicture", payload.profilePicture);
  }

  const res = await api.patch<ApiResponse<LoginResponse>>(
    `/users/${id}`,
    formData,
    {
      headers: { "Content-Type": "multipart/form-data" },
    },
  );

  // Save new auth token
  const newToken = res.data.accessToken;
  setAuthToken(newToken);
  Cookies.set("authToken", newToken, { expires: 7, path: "/" });

  // Decode new token and update localStorage
  const decodedUser: DecodedUser = jwtDecode(newToken);
  localStorage.setItem("user", JSON.stringify(decodedUser));

  // Dispatch event after everything is set
  window.dispatchEvent(new Event("userUpdated"));

  return res;
};

export const useUpdateUser = () => {
  return useMutation<
    ApiResponse<LoginResponse>,
    ApiError,
    { id: string; payload: UpdateUserPayload }
  >({
    mutationFn: ({ id, payload }) => updateUser(id, payload),
    onSuccess: (response) => {
      toast.success("Profile Updated", {
        description: response.message,
      });
    },
    onError: (error) => {
      const errorMessage =
        error.response?.data?.message || "Failed to update profile. Try again.";
      toast.error("Update Failed", {
        description: errorMessage,
      });
    },
  });
};

export const updatePassword = async (
  id: string,
  payload: UpdatePasswordPayload,
): Promise<ApiResponse> => {
  const res = await api.patch<ApiResponse>(
    `/users/update-password/${id}`,
    payload,
  );
  return res;
};

export const useUpdatePassword = () => {
  return useMutation<
    ApiResponse,
    ApiError,
    {
      id: string;
      oldPassword: string;
      newPassword: string;
      confirmNewPassword: string;
    }
  >({
    mutationFn: ({ id, ...payload }) => updatePassword(id, payload),
    onSuccess: () => {
      toast.success("Password Updated Successfully", {
        description: "Your password has been changed.",
      });
    },
    onError: (error: ApiError) => {
      toast.error("Password Update Failed", {
        description: error.response?.data?.message || "Something went wrong!",
      });
    },
  });
};

export const logout = () => {
  removeAuthToken();
};

export const unsubscribeUser = async (payload: {
  name: string;
  email: string;
}): Promise<ApiResponse> => {
  const res = await api.post<ApiResponse>("/users/unsubscribe", payload);
  return res;
};

export const useUnsubscribe = () => {
  return useMutation<ApiResponse, ApiError, { name: string; email: string }>({
    mutationFn: (payload) => unsubscribeUser(payload),
    onSuccess: (response) => {
      toast.success("Unsubscribed Successfully", {
        description: response.message,
      });
    },
    onError: (error) => {
      const message =
        error.response?.data?.message ||
        "Failed to unsubscribe. Please try again.";

      toast.error("Unsubscribe Failed", {
        description: message,
      });
    },
  });
};
