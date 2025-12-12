import React, { useState, useEffect } from "react";
import { toast } from "sonner";

interface EditShippingStatusModalProps {
  onClose: () => void;
  onConfirm: (
    newStatus: "pending" | "processing" | "shipped" | "delivered",
  ) => void;
  loading?: boolean;
  previousStatus?: "pending" | "processing" | "shipped" | "delivered";
}

export default function EditShippingStatusModal({
  onClose,
  onConfirm,
  loading = false,
  previousStatus = "pending",
}: EditShippingStatusModalProps) {
  const [status, setStatus] = useState<
    "pending" | "processing" | "shipped" | "delivered"
  >(previousStatus);

  const [infoMessage, setInfoMessage] = useState("");

  // Valid transitions
  const validTransitions: Record<string, string[]> = {
    pending: ["processing"],
    processing: ["shipped"],
    shipped: ["delivered"],
    delivered: [], // final state
  };

  // Determine available options for the dropdown
  const getStatusOptions = () => {
    const next = validTransitions[previousStatus] ?? [];
    return [
      { value: previousStatus, label: capitalize(previousStatus) },
      ...next.map((s) => ({ value: s, label: capitalize(s) })),
    ];
  };

  function capitalize(str: string) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  // Info message based on transition
  useEffect(() => {
    if (status === previousStatus) {
      setInfoMessage("No status change detected.");
      return;
    }

    if (!validTransitions[previousStatus].includes(status)) {
      setInfoMessage(
        `Invalid transition. You can only move from '${previousStatus}' → '${validTransitions[
          previousStatus
        ].join(", ")}'.`,
      );
      return;
    }

    // Helpful messages per transition
    const messages: Record<string, string> = {
      processing: "Order is now being prepared for shipping.",
      shipped: "Order has been handed over to the courier.",
      delivered: "Order has been successfully delivered.",
    };

    setInfoMessage(messages[status] ?? "");
  }, [status, previousStatus]);

  // Handle confirm/update
  const handleSubmit = () => {
    const allowed = validTransitions[previousStatus].includes(status);

    if (!allowed) {
      toast.error(
        `Invalid transition. Allowed: ${validTransitions[previousStatus].join(
          ", ",
        )}`,
      );
      return;
    }

    onConfirm(status);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-white w-full max-w-md rounded-xl shadow-lg p-6 z-10 mx-4">
        <h3 className="text-lg font-semibold text-gray-800 mb-1">
          Edit Shipping Status
        </h3>

        <p className="text-sm text-gray-500 mb-4">
          Current status:
          <span className="font-medium text-gray-800 capitalize ml-1">
            {previousStatus}
          </span>
        </p>

        {/* New status select */}
        <label className="block text-sm font-medium text-gray-700 mb-1">
          New Status
        </label>

        <select
          value={status}
          onChange={(e) =>
            setStatus(
              e.target.value as
                | "pending"
                | "processing"
                | "shipped"
                | "delivered",
            )
          }
          disabled={validTransitions[previousStatus]?.length === 0}
          className="w-full border border-gray-300 rounded-lg p-2 mb-4 focus:ring-2 focus:ring-purple-500 disabled:opacity-60"
        >
          {getStatusOptions().map((opt) => (
            <option value={opt.value} key={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>

        {/* Info text */}
        <div
          className={`text-sm mb-4 ${
            infoMessage.includes("Invalid") ? "text-red-500" : "text-purple-700"
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
              previousStatus === "delivered" ||
              previousStatus === status
            }
            className={`px-4 py-2 rounded-lg flex items-center justify-center gap-2 transition text-white ${
              loading ||
              previousStatus === "delivered" ||
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
