import React from "react";
import { Globe, User, Phone, Mail, MessageSquare, Store } from "lucide-react";
import { Order } from "../../lib/types/orders";

// 🔹 Status color mapping
const statusColors: Record<string, string> = {
  pending: "bg-yellow-100 text-yellow-700",
  completed: "bg-green-100 text-green-700",
  cancelled: "bg-red-100 text-red-700",

  paid: "bg-green-100 text-green-700",
  unpaid: "bg-red-100 text-red-700",
  refunded: "bg-blue-100 text-blue-700",

  processing: "bg-blue-100 text-blue-700",
  delivered: "bg-green-100 text-green-700",
  shipped: "bg-purple-100 text-purple-700",
};

interface Props {
  order?: Order;
  setShowPaymentStatusModal: React.Dispatch<React.SetStateAction<boolean>>;
  setShowRequestPaymentModal: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function OrderInfo({
  order,
  setShowPaymentStatusModal,
  setShowRequestPaymentModal,
}: Props) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-6">
          {/* 🔹 Channel */}
          <div className="flex items-start gap-4">
            <div className="p-3 rounded-lg bg-purple-50 text-purple-600">
              {order?.channel === "website" ? (
                <Globe size={20} />
              ) : (
                <Store size={20} />
              )}
            </div>
            <div>
              <p className="text-xs text-gray-500">Channel</p>
              <p className="font-medium capitalize">{order?.channel}</p>
            </div>
          </div>

          {/* 🔹 Status Card */}
          <div className="bg-white border rounded-xl p-5 shadow-sm space-y-4">
            <h3 className="text-lg font-semibold">Order Status</h3>

            <div className="grid grid-cols-3 gap-3 pt-3 border-t">
              {/* Order */}
              <div>
                <p className="text-xs text-gray-500">Order</p>
                <span
                  className={`inline-block text-xs mt-1 px-2 py-1 rounded ${
                    statusColors[order?.status ?? "pending"]
                  }`}
                >
                  {order?.status ?? "Pending"}
                </span>
              </div>

              {/* Payment */}
              <div>
                <p className="text-xs text-gray-500">Payment</p>
                <span
                  className={`inline-block text-xs mt-1 px-2 py-1 rounded ${
                    statusColors[order?.paymentStatus ?? "unpaid"]
                  }`}
                >
                  {order?.paymentStatus ?? "Unpaid"}
                </span>
              </div>

              {/* Shipping */}
              <div>
                <p className="text-xs text-gray-500">Shipping</p>
                <span
                  className={`inline-block text-xs mt-1 px-2 py-1 rounded ${
                    statusColors[order?.shippingStatus ?? "pending"]
                  }`}
                >
                  {order?.shippingStatus ?? "Pending"}
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="space-y-6">
          {/* 🔹 Customer Info */}
          <div className="bg-white border rounded-xl p-5 shadow-sm space-y-4">
            <div>
              <p className="text-xs text-gray-500">Customer</p>
              <p className="font-medium">
                {order?.shippingAddress?.fullName ?? "—"}
              </p>
            </div>

            {/* Contact */}
            <div className="pt-3 border-t">
              <p className="text-xs text-gray-500">Contact Details</p>

              <div className="mt-3 space-y-3">
                {/* Phone */}
                <div className="flex items-center gap-2 text-sm">
                  <div className="rounded-full bg-gray-100 p-2 text-gray-600">
                    <Phone size={14} />
                  </div>
                  <span>{order?.shippingAddress?.phone ?? "—"}</span>
                </div>

                {/* Email */}
                <div className="flex items-center gap-2 text-sm">
                  <div className="rounded-full bg-gray-100 p-2 text-gray-600">
                    <Mail size={14} />
                  </div>
                  <span>{order?.shippingAddress?.email ?? "—"}</span>
                </div>

                {/* Message */}
                {/* <div className="flex items-center gap-2 text-sm text-green-700 cursor-pointer hover:underline">
                  <div className="rounded-full bg-gray-100 p-2 text-gray-600">
                    <MessageSquare size={14} />
                  </div>
                  <span>Send message</span>
                </div> */}
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* 🔹 Payment Actions */}
      {order?.paymentStatus == "unpaid" && order?.status !== "cancelled" && (
        <div className="bg-white border rounded-xl p-5 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-lg font-semibold">Payment Status</h3>
            <span
              className={`text-xs px-2 py-1 rounded ${
                statusColors[order?.paymentStatus ?? "unpaid"]
              }`}
            >
              {order?.paymentStatus}
            </span>
          </div>

          {order?.paymentStatus === "unpaid" && (
            <div className="flex gap-3  pt-3 border-t">
              <button
                onClick={() => setShowPaymentStatusModal(true)}
                className="text-sm flex-1 px-2 py-2 rounded-md bg-purple-700 text-white hover:bg-purple-800 "
              >
                Record Payment
              </button>
              <button
                onClick={() => setShowRequestPaymentModal(true)}
                className="text-sm flex-1 px-2 py-2 rounded-md border text-purple-700"
              >
                Request Payment
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
