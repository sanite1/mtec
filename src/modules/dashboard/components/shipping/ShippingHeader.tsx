import React, { useState } from "react";
import { PlusCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import CreateShippingSidebar from "./CreateShippingSidebar";

export default function ShippingHeader() {
  const navigate = useNavigate();
  const [openCreate, setOpenCreate] = useState<boolean>(false);
  return (
    <div>
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold">Shipping options</h1>
          <p className="text-gray-600 mt-1">Manage your shipping options</p>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={() => {
              navigate("/shipping/automated");
            }}
            className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white text-purple-600 border border-purple-600 font-medium hover:bg-purple-100"
          >
            Automated Shipping
          </button>
          <button
            onClick={() => {
              setOpenCreate(true);
            }}
            className="flex items-center gap-2 px-3 py-2 rounded-lg bg-purple-600 text-white font-medium hover:bg-purple-700"
          >
            <PlusCircle size={20} />
            Create Shipping
          </button>
        </div>
      </div>
      {openCreate && (
        <CreateShippingSidebar onClose={() => setOpenCreate(false)} />
      )}
    </div>
  );
}
