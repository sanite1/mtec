"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import {
  Save,
  ArrowLeft,
  PlusCircle,
  Loader2,
  BoxSelect,
  CircleCheckIcon,
} from "lucide-react";
import SelectProductsDialog from "./SelectProductsDialog";
import { useCreateOrder } from "../../lib/api/orders";
import StoreSelector from "../../lib/utils/StoreSelector";
import { Location } from "../../lib/types/locations";
import SelectShippingDialog from "./SelectShippingDialog";

// 🧩 Zod Schema (matches your Joi validation)
const createOrderSchema = z.object({
  customerId: z.string().optional(),
  items: z
    .array(
      z.object({
        productId: z.string(),
        variationId: z.string().optional(),
        price: z.number().optional(),
        name: z.string().optional(),
        sku: z.string().optional(),
        quantity: z.number().min(1),
      }),
    )
    .min(1, "At least one product is required"),
  shippingAddress: z.object({
    fullName: z.string(),
    phone: z.string(),
    email: z.string(),
    addressLine1: z.string(),
    addressLine2: z.string().optional(),
    city: z.string(),
    state: z.string(),
    country: z.string(),
  }),
  note: z.string().optional(),
  discount: z.number().min(0).optional(),
  tax: z.number().min(0).optional(),
  shippingFee: z.number().min(0).optional(),
  paymentStatus: z.string().default("unpaid"),
  paymentMethod: z.string().optional(),
  orderStatus: z.string().default("pending"),
});

type CreateOrderFormData = z.infer<typeof createOrderSchema>;

export default function CreateOrderPage() {
  const navigate = useNavigate();
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedProducts, setSelectedProducts] = useState<
    {
      productId: string;
      variationId?: string;
      name?: string;
      price?: number;
      sku?: string;
      quantity: number;
    }[]
  >([]);

  const {
    handleSubmit,
    register,
    setValue,
    // formState: {  },
  } = useForm<CreateOrderFormData>({
    resolver: zodResolver(createOrderSchema) as any,
    defaultValues: {
      paymentStatus: "unpaid",
      orderStatus: "pending",
      paymentMethod: "cash",
      items: [],
      shippingAddress: {
        fullName: "",
        phone: "",
        addressLine1: "",
        addressLine2: "",
        city: "",
        state: "",
        country: "",
      },
    },
  });

  const { mutateAsync: createOrder, isPending } = useCreateOrder();

  const onSubmit = async (data: CreateOrderFormData) => {
    try {
      // 🧹 Clean up shipping address
      const shippingAddress = { ...data.shippingAddress };
      if (!shippingAddress.addressLine2?.trim()) {
        delete shippingAddress.addressLine2;
      }

      // 🧹 Remove note if empty
      const cleanedData = { ...data };
      if (!cleanedData.note?.trim()) {
        delete cleanedData.note;
      }

      // 🧩 Build payload
      const payload = {
        ...cleanedData,
        shippingAddress,
        channel: "physical",
        items: selectedProducts.map((p) => ({
          productId: p.productId,
          variationId: p.variationId,
          quantity: p.quantity,
          price: p.price,
          name: p.name,
          sku: p.sku,
        })),
      };

      await createOrder(payload);
      navigate("/orders");
    } catch (error) {
      console.error("❌ Order creation failed:", error);
    }
  };

  const [LocationModalOpen, setLocationModalOpen] = useState(false);

  const [location, setLocation] = useState<{
    name: string;
    _id: string;
  } | null>(null);

  const onSelectLocation = (location: Location) => {
    setLocation({ name: location.name, _id: location._id });

    // reset selections when location changes
    setSelectedProducts([]);
    setValue("items", []);
  };

  const [locationStepDone, setLocationStepDone] = useState(false);

  const [openShippingDialog, setOpenShippingDialog] = useState(false);

  const [selectedShipping, setSelectedShipping] = useState<{
    _id: string;
    name: string;
    price: number;
  } | null>(null);

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* LOCATION STEP */}
      {!locationStepDone ? (
        <div className="max-w-xl mx-auto bg-white shadow-xl rounded-xl p-8 border">
          <h2 className="text-xl font-semibold mb-4">Select Store Location</h2>
          <p className="text-gray-600 mb-6">
            You can select a location to filter products, shipping & discounts,
            or continue without selecting one.
          </p>

          <div className="flex gap-4">
            <button
              type="button"
              onClick={() => setLocationModalOpen(true)}
              className="px-4 py-2 rounded-lg bg-purple-600 text-white"
            >
              Select Location
            </button>

            <button
              type="button"
              onClick={() => setLocationStepDone(true)}
              className="px-4 py-2 rounded-lg border"
            >
              Continue without location
            </button>
          </div>

          {location && (
            <div className="mt-4 text-sm text-green-600">
              Selected: {location.name}
              <button
                className="ml-2 underline"
                onClick={() => setLocationStepDone(true)}
              >
                Continue
              </button>
            </div>
          )}
        </div>
      ) : (
        <div className="max-w-3xl mx-auto bg-white shadow-xl rounded-xl p-8 border border-gray-100">
          {/* Header */}
          <div className="mb-8 border-b border-gray-200 pb-4 flex items-center">
            <button
              onClick={() => navigate("/orders")}
              className="p-2 rounded bg-gray-100 hover:bg-gray-200 mr-3 self-start"
            >
              <ArrowLeft className="w-6 h-6 text-gray-600" />
            </button>
            <div>
              <h1 className="text-2xl font-bold text-gray-800">
                Create New Order
              </h1>
              <p className="text-gray-500 mt-1">
                Fill in details to register a new order.
              </p>
            </div>
          </div>
          {/* Location Indicator */}
          <div className="mb-6">
            {location ? (
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between bg-green-50 border border-green-200 rounded-lg px-4 py-3">
                <div>
                  <p className="text-sm text-green-700 font-medium">
                    Store Location Selected
                  </p>
                  <p className="text-green-900 font-semibold truncate">
                    {location.name}
                  </p>
                </div>

                <div className="flex gap-3 sm:gap-4">
                  <button
                    type="button"
                    onClick={() => setLocationModalOpen(true)}
                    className="text-sm font-medium text-green-700 hover:underline"
                  >
                    Change
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setLocation(null);
                      setSelectedProducts([]);
                      setValue("items", []);
                    }}
                    className="text-sm font-medium text-red-600 hover:underline"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between bg-yellow-50 border border-yellow-200 rounded-lg px-4 py-3">
                <div>
                  <p className="text-sm text-yellow-700 font-medium">
                    No Store Location Selected
                  </p>
                  <p className="text-yellow-800 text-sm">
                    Products, shipping & discounts will not be filtered.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => setLocationModalOpen(true)}
                  className="self-start sm:self-auto text-sm font-medium text-yellow-700 hover:underline"
                >
                  Pick Location
                </button>
              </div>
            )}
          </div>

          {/* FORM */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-10">
            {/* Shipping Address */}
            <section>
              <h2 className="text-lg font-semibold text-gray-700 mb-4">
                Shipping Details
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <input
                  {...register("shippingAddress.fullName")}
                  placeholder="Full Name"
                  className="border rounded-lg p-2 w-full"
                />
                <input
                  {...register("shippingAddress.phone")}
                  placeholder="Phone Number"
                  className="border rounded-lg p-2 w-full"
                />
                <input
                  {...register("shippingAddress.email")}
                  placeholder="Email Address"
                  className="border rounded-lg p-2 w-full"
                />
                <input
                  {...register("shippingAddress.addressLine1")}
                  placeholder="Address Line 1"
                  className="border rounded-lg p-2 w-full"
                />
                <input
                  {...register("shippingAddress.addressLine2")}
                  placeholder="Address Line 2 (optional)"
                  className="border rounded-lg p-2 w-full"
                />
                <input
                  {...register("shippingAddress.city")}
                  placeholder="City"
                  className="border rounded-lg p-2 w-full"
                />
                <input
                  {...register("shippingAddress.state")}
                  placeholder="State (optional)"
                  className="border rounded-lg p-2 w-full"
                />
                <input
                  {...register("shippingAddress.country")}
                  placeholder="Country"
                  className="border rounded-lg p-2 w-full"
                />
              </div>
            </section>

            {/* Products */}
            <section>
              <h2 className="text-lg font-semibold text-gray-700 mb-4">
                Products
              </h2>
              <div className="md:flex gap-4 space-y-3 md:space-y-0">
                <button
                  type="button"
                  onClick={() => setOpenDialog(true)}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg border border-purple-600 text-purple-600 hover:bg-purple-50"
                >
                  <CircleCheckIcon size={18} />
                  Select Products
                </button>
                <button
                  type="button"
                  onClick={() => navigate("/products/create")}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg bg-purple-600 text-white hover:bg-purple-700"
                >
                  <PlusCircle size={18} />
                  New Product
                </button>
              </div>

              {selectedProducts.length > 0 && (
                <div className="mt-4 space-y-2">
                  {selectedProducts.map((p) => (
                    <div
                      key={p.productId}
                      className="flex justify-between items-center bg-gray-50 border border-gray-200 p-3 rounded-lg"
                    >
                      <div>
                        <p className="font-medium text-gray-800">{p.name}</p>
                        <p className="text-sm text-gray-600">
                          Qty: {p.quantity} | ₦{p.price?.toLocaleString() ?? 0}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </section>

            {/* Shipping */}
            <section>
              <h2 className="text-lg font-semibold text-gray-700 mb-4">
                Shipping Method
              </h2>

              <div className="flex flex-col gap-3">
                {selectedShipping ? (
                  <div className="flex items-center justify-between bg-gray-50 border rounded-lg p-3">
                    <div>
                      <p className="font-medium text-gray-800">
                        {selectedShipping.name}
                      </p>
                      <p className="text-sm text-gray-600">
                        ₦{selectedShipping.price.toLocaleString()}
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() => setOpenShippingDialog(true)}
                      className="text-sm text-purple-600 hover:underline"
                    >
                      Change
                    </button>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={() => setOpenShippingDialog(true)}
                    className="self-start flex items-center gap-2 px-3 py-2 rounded-lg border border-purple-600 text-purple-600 hover:bg-purple-50"
                  >
                    <BoxSelect size={18} />
                    Select Shipping Method
                  </button>
                )}
              </div>
            </section>

            {/* Payment */}
            <section>
              <h2 className="text-lg font-semibold text-gray-700 mb-4">
                Payment Info
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <select
                  {...register("paymentStatus")}
                  className="border rounded-lg p-2 w-full"
                >
                  <option value="unpaid">Unpaid</option>
                  <option value="paid">Paid</option>
                  <option value="refunded">Refunded</option>
                </select>

                <select
                  {...register("paymentMethod")}
                  className="border rounded-lg p-2 w-full"
                >
                  <option value="">Select Payment Method</option>
                  <option value="card">Card</option>
                  <option value="bank_transfer">Bank Transfer</option>
                  <option value="cash">Cash</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </section>

            {/* Notes */}
            <section>
              <h2 className="text-lg font-semibold text-gray-700 mb-4">Note</h2>
              <textarea
                {...register("note")}
                rows={4}
                placeholder="Enter any special instructions..."
                className="border rounded-lg p-2 w-full"
              />
            </section>

            {/* Submit */}
            <div className="pt-4">
              <button
                type="submit"
                disabled={isPending}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg bg-purple-600 text-white font-medium transition ${
                  isPending
                    ? "opacity-70 cursor-not-allowed"
                    : "hover:bg-purple-700"
                }`}
              >
                {isPending ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Creating Order...
                  </>
                ) : (
                  <>
                    <Save size={18} />
                    Save Order
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Product Selection Dialog */}
      <SelectProductsDialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        location={location?.name || ""}
        onSave={(selected) => {
          setSelectedProducts(selected);
          console.log(selected);

          setValue("items", selected as any);
        }}
      />

      <StoreSelector
        open={LocationModalOpen}
        onClose={() => setLocationModalOpen(false)}
        onSelect={(loc) => onSelectLocation(loc)}
      />

      <SelectShippingDialog
        open={openShippingDialog}
        onClose={() => setOpenShippingDialog(false)}
        location={location?.name || ""}
        onSave={(shipping) => {
          setSelectedShipping(shipping);
          setValue("shippingFee", shipping.price);
        }}
      />
    </div>
  );
}
