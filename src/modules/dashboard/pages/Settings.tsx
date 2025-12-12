// components/settings/SettingsPage.tsx
import React, { useState } from "react";
import { Package, Boxes, Store } from "lucide-react";
import InventorySettings from "../components/settings/Inventory";
import ProductSettings from "../components/settings/Product";
import StoreDetailsSettings from "../components/settings/StoreDetails";
import { useFetchStoreById } from "../lib/api/store";
import { getDecodedJwt } from "../lib/auth";
import { IStoreDetails } from "../lib/types/store";

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<
    "inventory" | "products" | "store"
  >("store");

  const user = getDecodedJwt();
  const {
    data: storeDetails,
    isLoading,
    refetch,
  } = useFetchStoreById(user?.id);
  const renderContent = () => {
    switch (activeTab) {
      case "store":
        return (
          <div className="p-6 bg-white rounded-md shadow">
            <StoreDetailsSettings
              storeDetails={storeDetails as IStoreDetails}
            />
          </div>
        );
      case "inventory":
        return (
          <div className="p-6 bg-white rounded-md shadow">
            <InventorySettings
              storeDetails={storeDetails as IStoreDetails}
              refetch={refetch}
            />
          </div>
        );
      case "products":
        return (
          <div className="p-6 bg-white rounded-md shadow">
            <ProductSettings
              storeDetails={storeDetails as IStoreDetails}
              refetch={refetch}
            />
          </div>
        );
      //   case "orders":
      //     return (
      //       <div className="p-6 bg-white rounded-md shadow">
      //         <h2 className="text-lg font-semibold mb-2">Orders</h2>
      //         <p className="text-gray-600">
      //           This is the orders settings section.
      //         </p>
      //       </div>
      //     );
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold">Settings</h1>
          <p className="text-gray-600 mt-1 text-sm sm:text-base">
            Tailor the web app settings to create a seamless experience
          </p>
        </div>

        {/* <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 w-full md:w-auto">
          <button
            onClick={() => {
              navigate("/domain/connect");
            }}
            className="flex items-center justify-center gap-2 px-3 py-2 rounded-lg bg-white text-purple-600 border border-purple-600 font-medium hover:bg-purple-100 w-full sm:w-auto"
          >
            <Link size={18} />
            Connect Domain
          </button>
          <button
            onClick={() => {
              navigate("/domain/buy");
            }}
            className="flex items-center justify-center gap-2 px-3 py-2 rounded-lg bg-purple-600 text-white font-medium hover:bg-purple-700 w-full sm:w-auto"
          >
            <Tag size={18} />
            Buy Domain
          </button>
        </div> */}
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200 flex gap-6">
        <button
          onClick={() => setActiveTab("store")}
          className={`flex items-center gap-2 pb-2 text-sm font-medium ${
            activeTab === "store"
              ? "text-purple-600 border-b-2 border-purple-600"
              : "text-gray-600 hover:text-gray-800"
          }`}
        >
          <Store size={16} />
          Store Details
        </button>
        <button
          onClick={() => setActiveTab("inventory")}
          className={`flex items-center gap-2 pb-2 text-sm font-medium ${
            activeTab === "inventory"
              ? "text-purple-600 border-b-2 border-purple-600"
              : "text-gray-600 hover:text-gray-800"
          }`}
        >
          <Boxes size={16} />
          Inventory
        </button>
        <button
          onClick={() => setActiveTab("products")}
          className={`flex items-center gap-2 pb-2 text-sm font-medium ${
            activeTab === "products"
              ? "text-purple-600 border-b-2 border-purple-600"
              : "text-gray-600 hover:text-gray-800"
          }`}
        >
          <Package size={16} />
          Products
        </button>
        {/* <button
          onClick={() => setActiveTab("orders")}
          className={`flex items-center gap-2 pb-2 text-sm font-medium ${
            activeTab === "orders"
              ? "text-purple-600 border-b-2 border-purple-600"
              : "text-gray-600 hover:text-gray-800"
          }`}
        >
          <ShoppingCart size={16} />
          Orders
        </button> */}
      </div>

      {/* Tab Content */}
      <div>{renderContent()}</div>
    </div>
  );
}
