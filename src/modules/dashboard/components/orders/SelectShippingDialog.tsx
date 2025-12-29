"use client";
import React, { useState } from "react";
import { CheckCircle, Loader2 } from "lucide-react";
import { getDecodedJwt } from "../../lib/auth";
import { useStoreShipping } from "../../lib/api/shipping";
import { useDebounce } from "./SelectProductsDialog";

interface Props {
  open: boolean;
  onClose: () => void;
  location: string;
  onSave: (shipping: { _id: string; name: string; price: number }) => void;
}

export default function SelectShippingDialog({
  open,
  onClose,
  location,
  onSave,
}: Props) {
  const user = getDecodedJwt();
  const userId = user?.id;

  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 400);
  const { data, isLoading, error } = useStoreShipping(userId, {
    location,
    search: debouncedSearch,
  });

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="fixed inset-0 bg-black/50" onClick={onClose} />

      <div className="relative bg-white w-full max-w-md rounded-xl p-6 z-10 mx-4">
        <h3 className="text-lg font-semibold mb-3">Select Shipping Method</h3>

        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search shipping methods..."
          className="text-base w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
        {search && (
          <p className="mt-1 text-xs text-gray-500">
            Showing results for “{search}”
          </p>
        )}
        {isLoading && (
          <div className="flex justify-center py-8">
            <Loader2 className="animate-spin text-purple-600" />
          </div>
        )}

        {error && (
          <p className="text-red-600 text-center py-6">
            Failed to load shipping methods
          </p>
        )}

        <div className="mt-4 space-y-2 max-h-64 overflow-y-auto">
          {data?.shipping?.map((method) => (
            <div
              key={method._id}
              onClick={() => {
                onSave({
                  _id: method._id,
                  name: method.name,
                  price: method.price,
                });
                onClose();
              }}
              className="flex justify-between items-center p-3 border rounded-lg cursor-pointer hover:bg-gray-50"
            >
              <div>
                <p className="font-medium">{method.name}</p>
                <p className="text-sm text-gray-600">
                  ₦{method.price.toLocaleString()}
                </p>
              </div>
              <p className="font-medium text-sm text-purple-600">
                {method.estimatedDeliveryDays} days
              </p>
              {/* <CheckCircle className="text-purple-600" size={18} /> */}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
