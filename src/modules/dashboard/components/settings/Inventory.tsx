// pages/InventorySettings.tsx
import React from "react";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Switch } from "@headlessui/react";
import { Package, AlertTriangle, Eye, Save } from "lucide-react";
import { useUpdateStore } from "../../lib/api/store";
import { IStoreDetails } from "../../lib/types/store";

// ✅ Schema
const inventorySchema = z.object({
  lowStock: z
    .number({
      //   required_error: "Low stock value is required",
      //   invalid_type_error: "Low stock must be a number",
    })
    .min(1, "Low stock must be at least 1"),
  showOutOfStock: z.boolean(),
  showStockCount: z.boolean(),
});

type InventoryFormData = z.infer<typeof inventorySchema>;

const InventorySettings = ({
  storeDetails,
  refetch,
}: {
  storeDetails: IStoreDetails;
  refetch: () => void;
}) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<InventoryFormData>({
    resolver: zodResolver(inventorySchema),
    defaultValues: {
      lowStock: storeDetails.lowStock,
      showOutOfStock: storeDetails.showOutOfStock,
      showStockCount: storeDetails.showStockCount,
    },
  });

  const { mutateAsync: updateStore, isPending } = useUpdateStore();

  const onSubmit = async (data: InventoryFormData) => {
    try {
      console.log("Inventory Settings:", storeDetails?._id, data);
      await updateStore({ storeId: storeDetails?._id, payload: data });
      refetch();
    } catch (error) {
      console.error("Store update failed:", error);
    }
  };

  // const onSubmit = (data: InventoryFormData) => {
  // };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-8 text-center">
        <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900">
          Stock Reduction Settings
        </h1>
        <p className="text-gray-600 mt-2 text-sm sm:text-base lg:text-md">
          Manage your stock settings and how products are displayed when stock
          runs low or runs out.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        {/* Low Stock */}
        <div className="bg-white rounded-xl shadow p-4 sm:p-5">
          <div className="flex items-start sm:items-center gap-3 mb-3">
            <AlertTriangle className="text-purple-600 shrink-0" size={22} />
            <div>
              <h3 className="font-semibold text-gray-800 text-base sm:text-lg">
                Low Stock
              </h3>
              <p className="text-sm text-gray-500">
                Set the number of items that will trigger a low stock alert.
              </p>
            </div>
          </div>
          <Controller
            name="lowStock"
            control={control}
            render={({ field }) => (
              <input
                {...field}
                type="number"
                onChange={(e) => field.onChange(Number(e.target.value))}
                value={field.value}
                className={`w-full border rounded-md px-3 py-2 text-gray-700 focus:ring-2 focus:ring-purple-500 text-sm sm:text-base ${
                  errors.lowStock ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="Enter threshold"
              />
            )}
          />

          {errors.lowStock && (
            <p className="text-red-500 text-sm mt-1">
              {errors.lowStock.message}
            </p>
          )}
        </div>

        {/* Show Out of Stock */}
        <div className="bg-white rounded-xl shadow p-4 sm:p-5 flex items-center justify-between">
          <div className="flex items-start sm:items-center gap-3">
            <Package className="text-purple-600 shrink-0" size={22} />
            <div>
              <h3 className="font-semibold text-gray-800 text-base sm:text-lg">
                Show Out of Stock Items
              </h3>
              <p className="text-sm text-gray-500">
                When activated, customers can see out of stock products.
              </p>
            </div>
          </div>
          <Controller
            name="showOutOfStock"
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

        {/* Show Stock Count */}
        <div className="bg-white rounded-xl shadow p-4 sm:p-5 flex items-center justify-between">
          <div className="flex items-start sm:items-center gap-3">
            <Eye className="text-purple-600 shrink-0" size={22} />
            <div>
              <h3 className="font-semibold text-gray-800 text-base sm:text-lg">
                Show Stock Count
              </h3>
              <p className="text-sm text-gray-500">
                Display total stock left for each product on your website.
              </p>
            </div>
          </div>
          <Controller
            name="showStockCount"
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

        {/* Save */}
        <div className="mt-8 flex justify-end">
          <button
            type="submit"
            className={`w-full sm:w-auto px-3 py-2 bg-purple-600 text-white rounded-lg flex items-center justify-center gap-2 hover:bg-purple-700 transition ${
              isPending
                ? "opacity-75 cursor-not-allowed"
                : "hover:bg-purple-700"
            }`}
          >
            {isPending && (
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
            <Save size={18} />
            {isPending ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default InventorySettings;
