// components/payments/TransactionsSummary.tsx
import React, { useState } from "react";
import {
  DollarSign,
  CheckCircle,
  Clock,
  RefreshCw,
  Settings,
  BanknoteArrowUpIcon,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import BankDetailsSidebar from "./BankDetailsSidebar";

interface TransactionsSummaryProps {
  totalTransactions: number;
  successfulPayments: number;
  pendingPayments: number;
  refunds: number;
}

export default function TransactionsSummary({
  totalTransactions,
  successfulPayments,
  pendingPayments,
  refunds,
}: TransactionsSummaryProps) {
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  return (
    <div>
      {/* Progress / Next Step */}
      <div className="my-4 flex items-center justify-between bg-purple-50 border border-purple-200 rounded-md p-4">
        <div>
          <p className="text-sm font-medium text-gray-800">
            Next Step:{" "}
            <span className="text-purple-600">
              Verify your identity to receive payment
            </span>
          </p>
          <p className="text-xs text-gray-500 mt-1">
            You are required to verify your identity in order to be paid all
            pending settlements
          </p>
        </div>
        <button className="px-4 py-2 bg-purple-600 text-white text-sm rounded-md hover:bg-purple-700">
          Continue
        </button>
      </div>

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold">Payments / Transactions</h1>
          <p className="text-gray-600 mt-1">
            Overview of your store’s payments and settlements
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={() => {
              navigate("/payments/payment-methods");
            }}
            className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white text-purple-600 border border-purple-600 font-medium hover:bg-purple-100"
          >
            <Settings size={20} />
            Payment Methods
          </button>
          <button
            onClick={() => {
              setIsSidebarOpen(true);
            }}
            className="flex items-center gap-2 px-3 py-2 rounded-lg bg-purple-600 text-white font-medium hover:bg-purple-700"
          >
            <BanknoteArrowUpIcon size={20} />
            Bank Details
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        {/* Total Transactions */}
        <div className="rounded-xl bg-gradient-to-r from-purple-50 to-purple-100 p-5 shadow hover:shadow-md transition">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-purple-600 font-medium">
                Total Transactions
              </p>
              <p className="mt-1 text-2xl font-bold text-purple-900">
                {totalTransactions}
              </p>
            </div>
            <DollarSign className="w-10 h-10 text-purple-500 opacity-80" />
          </div>
        </div>

        {/* Successful Payments */}
        <div className="rounded-xl bg-gradient-to-r from-green-50 to-green-100 p-5 shadow hover:shadow-md transition">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-green-600 font-medium">
                Successful Payments
              </p>
              <p className="mt-1 text-2xl font-bold text-green-900">
                {successfulPayments}
              </p>
            </div>
            <CheckCircle className="w-10 h-10 text-green-500 opacity-80" />
          </div>
        </div>

        {/* Pending Payments */}
        <div className="rounded-xl bg-gradient-to-r from-yellow-50 to-yellow-100 p-5 shadow hover:shadow-md transition">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-yellow-600 font-medium">
                Pending Payments
              </p>
              <p className="mt-1 text-2xl font-bold text-yellow-900">
                {pendingPayments}
              </p>
            </div>
            <Clock className="w-10 h-10 text-yellow-500 opacity-80" />
          </div>
        </div>

        {/* Refunds */}
        <div className="rounded-xl bg-gradient-to-r from-red-50 to-red-100 p-5 shadow hover:shadow-md transition">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-red-600 font-medium">Refunds</p>
              <p className="mt-1 text-2xl font-bold text-red-900">{refunds}</p>
            </div>
            <RefreshCw className="w-10 h-10 text-red-500 opacity-80" />
          </div>
        </div>
      </div>

      {isSidebarOpen && (
        <BankDetailsSidebar
          onClose={() => setIsSidebarOpen(false)}
          onSave={(data) => {
            console.log("Saved Bank Details:", data);
            setIsSidebarOpen(false);
          }}
        />
      )}
    </div>
  );
}
