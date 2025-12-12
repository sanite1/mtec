import React from "react";
import { Order } from "../../lib/types/orders";

interface Props {
  order?: Order;
}

export default function PaymentStatusCard({ order }: Props) {
  return (
    <div className="bg-white border rounded-xl p-5 shadow-sm">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-lg font-semibold">Payment Status</h3>
        <span className="text-xs px-2 py-1 rounded bg-red-50 text-red-700">
          Unpaid
        </span>
      </div>

      <div className="flex gap-3">
        <button className="flex-1 px-4 py-2 rounded-md bg-green-700 text-white hover:bg-green-800">
          Record Payment
        </button>
        <button className="flex-1 px-4 py-2 rounded-md border text-green-700">
          Request Payment
        </button>
      </div>
    </div>
  );
}
