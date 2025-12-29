"use client";

import React, { useState } from "react";
import { Loader2, CheckCircle } from "lucide-react";
import { getDecodedJwt } from "../../lib/auth";
import { useDebounce } from "./SelectProductsDialog";
import { useStoreDiscounts } from "../../lib/api/discount";

interface Props {
  open: boolean;
  onClose: () => void;
  location?: string;
  onSave: (discount: {
    _id: string;
    name: string;
    type: string;
    value: number;
  }) => void;
}

export default function SelectDiscountDialog({
  open,
  onClose,
  location,
  onSave,
}: Props) {
  const user = getDecodedJwt();
  const userId = user?.id;

  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 400);

  const { data, isLoading, error } = useStoreDiscounts(userId, {
    search: debouncedSearch,
    location,
  });

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="fixed inset-0 bg-black/50" onClick={onClose} />

      <div className="relative bg-white w-full max-w-md rounded-xl p-6 z-10 mx-4">
        <h3 className="text-lg font-semibold mb-3">Select Discount</h3>

        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search discounts..."
          className="w-full rounded-lg border px-3 py-2 focus:ring-2 focus:ring-purple-500"
        />

        {isLoading && (
          <div className="flex justify-center py-8">
            <Loader2 className="animate-spin text-purple-600" />
          </div>
        )}

        {error && (
          <p className="text-red-600 text-center py-6">
            Failed to load discounts
          </p>
        )}

        <div className="mt-4 space-y-2 max-h-64 overflow-y-auto">
          {data?.discounts?.map((d) => (
            <div
              key={d._id}
              onClick={() => {
                onSave({
                  _id: d._id,
                  name: d.discountName,
                  type: d.discountType,
                  value: d.discountValue,
                });
                onClose();
              }}
              className="flex justify-between items-center p-3 border rounded-lg cursor-pointer hover:bg-gray-50"
            >
              <div>
                <p className="font-medium">{d.discountName}</p>
                <p className="text-sm text-gray-600">
                  {d.discountType === "percentage"
                    ? `${d.discountValue}% off`
                    : `₦${d.discountValue.toLocaleString()} off`}
                </p>
              </div>

              <CheckCircle className="text-purple-600" size={18} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
