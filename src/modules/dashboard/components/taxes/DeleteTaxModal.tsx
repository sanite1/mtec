// components/taxes/DeleteTaxModal.tsx
import React from "react";

interface DeleteTaxModalProps {
  taxName: string;
  onClose: () => void;
  onConfirm: () => void;
  loading?: boolean;
}

export default function DeleteTaxModal({
  taxName,
  onClose,
  onConfirm,
  loading = false,
}: DeleteTaxModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50" onClick={onClose}></div>

      {/* Modal */}
      <div className="relative bg-white rounded-lg shadow-lg w-full max-w-md p-6 z-10">
        <h2 className="text-lg font-semibold text-gray-800 mb-2">Delete Tax</h2>
        <p className="text-gray-600 mb-4">
          Are you sure you want to delete the tax{" "}
          <span className="font-semibold">{taxName}</span>? This action cannot
          be undone.
        </p>

        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 border rounded hover:bg-gray-50"
          >
            Cancel
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
            {loading ? "Deleting..." : "Delete"}
          </button>
        </div>
      </div>
    </div>
  );
}
