import React, { useState, useEffect } from "react";
import { toast } from "sonner";

interface EditOrderStatusModalProps {
  onClose: () => void;
  onConfirm: (newStatus: "pending" | "completed" | "cancelled") => void;
  loading?: boolean;
  previousStatus: "pending" | "completed" | "cancelled";
}

export default function EditOrderStatusModal({
  onClose,
  onConfirm,
  loading = false,
  previousStatus,
}: EditOrderStatusModalProps) {
  const [status, setStatus] = useState<"pending" | "completed" | "cancelled">(
    previousStatus,
  );
  const [infoMessage, setInfoMessage] = useState<string>("");

  // Explain behavior based on valid transitions
  useEffect(() => {
    if (previousStatus === "pending" && status === "completed") {
      setInfoMessage(
        "Completing this order will deduct stock quantities and record 'sold' in ProductHistory.",
      );
    } else if (previousStatus === "completed" && status === "cancelled") {
      setInfoMessage(
        "Cancelling this order will restore stock quantities and record 'cancelled' in ProductHistory.",
      );
    } else if (previousStatus === status) {
      setInfoMessage("No status change detected.");
    } else {
      setInfoMessage(
        "Invalid status change. You can only move from 'pending → completed' or 'completed → cancelled'.",
      );
    }
  }, [status, previousStatus]);

  const handleSubmit = () => {
    // Enforce allowed transitions
    const validTransition =
      (previousStatus === "pending" && status === "completed") ||
      (previousStatus === "completed" && status === "cancelled");

    if (!validTransition) {
      toast.error(
        "Invalid transition. You can only change from 'pending → completed' or 'completed → cancelled'.",
      );
      return;
    }

    onConfirm(status);
  };

  const getStatusOptions = () => {
    switch (previousStatus) {
      case "pending":
        return [
          { value: "pending", label: "Pending" },
          { value: "completed", label: "Completed" },
        ];
      case "completed":
        return [
          { value: "completed", label: "Completed" },
          { value: "cancelled", label: "Cancelled" },
        ];
      default:
        return [{ value: "cancelled", label: "Cancelled" }];
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      ></div>

      {/* Modal */}
      <div className="relative bg-white w-full max-w-md rounded-xl shadow-lg p-6 z-10 mx-4">
        <h3 className="text-lg font-semibold text-gray-800 mb-1">
          Edit Order Status
        </h3>
        <p className="text-sm text-gray-500 mb-4">
          Current status:{" "}
          <span className="font-medium text-gray-800 capitalize">
            {previousStatus}
          </span>
        </p>

        {/* Select New Status */}
        <label className="block text-sm font-medium text-gray-700 mb-1">
          New Status
        </label>
        <select
          value={status}
          onChange={(e) =>
            setStatus(e.target.value as "pending" | "completed" | "cancelled")
          }
          disabled={previousStatus === "cancelled"}
          className="w-full border border-gray-300 rounded-lg p-2 mb-4 focus:ring-2 focus:ring-purple-500 disabled:opacity-60"
        >
          {getStatusOptions().map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>

        {/* Info Message */}
        <div
          className={`text-sm mb-4 ${
            infoMessage.includes("Invalid")
              ? "text-red-500"
              : infoMessage.includes("restore") ||
                  infoMessage.includes("deduct")
                ? "text-purple-600"
                : "text-gray-500"
          }`}
        >
          {infoMessage}
        </div>

        {/* Footer */}
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
            disabled={
              loading ||
              previousStatus === "cancelled" ||
              previousStatus === status
            }
            className={`px-4 py-2 rounded-lg flex items-center justify-center gap-2 transition text-white ${
              loading ||
              previousStatus === "cancelled" ||
              previousStatus === status
                ? "opacity-75 cursor-not-allowed bg-purple-400"
                : "bg-purple-600 hover:bg-purple-700"
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
            {loading ? "Updating..." : "Confirm"}
          </button>
        </div>
      </div>
    </div>
  );
}
