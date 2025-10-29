import React from "react";

interface CancelOrderModalProps {
  onClose: () => void;
  onConfirm: () => void;
  loading?: boolean;
  currentStatus: string;
}

export default function CancelOrderModal({
  onClose,
  onConfirm,
  loading = false,
  currentStatus,
}: CancelOrderModalProps) {
  const isAlreadyCancelled = currentStatus === "cancelled";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      ></div>

      {/* Modal Content */}
      <div className="relative bg-white w-full max-w-md rounded-xl shadow-lg p-6 z-10 mx-4">
        {isAlreadyCancelled ? (
          <>
            <h3 className="text-lg font-semibold text-red-600">
              Order Already Cancelled
            </h3>
            <p className="text-sm text-gray-600 mt-2">
              This order has already been marked as <b>cancelled</b>. No further
              action is required.
            </p>
            <div className="mt-6 flex justify-end">
              <button
                onClick={onClose}
                className="px-4 py-2 rounded-lg border text-gray-700 hover:bg-gray-100"
              >
                Close
              </button>
            </div>
          </>
        ) : (
          <>
            <h3 className="text-lg font-semibold text-gray-800">
              Confirm Order Cancellation
            </h3>
            <p className="text-sm text-gray-500 mt-2">
              Are you sure you want to cancel this order? This will update the
              order status to <b>cancelled</b> and restore product stock if it
              has been deducted.
            </p>

            <div className="mt-6 flex justify-end gap-3">
              <button
                onClick={onClose}
                disabled={loading}
                className={`px-4 py-2 rounded-lg border text-gray-700 transition ${
                  loading
                    ? "opacity-50 cursor-not-allowed"
                    : "hover:bg-gray-100"
                }`}
              >
                Close
              </button>
              <button
                onClick={onConfirm}
                disabled={loading}
                className={`px-4 py-2 rounded-lg bg-red-600 text-white flex items-center justify-center gap-2 transition ${
                  loading ? "opacity-75 cursor-not-allowed" : "hover:bg-red-700"
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
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                    ></path>
                  </svg>
                )}
                {loading ? "Cancelling..." : "Confirm Cancel"}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
