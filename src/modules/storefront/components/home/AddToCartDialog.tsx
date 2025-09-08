import React, { useState } from "react";
import { Product } from "../../types/products";

const AddToCartDialog: React.FC<{
  product: Product | null;
  onClose: () => void;
}> = ({ product, onClose }) => {
  if (!product) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
        >
          ✕
        </button>
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-48 object-cover rounded mb-4"
        />
        <h2 className="text-xl font-semibold mb-2">{product.name}</h2>
        <div className="mb-4">
          {product.oldPrice && (
            <span className="text-gray-500 line-through mr-2">
              ₦{product.oldPrice}
            </span>
          )}
          <span className="text-purple-600 font-bold">₦{product.price}</span>
        </div>

        {/* Attributes */}
        {product.attributes &&
          product.attributes.map((attr, i) => (
            <div key={i} className="mb-4">
              <label className="block text-sm font-medium mb-1">
                {attr.name}
              </label>
              <select className="w-full border border-gray-300 rounded px-2 py-2 focus:ring-purple-500 focus:border-purple-500">
                {attr.options.map((opt, j) => (
                  <option key={j} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            </div>
          ))}

        <button className="w-full py-2 bg-purple-600 text-white rounded hover:bg-purple-700">
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default AddToCartDialog;
