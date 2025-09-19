// components/shipping/EditShippingSidebar.tsx
import React from "react";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { X } from "lucide-react";

// ----------------- Schema -----------------
const shippingSchema = z.object({
  id: z.string().optional(),
  dateCreated: z.string().optional(), // not editable
  locationName: z.string().min(1, "Location name is required"),
  description: z.string().optional(),
  fee: z
    .string()
    .min(1, "Shipping fee is required")
    .refine((val) => !isNaN(Number(val)), {
      message: "Shipping fee must be a number",
    }),
});

export type ShippingForm = z.infer<typeof shippingSchema>;

interface EditShippingSidebarProps {
  shipping: ShippingForm;
  onClose: () => void;
  onSave: (updatedShipping: ShippingForm) => void;
}

// ----------------- Component -----------------
export default function EditShippingSidebar({
  shipping,
  onClose,
  onSave,
}: EditShippingSidebarProps) {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ShippingForm>({
    resolver: zodResolver(shippingSchema) as any,
    defaultValues: shipping,
  });

  const onSubmit = (data: ShippingForm) => {
    onSave(data);
    onClose();
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
          <h2 className="text-lg font-semibold">Edit Shipping</h2>
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
          {shipping.dateCreated && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Date Created
              </label>
              <input
                type="text"
                value={shipping.dateCreated}
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
            className="px-6 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}
