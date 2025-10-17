// components/location/LocationHeader.tsx
import React, { useState } from "react";
import { MapPin, Plus, AlertCircle } from "lucide-react";
import EditLocationSidebar from "./LocationFormSidebar";

export default function LocationHeader() {
  const [editTarget, setEditTarget] = useState(false);

  return (
    <div>
      {/* Progress / Next Step */}
      <div className="my-4 flex items-center justify-between bg-purple-50 border border-purple-200 rounded-md p-4">
        <div>
          <p className="text-sm font-medium text-gray-800">
            Active Location Slots: <span className="text-purple-600">3</span>
          </p>
          <div className="mt-2 flex items-center gap-2 text-gray-700 bg-gray-50 px-4 py-3 rounded-lg border border-gray-200 w-full max-w-2xl">
            <AlertCircle size={18} />
            <span className="text-sm">
              Deactivated locations are those made inactive or closed.
            </span>
          </div>
        </div>
        <button
          //   onClick={() => {
          //     navigate("/locations/add");
          //   }}
          className="flex items-center gap-2 px-3 py-2 rounded-lg bg-purple-600 text-white font-medium hover:bg-purple-700"
        >
          <Plus size={18} />
          Get More Slots
        </button>
      </div>

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold">Locations</h1>
          <p className="text-gray-600 mt-1">
            Manage your business locations and their details
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={() => {
              setEditTarget(true);
            }}
            className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white text-purple-600 border border-purple-600 font-medium hover:bg-purple-100"
          >
            <MapPin size={20} />
            Add Location
          </button>
        </div>
      </div>

      {editTarget && (
        <EditLocationSidebar
          onClose={() => setEditTarget(false)}
          onSave={(updated) => {
            console.log("Updated:", updated);
            setEditTarget(false);
          }}
        />
      )}
    </div>
  );
}
