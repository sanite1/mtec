import React, { useState } from "react";
import { Check } from "lucide-react";

const products = [
  { id: "1", name: "Product A", price: "₦20,000" },
  { id: "2", name: "Product B", price: "₦45,000" },
  { id: "3", name: "Product C", price: "₦75,000" },
];

interface SelectProductsDialogProps {
  open: boolean;
  onClose: () => void;
  onSave: (selected: { id: string; name: string; price: string }[]) => void;
}

export default function SelectProductsDialog({
  open,
  onClose,
  onSave,
}: SelectProductsDialogProps) {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const toggleSelection = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id],
    );
  };

  const handleSave = () => {
    const selectedProducts = products.filter((p) => selectedIds.includes(p.id));
    onSave(selectedProducts);
    onClose();
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Background Blur */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      ></div>

      {/* Modal Content */}
      <div className="relative bg-white w-full max-w-lg rounded-xl shadow-lg p-6 z-10 mx-4">
        <h3 className="text-lg font-semibold text-gray-800">Select Products</h3>
        <p className="text-sm text-gray-500 mt-1">
          Choose one or more products from the list below.
        </p>

        {/* Product List */}
        <div className="mt-4 space-y-3 max-h-64 overflow-y-auto">
          {products.map((p) => (
            <div
              key={p.id}
              onClick={() => toggleSelection(p.id)}
              className={`flex items-center justify-between p-3 border rounded-lg cursor-pointer transition ${
                selectedIds.includes(p.id)
                  ? "border-purple-600 bg-purple-50"
                  : "border-gray-200 hover:border-gray-300"
              }`}
            >
              <div>
                <p className="font-medium text-gray-800">{p.name}</p>
                <p className="text-sm text-gray-500">{p.price}</p>
              </div>
              {selectedIds.includes(p.id) && (
                <Check className="text-purple-600" size={20} />
              )}
            </div>
          ))}
        </div>

        {/* Buttons */}
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
