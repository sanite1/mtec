import { PlusCircle } from "lucide-react";
import React, { useState } from "react";
import CreateTaxSidebar, { TaxForm } from "./CreateTaxSidebar";

export default function TaxHeader() {
  const [openCreate, setOpenCreate] = useState<boolean>(false);
  const handleSave = (data: TaxForm) => {
    console.log("Saved Tax:", data);
  };
  return (
    <div>
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold">Taxes</h1>
          <p className="text-gray-600 mt-1">Manage your taxes on checkout</p>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={() => {
              setOpenCreate(true);
            }}
            className="flex items-center gap-2 px-3 py-2 rounded-lg bg-purple-600 text-white font-medium hover:bg-purple-700"
          >
            <PlusCircle size={20} />
            Create Tax
          </button>
        </div>
      </div>
      {openCreate && (
        <CreateTaxSidebar
          onClose={() => setOpenCreate(false)}
          onSave={handleSave}
        />
      )}
    </div>
  );
}
