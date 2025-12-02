// components/shipping/EditShippingSidebar.tsx
import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { X } from "lucide-react";
import { Shipping } from "../../lib/types/shipping";
import { formatDate } from "../../lib/utils/formatDate";
import StoreSelector from "../../lib/utils/StoreSelector";
import { Location } from "../../lib/types/locations";

// ----------------- Schema -----------------
const shippingSchema = z.object({
  id: z.string().optional(),
  dateCreated: z.string().optional(), // not editable
  locationName: z.string().min(1, "Location name is required"),
  description: z.string().optional(),
  estimatedDeliveryDays: z
    .string()
    .min(1, "Estimated Delivery Days is required")
    .refine((val) => !isNaN(Number(val)), {
      message: "Estimated Delivery Days must be a number",
    }),
  fee: z
    .string()
    .min(1, "Shipping fee is required")
    .refine((val) => !isNaN(Number(val)), {
      message: "Shipping fee must be a number",
    }),
});

export type ShippingForm = z.infer<typeof shippingSchema>;

interface EditShippingSidebarProps {
  shipping: Shipping;
  onClose: () => void;
  onSave: (updatedShipping: any) => void;
  loading?: boolean;
}

// ----------------- Component -----------------
export default function EditShippingSidebar({
  shipping,
  onClose,
  onSave,
  loading = false,
}: EditShippingSidebarProps) {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ShippingForm>({
    resolver: zodResolver(shippingSchema) as any,
    defaultValues: {
      id: shipping._id,
      dateCreated: shipping.createdAt,
      locationName: shipping.name,
      description: shipping.description,
      estimatedDeliveryDays: String(shipping.estimatedDeliveryDays),
      fee: shipping.price.toString(),
    },
  });

  const [LocationModalOpen, setLocationModalOpen] = useState(false);
  const [location, setLocation] = useState<{
    name: string;
    _id: string;
  } | null>(
    (shipping && {
      name: shipping?.locationName || "",
      _id: shipping?.location || "",
    }) ||
      null,
  );
  const onSelectLocation = (location: Location) => {
    setLocation({ name: location.name, _id: location._id });
  };

  const onSubmit = (data: ShippingForm) => {
    const payload = {
      name: data.locationName,
      description: data.description,
      price: data.fee,
      locationName: location?.name || "",
      location: location?._id || "",
    };
    onSave(payload);
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
          <h2 className="text-2xl font-semibold">Edit Shipping</h2>
          <button onClick={onClose}>
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Content */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex-1 overflow-y-auto p-6 space-y-6"
          id="edit-shipping-form"
        >
          {/* Date Created (read-only) */}
          {shipping.createdAt && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Date Created
              </label>
              <input
                type="text"
                value={formatDate(shipping.createdAt)}
                readOnly
                className="w-full px-3 py-2 border rounded-md bg-gray-100 text-gray-500"
              />
            </div>
          )}

          {/* Location Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Location Name
            </label>
            <Controller
              name="locationName"
              control={control}
              render={({ field }) => (
                <input
                  {...field}
                  type="text"
                  className={`w-full px-3 py-2 border rounded-md ${
                    errors.locationName ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="Enter location name"
                />
              )}
            />
            {errors.locationName && (
              <p className="text-red-500 text-sm mt-1">
                {errors.locationName.message}
              </p>
            )}
          </div>

          {/* Shipping Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Shipping Description
            </label>
            <Controller
              name="description"
              control={control}
              render={({ field }) => (
                <textarea
                  {...field}
                  rows={3}
                  className="w-full px-3 py-2 border rounded-md border-gray-300"
                  placeholder="Enter description"
                />
              )}
            />
          </div>

          {/* Shipping Fee */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Shipping Fee
            </label>
            <Controller
              name="fee"
              control={control}
              render={({ field }) => (
                <input
                  {...field}
                  type="number"
                  className={`w-full px-3 py-2 border rounded-md ${
                    errors.fee ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="Enter fee (₦)"
                />
              )}
            />
            {errors.fee && (
              <p className="text-red-500 text-sm mt-1">{errors.fee.message}</p>
            )}
          </div>

          {/* Estimated Days (Delivery) */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Estimated Days (Delivery)
            </label>
            <Controller
              name="estimatedDeliveryDays"
              control={control}
              render={({ field }) => (
                <input
                  {...field}
                  type="string"
                  className={`w-full px-3 py-2 border rounded-md ${
                    errors.estimatedDeliveryDays
                      ? "border-red-500"
                      : "border-gray-300"
                  }`}
                  placeholder="Enter estimated days for delivery"
                />
              )}
            />
            {errors.estimatedDeliveryDays && (
              <p className="text-red-500 text-sm mt-1">
                {errors.estimatedDeliveryDays.message}
              </p>
            )}
          </div>

          <div className="space-y-1">
            {/* Label */}
            <label className="text-sm font-medium text-gray-700">
              Store Location
            </label>

            {/* Selector Field */}
            <div
              onClick={() => setLocationModalOpen(true)}
              className="flex cursor-pointer items-center justify-between rounded-md border border-gray-300 bg-white px-4 py-3 text-sm text-gray-700 hover:border-gray-400 focus:outline-none"
            >
              <span>{location ? location.name : "Select a location"}</span>

              <span className="text-gray-400">▾</span>
            </div>
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
            form="edit-shipping-form"
            disabled={loading}
            className={`px-4 py-2 rounded-lg bg-purple-600 text-white flex items-center justify-center gap-2 transition ${
              loading ? "opacity-75 cursor-not-allowed" : "hover:bg-purple-700"
            }`}
          >
            {loading && (
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
            {loading ? "Saving..." : "Save Changes"}
          </button>

          <StoreSelector
            open={LocationModalOpen}
            onClose={() => setLocationModalOpen(false)}
            onSelect={(loc) => onSelectLocation(loc)}
          />
        </div>
      </div>
    </div>
  );
}
