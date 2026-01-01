import React from "react";
import {
  Receipt,
  Truck,
  Banknote,
  Percent,
  ChevronDown,
  Tag,
} from "lucide-react";
import { Order } from "../../lib/types/orders";
import { useParams } from "react-router-dom";
import { useDownloadInvoice } from "../../lib/api/orders";

interface Props {
  order?: Order;
}

export default function PaymentSummary({ order }: Props) {
  const { id } = useParams();

  const { mutateAsync: downloadInvoice, isPending } = useDownloadInvoice();

  const printInvoice = async () => {
    try {
      const res = await downloadInvoice(id as string);
      const invoiceUrl = res?.invoiceUrl;

      if (!invoiceUrl) {
        console.error("Invoice URL not found", res);
        return;
      }

      const link = document.createElement("a");
      link.href = invoiceUrl;

      // 👇 dynamic filename
      link.setAttribute("download", `Invoice-${order?.orderNumber}.pdf`);

      link.style.display = "none";

      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (err) {
      console.error("Failed to download invoice:", err);
    }
  };

  return (
    <div className="bg-white border rounded-xl p-5 shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <h3 className="text-lg font-semibold">Payment Summary</h3>

        <button
          onClick={printInvoice}
          disabled={isPending} // optional: prevent double clicks
          className={`flex items-center gap-2 px-3 py-1.5 border rounded-md text-sm text-purple-700 hover:bg-purple-50 border-purple-600 ${
            isPending ? "opacity-70 cursor-not-allowed" : ""
          }`}
        >
          <Receipt size={16} />
          {isPending ? "Printing..." : "Print Invoice"}
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

        {/* Discount */}
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-2 text-gray-600">
            <Tag size={16} className="text-red-600" />
            <span>Discount</span>
          </div>
          <div className="font-medium text-red-600">
            - ₦{order?.discount?.toLocaleString() ?? "0"}
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
