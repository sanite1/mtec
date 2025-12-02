// components/taxes/EditTaxSidebar.tsx
import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { X } from "lucide-react";
import { Tax, TaxPayload } from "../../lib/types/taxes";
import StoreSelector from "../../lib/utils/StoreSelector";
import { Location } from "../../lib/types/locations";

// ----------------- Schema -----------------
const taxSchema = z.object({
  name: z.string().min(1, "Tax name is required"),
  applyToCheckout: z.boolean(),
  rate: z
    .string()
    .min(1, "Tax rate is required")
    .refine((val) => !isNaN(Number(val)), {
      message: "Tax rate must be a number",
    }),
  description: z.string().optional(),
});

export type TaxForm = z.infer<typeof taxSchema>;

interface EditTaxSidebarProps {
  tax?: Tax; // existing tax (optional)
  onClose: () => void;
  onSave: (updatedTax: TaxPayload) => void;
  loading?: boolean;
}

// ----------------- Component -----------------
export default function EditTaxSidebar({
  tax,
  onClose,
  onSave,
  loading = false,
}: EditTaxSidebarProps) {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<TaxForm>({
    resolver: zodResolver(taxSchema) as any,
    defaultValues: {
      name: tax?.name,
      rate: String(tax?.rate),
      description: tax?.description,
      applyToCheckout: tax?.applyToCheckout,
    },
  });
  const [LocationModalOpen, setLocationModalOpen] = useState(false);

  const [location, setLocation] = useState<{
    name: string;
    _id: string;
  } | null>(
    (tax && {
      name: tax?.locationName || "",
      _id: tax?.location || "",
    }) ||
      null,
  );
  const onSelectLocation = (location: Location) => {
    setLocation({ name: location.name, _id: location._id });
  };

  const onSubmit = (data: TaxForm) => {
    const payload = {
      name: data.name,
      description: data.description || undefined,
      rate: Number(data.rate),
      locationName: location?.name || "",
      location: location?._id || "",
      applyToCheckout: data.applyToCheckout,
    };
    onSave(payload);
    // onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex">
      {/* Overlay */}
      <div className="flex-1 bg-black/50 backdrop-blur-sm" onClick={onClose} />

      {/* Sidebar */}
      <div className="w-full sm:w-1/3 bg-white h-full shadow-2xl flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-lg font-semibold">
            {tax ? "Edit Tax" : "Create Tax"}
          </h2>
          <button onClick={onClose}>
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Content */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex-1 overflow-y-auto p-6 space-y-6"
          id="edit-tax-form"
        >
          {/* Tax Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Tax Name
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
                  placeholder="Enter tax name"
                />
              )}
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
            )}
          </div>

          {/* Tax Rate */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Tax Rate (%)
            </label>
            <Controller
              name="rate"
              control={control}
              render={({ field }) => (
                <input
                  {...field}
                  type="number"
                  step="0.01"
                  className={`w-full px-3 py-2 border rounded-md ${
                    errors.rate ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="Enter tax rate (e.g. 7.5)"
                />
              )}
            />
            {errors.rate && (
              <p className="text-red-500 text-sm mt-1">{errors.rate.message}</p>
            )}
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <Controller
              name="description"
              control={control}
              render={({ field }) => (
                <textarea
                  {...field}
                  rows={3}
                  className="w-full px-3 py-2 border rounded-md border-gray-300"
                  placeholder="Optional description"
                />
              )}
            />
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

          <div className="">
            {/* <h3 className="font-semibold mb-3">Newsletter</h3> */}
            <label className="flex items-center gap-2 mb-3">
              <Controller
                name="applyToCheckout"
                control={control}
                render={({ field }) => (
                  <input
                    type="checkbox"
                    checked={!!field.value}
                    onChange={(e) => field.onChange(e.target.checked)}
                  />
                )}
              />
              <span className="text-sm">Apply this tax to checkout</span>
            </label>
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
            form="edit-tax-form"
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
