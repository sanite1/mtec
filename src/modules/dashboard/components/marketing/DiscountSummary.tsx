// components/discounts/DiscountSummary.tsx
import React, { useState } from "react";
import {
  Percent,
  CheckCircle,
  Clock,
  RefreshCw,
  PlusCircle,
} from "lucide-react";
import DiscountFormSidebar from "./DiscountFormSidebar";
// import CreateCouponSidebar from "./CreateCouponSidebar";

interface DiscountSummaryProps {
  totalCoupons: number;
  activeCoupons: number;
  scheduledCoupons: number;
  expiredCoupons: number;
}

export default function DiscountSummary({
  totalCoupons,
  activeCoupons,
  scheduledCoupons,
  expiredCoupons,
}: DiscountSummaryProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="z-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <div className="">
          <h1 className="text-md md:text-xl font-bold">Discounts / Coupons</h1>
          <p className="text-gray-600 mt-1">
            Manage and track your store’s discounts and coupon codes
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="text-sm flex items-center gap-2 px-3 py-2 rounded-lg bg-purple-600 text-white font-medium hover:bg-purple-700"
          >
            <PlusCircle size={20} />
            Create Coupon
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        {/* Total Coupons */}
        <div className="rounded-xl bg-gradient-to-r from-purple-50 to-purple-100 p-5 shadow hover:shadow-md transition">
          <div className="relative flex items-center justify-between">
            <div className="z-10">
              <p className="text-sm text-purple-600 font-medium">
                Total Coupons
              </p>
              <p className="mt-1 text-md md:text-xl font-bold text-purple-900">
                {totalCoupons}
              </p>
            </div>
            <Percent className="absolute md:relative flex-shrink-0 right-0 text-purple-500 opacity-80" />
          </div>
        </div>

        {/* Active Coupons */}
        <div className="rounded-xl bg-gradient-to-r from-green-50 to-green-100 p-5 shadow hover:shadow-md transition">
          <div className="relative flex items-center justify-between">
            <div className="z-10">
              <p className="text-sm text-green-600 font-medium">
                Active Coupons
              </p>
              <p className="mt-1 text-md md:text-xl font-bold text-green-900">
                {activeCoupons}
              </p>
            </div>
            <CheckCircle className="absolute md:relative flex-shrink-0 right-0 text-green-500 opacity-80" />
          </div>
        </div>

        {/* Scheduled Coupons */}
        <div className="rounded-xl bg-gradient-to-r from-yellow-50 to-yellow-100 p-5 shadow hover:shadow-md transition">
          <div className="relative flex items-center justify-between">
            <div className="z-10">
              <p className="text-sm text-yellow-600 font-medium">
                Scheduled Coupons
              </p>
              <p className="mt-1 text-md md:text-xl font-bold text-yellow-900">
                {scheduledCoupons}
              </p>
            </div>
            <Clock className="absolute md:relative flex-shrink-0 right-0 text-yellow-500 opacity-80" />
          </div>
        </div>

        {/* Expired Coupons */}
        <div className="rounded-xl bg-gradient-to-r from-red-50 to-red-100 p-5 shadow hover:shadow-md transition">
          <div className="relative flex items-center justify-between">
            <div className="z-10">
              <p className="text-sm text-red-600 font-medium">Expired</p>
              <p className="mt-1 text-md md:text-xl font-bold text-red-900">
                {expiredCoupons}
              </p>
            </div>
            <RefreshCw className="absolute md:relative flex-shrink-0 right-0 text-red-500 opacity-80" />
          </div>
        </div>
      </div>

      {isSidebarOpen && (
        <DiscountFormSidebar
          onClose={() => setIsSidebarOpen(false)}
          onSave={(updated) => {
            console.log("Updated:", updated);
            setIsSidebarOpen(false);
          }}
        />
      )}
    </div>
  );
}
