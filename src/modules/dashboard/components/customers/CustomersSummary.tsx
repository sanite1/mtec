// components/customers/CustomersSummary.tsx
import React from "react";
import { Users, Mail, PlusCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface CustomersSummaryProps {
  totalCustomers: number;
  subscribers: number;
}

export default function CustomersSummary({
  totalCustomers,
  subscribers,
}: CustomersSummaryProps) {
  const navigate = useNavigate();
  return (
    <div className="">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold">Customers</h1>
          <p className="text-gray-600 mt-1">
            Overview of your store’s customers and subscribers
          </p>
        </div>

        <button
          onClick={() => {
            navigate("/customers/create");
          }}
          className="w-fit flex items-center gap-2 px-5 py-2.5 rounded-lg shadow-lg bg-purple-600 text-white font-medium hover:bg-purple-700"
        >
          <PlusCircle size={20} />
          Create Customer
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        {/* Total Customers */}
        <div className="rounded-xl bg-gradient-to-r from-indigo-50 to-indigo-100 p-5 shadow hover:shadow-md transition">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-indigo-600 font-medium">
                Total Customers
              </p>
              <p className="mt-1 text-2xl font-bold text-indigo-900">
                {totalCustomers}
              </p>
            </div>
            <Users className="w-10 h-10 text-indigo-500 opacity-80" />
          </div>
        </div>

        {/* Newsletter Subscribers */}
        <div className="rounded-xl bg-gradient-to-r from-green-50 to-green-100 p-5 shadow hover:shadow-md transition">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-green-600 font-medium">
                Newsletter Subscribers
              </p>
              <p className="mt-1 text-2xl font-bold text-green-900">
                {subscribers}
              </p>
            </div>
            <Mail className="w-10 h-10 text-green-500 opacity-80" />
          </div>
        </div>
      </div>
    </div>
  );
}
