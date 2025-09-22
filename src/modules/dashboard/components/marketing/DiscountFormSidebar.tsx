// components/discounts/DiscountFormSidebar.tsx
import React from "react";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { X } from "lucide-react";

// ----------------- Schema -----------------
const discountSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(1, "Discount name is required"),
  description: z.string().optional(),
  value: z
    .string()
    .min(1, "Discount value is required")
    .refine((val) => !isNaN(Number(val)), {
      message: "Value must be numeric",
    }),
  type: z.string(),
  startDate: z.string().min(1, "Start date is required"),
  endDate: z.string().min(1, "End date is required"),
  products: z.array(z.string()).optional(),
});

export type DiscountForm = z.infer<typeof discountSchema>;

export interface Discount {
  id: string;
  dateCreated: string;
  name: string;
  description: string;
  value: string; // percentage or fixed (e.g. "20")
  type: "percentage" | "fixed";
}

// Dummy product list
const mockProducts = [
  { id: "p1", name: "Product One" },
  { id: "p2", name: "Product Two" },
  { id: "p3", name: "Product Three" },
];

interface DiscountFormSidebarProps {
  discount?: DiscountForm;
  onClose: () => void;
  onSave: (updatedDiscount: DiscountForm) => void;
}

// ----------------- Component -----------------
export default function DiscountFormSidebar({
  discount,
  onClose,
  onSave,
}: DiscountFormSidebarProps) {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<DiscountForm>({
    resolver: zodResolver(discountSchema) as any,
    defaultValues: discount || {
      type: "percentage",
      products: [],
    },
  });

  const onSubmit = (data: DiscountForm) => {
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
          <h2 className="text-2xl font-semibold">
            {discount ? "Edit Discount" : "Add Discount"}
          </h2>
          <button onClick={onClose}>
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Content */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex-1 overflow-y-auto p-6 space-y-6"
          id="edit-discount-form"
        >
          {/* Discount Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Discount Name
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
                  placeholder="Enter discount name"
                />
              )}
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
            )}
          </div>

          {/* Discount Description */}
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
                  placeholder="Enter description"
                />
              )}
            />
          </div>

          {/* Discount Value */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Discount Value
            </label>
            <Controller
              name="value"
              control={control}
              render={({ field }) => (
                <input
                  {...field}
                  type="number"
                  className={`w-full px-3 py-2 border rounded-md ${
                    errors.value ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="Enter discount value"
                />
              )}
            />
            {errors.value && (
              <p className="text-red-500 text-sm mt-1">
                {errors.value.message}
              </p>
            )}
          </div>

          {/* Discount Type */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Discount Type
            </label>
            <Controller
              name="type"
              control={control}
              render={({ field }) => (
                <select
                  {...field}
                  className="w-full px-3 py-2 border rounded-md border-gray-300"
                >
                  <option value="percentage">Percentage</option>
                  <option value="fixed">Fixed</option>
                </select>
              )}
            />
          </div>

          {/* Start Date */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Start Date
            </label>
            <Controller
              name="startDate"
              control={control}
              render={({ field }) => (
                <input
                  {...field}
                  type="date"
                  className={`w-full px-3 py-2 border rounded-md ${
                    errors.startDate ? "border-red-500" : "border-gray-300"
                  }`}
                />
              )}
            />
            {errors.startDate && (
              <p className="text-red-500 text-sm mt-1">
                {errors.startDate.message}
              </p>
            )}
          </div>

          {/* End Date */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              End Date
            </label>
            <Controller
              name="endDate"
              control={control}
              render={({ field }) => (
                <input
                  {...field}
                  type="date"
                  className={`w-full px-3 py-2 border rounded-md ${
                    errors.endDate ? "border-red-500" : "border-gray-300"
                  }`}
                />
              )}
            />
            {errors.endDate && (
              <p className="text-red-500 text-sm mt-1">
                {errors.endDate.message}
              </p>
            )}
          </div>

          {/* Apply to Products */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Apply To Products
            </label>
            <Controller
              name="products"
              control={control}
              render={({ field }) => (
                <select
                  {...field}
                  multiple
                  className="w-full px-3 py-2 border rounded-md border-gray-300 h-32"
                >
                  {mockProducts.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.name}
                    </option>
                  ))}
                </select>
              )}
            />
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
            form="edit-discount-form"
            className="px-6 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}
