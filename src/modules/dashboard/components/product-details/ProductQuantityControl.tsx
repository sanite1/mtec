import React, { useState } from "react";

export default function ProductQuantityControl() {
  const [quantity, setQuantity] = useState(400);

  return (
    <div className="bg-white shadow rounded-lg p-4">
      <h3 className="text-lg font-semibold mb-3">Quantity</h3>
      <div className="flex items-center gap-3">
        <button
          onClick={() => setQuantity((q) => Math.max(q - 1, 0))}
          className="px-3 py-1 bg-gray-500 text-white rounded hover:bg-gray-600 cursor-pointer"
        >
          Remove
        </button>
        <span className="font-semibold">{quantity}</span>
        <button
          onClick={() => setQuantity((q) => q + 1)}
          className="px-3 py-1 bg-gray-500 text-white rounded hover:bg-gray-600 cursor-pointer"
        >
          Add
        </button>
      </div>
    </div>
  );
}
