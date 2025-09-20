// components/taxes/DeleteTaxModal.tsx
import React from "react";

interface DeleteTaxModalProps {
  taxName: string;
  onClose: () => void;
  onConfirm: () => void;
}

export default function DeleteTaxModal({
  taxName,
  onClose,
  onConfirm,
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
            className="px-6 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
