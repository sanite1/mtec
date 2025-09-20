// components/shipping/AddPickupLocationModal.tsx
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

// 🟣 Schema
const pickupLocationSchema = z.object({
  storeLocation: z.string().min(1, "Store Location is required"),
  locationName: z.string().optional(),
  contactPhone: z.string().min(1, "Contact Phone is required"),
  country: z.string().min(1, "Country is required"),
  state: z.string().min(1, "State is required"),
  city: z.string().min(1, "City is required"),
  address: z.string().min(1, "Address is required"),
});

type PickupLocationForm = z.infer<typeof pickupLocationSchema>;

interface AddPickupLocationModalProps {
  onClose: () => void;
  onConfirm: (data: PickupLocationForm) => void;
}

export default function AddPickupLocationModal({
  onClose,
  onConfirm,
}: AddPickupLocationModalProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PickupLocationForm>({
    resolver: zodResolver(pickupLocationSchema),
  });

  const onSubmit = (data: PickupLocationForm) => {
    console.log("Pickup Location Submitted:", data);
    onConfirm(data);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      ></div>

      {/* Modal */}
      <div className="relative bg-white w-full max-w-xl rounded-xl shadow-lg z-10 mx-4 flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-6 border-b sticky top-0 bg-white rounded-t-xl">
          <h3 className="text-lg font-semibold text-gray-800">
            Add Pickup Location
          </h3>
        </div>

        {/* Scrollable Form */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex-1 overflow-y-auto p-6 space-y-4"
        >
          {/* Grid row for Store Location + Location Name */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Store Location *
              </label>
              <input
                type="text"
                {...register("storeLocation")}
                className="w-full mt-1 p-2 border rounded-lg focus:ring-purple-500 focus:border-purple-500 text-base"
              />
              {errors.storeLocation && (
                <p className="text-sm text-red-500">
                  {errors.storeLocation.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Location Name (Optional)
              </label>
              <input
                type="text"
                {...register("locationName")}
                className="w-full mt-1 p-2 border rounded-lg focus:ring-purple-500 focus:border-purple-500 text-base"
              />
            </div>
          </div>

          {/* Contact Phone */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Contact Phone *
            </label>
            <input
              type="text"
              {...register("contactPhone")}
              className="w-full mt-1 p-2 border rounded-lg focus:ring-purple-500 focus:border-purple-500 text-base"
            />
            {errors.contactPhone && (
              <p className="text-sm text-red-500">
                {errors.contactPhone.message}
              </p>
            )}
          </div>

          {/* Country */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Country *
            </label>
            <input
              type="text"
              {...register("country")}
              className="w-full mt-1 p-2 border rounded-lg focus:ring-purple-500 focus:border-purple-500 text-base"
            />
            {errors.country && (
              <p className="text-sm text-red-500">{errors.country.message}</p>
            )}
          </div>

          {/* State */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              State *
            </label>
            <input
              type="text"
              {...register("state")}
              className="w-full mt-1 p-2 border rounded-lg focus:ring-purple-500 focus:border-purple-500 text-base"
            />
            {errors.state && (
              <p className="text-sm text-red-500">{errors.state.message}</p>
            )}
          </div>

          {/* City */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              City *
            </label>
            <input
              type="text"
              {...register("city")}
              className="w-full mt-1 p-2 border rounded-lg focus:ring-purple-500 focus:border-purple-500 text-base"
            />
            {errors.city && (
              <p className="text-sm text-red-500">{errors.city.message}</p>
            )}
          </div>

          {/* Address */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Address *
            </label>
            <textarea
              {...register("address")}
              className="w-full mt-1 p-2 border rounded-lg focus:ring-purple-500 focus:border-purple-500 text-base"
            />
            {errors.address && (
              <p className="text-sm text-red-500">{errors.address.message}</p>
            )}
          </div>
        </form>

        {/* Footer */}
        <div className="p-6 border-t sticky bottom-0 bg-white rounded-b-xl flex justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-lg border text-gray-700 hover:bg-gray-100 transition"
          >
            Cancel
          </button>
          <button
            type="submit"
            form="pickup-form"
            className="px-4 py-2 rounded-lg bg-purple-600 text-white hover:bg-purple-700 transition"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
