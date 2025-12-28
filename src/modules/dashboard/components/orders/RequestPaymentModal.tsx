import React from "react";

interface RequestPaymentModalProps {
  onClose: () => void;
  onConfirm: () => void;
  loading?: boolean;
  currentStatus: "unpaid" | "paid" | "refunded";
  orderId?: string;
}

export default function RequestPaymentModal({
  onClose,
  onConfirm,
  loading = false,
  currentStatus,
  orderId,
}: RequestPaymentModalProps) {
  const isAllowed = currentStatus === "unpaid";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-white w-full max-w-md rounded-xl shadow-lg p-6 z-10 mx-4">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 pb-4 border-b">
          Request Payment
        </h3>

        <p className="text-sm text-gray-500 mb-4">
          Send a payment request for order{" "}
          <span className="font-medium text-gray-700">#{orderId}</span>.
        </p>

        {/* Status Info */}
        <div className="mb-4">
          <p className="text-sm text-gray-600">
            Current Payment Status:{" "}
            <span className="font-semibold text-gray-800">{currentStatus}</span>
          </p>
        </div>

        {/* Explanation */}
        <div
          className={`text-sm mb-6 ${
            isAllowed ? "text-green-600" : "text-red-600"
          }`}
        >
          {isAllowed
            ? "This will notify the customer to complete payment for this order."
            : "Payment cannot be requested because this order is already paid or refunded."}
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-3 pt-4 border-t">
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
            onClick={onConfirm}
            disabled={!isAllowed || loading}
            className={`px-4 py-2 rounded-lg flex items-center justify-center gap-2 transition text-white ${
              isAllowed
                ? "bg-purple-600 hover:bg-purple-700"
                : "bg-gray-400 cursor-not-allowed"
            }`}
          >
            {loading && (
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
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                />
              </svg>
            )}
            {loading ? "Sending..." : "Request Payment"}
          </button>
        </div>
      </div>
    </div>
  );
}
