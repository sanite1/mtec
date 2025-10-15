import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff } from "lucide-react";
import { useNavigate } from "react-router-dom";

// ✅ Schema
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

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ResetPasswordForm>({
    resolver: zodResolver(resetPasswordSchema),
  });

  const onSubmit = (data: ResetPasswordForm) => {
    console.log("Password Reset:", data);
    navigate("/login");
  };

  return (
    <section
      className="
        relative min-h-screen 
        flex justify-center items-center 
        bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 
        text-white overflow-hidden
        py-8 sm:py-12
      "
    >
      {/* Background Decorative Blurs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-32 -left-20 w-[32rem] h-[32rem] bg-purple-600 rounded-full blur-3xl opacity-30"></div>
        <div className="absolute top-1/2 -right-40 w-[28rem] h-[28rem] bg-blue-600 rounded-full blur-3xl opacity-25"></div>
        <div className="absolute bottom-0 left-1/3 w-[18rem] h-[18rem] bg-pink-500 rounded-full blur-3xl opacity-20"></div>
      </div>

      {/* Center Card */}
      <div
        className="
          relative z-10 
          w-full max-w-md 
          mx-4 sm:mx-0 
          bg-white/10 backdrop-blur-xl 
          border border-white/20 
          rounded-2xl shadow-2xl 
          p-8 sm:p-10 text-center
        "
      >
        {/* Lock Icon */}
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

        {/* Heading */}
        <h2 className="mt-6 text-3xl font-bold text-white">Reset Password</h2>
        <p className="mt-3 text-gray-300 text-sm">
          Enter your new password below and confirm to continue.
        </p>

        {/* Form */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="mt-8 text-left space-y-5"
        >
          {/* New Password */}
          <div>
            <label className="block text-sm font-medium text-gray-200 mb-1">
              New Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                {...register("newPassword")}
                placeholder="••••••••"
                className={`w-full px-4 py-3 rounded-lg bg-white/10 border text-base ${
                  errors.newPassword ? "border-red-500" : "border-white/30"
                } text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500`}
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-3 h-full text-gray-300 hover:text-white"
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
            <label className="block text-sm font-medium text-gray-200 mb-1">
              Confirm Password
            </label>
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                {...register("confirmPassword")}
                placeholder="••••••••"
                className={`w-full px-4 py-3 rounded-lg bg-white/10 border text-base ${
                  errors.confirmPassword ? "border-red-500" : "border-white/30"
                } text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500`}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword((prev) => !prev)}
                className="absolute right-3 h-full text-gray-300 hover:text-white"
              >
                {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            {errors.confirmPassword && (
              <p className="text-red-400 text-sm mt-1">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-lg shadow-lg transition disabled:opacity-50"
            >
              {isSubmitting ? "Resetting..." : "Reset Password"}
            </button>
          </div>
        </form>

        {/* Footer */}
        <p className="mt-6 text-sm text-gray-400">
          Remember your password?{" "}
          <button
            onClick={() => navigate("/login")}
            className="text-purple-400 hover:text-purple-300 underline"
          >
            Go to Login
          </button>
        </p>
      </div>
    </section>
  );
}
