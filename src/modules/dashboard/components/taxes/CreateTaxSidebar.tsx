import React from "react";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { X } from "lucide-react";
import { Switch } from "@headlessui/react";

// ✅ Schema
const taxSchema = z.object({
  id: z.string().optional(),
  taxName: z.string().min(1, "Tax name is required"),
  rate: z
    .string()
    .min(1, "Tax rate is required")
    .refine((val) => !isNaN(Number(val)), {
      message: "Tax rate must be a number",
    }),
  description: z.string().optional(),
  isActive: z.boolean().default(true),
});

export type TaxForm = z.infer<typeof taxSchema>;

interface CreateTaxSidebarProps {
  onClose: () => void;
  onSave: (taxData: TaxForm) => void;
}

export default function CreateTaxSidebar({
  onClose,
  onSave,
}: CreateTaxSidebarProps) {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<TaxForm>({
    resolver: zodResolver(taxSchema) as any,
    defaultValues: {
      taxName: "",
      rate: "",
      description: "",
      isActive: true,
    },
  });

  const onSubmit = (data: TaxForm) => {
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
          <h2 className="text-lg font-semibold">Create Tax</h2>
          <button onClick={onClose}>
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex-1 overflow-y-auto p-6 space-y-6"
          id="create-tax-form"
        >
          {/* Tax Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Tax Name
            </label>
            <Controller
              name="taxName"
              control={control}
              render={({ field }) => (
                <input
                  {...field}
                  type="text"
                  className={`w-full px-3 py-2 border rounded-md ${
                    errors.taxName ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="Enter tax name (e.g. VAT, Service Tax)"
                />
              )}
            />
            {errors.taxName && (
              <p className="text-red-500 text-sm mt-1">
                {errors.taxName.message}
              </p>
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
                  className={`w-full px-3 py-2 border rounded-md ${
                    errors.rate ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="Enter tax rate"
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

          {/* Active Toggle */}
          <div className="flex items-center gap-2">
            <Controller
              name="isActive"
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
            <span className="text-sm text-gray-700">Active</span>
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
            form="create-tax-form"
            className="px-6 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
          >
            Save Tax
          </button>
        </div>
      </div>
    </div>
  );
}
