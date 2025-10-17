// =====================
// 🧾 AUTH & USER TYPES
// =====================

// ✅ Login
export interface LoginPayload {
  email: string;
  password: string;
}

export interface LoginResponse {
  accessToken: string;
  refreshToken?: string;
  message?: string;
  user?: UserData;
}

// ✅ Signup
export interface SignupPayload {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
  phone?: string;
  country?: string;
  state?: string;
  city?: string;
  address?: string;
  role?: string;
  languages?: string[];
  certifications?: string[];
  profilePicture?: File | string;
}

// ✅ Update Password
export interface UpdatePasswordPayload {
  oldPassword: string;
  newPassword: string;
  confirmNewPassword: string;
}

// ✅ Forgot Password
export interface forgotPasswordPayload {
  email: string;
}

// ✅ Update User
export interface UpdateUserPayload {
  fullName?: string;
  phone?: string;
  email?: string;
  country?: string;
  state?: string;
  city?: string;
  address?: string;
  role?: string;
  bio?: string;
  languages?: string[];
  certifications?: string[];
  profilePicture?: File | string;
}

// ✅ User Data (shared)
export interface UserData {
  id: string;
  fullName: string;
  email: string;
  phone?: string;
  country?: string;
  state?: string;
  city?: string;
  address?: string;
  role?: string;
  bio?: string;
  profilePicture?: string;
  languages?: string[];
  certifications?: string[];
  isVerified: boolean;
  createdAt: string;
  updatedAt: string;
}

// ✅ Decoded JWT User (used in Header)
export interface DecodedUser {
  id: string;
  email: string;
  fullName: string;
  role?: string;
  iat?: number;
  exp?: number;
}
