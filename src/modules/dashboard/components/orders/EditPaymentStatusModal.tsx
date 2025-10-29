import React, { useState, useMemo } from "react";

interface EditPaymentStatusModalProps {
  onClose: () => void;
  onConfirm: (data: { paymentStatus: "unpaid" | "paid" | "refunded" }) => void;
  loading?: boolean;
  currentStatus: "unpaid" | "paid" | "refunded";
  orderId?: string;
}

export default function EditPaymentStatusModal({
  onClose,
  onConfirm,
  loading = false,
  currentStatus,
  orderId,
}: EditPaymentStatusModalProps) {
  const [paymentStatus, setNewStatus] = useState<
    "unpaid" | "paid" | "refunded"
  >(currentStatus);

  // Determine allowed transitions
  const { allowed, explanation } = useMemo(() => {
    if (currentStatus === "unpaid" && paymentStatus === "paid") {
      return {
        allowed: true,
        explanation:
          "Changing from 'unpaid' → 'paid' will deduct stock for this order and mark it as paid.",
      };
    }
    if (currentStatus === "paid" && paymentStatus === "refunded") {
      return {
        allowed: true,
        explanation:
          "Changing from 'paid' → 'refunded' will restore stock and mark payment as refunded.",
      };
    }
    if (currentStatus === paymentStatus) {
      return {
        allowed: false,
        explanation:
          "This order already has that payment status — no change needed.",
      };
    }
    return {
      allowed: false,
      explanation:
        "Invalid transition. You can only move from 'unpaid' → 'paid' or from 'paid' → 'refunded'.",
    };
  }, [currentStatus, paymentStatus]);

  const handleSubmit = () => {
    if (!allowed) {
      alert(explanation);
      return;
    }
    onConfirm({ paymentStatus });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Background Blur */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      ></div>

      {/* Modal Content */}
      <div className="relative bg-white w-full max-w-md rounded-xl shadow-lg p-6 z-10 mx-4">
        <h3 className="text-lg font-semibold text-gray-800 mb-1">
          Edit Payment Status
        </h3>
        <p className="text-sm text-gray-500 mb-4">
          Modify the payment status for order{" "}
          <span className="font-medium text-gray-700">#{orderId}</span>.
        </p>

        {/* Current Status */}
        <div className="mb-4">
          <p className="text-sm text-gray-600">
            Current Status:{" "}
            <span className="font-semibold text-gray-800">{currentStatus}</span>
          </p>
        </div>

        {/* Status Selector */}
        <label className="block text-sm font-medium text-gray-700 mb-1">
          New Payment Status
        </label>
        <select
          value={paymentStatus}
          onChange={(e) => setNewStatus(e.target.value as any)}
          className="w-full border border-gray-300 rounded-lg p-2 mb-3 focus:ring-2 focus:ring-black/20"
        >
          <option value="unpaid">Unpaid</option>
          <option value="paid">Paid</option>
          <option value="refunded">Refunded</option>
        </select>

        {/* Explanation */}
        <div
          className={`text-sm mb-4 ${
            allowed ? "text-green-600" : "text-red-600"
          }`}
        >
          {explanation}
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            disabled={loading}
            className={`px-4 py-2 rounded-lg border text-gray-700 transition ${
              loading ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-100"
            }`}
          >
            Cancel
          </button>

          <button
            onClick={handleSubmit}
            disabled={loading}
            className={`px-4 py-2 rounded-lg flex items-center justify-center gap-2 transition text-white ${
              allowed
                ? "bg-purple-600 hover:bg-purple-700"
                : "bg-gray-400 cursor-not-allowed"
            }`}
          >
            {loading ? (
              <svg
                className="animate-spin h-4 w-4 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                ></path>
              </svg>
            ) : null}
            {loading ? "Processing..." : "Confirm"}
          </button>
        </div>
      </div>
    </div>
  );
}
