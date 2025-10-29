"use client";
import React, { useState } from "react";
import { Check, Loader2 } from "lucide-react";
import { getDecodedJwt } from "../../lib/auth";
import { useUserProducts } from "../../lib/api/products";

interface SelectProductsDialogProps {
  open: boolean;
  onClose: () => void;
  onSave: (
    selected: {
      productId: string;
      variationId?: string;
      price?: number;
      name?: string;
      sku?: string;
      quantity: number;
    }[],
  ) => void;
}

export default function SelectProductsDialog({
  open,
  onClose,
  onSave,
}: SelectProductsDialogProps) {
  const user = getDecodedJwt();
  const userId = user?.id;

  const { data, isLoading, error } = useUserProducts(userId);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const toggleSelection = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id],
    );
  };

  const handleSave = () => {
    const selectedProducts =
      data?.products
        ?.filter((p) => selectedIds.includes(p._id))
        ?.map((p) => ({
          productId: p._id,
          name: p.name,
          price: p.price ?? 0,
          sku: p.sku ?? "",
          quantity: 1,
        })) || [];

    onSave(selectedProducts);
    onClose();
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-white w-full max-w-lg rounded-xl shadow-lg p-6 z-10 mx-4">
        <h3 className="text-lg font-semibold text-gray-800">Select Products</h3>
        <p className="text-sm text-gray-500 mt-1">
          Choose one or more products from your catalog.
        </p>

        {/* Loading */}
        {isLoading && (
          <div className="flex items-center justify-center py-10">
            <Loader2 className="w-6 h-6 text-purple-600 animate-spin" />
            <span className="ml-2 text-gray-600">Loading products...</span>
          </div>
        )}

        {/* Error */}
        {error && (
          <p className="text-red-600 text-center py-6">
            Failed to load products.
          </p>
        )}

        {/* Product List */}
        {!isLoading && !error && (
          <div className="mt-4 space-y-3 max-h-64 overflow-y-auto">
            {data?.products?.length ? (
              data.products.map((p) => (
                <div
                  key={p._id}
                  onClick={() => toggleSelection(p._id)}
                  className={`flex items-center justify-between p-3 border rounded-lg cursor-pointer transition ${
                    selectedIds.includes(p._id)
                      ? "border-purple-600 bg-purple-50"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <div>
                    <p className="font-medium text-gray-800">{p.name}</p>
                    <p className="text-sm text-gray-500">
                      ₦{p.price?.toLocaleString() || "0"}
                    </p>
                  </div>
                  {selectedIds.includes(p._id) && (
                    <Check className="text-purple-600" size={20} />
                  )}
                </div>
              ))
            ) : (
              <p className="text-sm text-gray-500 text-center py-4">
                No products found.
              </p>
            )}
          </div>
        )}

        {/* Footer Buttons */}
        <div className="mt-6 flex justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-lg border text-gray-700 hover:bg-gray-100 transition"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSave}
            disabled={selectedIds.length === 0}
            className="px-4 py-2 rounded-lg bg-purple-600 text-white hover:bg-purple-700 transition disabled:opacity-50"
          >
            Add Selected
          </button>
        </div>
      </div>
    </div>
  );
}
