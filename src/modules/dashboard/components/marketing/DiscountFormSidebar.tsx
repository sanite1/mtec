// components/discounts/DiscountFormSidebar.tsx
import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { PlusCircle, X } from "lucide-react";
import { Discount, DiscountPayload } from "../../lib/types/discount";
import SelectProductsDialog from "../../lib/utils/SelectProductsDialog";
import { Location } from "../../lib/types/locations";
import StoreSelector from "../../lib/utils/StoreSelector";
import { ConvertPriceRangeToLocale } from "../../lib/utils/utils";

// ----------------- Schema -----------------
const discountSchema = z.object({
  id: z.string().optional(),
  discountName: z.string().min(2, "Discount name is required"),
  description: z.string().min(1, "Discount description is required"),
  discountValue: z
    .string()
    .min(1, "Discount value is required")
    .refine((val) => !isNaN(Number(val)), {
      message: "Value must be numeric",
    }),
  discountType: z.string(),
  startDate: z.string().min(1, "Start date is required"),
  endDate: z.string().min(1, "End date is required"),
  products: z
    .array(
      z.object({
        productId: z.string().optional(),
        name: z.string().optional(),
        price: z.string().optional(),
      }),
    )
    .optional(),
});

export type DiscountForm = z.infer<typeof discountSchema>;

interface DiscountFormSidebarProps {
  discount?: Discount;
  loading?: boolean;
  onClose: () => void;
  onSave: (updatedDiscount: DiscountPayload) => void;
}

// ----------------- Component -----------------
export default function DiscountFormSidebar({
  discount,
  onClose,
  onSave,
  loading,
}: DiscountFormSidebarProps) {
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedProducts, setSelectedProducts] = useState<
    | {
        productId?: string;
        variationId?: string;
        name?: string;
        price?: string;
      }[]
    | undefined
  >(discount?.products);
  const [LocationModalOpen, setLocationModalOpen] = useState(false);
  const [location, setLocation] = useState<{
    name: string;
    _id: string;
  } | null>(
    (discount && {
      name: discount?.locationName || "",
      _id: discount?.location || "",
    }) ||
      null,
  );
  const onSelectLocation = (location: Location) => {
    setLocation({ name: location.name, _id: location._id });
  };

  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<DiscountForm>({
    resolver: zodResolver(discountSchema) as any,
    defaultValues: (discount && {
      discountName: discount?.discountName,
      description: discount?.description,
      discountValue: String(discount?.discountValue),
      discountType: discount?.discountType,
      startDate: discount?.startDate,
      endDate: discount?.endDate,
      products: discount?.products,
    }) || {
      discountType: "percentage",
      products: [],
    },
  });

  const onSubmit = (data: DiscountForm) => {
    const payload = {
      ...data,
      discountValue: Number(data.discountValue),
      locationName: location?.name || "",
      location: location?._id || "",
    };

    onSave(payload);
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
              Discount Name / Code
            </label>
            <Controller
              name="discountName"
              control={control}
              render={({ field }) => (
                <input
                  {...field}
                  type="text"
                  className={`w-full px-3 py-2 border rounded-md ${
                    errors.discountName ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="Eg: CHRISTMAS2026"
                />
              )}
            />
            {errors.discountName && (
              <p className="text-red-500 text-sm mt-1">
                {errors.discountName.message}
              </p>
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
            {errors.description && (
              <p className="text-red-500 text-sm mt-1">
                {errors.description.message}
              </p>
            )}
          </div>

          {/* Discount Value */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Discount Value
            </label>
            <Controller
              name="discountValue"
              control={control}
              render={({ field }) => (
                <input
                  {...field}
                  type="number"
                  className={`w-full px-3 py-2 border rounded-md ${
                    errors.discountValue ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="Enter discount value"
                />
              )}
            />
            {errors.discountValue && (
              <p className="text-red-500 text-sm mt-1">
                {errors.discountValue.message}
              </p>
            )}
          </div>

          {/* Discount Type */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Discount Type
            </label>
            <Controller
              name="discountType"
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
          {/* <div>
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
          </div> */}
          <section className="space-y-3">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-medium text-gray-700">Products</h2>

              <button
                type="button"
                onClick={() => setOpenDialog(true)}
                className="text-sm text-purple-600 hover:text-purple-700 font-medium transition"
              >
                Select
              </button>
            </div>

            {selectedProducts && selectedProducts.length > 0 ? (
              <div className="divide-y rounded-lg border border-gray-200 bg-gray-50">
                {selectedProducts.map((p) => (
                  <div
                    key={p.productId}
                    className="flex items-center justify-between px-4 py-3"
                  >
                    <div className="leading-tight">
                      <p className="text-sm font-medium text-gray-800">
                        {p.name}
                      </p>
                      <p className="text-xs text-gray-500">
                        {ConvertPriceRangeToLocale(p.price) || "0"}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="rounded-lg border border-dashed border-gray-300 px-4 py-3 text-sm text-gray-500">
                No products selected
              </div>
            )}
          </section>

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
            form="edit-discount-form"
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
        </div>

        <SelectProductsDialog
          open={openDialog}
          onClose={() => setOpenDialog(false)}
          onSave={(selected) => {
            setSelectedProducts(selected);
            console.log(selected);

            setValue(
              "products",
              selected.map((item) => {
                return {
                  productId: item.productId,
                  variationId: item.variationId,
                  name: item.name,
                  price: item.price,
                };
              }),
            );
          }}
        />

        <StoreSelector
          open={LocationModalOpen}
          onClose={() => setLocationModalOpen(false)}
          onSelect={(loc) => onSelectLocation(loc)}
        />
      </div>
    </div>
  );
}
