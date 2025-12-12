import React, { useState } from "react";
import {
  Truck,
  Phone,
  MapPin,
  User,
  Edit,
  Copy,
  ChevronDown,
  Package,
} from "lucide-react";
import { Order } from "../../lib/types/orders";
import EditShippingStatusModal from "./ShippingStatusModal";
import { useUpdateShippingStatus } from "../../lib/api/orders";

interface Props {
  order?: Order;
  onActionClick?: () => void; // for modal
  refetch: () => void; // for modal
}

export default function ShippingCard({ order, onActionClick, refetch }: Props) {
  const shipping = order?.shippingAddress;

  // Status color map
  const statusColors: Record<string, string> = {
    pending: "bg-yellow-50 text-yellow-700",
    shipped: "bg-blue-50 text-blue-700",
    delivered: "bg-green-50 text-green-700",
    cancelled: "bg-red-50 text-red-700",
    processing: "bg-purple-50 text-purple-700",
  };

  const statusClass =
    statusColors[order?.shippingStatus ?? "pending"] ??
    "bg-gray-100 text-gray-600";

  const [showShippingStatusModal, setShowShippingStatusModal] = useState(false);

  const {
    mutateAsync: updateShippingStatus,
    isPending: loadingUpdateShippingStatus,
  } = useUpdateShippingStatus();

  const handleShippingStatusUpdate = async (
    newStatus: "pending" | "processing" | "shipped" | "delivered",
  ) => {
    try {
      await updateShippingStatus(
        { id: order?._id as string, shippingStatus: newStatus },
        {
          onSuccess: () => setShowShippingStatusModal(false),
        },
      );
    } catch (error) {
      console.error(error);
    }

    refetch();
    setShowShippingStatusModal(false);
    // onClose();
  };

  return (
    <div className="bg-white border rounded-xl p-5 shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Truck size={20} className="text-purple-600" />
          <h3 className="text-lg font-semibold">Shipping</h3>
        </div>

        <div className="flex items-center gap-3">
          <span
            className={`text-xs px-2 py-1 rounded-md font-medium capitalize ${statusClass}`}
          >
            {order?.shippingStatus}
          </span>
        </div>
      </div>

      {/* Body */}
      <div className="space-y-4 text-sm text-gray-700 pt-3 border-t">
        {/* Delivery To */}
        <div>
          <p className="text-gray-500 text-xs mb-1">Delivery To</p>
          <div className="flex items-center gap-2 font-medium">
            <User size={14} className="text-gray-600" />
            {shipping?.fullName ?? "—"}
          </div>
        </div>

        {/* Phone */}
        <div className="flex items-center gap-2">
          <Phone size={14} className="text-gray-600" />
          {shipping?.phone ?? "—"}
        </div>

        {/* Address */}
        <div className="flex items-start gap-2">
          <MapPin size={16} className="text-gray-600 mt-0.5" />
          <div>
            {shipping?.addressLine1 ?? "—"}
            {shipping?.city && `, ${shipping.city}`}
            {shipping?.state && `, ${shipping.state}`}
            {shipping?.country && `, ${shipping.country}`}
          </div>
        </div>

        {/* Buttons */}
        <div className="gap-2 pt-3 border-t">
          <button
            disabled={order?.paymentStatus !== "paid"}
            onClick={() => setShowShippingStatusModal(true)}
            className={`flex items-center gap-1 px-3 py-1.5 border border-purple-600 text-purple-600 rounded-md text-sm hover:bg-purple-50 ${order?.paymentStatus !== "paid" && "cursor-not-allowed opacity-45"}`}
          >
            <Package size={14} /> Change Shipping Status
          </button>
          {order?.paymentStatus !== "paid" && (
            <span className="text-xs text-red-300 italic ">
              Payment status has to be paid
            </span>
          )}
        </div>
      </div>

      {showShippingStatusModal && (
        <EditShippingStatusModal
          onClose={() => setShowShippingStatusModal(false)}
          onConfirm={handleShippingStatusUpdate}
          previousStatus={order?.shippingStatus as any}
          loading={loadingUpdateShippingStatus}
        />
      )}
    </div>
  );
}
