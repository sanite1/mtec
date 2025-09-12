import React from "react";

interface DeleteModalProps {
  onClose: () => void;
  onConfirm: () => void;
}
export default function DeleteModal({ onClose, onConfirm }: DeleteModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Background Blur */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      ></div>

      {/* Modal Content */}
      <div className="relative bg-white w-full max-w-md rounded-xl shadow-lg p-6 z-10">
        <h3 className="text-lg font-semibold text-gray-800">
          Confirm Deletion
        </h3>
        <p className="text-sm text-gray-500 mt-2">
          Are you sure you want to delete your account? This action cannot be
          undone.
        </p>

        <div className="mt-6 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg border text-gray-700 hover:bg-gray-100 transition"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 transition"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
