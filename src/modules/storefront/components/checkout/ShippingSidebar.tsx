// components/payouts/BankDetailsSidebar.tsx
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { X } from "lucide-react";
import { ShippingAddress } from "../../lib/types/orders";

// ✅ Schema
const shippingSchema = z.object({
  fullName: z.string().min(2, "Full name is required"),
  phone: z.string().min(2, "Phone number is required"),
  email: z.string().min(2, "Email is required"),
  addressLine1: z.string().min(2, "Address is required"),
  addressLine2: z.string().optional(),
  city: z.string().min(2, "City is required"),
  state: z.string().min(2, "State is required"),
  country: z.string().min(2, "Country is required"),
});

type ShippingFormData = z.infer<typeof shippingSchema>;

interface BankDetailsSidebarProps {
  onClose: () => void;
  onSave: (data: ShippingFormData) => void;
  isPending?: boolean;
  details: ShippingAddress | null;
}

// ✅ Main Sidebar Component
export default function ShippingAddressSidebar({
  onClose,
  onSave,
  isPending,
  details,
}: BankDetailsSidebarProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<ShippingFormData>({
    resolver: zodResolver(shippingSchema),
    defaultValues: details
      ? {
          fullName: details?.fullName,
          phone: details?.phone,
          email: details?.email,
          addressLine1: details?.addressLine1,
          addressLine2: details?.addressLine2,
          city: details?.city,
          state: details?.state,
          country: details?.country,
        }
      : {},
  });

  const onSubmit = (data: ShippingFormData) => {
    onSave(data);
    // onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex">
      {/* Overlay */}
      <div
        className="flex-1 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      ></div>

      {/* Sidebar */}
      <div className="w-full sm:w-1/3 bg-white h-full shadow-2xl flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-lg font-semibold">Shipping Details</h2>
          <button onClick={onClose}>
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Content */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex-1 overflow-y-auto p-6 space-y-5"
          id="bank-details-form"
        >
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Full name
            </label>
            <input
              {...register("fullName")}
              className={`mt-1 block w-full border rounded px-3 py-2 ${
                errors.fullName ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Enter full name"
            />
            {errors.fullName && (
              <p className="text-red-500 text-sm mt-1">
                {errors.fullName.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Phone Number
            </label>
            <input
              {...register("phone")}
              className={`mt-1 block w-full border rounded px-3 py-2 ${
                errors.phone ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Enter phone number"
            />
            {errors.phone && (
              <p className="text-red-500 text-sm mt-1">
                {errors.phone.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email Address
            </label>
            <input
              {...register("email")}
              className={`mt-1 block w-full border rounded px-3 py-2 ${
                errors.email ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Enter email address"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Address Line 1
            </label>
            <input
              {...register("addressLine1")}
              className={`mt-1 block w-full border rounded px-3 py-2 ${
                errors.addressLine1 ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Enter address line 1"
            />
            {errors.addressLine1 && (
              <p className="text-red-500 text-sm mt-1">
                {errors.addressLine1.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Address Line 2
            </label>
            <input
              {...register("addressLine2")}
              className={`mt-1 block w-full border rounded px-3 py-2 ${
                errors.addressLine2 ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Enter address line 2"
            />
            {errors.addressLine2 && (
              <p className="text-red-500 text-sm mt-1">
                {errors.addressLine2.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              City
            </label>
            <input
              {...register("city")}
              className={`mt-1 block w-full border rounded px-3 py-2 ${
                errors.city ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Enter city"
            />
            {errors.city && (
              <p className="text-red-500 text-sm mt-1">{errors.city.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              State
            </label>
            <input
              {...register("state")}
              className={`mt-1 block w-full border rounded px-3 py-2 ${
                errors.state ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Enter state"
            />
            {errors.state && (
              <p className="text-red-500 text-sm mt-1">
                {errors.state.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Country
            </label>
            <input
              {...register("country")}
              className={`mt-1 block w-full border rounded px-3 py-2 ${
                errors.country ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Enter country"
            />
            {errors.country && (
              <p className="text-red-500 text-sm mt-1">
                {errors.country.message}
              </p>
            )}
          </div>
        </form>

        {/* Footer */}
        <div className="p-4 border-t flex justify-end gap-3 bg-white sticky bottom-0">
          <button
            onClick={onClose}
            className="px-4 py-2 border rounded hover:bg-gray-50"
            type="button"
          >
            Cancel
          </button>
          <button
            type="submit"
            form="bank-details-form"
            disabled={isPending}
            className={`px-4 py-2 rounded-lg bg-purple-600 text-white flex items-center justify-center gap-2 transition ${
              isPending
                ? "opacity-75 cursor-not-allowed"
                : "hover:bg-purple-700"
            }`}
          >
            {isPending && (
              <svg
                className="animate-spin h-4 w-4 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                ></path>
              </svg>
            )}
            {isPending ? "Saving..." : "Save Shipping Details"}
          </button>
        </div>
      </div>
    </div>
  );
}
