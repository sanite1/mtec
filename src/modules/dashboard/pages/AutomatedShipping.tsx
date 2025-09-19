// pages/AutomatedShipping.tsx
import React, { useState } from "react";
import { Switch } from "@headlessui/react";
import { MapPin, Package, Truck, Box, Save } from "lucide-react";
import ShippingLocationsSidebar from "../components/shipping/automated-shipping/DeliveryLocations";

const AutomatedShipping = () => {
  const [enabled, setEnabled] = useState(false);
  const [shipbubbleEnabled, setShipbubbleEnabled] = useState(false);
  const [openShippingLocation, setOpenShippingLocation] = useState(false);

  return (
    <div className=" max-w-6xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900">
          Automated Shipping
        </h1>
        <p className="text-gray-600 mt-2 text-sm sm:text-base lg:text-lg w-full sm:w-[80%] lg:w-[65%]">
          Easily manage automated delivery settings for your store. Control
          costs, pickup locations, and integrations all in one place.
        </p>
      </div>

      {/* Toggle */}
      <div className="bg-white rounded-xl shadow p-4 sm:p-5 mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-base sm:text-lg font-semibold text-gray-800">
            Enable Automated Shipping
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            Automatically calculate and apply delivery costs for your customers.
          </p>
        </div>
        <Switch
          checked={enabled}
          onChange={setEnabled}
          className={`${
            enabled ? "bg-purple-600" : "bg-gray-300"
          } relative inline-flex h-6 w-11 shrink-0 items-center rounded-full transition`}
        >
          <span
            className={`${
              enabled ? "translate-x-6" : "translate-x-1"
            } inline-block h-4 w-4 transform rounded-full bg-white transition`}
          />
        </Switch>
      </div>

      {/* Settings Cards */}
      <div className="space-y-5">
        {/* Delivery Locations */}
        <div className="bg-white rounded-xl shadow p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 cursor-pointer hover:shadow-md transition">
          <div className="flex items-start sm:items-center gap-3">
            <MapPin className="text-purple-600 shrink-0" size={22} />
            <div>
              <h3 className="font-semibold text-gray-800 text-base sm:text-lg">
                Delivery Locations
              </h3>
              <p className="text-sm text-gray-500">
                Select regions or countries you deliver to.
              </p>
            </div>
          </div>
          <span
            onClick={() => {
              setOpenShippingLocation(true);
            }}
            className="text-purple-600 font-medium text-sm sm:text-base"
          >
            Manage →
          </span>
        </div>

        {/* Dispatch Pick-up Location */}
        <div className="bg-white rounded-xl shadow p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 cursor-pointer hover:shadow-md transition">
          <div className="flex items-start sm:items-center gap-3">
            <Truck className="text-purple-600 shrink-0" size={22} />
            <div>
              <h3 className="font-semibold text-gray-800 text-base sm:text-lg">
                Dispatch Pick-up Location
              </h3>
              <p className="text-sm text-gray-500">
                Define where dispatch riders will collect packages.
              </p>
            </div>
          </div>
          <span className="text-purple-600 font-medium text-sm sm:text-base">
            Manage →
          </span>
        </div>

        {/* Default Package Weight */}
        <div className="bg-white rounded-xl shadow p-4 sm:p-5">
          <div className="flex items-start sm:items-center gap-3 mb-3">
            <Box className="text-purple-600 shrink-0" size={22} />
            <div>
              <h3 className="font-semibold text-gray-800 text-base sm:text-lg">
                Default Package Weight
              </h3>
              <p className="text-sm text-gray-500">
                Used for products without a defined weight.
              </p>
            </div>
          </div>
          <input
            type="number"
            placeholder="Enter fallback weight (kg)"
            className="w-full border rounded-md px-3 py-2 text-gray-700 focus:ring-2 focus:ring-purple-500 text-sm sm:text-base"
          />
        </div>

        {/* Integration */}
        <div className="bg-white rounded-xl shadow p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-start sm:items-center gap-3">
            <Package className="text-purple-600 shrink-0" size={22} />
            <div>
              <h3 className="font-semibold text-gray-800 text-base sm:text-lg">
                Shipping Integration
              </h3>
              <p className="text-sm text-gray-500">
                Connect to Shipbubble to automate your deliveries.
              </p>
            </div>
          </div>
          <Switch
            checked={shipbubbleEnabled}
            onChange={setShipbubbleEnabled}
            className={`${
              shipbubbleEnabled ? "bg-purple-600" : "bg-gray-300"
            } relative inline-flex h-6 w-11 shrink-0 items-center rounded-full transition`}
          >
            <span
              className={`${
                shipbubbleEnabled ? "translate-x-6" : "translate-x-1"
              } inline-block h-4 w-4 transform rounded-full bg-white transition`}
            />
          </Switch>
        </div>
      </div>

      {/* Save Button */}
      <div className="mt-8 flex justify-end">
        <button className="w-full sm:w-auto px-6 py-3 bg-purple-600 text-white rounded-lg flex items-center justify-center gap-2 hover:bg-purple-700 transition">
          <Save size={18} /> Save Changes
        </button>
      </div>

      {openShippingLocation && (
        <ShippingLocationsSidebar
          onClose={() => setOpenShippingLocation(false)}
        />
      )}
    </div>
  );
};

export default AutomatedShipping;
