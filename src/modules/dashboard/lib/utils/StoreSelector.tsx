import React, { useMemo, useState } from "react";
import { X } from "lucide-react";
import { IStoreDetails } from "../../lib/types/store";
import { Location } from "../../lib/types/locations";
import { useStoreLocations } from "../api/locations";
import { getDecodedJwt } from "../auth";

type Props = {
  open: boolean;
  onClose: () => void;
  onSelect: (location: Location) => void;
};

export default function StoreSelector({ open, onClose, onSelect }: Props) {
  const user = getDecodedJwt();

  const { data, isLoading, isError } = useStoreLocations(user?.id);

  const [selectedId, setSelectedId] = useState<string | "">("");

  const selectedLocation = useMemo(() => {
    return data?.locations?.find((loc: Location) => loc._id === selectedId);
  }, [selectedId, data]);

  console.log(selectedLocation);

  const handleSubmit = () => {
    if (!selectedLocation) return;

    onSelect(selectedLocation);
    onClose();
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center px-4 sm:px-6">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
      />

      {/* Modal */}
      <div className="relative z-50 w-full max-w-md bg-white rounded-2xl shadow-xl overflow-hidden animate-fadeIn">
        {/* Header */}
        <header className="relative px-6 py-5 border-b">
          <h2 className="text-lg font-semibold text-gray-900">
            Select Location
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            Pick a location to apply this setting to.
          </p>

          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 transition"
          >
            <X className="w-4 h-4 text-gray-600" />
          </button>
        </header>

        {/* Body */}
        <div className="px-6 py-6 space-y-6 bg-gray-50">
          {/* Loading */}
          {isLoading && (
            <p className="text-sm text-gray-500 text-center">
              Loading locations…
            </p>
          )}

          {/* Error */}
          {isError && (
            <p className="text-sm text-red-500 text-center">
              Failed to load locations.
            </p>
          )}

          {/* Empty */}
          {!isLoading && data?.locations?.length === 0 && (
            <p className="text-sm text-gray-500 text-center">
              No locations available.
            </p>
          )}

          {/* ✅ SELECT FIELD */}
          {!isLoading && data?.locations && data?.locations?.length > 0 && (
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Choose a location
              </label>

              <div className="relative">
                <select
                  value={selectedId}
                  onChange={(e) => setSelectedId(e.target.value)}
                  className="w-full appearance-none border rounded-lg px-4 py-3 pr-10 bg-white focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition"
                >
                  <option value="">Select location…</option>

                  {data?.locations.map((loc: Location) => (
                    <option key={loc._id} value={loc._id}>
                      {loc.name}
                    </option>
                  ))}
                </select>

                {/* Dropdown icon */}
                <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                  ▼
                </span>
              </div>

              {/* Selected label preview */}
              {selectedLocation && (
                <p className="text-xs text-gray-500">
                  Selected:{" "}
                  <span className="font-medium text-gray-700">
                    {selectedLocation.name}
                  </span>
                </p>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <footer className="flex items-center justify-end gap-3 px-6 py-4 border-t bg-white">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm border rounded-lg hover:bg-gray-100 transition"
          >
            Cancel
          </button>

          <button
            disabled={!selectedId}
            onClick={handleSubmit}
            className={`px-5 py-2 text-sm rounded-lg font-medium text-white transition ${
              selectedId
                ? "bg-purple-600 hover:bg-purple-700"
                : "bg-gray-400 cursor-not-allowed"
            }`}
          >
            Confirm
          </button>
        </footer>
      </div>
    </div>
  );
}
