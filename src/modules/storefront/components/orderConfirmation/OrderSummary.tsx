import React from "react";
import { CheckCircle, Clock, XCircle, CreditCard } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { useOrderById } from "../../lib/api/orders";
import { IStoreDetails } from "../../lib/types/store";
import { useInitializePayment } from "../../lib/api/payment";
import { toast } from "sonner";

// 🔹 Skeleton Loader
const OrderSkeleton = () => (
  <div className="max-w-3xl mx-auto px-6 py-16 animate-pulse">
    <div className="bg-white rounded-xl shadow p-6 space-y-4">
      <div className="h-6 bg-gray-200 rounded w-1/3 mx-auto" />
      <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto" />
      <div className="border-t pt-4 space-y-3">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-4 bg-gray-200 rounded w-full" />
        ))}
      </div>
      <div className="h-10 bg-gray-200 rounded w-1/3 mx-auto mt-6" />
    </div>
  </div>
);

export default function OrderSummary() {
  const { id } = useParams();
  const { data: order, isLoading, isError } = useOrderById(id as string);

  const store: IStoreDetails = JSON.parse(
    localStorage.getItem("store") || "null",
  );

  if (isLoading) return <OrderSkeleton />;

  if (!order || isError) {
    return (
      <div className="h-[100vh] flex items-center justify-center text-center">
        <p className="text-gray-600">Order not found.</p>
      </div>
    );
  }

  const isPaid = order.paymentStatus === "paid";

  return (
    <div className="max-w-3xl mx-auto px-6 py-16">
      {/* Ticket Card */}
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
        {/* Header */}
        <div
          className="p-6 text-center border-b"
          style={{ borderColor: store.storeColor }}
        >
          <div className="flex w-full justify-center">
            <CheckCircle size={56} style={{ color: store.storeColor }} />
          </div>

          <h1 className="text-2xl font-semibold mt-4">
            Order #{order.orderNumber}
          </h1>
          <p className="text-sm text-gray-500">
            Placed on {new Date(order.createdAt).toLocaleString()} throgh{" "}
            {order.channel} channel
          </p>
        </div>

        {/* Status Row */}
        <div className="flex justify-between px-6 py-4 text-sm bg-gray-50">
          <span>
            {/* <strong>Status:</strong> {order.status} */}
            <strong>Status:</strong> completed
          </span>
          <span>
            {/* <strong>Payment:</strong> {order.paymentStatus} */}
            <strong>Payment:</strong> paid
          </span>
          <span>
            {/* <strong>Shipping:</strong> {order.shippingStatus} */}
            <strong>Shipping:</strong> processing
          </span>
        </div>

        {/* Items */}
        <div className="px-6 py-4 border-t">
          <h2 className="font-semibold mb-3">Items</h2>

          <div className="divide-y">
            {order.items.map((item) => (
              <div key={item.productId} className="flex justify-between py-3">
                <div>
                  <p className="font-medium">{item.name}</p>
                  <p className="text-sm text-gray-500">
                    Qty: {item.quantity} × ₦{item.price.toLocaleString()}
                  </p>
                </div>

                <p className="font-semibold">
                  ₦{item.subtotal.toLocaleString()}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Totals */}
        <div className="px-6 py-4 bg-gray-50 border-t text-sm space-y-2">
          <div className="flex justify-between">
            <span>Subtotal</span>
            <span>₦{order.subtotal.toLocaleString()}</span>
          </div>

          {order.discount > 0 && (
            <div className="flex justify-between text-red-500">
              <span>Discount</span>
              <span>-₦{order.discount.toLocaleString()}</span>
            </div>
          )}

          {order.tax > 0 && (
            <div className="flex justify-between">
              <span>Tax</span>
              <span>₦{order.tax.toLocaleString()}</span>
            </div>
          )}

          {order.shippingFee > 0 && (
            <div className="flex justify-between">
              <span>Shipping</span>
              <span>₦{order.shippingFee.toLocaleString()}</span>
            </div>
          )}

          <div className="flex justify-between font-bold text-lg border-t pt-2">
            <span>Total</span>
            <span style={{ color: store.storeColor }}>
              ₦{order.total.toLocaleString()}
            </span>
          </div>
        </div>

        {/* Shipping Info */}
        <div className="px-6 py-4 border-t">
          <h2 className="font-semibold mb-2">Shipping Address</h2>
          <p className="text-sm text-gray-600">
            {order.shippingAddress.fullName}
          </p>
          <p className="text-sm text-gray-600">
            {order.shippingAddress.phone} · {order.shippingAddress.email}
          </p>
          <p className="text-sm text-gray-600 mt-1">
            {order.shippingAddress.addressLine1}
            {order.shippingAddress.addressLine2
              ? `, ${order.shippingAddress.addressLine2}`
              : ""}
            , {order.shippingAddress.city}, {order.shippingAddress.state},{" "}
            {order.shippingAddress.country}
          </p>
        </div>

        {/* CTA */}
        <div className="px-6 py-6 border-t flex justify-center gap-4">
          <Link
            to="/"
            className="px-6 py-3 rounded-lg border text-sm font-medium hover:bg-gray-50"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
}
