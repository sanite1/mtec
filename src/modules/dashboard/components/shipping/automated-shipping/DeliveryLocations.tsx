// components/shipping/ShippingLocationsSidebar.tsx
import React, { useState } from "react";
import { X } from "lucide-react";
import { Switch } from "@headlessui/react";
import CountryRegionDialog from "./CountryRegion";

interface ShippingLocationsSidebarProps {
  onClose: () => void;
}

export default function ShippingLocationsSidebar({
  onClose,
}: ShippingLocationsSidebarProps) {
  const [allWorldwide, setAllWorldwide] = useState(false);
  const [specificLocations, setSpecificLocations] = useState(true);
  const [locationType, setLocationType] = useState<"zone" | "country" | null>(
    "country",
  );
  const selectedCountries = ["Nigeria", "Abia", "Abuja", "Adamawa"];
  const [shipByDistance, setShipByDistance] = useState(false);

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedLocations, setSelectedLocations] = useState<string[]>([]);

  console.log(selectedLocations);

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
            Shipping Locations
          </h2>
          <button
            onClick={onClose}
            className="rounded-full p-1 hover:bg-gray-100 transition"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          <p className="text-sm w-full sm:w-3/4 text-gray-600 leading-relaxed">
            Choose where you’d like to ship products. You can only enable one
            option at a time.
          </p>

          {/* All locations worldwide */}
          <div className="flex items-center justify-between py-6  border-b border-t">
            <div>
              <h3 className="font-medium text-gray-800">
                All locations worldwide
              </h3>
              <p className="text-sm text-gray-500">
                Deliver to customers anywhere in the world.
              </p>
            </div>
            <Switch
              checked={allWorldwide}
              onChange={(val) => {
                setAllWorldwide(val);
                if (val) {
                  setSpecificLocations(false);
                  setShipByDistance(false);
                }
              }}
              className={`${
                allWorldwide ? "bg-purple-600" : "bg-gray-300"
              } relative inline-flex h-6 w-11 shrink-0 items-center rounded-full transition`}
            >
              <span
                className={`${
                  allWorldwide ? "translate-x-6" : "translate-x-1"
                } inline-block h-4 w-4 transform rounded-full bg-white transition`}
              />
            </Switch>
          </div>

          {/* Specific locations */}
          <div className="pb-6  border-b">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium text-gray-800">
                  Specific locations
                </h3>
                <p className="text-sm text-gray-500">
                  Limit deliveries to chosen regions or zones.
                </p>
              </div>
              <Switch
                checked={specificLocations}
                onChange={(val) => {
                  setSpecificLocations(val);
                  if (!val) setLocationType(null);
                }}
                className={`${
                  specificLocations ? "bg-purple-600" : "bg-gray-300"
                } relative inline-flex h-6 w-11 shrink-0 items-center rounded-full transition`}
              >
                <span
                  className={`${
                    specificLocations ? "translate-x-6" : "translate-x-1"
                  } inline-block h-4 w-4 transform rounded-full bg-white transition`}
                />
              </Switch>
            </div>

            {/* Nested options */}
            {specificLocations && (
              <div className="ml-6 mt-4 space-y-5 border-l pl-4 border-gray-200">
                {/* Zone option */}
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="radio"
                    name="locationType"
                    checked={locationType === "zone"}
                    onChange={() => setLocationType("zone")}
                    className="mt-1 w-4 h-4 text-purple-600 focus:ring-purple-500"
                  />
                  <div>
                    <h4 className="text-gray-800 font-medium">
                      Whitelist by zone
                    </h4>
                    <p className="text-sm text-gray-500">
                      Set delivery areas directly on the map.
                    </p>
                  </div>
                </label>

                {/* Country/region option */}
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="radio"
                    name="locationType"
                    checked={locationType === "country"}
                    onChange={() => setLocationType("country")}
                    className="mt-1 w-4 h-4 text-purple-600 focus:ring-purple-500"
                  />
                  <div className="flex-1">
                    <h4 className="text-gray-800 font-medium">
                      Whitelist by country or region
                    </h4>
                    <p className="text-sm text-gray-500">
                      Choose countries, states, or regions to deliver to.
                    </p>
                    <button
                      type="button"
                      onClick={() => setIsDialogOpen(true)}
                      className="mt-2 px-3 py-2 border border-purple-600 text-purple-600 rounded-md text-sm hover:bg-purple-50 transition"
                    >
                      Select Country or Region
                    </button>

                    {/* Selected locations */}
                    {locationType === "country" &&
                      selectedCountries.length > 0 && (
                        <div className="flex flex-wrap gap-2 mt-3">
                          {selectedCountries.slice(0, 4).map((loc, i) => (
                            <span
                              key={i}
                              className="px-2 py-1 bg-purple-100 text-purple-700 text-sm rounded-md"
                            >
                              {loc}
                            </span>
                          ))}
                          {selectedCountries.length > 4 && (
                            <span className="px-2 py-1 bg-gray-100 text-gray-600 text-sm rounded-md">
                              +{selectedCountries.length - 4} more
                            </span>
                          )}
                        </div>
                      )}
                  </div>
                </label>
              </div>
            )}
          </div>

          {/* Ship by distance */}
          <div className="flex items-center justify-between pb-6  border-b">
            <div>
              <h3 className="font-medium text-gray-800">Ship by distance</h3>
              <p className="text-sm text-gray-500">
                Define maximum delivery range from your store.
              </p>
            </div>
            <Switch
              checked={shipByDistance}
              onChange={(val) => {
                setShipByDistance(val);
                if (val) {
                  setAllWorldwide(false);
                  setSpecificLocations(false);
                }
              }}
              className={`${
                shipByDistance ? "bg-purple-600" : "bg-gray-300"
              } relative inline-flex h-6 w-11 shrink-0 items-center rounded-full transition`}
            >
              <span
                className={`${
                  shipByDistance ? "translate-x-6" : "translate-x-1"
                } inline-block h-4 w-4 transform rounded-full bg-white transition`}
              />
            </Switch>
          </div>
        </div>

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
        <CountryRegionDialog
          onClose={() => setIsDialogOpen(false)}
          onSave={(selections) => {
            setSelectedLocations(selections);
            console.log("Saved locations:", selections);
          }}
        />
      )}
    </div>
  );
}
