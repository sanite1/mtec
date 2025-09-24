// components/locations/DeleteLocationModal.tsx
import React from "react";
import { X } from "lucide-react";

interface DeleteLocationModalProps {
  locationName: string;
  onClose: () => void;
  onConfirm: () => void;
}

export default function DeleteLocationModal({
  locationName,
  onClose,
  onConfirm,
}: DeleteLocationModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      ></div>

      {/* Modal Content */}
      <div className="relative bg-white w-full max-w-md rounded-lg shadow-lg p-6 z-10">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-gray-800">
            Delete Location
          </h2>
          <button onClick={onClose}>
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Body */}
        <p className="text-gray-600 mb-6">
          Are you sure you want to delete <strong>{locationName}</strong>? This
          action cannot be undone.
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
            className="px-6 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
