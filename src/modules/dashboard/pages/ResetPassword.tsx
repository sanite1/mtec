import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";

// ✅ Zod schema
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

const ResetPassword: React.FC = () => {
  const navigate = useNavigate();
  const [showDialog, setShowDialog] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ResetPasswordForm>({
    resolver: zodResolver(resetPasswordSchema),
  });

  const onSubmit = (data: ResetPasswordForm) => {
    console.log("New password set:", data.newPassword);
    setShowDialog(true);

    // Redirect after 4s
    setTimeout(() => {
      navigate("/login");
    }, 4000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow p-8 relative">
        {/* Header */}
        <h2 className="text-2xl font-bold text-center text-gray-800">
          Reset Your Password
        </h2>
        <p className="mt-2 text-sm text-gray-600 text-center">
          Please enter your new password below.
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-5">
          {/* New Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              New Password
            </label>
            <input
              type="password"
              {...register("newPassword")}
              placeholder="Enter new password"
              className={`w-full border rounded-md px-3 py-2 focus:ring-2 focus:ring-purple-500 focus:outline-none ${
                errors.newPassword ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.newPassword && (
              <p className="text-sm text-red-600 mt-1">
                {errors.newPassword.message}
              </p>
            )}
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Confirm Password
            </label>
            <input
              type="password"
              {...register("confirmPassword")}
              placeholder="Confirm new password"
              className={`w-full border rounded-md px-3 py-2 focus:ring-2 focus:ring-purple-500 focus:outline-none ${
                errors.confirmPassword ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.confirmPassword && (
              <p className="text-sm text-red-600 mt-1">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-700 transition disabled:opacity-50"
          >
            {isSubmitting ? "Resetting..." : "Reset Password"}
          </button>
        </form>

        {/* ✅ Success Dialog */}
        {showDialog && (
          <div className="fixed inset-0 z-50 flex items-center justify-center">
            {/* Background Blur */}
            <div
              className="fixed inset-0 bg-black/50 backdrop-blur-sm"
              onClick={() => {
                setShowDialog(false);
              }}
            ></div>

            {/* Modal Content */}
            <div className="relative bg-white w-full max-w-md rounded-xl shadow-lg p-6 z-10 mx-4">
              <h3 className="text-lg font-semibold text-gray-800 my-3">
                Reset Password
              </h3>

              <h3 className="text-lg font-semibold text-green-600">
                ✅ Password Changed Successfully
              </h3>
              <p className="mt-2 text-gray-600">
                Redirecting to login page in 4 seconds...
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ResetPassword;
