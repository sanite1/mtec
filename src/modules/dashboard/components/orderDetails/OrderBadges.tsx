import React from "react";
import { CheckCircle, Truck } from "lucide-react";
import { Order } from "../../lib/types/orders";

export default function OrderBadges({ order }: { order?: Order }) {
  const statusBadge = (text: string) => (
    <span className="inline-flex items-center px-3 py-1 rounded-full bg-yellow-50 text-yellow-800 text-xs border border-yellow-100">
      {text}
    </span>
  );

  return (
    <div className="flex items-center gap-2">
      {/* small icon */}
      <div className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-green-50 text-green-600">
        <CheckCircle size={14} />
      </div>

      <div className="flex items-center gap-2">
        {statusBadge(order?.status ?? "Open")}
        <span className="inline-flex items-center px-2 py-1 rounded-full bg-red-50 text-red-700 text-xs border border-red-100">
          Payment: {order?.paymentStatus ?? "unpaid"}
        </span>
        <span className="inline-flex items-center px-2 py-1 rounded-full bg-orange-50 text-orange-800 text-xs border border-orange-100">
          Shipping: {order?.shippingStatus ?? "unfulfilled"}
        </span>
      </div>
    </div>
  );
}
