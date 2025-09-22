import React, { useState } from "react";
import { Globe, Link, PlusCircle, Settings, Tag } from "lucide-react";
import { useNavigate } from "react-router-dom";
import EditDefaultDomainModal from "./EditDefaultDomainModal";

export default function DomainHeader() {
  const navigate = useNavigate();
  const [deleteTarget, setDeleteTarget] = useState(false);

  return (
    <div className="">
      {/* Default Domain Section */}
      <div className="mb-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-purple-50 border border-purple-200 rounded-md p-4">
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-800">
            MTEC URL{" "}
            <span className="text-purple-600 block sm:inline">
              This is the default URL for your MTEC account
            </span>
          </p>
          <p className="shadow-md text-base sm:text-lg w-fit text-gray-700 mt-2 py-2 px-4 bg-white rounded-xl break-all">
            example.mtec.com
          </p>
        </div>
        <div className="flex-shrink-0">
          <button
            onClick={() => setDeleteTarget(true)}
            className="w-full sm:w-auto px-4 py-2 bg-purple-600 text-white text-sm rounded-md hover:bg-purple-700"
          >
            Edit
          </button>
        </div>
      </div>

      {/* Domains Header Section */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold">Domains</h1>
          <p className="text-gray-600 mt-1 text-sm sm:text-base">
            Manage your connected domains and DNS settings
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 w-full md:w-auto">
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
        </div>
      </div>

      {/* Edit Default Domain Modal */}
      {deleteTarget && (
        <EditDefaultDomainModal
          currentDomain={"example.mtec.com"}
          onClose={() => setDeleteTarget(false)}
          onSave={() => {
            console.log("Editing:", deleteTarget);
            setDeleteTarget(false);
          }}
        />
      )}
    </div>
  );
}
