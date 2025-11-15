// components/discounts/DeleteDiscountModal.tsx
import React from "react";
import { X } from "lucide-react";

interface DeleteDiscountModalProps {
  discountName: string;
  loading: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const DeleteDiscountModal: React.FC<DeleteDiscountModalProps> = ({
  discountName,
  onClose,
  onConfirm,
  loading,
}) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      ></div>

      {/* Modal */}
      <div className="relative bg-white rounded-lg shadow-lg w-full max-w-md p-6 z-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">Delete Discount</h2>
          <button onClick={onClose}>
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Body */}
        <p className="text-gray-700 mb-6">
          Are you sure you want to delete the discount{" "}
          <span className="font-semibold">{discountName}</span>? This action
          cannot be undone.
        </p>

        {/* Actions */}
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
};

export default DeleteDiscountModal;
