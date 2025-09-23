// pages/ProductSettings.tsx
import React, { useState } from "react";
import { Switch } from "@headlessui/react";
import { Save, StickyNote } from "lucide-react";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

// ----------------- Schema -----------------
const productSettingsSchema = z.object({
  productNoteEnabled: z.boolean(),
  productNoteTitle: z.string().optional(),
  productNotePlaceholder: z.string().optional(),
});

type ProductSettingsForm = z.infer<typeof productSettingsSchema>;

// ----------------- Component -----------------
const ProductSettings: React.FC = () => {
  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<ProductSettingsForm>({
    resolver: zodResolver(productSettingsSchema),
    defaultValues: {
      productNoteEnabled: false,
      productNoteTitle: "",
      productNotePlaceholder: "",
    },
  });

  const productNoteEnabled = watch("productNoteEnabled");

  const onSubmit = (data: ProductSettingsForm) => {
    console.log("Product Settings Submitted:", data);
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900">
          Storefront Settings
        </h1>
        <p className="text-gray-600 mt-2 text-sm sm:text-base lg:text-lg">
          Customize how product notes appear on your storefront.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        {/* Product Note Toggle */}
        <div className="bg-white rounded-xl shadow p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h2 className="text-base sm:text-lg font-semibold text-gray-800">
              Product Note
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              Allow customers to add a note to products before checkout.
            </p>
          </div>
          <Controller
            name="productNoteEnabled"
            control={control}
            render={({ field }) => (
              <Switch
                checked={field.value}
                onChange={field.onChange}
                className={`${
                  field.value ? "bg-purple-600" : "bg-gray-300"
                } relative inline-flex h-6 w-11 shrink-0 items-center rounded-full transition`}
              >
                <span
                  className={`${
                    field.value ? "translate-x-6" : "translate-x-1"
                  } inline-block h-4 w-4 transform rounded-full bg-white transition`}
                />
              </Switch>
            )}
          />
        </div>

        {/* Conditional Fields */}
        {productNoteEnabled && (
          <div className="bg-white rounded-xl shadow p-4 sm:p-5 space-y-6">
            {/* Product Note Title */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Product Note Title
              </label>
              <Controller
                name="productNoteTitle"
                control={control}
                render={({ field }) => (
                  <input
                    {...field}
                    type="text"
                    className={`w-full border rounded-md px-3 py-2 text-gray-700 focus:ring-2 focus:ring-purple-500 text-sm ${
                      errors.productNoteTitle
                        ? "border-red-500"
                        : "border-gray-300"
                    }`}
                    placeholder="Customize the note title (e.g. 'Add Note')"
                  />
                )}
              />
              {errors.productNoteTitle && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.productNoteTitle.message}
                </p>
              )}
            </div>

            {/* Product Note Placeholder */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Product Note Placeholder
              </label>
              <Controller
                name="productNotePlaceholder"
                control={control}
                render={({ field }) => (
                  <input
                    {...field}
                    type="text"
                    className={`w-full border rounded-md px-3 py-2 text-gray-700 focus:ring-2 focus:ring-purple-500 text-sm ${
                      errors.productNotePlaceholder
                        ? "border-red-500"
                        : "border-gray-300"
                    }`}
                    placeholder="Default placeholder for note field"
                  />
                )}
              />
              {errors.productNotePlaceholder && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.productNotePlaceholder.message}
                </p>
              )}
            </div>
          </div>
        )}

        {/* Save Button */}
        <div className="mt-8 flex justify-end">
          <button
            type="submit"
            className="w-full sm:w-auto px-6 py-3 bg-purple-600 text-white rounded-lg flex items-center justify-center gap-2 hover:bg-purple-700 transition"
          >
            <Save size={18} /> Save Changes
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProductSettings;
