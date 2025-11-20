import React from "react";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCreateShipping } from "../../lib/api/shipping";
import { getDecodedJwt } from "../../lib/auth";
import { useNavigate } from "react-router-dom";

// ----------------- Schema -----------------
const shippingSchema = z.object({
  storeLocation: z.string().min(1, "Store location is required"),
  locationName: z.string().min(2, "Location name is required"),
  shippingFee: z.string().min(1, "Shipping fee is required"),
  shippingDescription: z
    .string()
    .min(5, "Description must be at least 5 characters"),

  estimatedDeliveryDays: z
    .string()
    .min(1, "Estimated Delivery Days is required")
    .refine((val) => !isNaN(Number(val)), {
      message: "Estimated Delivery Days must be a number",
    }),
  visibleOnCheckout: z.boolean(),
});

type ShippingFormData = z.infer<typeof shippingSchema>;

export default function ShippingDetailsForm() {
  const navigate = useNavigate();
  const userId = getDecodedJwt()?.id;

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ShippingFormData>({
    resolver: zodResolver(shippingSchema),
    defaultValues: {
      storeLocation: "headquarters",
      visibleOnCheckout: true,
    },
  });

  const { mutate: createShipping, isPending } = useCreateShipping();

  const formatCurrency = (value: string) => {
    if (!value) return "";
    const numberValue = value.replace(/\D/g, "");
    return new Intl.NumberFormat("en-NG").format(Number(numberValue));
  };

  const onSubmit = (data: ShippingFormData) => {
    if (!userId) return;

    const payload = {
      name: data.locationName,
      description: data.shippingDescription,
      price: Number(data.shippingFee.replace(/,/g, "")),
      estimatedDeliveryDays: "3", // ❗ You can add this field to your form later
      location: data.storeLocation,
      userId,
    };

    createShipping(payload, {
      onSuccess: () => {
        navigate("/onboarding");
      },
    });
  };

  return (
    <div className="bg-gradient-to-br flex items-center justify-center py-6">
      <div className="w-full max-w-3xl bg-white shadow-xl rounded-2xl p-8">
        <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">
          Shipping Details
        </h2>
        <p className="text-center text-gray-500 mb-8 text-sm">
          Define your shipping rules to give customers a smooth checkout
          experience.
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          {/* Store Location */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Store Location
            </label>
            <select
              {...register("storeLocation")}
              className="block w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-purple-500 focus:outline-none sm:text-sm bg-white"
            >
              <option value="headquarters">Headquarters</option>
            </select>
            {errors.storeLocation && (
              <p className="text-red-500 text-sm mt-1">
                {errors.storeLocation.message}
              </p>
            )}
          </div>

          {/* Location Name */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Location Name
            </label>
            <input
              type="text"
              {...register("locationName")}
              placeholder="e.g. Lagos Mainland"
              className="block w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-purple-500 focus:outline-none sm:text-sm"
            />
            {errors.locationName && (
              <p className="text-red-500 text-sm mt-1">
                {errors.locationName.message}
              </p>
            )}
          </div>

          {/* Shipping Fee */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Shipping Fee
            </label>
            <Controller
              name="shippingFee"
              control={control}
              render={({ field }) => (
                <div className="relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                    ₦
                  </span>
                  <input
                    type="text"
                    {...field}
                    onChange={(e) =>
                      field.onChange(formatCurrency(e.target.value))
                    }
                    value={field.value || ""}
                    placeholder="Enter fee (e.g. 1,500)"
                    className="block w-full border border-gray-300 rounded-lg pl-8 pr-4 py-2.5 focus:ring-2 focus:ring-purple-500 focus:outline-none sm:text-sm"
                  />
                </div>
              )}
            />
            {errors.shippingFee && (
              <p className="text-red-500 text-sm mt-1">
                {errors.shippingFee.message}
              </p>
            )}
          </div>

          {/* Shipping Description */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Shipping Description
            </label>
            <textarea
              {...register("shippingDescription")}
              rows={3}
              placeholder="Describe the shipping method (e.g., Delivery within 3-5 days)"
              className="block w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-purple-500 focus:outline-none sm:text-sm"
            />
            {errors.shippingDescription && (
              <p className="text-red-500 text-sm mt-1">
                {errors.shippingDescription.message}
              </p>
            )}
          </div>

          {/* Estimated Days (Delivery) */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
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

          {/* Visibility Checkbox */}
          <div className="flex items-center">
            <input
              type="checkbox"
              {...register("visibleOnCheckout")}
              className="h-5 w-5 text-black border-gray-300 rounded focus:ring-black"
            />
            <label className="ml-3 text-sm text-gray-700 font-medium">
              Make this shipping method visible on checkout page
            </label>
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              disabled={isPending}
              className="w-full bg-black text-white py-3 rounded-lg font-medium text-sm shadow hover:bg-gray-900 transition"
            >
              {isPending ? "Saving..." : "Save Shipping Details"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
