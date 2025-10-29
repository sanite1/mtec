import React, { useState } from "react";
import { X, Edit3 } from "lucide-react";
import { format } from "date-fns";
import { Order } from "../../lib/types/orders";
import {
  useCancelOrder,
  useUpdateOrderStatus,
  useUpdatePaymentStatus,
} from "../../lib/api/orders";
import CancelOrderModal from "./CancelOrderModal";
import EditOrderStatusModal from "./EditOrderStatusModal";
import EditPaymentStatusModal from "./EditPaymentStatusModal";

interface OrderDetailsSidebarProps {
  order: Order;
  onClose: () => void;
  onEditPaymentStatus: () => void;
  onEditOrderStatus: () => void;
  refetch: () => void;
}

export default function OrderDetailsSidebar({
  order,
  onClose,
  onEditPaymentStatus,
  onEditOrderStatus,
  refetch,
}: OrderDetailsSidebarProps) {
  const safeCurrency = (n: number) =>
    `₦${n.toLocaleString("en-NG", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;

  const [showCancelModal, setShowCancelModal] = useState(false);
  const { mutateAsync: cancelOrder, isPending } = useCancelOrder();

  const handleCancel = async () => {
    await cancelOrder(order._id, {
      onSuccess: () => setShowCancelModal(false),
    });
    refetch();
    onClose();
  };

  const [showStatusModal, setShowStatusModal] = useState(false);
  const { mutateAsync: updateStatus, isPending: updateStatusPending } =
    useUpdateOrderStatus();

  const handleStatusUpdate = async (
    newStatus: "pending" | "completed" | "cancelled",
  ) => {
    await updateStatus(
      { id: order._id, status: newStatus },
      {
        onSuccess: () => setShowStatusModal(false),
      },
    );

    refetch();
    setShowStatusModal(false);
    onClose();
  };

  const [showPaymentStatusModal, setShowPaymentStatusModal] = useState(false);

  const {
    mutateAsync: updatePaymentStatus,
    isPending: loadingUpdatePaymentStatus,
  } = useUpdatePaymentStatus();
  const handlePaymentStatusUpdate = async (data: {
    paymentStatus: "unpaid" | "paid" | "refunded";
  }) => {
    try {
      await updatePaymentStatus(
        { id: order._id, paymentStatus: data.paymentStatus },
        {
          onSuccess: () => setShowStatusModal(false),
        },
      );
    } catch (error) {
      alert("Failed to update payment status.");
    }

    refetch();
    setShowPaymentStatusModal(false);
    onClose();
  };
  return (
    <div className="fixed inset-0 z-50 flex">
      {/* Overlay */}
      <div className="flex-1 bg-black/40 backdrop-blur-sm" onClick={onClose} />
      {showCancelModal && (
        <CancelOrderModal
          onClose={() => setShowCancelModal(false)}
          onConfirm={handleCancel}
          loading={isPending}
          currentStatus={order.status}
        />
      )}
      {showStatusModal && (
        <EditOrderStatusModal
          onClose={() => setShowStatusModal(false)}
          onConfirm={handleStatusUpdate}
          loading={updateStatusPending}
          previousStatus={order.status}
        />
      )}

      {showPaymentStatusModal && (
        <EditPaymentStatusModal
          onClose={() => setShowPaymentStatusModal(false)}
          onConfirm={handlePaymentStatusUpdate}
          currentStatus={order.paymentStatus}
          orderId={order._id}
          loading={loadingUpdatePaymentStatus}
        />
      )}
      {/* Sidebar */}
      <div className="w-full sm:w-1/3 bg-white h-full shadow-2xl flex flex-col animate-slideIn">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-2xl font-semibold text-gray-800">
            Order Details
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Order Summary */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-700 mb-2">
              Order Summary
            </h3>
            <div className="space-y-1 text-sm">
              <p>
                <span className="text-gray-500">Order No:</span>{" "}
                <span className="font-medium">{order.orderNumber}</span>
              </p>
              <p>
                <span className="text-gray-500">Date:</span>{" "}
                <span className="font-medium">
                  {format(new Date(order.createdAt), "dd MMM yyyy, hh:mm a")}
                </span>
              </p>
              <p>
                <span className="text-gray-500">Status:</span>{" "}
                <span
                  className={`font-medium ${
                    order.status === "completed"
                      ? "text-green-600"
                      : order.status === "pending"
                        ? "text-yellow-600"
                        : "text-red-600"
                  }`}
                >
                  {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                </span>
              </p>
              <p>
                <span className="text-gray-500">Payment:</span>{" "}
                <span
                  className={`font-medium ${
                    order.paymentStatus === "paid"
                      ? "text-green-600"
                      : order.paymentStatus === "unpaid"
                        ? "text-yellow-600"
                        : "text-gray-600"
                  }`}
                >
                  {order.paymentStatus.charAt(0).toUpperCase() +
                    order.paymentStatus.slice(1)}
                </span>{" "}
                <span className="text-gray-400 text-xs">
                  ({order.paymentMethod.replace("_", " ")})
                </span>
              </p>
            </div>
          </div>

          {/* Customer Info */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-700 mb-2">
              Shipping Information
            </h3>
            <div className="space-y-1 text-sm">
              <p className="font-medium text-gray-800">
                {order.shippingAddress.fullName}
              </p>
              <p className="text-gray-600">{order.shippingAddress.phone}</p>
              <p className="text-gray-600">
                {order.shippingAddress.addressLine1}
              </p>
              {order.shippingAddress.addressLine2 && (
                <p className="text-gray-600">
                  {order.shippingAddress.addressLine2}
                </p>
              )}
              <p className="text-gray-600">
                {order.shippingAddress.city}, {order.shippingAddress.state}
              </p>
              <p className="text-gray-600">{order.shippingAddress.country}</p>
            </div>
          </div>

          {/* Items */}
          <div>
            <h3 className="text-lg font-semibold text-gray-700 mb-2">Items</h3>
            <div className="divide-y border rounded-lg">
              {order.items.map((item, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center p-3 text-sm"
                >
                  <div>
                    <p className="font-medium text-gray-800">{item.name}</p>
                    <p className="text-gray-500 text-xs">{item.sku}</p>
                    <p className="text-gray-600 text-xs">
                      Qty: {item.quantity} × {safeCurrency(item.price)}
                    </p>
                  </div>
                  <p className="font-semibold text-gray-800">
                    {safeCurrency(item.subtotal)}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Totals */}
          <div className="bg-gray-50 p-4 rounded-lg text-sm space-y-1">
            <div className="flex justify-between">
              <span className="text-gray-500">Subtotal</span>
              <span>{safeCurrency(order.subtotal)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Shipping</span>
              <span>{safeCurrency(order.shippingFee)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Tax</span>
              <span>{safeCurrency(order.tax)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Discount</span>
              <span>{safeCurrency(order.discount)}</span>
            </div>
            <div className="border-t pt-2 flex justify-between font-semibold text-gray-800">
              <span>Total</span>
              <span>{safeCurrency(order.total)}</span>
            </div>
          </div>

          {/* Note */}
          {order.note && (
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-sm font-semibold text-gray-700 mb-1">Note</h3>
              <p className="text-sm text-gray-600">{order.note}</p>
            </div>
          )}
          <div className="bg-red-50 p-4 rounded-lg">
            <h3 className="text-sm font-semibold text-red-700 mb-1">
              Cancel Order
            </h3>
            <p className="text-sm text-red-600 w-full sm:w-2/3">
              When you cancel the order, the payment will be refunded if the
              user has made payment.
            </p>
            <button
              onClick={() => setShowCancelModal(true)}
              className="flex items-center mt-2 px-2 py-1 border border-red-600 text-red-600 text-sm rounded hover:bg-red-50"
            >
              <X className="w-4 h-4" /> Cancel Order
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t flex justify-end bg-white sticky bottom-0">
          <button
            onClick={() => setShowStatusModal(true)}
            className="flex items-center gap-2 px-4 py-2 border border-purple-600 text-purple-600 rounded text-sm hover:bg-purple-50"
          >
            <Edit3 className="w-4 h-4" /> Edit Order Status
          </button>
          <button
            onClick={() => setShowPaymentStatusModal(true)}
            className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded text-sm hover:bg-purple-700 ml-3"
          >
            <Edit3 className="w-4 h-4" /> Edit Payment Status
          </button>
        </div>
      </div>
    </div>
  );
}
