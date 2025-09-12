import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

interface ChangePasswordModalProps {
  onClose: () => void;
  onSave: (oldPass: string, newPass: string, confirmPass: string) => void;
}

const passwordSchema = z
  .object({
    oldPassword: z.string().min(1, "Old password is required"),
    newPassword: z
      .string()
      .min(6, "New password must be at least 6 characters"),
    confirmPassword: z.string().min(1, "Confirm password is required"),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type PasswordFormData = z.infer<typeof passwordSchema>;

export default function ChangePasswordModal({
  onClose,
  onSave,
}: ChangePasswordModalProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PasswordFormData>({
    resolver: zodResolver(passwordSchema),
  });

  const onSubmit = (data: PasswordFormData) => {
    onSave(data.oldPassword, data.newPassword, data.confirmPassword);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Background Blur */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      ></div>

      {/* Modal Content */}
      <div className="relative bg-white w-full max-w-md rounded-xl shadow-lg p-6 z-10">
        <h3 className="text-lg font-semibold text-gray-800">Change Password</h3>
        <p className="text-sm text-gray-500 mt-2">
          Please enter your old password and a new password.
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="mt-4 space-y-4">
          {/* Old Password */}
          <div>
            <input
              type="password"
              placeholder="Old Password"
              {...register("oldPassword")}
              className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            {errors.oldPassword && (
              <p className="text-xs text-red-500 mt-1">
                {errors.oldPassword.message}
              </p>
            )}
          </div>

          {/* New Password */}
          <div>
            <input
              type="password"
              placeholder="New Password"
              {...register("newPassword")}
              className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            {errors.newPassword && (
              <p className="text-xs text-red-500 mt-1">
                {errors.newPassword.message}
              </p>
            )}
          </div>

          {/* Confirm Password */}
          <div>
            <input
              type="password"
              placeholder="Confirm New Password"
              {...register("confirmPassword")}
              className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            {errors.confirmPassword && (
              <p className="text-xs text-red-500 mt-1">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

          {/* Buttons */}
          <div className="mt-6 flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg border text-gray-700 hover:bg-gray-100 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-lg bg-purple-600 text-white hover:bg-purple-700 transition"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
