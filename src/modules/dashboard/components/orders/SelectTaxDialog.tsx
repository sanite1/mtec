import React, { useState } from "react";
import { Loader2 } from "lucide-react";
import { getDecodedJwt } from "../../lib/auth";
import { useStoreTaxes } from "../../lib/api/taxes";
import { useDebounce } from "./SelectProductsDialog";

interface Props {
  open: boolean;
  onClose: () => void;
  location: string;
  onSave: (tax: {
    _id: string;
    name: string;
    rate: number;
    value: number;
  }) => void;
}

export default function SelectTaxDialog({
  open,
  onClose,
  location,
  onSave,
}: Props) {
  const user = getDecodedJwt();
  const userId = user?.id;

  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 400);

  const { data, isLoading, error } = useStoreTaxes(userId, {
    location,
    search: debouncedSearch,
  });

  if (!open) return null;

  console.log(data?.taxes);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="fixed inset-0 bg-black/50" onClick={onClose} />

      <div className="relative bg-white w-full max-w-md rounded-xl p-6 z-10 mx-4">
        <h3 className="text-lg font-semibold mb-3">Select Tax</h3>

        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search taxes..."
          className="w-full rounded-lg border px-3 py-2 text-base"
        />

        {isLoading && (
          <div className="flex justify-center py-8">
            <Loader2 className="animate-spin text-purple-600" />
          </div>
        )}

        {data?.total === 0 && (
          <div className="flex items-center justify-center py-10">
            {location ? (
              <span className="ml-2 text-gray-600">
                No taxes found for this location...
              </span>
            ) : (
              <span className="ml-2 text-gray-600">No taxes found...</span>
            )}
          </div>
        )}

        {error && (
          <p className="text-red-600 text-center py-6">Failed to load taxes</p>
        )}

        <div className="mt-4 space-y-2 max-h-64 overflow-y-auto">
          {data?.taxes?.map((tax) => (
            <div
              key={tax._id}
              onClick={() => {
                onSave({
                  _id: tax._id,
                  name: tax.name,
                  rate: tax.rate,
                  value: tax.rate,
                });
                onClose();
              }}
              className="flex justify-between items-center p-3 border rounded-lg cursor-pointer hover:bg-gray-50"
            >
              <p className="font-medium">{tax.name}</p>
              <p className="text-sm text-gray-600">{tax.rate}%</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
