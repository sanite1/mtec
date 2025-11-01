import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, CheckCircle, XCircle } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { useResetPassword } from "../lib/api/authOnboarding";

// ✅ Validation Schema
const resetPasswordSchema = z
  .object({
    newPassword: z
      .string()
      .min(6, "Password must be at least 6 characters")
      .max(50, "Password too long"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
  });

type ResetPasswordForm = z.infer<typeof resetPasswordSchema>;

export default function ResetPassword() {
  const navigate = useNavigate();
  const { id, token } = useParams();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordForm>({
    resolver: zodResolver(resetPasswordSchema),
  });

  const { mutateAsync: resetPassword, isPending } = useResetPassword();

  const onSubmit = async (data: ResetPasswordForm) => {
    setErrorMsg("");
    try {
      await resetPassword({
        id: id as string,
        token: token as string,
        password: data.newPassword,
      });
      setSuccess(true);
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message ||
        "Something went wrong. Please try again.";
      setErrorMsg(errorMessage);
    }
  };

  return (
    <section
      className="
        relative min-h-screen 
        flex justify-center items-start 
        lg:bg-gradient-to-b lg:from-gray-900 lg:via-gray-800 lg:to-gray-900 
        text-white overflow-auto
        py-8 sm:py-12
      "
    >
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-32 -left-20 w-[32rem] h-[32rem] lg:bg-purple-600 rounded-full blur-3xl opacity-30"></div>
        <div className="absolute top-1/2 -right-40 w-[28rem] h-[28rem] lg:bg-indigo-600 rounded-full blur-3xl opacity-25"></div>
      </div>

      <div
        className="
          relative z-10 
          w-full max-w-md 
          mx-4 sm:mx-0 
          bg-white/10 backdrop-blur-xl 
          border border-white/20 
          rounded-2xl shadow-2xl 
          p-6 sm:p-10 text-center
        "
      >
        {!success && (
          <div className="|">
            {/* Icon */}
            <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-purple-100/20 border border-purple-400/30">
              <svg
                className="h-8 w-8 text-purple-400"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 11c.5304 0 1.0391.2107 1.4142.5858C13.7893 11.9609 14 12.4696 14 13v2a2 2 0 01-4 0v-2c0-.5304.2107-1.0391.5858-1.4142C10.9609 11.2107 11.4696 11 12 11zM8 8V7a4 4 0 118 0v1"
                />
                <rect width="16" height="10" x="4" y="11" rx="2" />
              </svg>
            </div>

            {/* Title */}
            <h2 className="mt-6 text-3xl font-bold text-gray-900 lg:text-white">
              Reset Password
            </h2>
            <p className="mt-3 text-gray-700 lg:text-gray-300 text-sm">
              Enter your new password below to continue.
            </p>
          </div>
        )}

        {/* ✅ Success Message */}
        {success ? (
          <div className="mt-6 text-center">
            <div className="flex justify-center">
              <CheckCircle className="text-green-500" size={48} />
            </div>
            <h3 className="mt-4 text-xl font-semibold text-green-400">
              Password Reset Successful
            </h3>
            <p className="mt-2 text-gray-300 text-sm">
              Your password has been updated. You can now log in with your new
              password.
            </p>
            <button
              onClick={() => navigate("/login")}
              className="mt-6 px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-lg shadow-lg transition"
            >
              Proceed to Login
            </button>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="mt-8 text-left space-y-5"
          >
            {/* Error Alert */}
            {errorMsg && (
              <div className="flex items-center gap-2 p-3 rounded-lg bg-red-600/20 border border-red-400 text-red-400 text-sm">
                <XCircle size={18} />
                <span>{errorMsg}</span>
              </div>
            )}

            {/* New Password */}
            <div>
              <label className="block text-sm font-medium text-gray-900 lg:text-gray-200 mb-2">
                New Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  {...register("newPassword")}
                  placeholder="••••••••"
                  className={`w-full px-4 py-3 rounded-lg bg-white/10 border text-base ${
                    errors.newPassword ? "border-red-500" : "border-white/30"
                  } text-gray-900 lg:text-white placeholder-gray-500 lg:placeholder-gray-400 ring-1 lg:ring-0 ring-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute right-3 h-full text-gray-400 hover:text-white"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              {errors.newPassword && (
                <p className="text-red-400 text-sm mt-1">
                  {errors.newPassword.message}
                </p>
              )}
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-sm font-medium text-gray-900 lg:text-gray-200 mb-2">
                Confirm Password
              </label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  {...register("confirmPassword")}
                  placeholder="••••••••"
                  className={`w-full px-4 py-3 rounded-lg bg-white/10 border text-base ${
                    errors.confirmPassword
                      ? "border-red-500"
                      : "border-white/30"
                  } text-gray-900 lg:text-white placeholder-gray-500 lg:placeholder-gray-400 ring-1 lg:ring-0 ring-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500`}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword((prev) => !prev)}
                  className="absolute right-3 h-full text-gray-400 hover:text-white"
                >
                  {showConfirmPassword ? (
                    <EyeOff size={20} />
                  ) : (
                    <Eye size={20} />
                  )}
                </button>
              </div>
              {errors.confirmPassword && (
                <p className="text-red-400 text-sm mt-1">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>

            {/* Submit */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={isPending}
                className="w-full py-3 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-lg shadow-lg transition disabled:opacity-50"
              >
                {isPending ? "Resetting..." : "Reset Password"}
              </button>
            </div>
          </form>
        )}
      </div>
    </section>
  );
}
