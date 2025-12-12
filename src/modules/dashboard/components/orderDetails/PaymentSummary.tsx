import React from "react";
import { Receipt, Truck, Banknote, Percent, ChevronDown } from "lucide-react";
import { Order } from "../../lib/types/orders";

interface Props {
  order?: Order;
}

export default function PaymentSummary({ order }: Props) {
  return (
    <div className="bg-white border rounded-xl p-5 shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <h3 className="text-lg font-semibold">Payment Summary</h3>

        <button className="flex items-center gap-1 px-3 py-1.5 border rounded-md text-sm text-purple-700 hover:bg-purple-50 border-purple-600">
          <Receipt size={16} />
          Print Invoice
        </button>
      </div>

      {/* Summary List */}
      <div className="space-y-4 pt-3 border-t">
        {/* Subtotal */}
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-2 text-gray-600">
            <Banknote size={16} className="text-green-600" />
            <span>Sub Total</span>
          </div>
          <div className="font-medium">
            ₦{order?.subtotal?.toLocaleString() ?? "0"}
          </div>
        </div>

        {/* Shipping */}
        <div className="flex items-center justify-between text-sm">
          <div>
            <div className="flex items-center gap-2 text-gray-600">
              <Truck size={16} className="text-blue-600" />
              <span>Shipping Fee</span>
            </div>
            <div className="text-xs text-gray-400 ml-6">Vinny</div>
          </div>
          <div className="font-medium">
            ₦{order?.shippingFee?.toLocaleString() ?? "0"}
          </div>
        </div>

        {/* Tax */}
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-2 text-gray-600">
            <Percent size={16} className="text-purple-600" />
            <span>Taxes</span>
          </div>
          <div className="font-medium">
            ₦{order?.tax?.toLocaleString() ?? "0"}
          </div>
        </div>

        {/* Divider */}
        <div className="border-t pt-4"></div>

        {/* TOTAL */}
        <div className="flex items-center justify-between text-base font-semibold">
          <div>Total Amount</div>
          <div className="text-green-700">
            ₦{order?.total?.toLocaleString() ?? "0"}
          </div>
        </div>
      </div>
    </div>
  );
}
