import { Order } from "../../lib/types/orders";
import { Wallet, Truck, DollarSign, Calendar } from "lucide-react";
import { formatDate } from "../../lib/utils/formatDate";

interface Props {
  order?: Order;
}

export default function OrderStats({ order }: Props) {
  const badge = (status: string) => {
    const map: any = {
      paid: "bg-green-100 text-green-700",
      unpaid: "bg-red-100 text-red-700",
      refunded: "bg-yellow-100 text-yellow-700",

      delivered: "bg-green-100 text-green-700",
      shipped: "bg-blue-100 text-blue-700",
      processing: "bg-orange-100 text-orange-700",
      pending: "bg-gray-100 text-gray-700",
      cancelled: "bg-red-100 text-red-700",
    };
    return map[status] || "bg-gray-100 text-gray-700";
  };

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      <div className="bg-white border rounded-xl p-4 shadow-sm space-y-2">
        <p className="text-sm text-gray-500">Payment Status</p>
        <div
          className={`inline-block px-3 py-1 rounded-full text-xs ${badge(order?.paymentStatus!)}`}
        >
          {order?.paymentStatus}
        </div>
      </div>

      <div className="bg-white border rounded-xl p-4 shadow-sm space-y-2">
        <p className="text-sm text-gray-500">Order Status</p>
        <div
          className={`inline-block px-3 py-1 rounded-full text-xs ${badge(order?.shippingStatus!)}`}
        >
          {order?.shippingStatus}
        </div>
      </div>

      <div className="bg-white border rounded-xl p-4 shadow-sm space-y-2">
        <p className="text-sm text-gray-500">Total</p>
        <p className="text-lg font-semibold">
          ₦{order?.total.toLocaleString()}
        </p>
      </div>

      <div className="bg-white border rounded-xl p-4 shadow-sm space-y-2">
        <p className="text-sm text-gray-500">Date</p>
        <p className="text-lg font-semibold">
          {formatDate(order?.createdAt || "")}
        </p>
      </div>
    </div>
  );
}
