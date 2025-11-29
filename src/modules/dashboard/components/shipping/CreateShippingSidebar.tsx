import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { X } from "lucide-react";
import { useCreateShipping } from "../../lib/api/shipping";
import { getDecodedJwt } from "../../lib/auth";
import StoreSelector from "../../lib/utils/StoreSelector";
import { Location } from "../../lib/types/locations";

// ----------------- Schema -----------------
const shippingSchema = z.object({
  name: z.string().min(1, "Location name is required"),
  description: z.string().optional(),
  price: z
    .string()
    .min(1, "Shipping price is required")
    .refine((val) => !isNaN(Number(val)), {
      message: "Shipping price must be a number",
    }),
  estimatedDeliveryDays: z
    .string()
    .min(1, "Estimated Delivery Days is required")
    .refine((val) => !isNaN(Number(val)), {
      message: "Estimated Delivery Days must be a number",
    }),
});

export type ShippingForm = z.infer<typeof shippingSchema>;

interface CreateShippingSidebarProps {
  onClose: () => void;
}

// ----------------- Component -----------------
export default function CreateShippingSidebar({
  onClose,
}: CreateShippingSidebarProps) {
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ShippingForm>({
    resolver: zodResolver(shippingSchema),
  });

  const [LocationModalOpen, setLocationModalOpen] = useState(false);
  const [location, setLocation] = useState<Location>();

  const userId = getDecodedJwt()?.id;
  const { mutate: createShipping, isPending } = useCreateShipping();

  const onSelectLocation = (location: Location) => {
    setLocation(location);
  };

  const onSubmit = (data: ShippingForm) => {
    // Replace with actual logged-in user ID (e.g. from auth context or redux)
    const payload = {
      ...data,
      price: Number(data.price),
      locationName: location?.name,
      location: location?._id,
      userId: userId, // ✅ include userId
    };
    createShipping(payload, {
      onSuccess: () => {
        reset();
        onClose();
      },
    });
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
          <h2 className="text-2xl font-semibold">Create Shipping Option</h2>
          <button onClick={onClose}>
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Content */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex-1 overflow-y-auto p-6 space-y-6"
          id="create-shipping-form"
        >
          {/* Shipping Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Shipping Name
            </label>
            <Controller
              name="name"
              control={control}
              render={({ field }) => (
                <input
                  {...field}
                  type="text"
                  className={`w-full px-3 py-2 border rounded-md ${
                    errors.name ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="Enter shipping name"
                />
              )}
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
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

          {/* Shipping price */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Shipping price
            </label>
            <Controller
              name="price"
              control={control}
              render={({ field }) => (
                <input
                  {...field}
                  type="number"
                  className={`w-full px-3 py-2 border rounded-md ${
                    errors.price ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="Enter price (₦)"
                />
              )}
            />
            {errors.price && (
              <p className="text-red-500 text-sm mt-1">
                {errors.price.message}
              </p>
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

          <button
            type="button"
            onClick={() => setLocationModalOpen(true)}
            className="px-5 py-2 rounded-lg bg-purple-600 text-white hover:bg-purple-700 transition disabled:opacity-50"
          >
            Select Store Location
          </button>

          {location && (
            <div>
              <div className="flex justify-between items-center bg-gray-50 border border-gray-200 p-3 rounded-lg">
                <div>
                  <p className="font-medium text-gray-800">{location.name}</p>
                  {/* <p className="text-sm text-gray-600">₦{p.price ?? 0}</p> */}
                </div>
              </div>
            </div>
          )}
        </form>

        {/* Footer */}
        <div className="p-4 border-t flex justify-end gap-3 bg-white sticky bottom-0">
          <button
            onClick={onClose}
            className="px-4 py-2 border rounded hover:bg-gray-50"
            type="button"
            disabled={isPending}
          >
            Cancel
          </button>
          <button
            type="submit"
            form="create-shipping-form"
            disabled={isPending}
            className={`px-6 py-2 rounded text-white font-medium ${
              isPending
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-purple-600 hover:bg-purple-700"
            }`}
          >
            {isPending ? "Creating..." : "Create"}
          </button>
        </div>

        <StoreSelector
          open={LocationModalOpen}
          onClose={() => setLocationModalOpen(false)}
          onSelect={(loc) => onSelectLocation(loc)}
        />
      </div>
    </div>
  );
}
