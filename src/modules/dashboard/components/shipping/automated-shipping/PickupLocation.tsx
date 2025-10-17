// components/shipping/PickupLocationsSidebar.tsx
import React, { useState } from "react";
import { X, PlusCircle } from "lucide-react";
import boxEmpty from "../../../assets/boxEmpty.png";
import AddPickupLocationModal from "./AddPickupLoactionModal";

interface PickupLocation {
  id: string;
  storeLocation: string;
  locationName?: string;
  contactPhone: string;
  country: string;
  state: string;
  city: string;
  address: string;
}

interface PickupLocationsSidebarProps {
  onClose: () => void;
}

export default function PickupLocationsSidebar({
  onClose,
}: PickupLocationsSidebarProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [locations, setLocations] = useState<PickupLocation[]>([]);
  //   const [locations, setLocations] = useState<PickupLocation[]>([
  //     {
  //       id: "1",
  //       storeLocation: "Main Distribution Center",
  //       headquarters: "Lagos HQ",
  //       locationName: "Ikeja Branch",
  //       contactPhone: "+234 801 234 5678",
  //       country: "Nigeria",
  //       state: "Lagos",
  //       city: "Ikeja",
  //       address: "15 Awolowo Way, Ikeja, Lagos, Nigeria",
  //     },
  //   ]);

  // const handleAddLocation = (newLocation: PickupLocation) => {
  //   setLocations((prev) => [
  //     ...prev,
  //     { ...newLocation, id: Date.now().toString() },
  //   ]);
  // };

  return (
    <div className="fixed inset-0 z-50 flex">
      {/* Overlay */}
      <div
        className="flex-1 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      ></div>

      {/* Sidebar */}
      <div className="w-full sm:w-1/3 bg-white h-full shadow-2xl flex flex-col rounded-l-xl">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b">
          <h2 className="text-2xl font-semibold text-gray-800">
            Pickup Locations
          </h2>
          <button
            onClick={onClose}
            className="rounded-full p-1 hover:bg-gray-100 transition"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {locations.length === 0 ? (
            <div className="flex flex-col items-center justify-center text-center text-gray-500 h-60">
              <img
                src={boxEmpty}
                alt="No locations"
                className="w-32 h-32 mb-4 opacity-70"
              />
              <p>No pickup locations added yet.</p>
              <div className="px-5 mt-4">
                <button
                  onClick={() => setIsDialogOpen(true)}
                  className="w-fit flex items-center justify-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition"
                >
                  <PlusCircle className="w-5 h-5" />
                  Add Location
                </button>
              </div>
            </div>
          ) : (
            locations.map((loc) => (
              <div
                key={loc.id}
                className="border rounded-lg p-4 shadow-sm hover:shadow-md transition bg-gray-50"
              >
                <h3 className="font-semibold text-gray-800">
                  {loc.storeLocation}
                </h3>
                {loc.locationName && (
                  <p className="text-sm text-gray-600 italic">
                    {loc.locationName}
                  </p>
                )}
                <div className="mt-2 text-sm text-gray-700 space-y-1">
                  <p>
                    <span className="font-medium">Phone:</span>{" "}
                    {loc.contactPhone}
                  </p>
                  <p>
                    <span className="font-medium">Country:</span> {loc.country}
                  </p>
                  <p>
                    <span className="font-medium">State:</span> {loc.state}
                  </p>
                  <p>
                    <span className="font-medium">City:</span> {loc.city}
                  </p>
                  <p>
                    <span className="font-medium">Address:</span> {loc.address}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Add button */}
        {locations.length !== 0 && (
          <div className="px-5 mb-4">
            <button
              onClick={() => setIsDialogOpen(true)}
              className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition"
            >
              <PlusCircle className="w-5 h-5" />
              Add Location
            </button>
          </div>
        )}

        {/* Footer */}
        <div className="p-4 border-t flex justify-end gap-3 bg-gray-50 sticky bottom-0">
          <button
            onClick={onClose}
            className="px-4 py-2 border rounded-md hover:bg-gray-100 text-gray-700"
            type="button"
          >
            Cancel
          </button>
          <button
            type="button"
            className="px-6 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition"
          >
            Save Changes
          </button>
        </div>
      </div>

      {isDialogOpen && (
        <AddPickupLocationModal
          onClose={() => setIsDialogOpen(false)}
          onConfirm={(data) => {
            console.log("New Location:", data);
            // You can also push to state here:
            setLocations((prev) => [
              ...prev,
              { id: Date.now().toString(), ...data },
            ]);
          }}
        />
      )}
    </div>
  );
}
