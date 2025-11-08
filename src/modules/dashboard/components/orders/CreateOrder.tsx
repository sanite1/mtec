"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { Save, ArrowLeft, PlusCircle, Loader2 } from "lucide-react";
import SelectProductsDialog from "./SelectProductsDialog";
import { useCreateOrder } from "../../lib/api/orders";

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

  return (
    <div className="bg-gray-50 min-h-screen py-10 px-6">
      <div className="max-w-3xl mx-auto bg-white shadow-xl rounded-xl p-8 border border-gray-100">
        {/* Header */}
        <div className="mb-8 border-b border-gray-200 pb-4 flex items-center">
          <button
            onClick={() => navigate("/orders")}
            className="p-2 rounded bg-gray-100 hover:bg-gray-200 mr-3"
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
            <div className="flex gap-4">
              <button
                type="button"
                onClick={() => setOpenDialog(true)}
                className="flex items-center gap-2 px-3 py-2 rounded-lg border border-purple-600 text-purple-600 hover:bg-purple-50"
              >
                <PlusCircle size={18} />
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
                        Qty: {p.quantity} | ₦{p.price ?? 0}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
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

      {/* Product Selection Dialog */}
      <SelectProductsDialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        onSave={(selected) => {
          setSelectedProducts(selected);
          console.log(selected);

          setValue("items", selected as any);
        }}
      />
    </div>
  );
}
