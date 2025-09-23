// components/team/TeamHeader.tsx
import React from "react";
import {
  UserPlus,
  ShieldCheck,
  Settings,
  AlertCircle,
  Plus,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function TeamHeader() {
  const navigate = useNavigate();

  return (
    <div>
      {/* Progress / Next Step */}
      <div className="my-4 flex items-center justify-between bg-purple-50 border border-purple-200 rounded-md p-4">
        <div>
          <p className="text-sm font-medium text-gray-800">
            Available Staff Slots: <span className="text-purple-600">0</span>
          </p>
          <div className="mt-2 flex items-center gap-2 text-gray-700 bg-gray-50 px-4 py-3 rounded-lg border border-gray-200 w-full max-w-2xl">
            <AlertCircle size={18} />
            <span className="text-sm">
              Deactivated staff are staff deativated when subscription expires
            </span>
          </div>
        </div>
        <button
          // onClick={() => {
          //   navigate("/team/invite");
          // }}
          className="flex items-center gap-2 px-3 py-2 rounded-lg bg-purple-600 text-white font-medium hover:bg-purple-700"
        >
          <Plus size={18} />
          Get More Slots
        </button>
      </div>

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold">Team & Access</h1>
          <p className="text-gray-600 mt-1">
            Manage your team members and their access permissions
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={() => {
              navigate("/team/add");
            }}
            className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white text-purple-600 border border-purple-600 font-medium hover:bg-purple-100"
          >
            <UserPlus size={20} />
            Add Team Member
          </button>
          {/* <button
            onClick={() => {
              navigate("/team/invite");
            }}
            className="flex items-center gap-2 px-3 py-2 rounded-lg bg-purple-600 text-white font-medium hover:bg-purple-700"
          >
            <UserPlus size={20} />
            Invite Member
          </button> */}
        </div>
      </div>
    </div>
  );
}
