import React, { useState } from "react";

interface AdjustQuantityModalProps {
  onClose: () => void;
  onConfirm: (data: {
    type: "added" | "removed" | "returned";
    quantity: number;
    note?: string;
  }) => void;
  loading?: boolean;
  productName?: string;
}

export default function AdjustQuantityModal({
  onClose,
  onConfirm,
  loading = false,
  productName,
}: AdjustQuantityModalProps) {
  const [type, settype] = useState<"added" | "removed" | "returned">("added");
  const [quantity, setQuantity] = useState<number>(0);
  const [note, setNote] = useState<string>("");

  const handleSubmit = () => {
    if (quantity <= 0) return alert("Please enter a valid quantity.");
    onConfirm({ type, quantity, note });
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
          Adjust Quantity
        </h3>
        <p className="text-sm text-gray-500 mb-4">
          Modify stock level for{" "}
          <span className="font-medium text-gray-700">{productName}</span>.
        </p>

        {/* type Selector */}
        <label className="block text-sm font-medium text-gray-700 mb-1">
          type
        </label>
        <select
          value={type}
          onChange={(e) => settype(e.target.value as any)}
          className="w-full border border-gray-300 rounded-lg p-2 mb-4 focus:ring-2 focus:ring-black/20"
        >
          <option value="added">Add</option>
          <option value="removed">Remove</option>
          <option value="returned">Return</option>
        </select>

        {/* Quantity Input */}
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Quantity
        </label>
        <input
          type="number"
          min="1"
          value={quantity}
          onChange={(e) => setQuantity(Number(e.target.value))}
          className="w-full border border-gray-300 rounded-lg p-2 mb-4 focus:ring-2 focus:ring-black/20"
          placeholder="Enter quantity"
        />

        {/* Optional Note */}
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Note (optional)
        </label>
        <textarea
          value={note}
          onChange={(e) => setNote(e.target.value)}
          rows={2}
          className="w-full border border-gray-300 rounded-lg p-2 mb-4 resize-none focus:ring-2 focus:ring-black/20"
          placeholder="Reason for adjustment (optional)"
        ></textarea>

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
            className={
              "px-4 py-2 rounded-lg flex items-center justify-center gap-2 transition text-white bg-purple-600 hover:bg-purple-700"
            }
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
