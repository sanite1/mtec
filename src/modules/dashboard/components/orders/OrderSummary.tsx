// components/orders/OrderSummary.tsx
import React from "react";
import {
  ShoppingBag,
  CheckCircle,
  Clock,
  XCircle,
  DollarSign,
  PlusCircle,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

interface OrderSummaryProps {
  totalOrders: number;
  completed: number;
  pending: number;
  cancelled: number;
  totalRevenue: number;
}

export default function OrderSummary({
  totalOrders,
  completed,
  pending,
  cancelled,
  totalRevenue,
}: OrderSummaryProps) {
  const navigate = useNavigate();
  return (
    <div className="">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <div className="z-10">
          <h1 className="text-2xl font-bold">Orders</h1>
          <p className="text-gray-600 mt-1">Manage your store’s orders</p>
        </div>

        <button
          onClick={() => {
            navigate("/orders/create");
          }}
          className="text-sm flex items-center gap-2 px-5 py-2.5 rounded-lg shadow-lg bg-purple-600 text-white font-medium hover:bg-purple-700 w-fit"
        >
          <PlusCircle size={20} />
          Create Order
        </button>
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-6 mb-6">
        {/* Total Orders */}
        <div className="rounded-xl bg-gradient-to-r from-indigo-50 to-indigo-100 p-5 shadow hover:shadow-md transition">
          <div className="relative flex items-center justify-between">
            <div className="z-10">
              <p className="text-sm text-indigo-600 font-medium">
                Total Orders
              </p>
              <p className="mt-1 text-md md:text-xl font-bold text-indigo-900">
                {totalOrders}
              </p>
            </div>
            <ShoppingBag className="absolute md:relative flex-shrink-0 right-0 text-indigo-500 opacity-80" />
          </div>
        </div>
        {/* Completed */}
        <div className="rounded-xl bg-gradient-to-r from-green-50 to-green-100 p-5 shadow hover:shadow-md transition">
          <div className="relative flex items-center justify-between">
            <div className="z-10">
              <p className="text-xs md:text-sm text-green-600 font-medium">
                Completed
              </p>
              <p className="mt-1 text-md md:text-xl font-bold text-green-900">
                {completed}
              </p>
            </div>
            <CheckCircle className="absolute md:relative flex-shrink-0 right-0 text-green-500 opacity-80" />
          </div>
        </div>
        {/* Pending */}
        <div className="rounded-xl bg-gradient-to-r from-yellow-50 to-yellow-100 p-5 shadow hover:shadow-md transition">
          <div className="relative flex items-center justify-between">
            <div className="z-10">
              <p className="text-xs md:text-sm text-yellow-600 font-medium">
                Pending
              </p>
              <p className="mt-1 text-md md:text-xl font-bold text-yellow-900">
                {pending}
              </p>
            </div>
            <Clock className="absolute md:relative flex-shrink-0 right-0 text-yellow-500 opacity-80" />
          </div>
        </div>
        {/* Cancelled */}
        <div className="rounded-xl bg-gradient-to-r from-red-50 to-red-100 p-5 shadow hover:shadow-md transition">
          <div className="relative flex items-center justify-between">
            <div className="z-10">
              <p className="text-xs md:text-sm text-red-600 font-medium">
                Cancelled
              </p>
              <p className="mt-1 text-md md:text-xl font-bold text-red-900">
                {cancelled}
              </p>
            </div>
            <XCircle className="absolute md:relative flex-shrink-0 right-0 text-red-500 opacity-80" />
          </div>
        </div>
        {/* Revenue */}
        <div className="rounded-xl bg-gradient-to-r from-teal-50 to-teal-100 p-5 shadow hover:shadow-md transition">
          <div className="relative flex items-center justify-between">
            <div className="z-10">
              <p className="text-xs md:text-sm text-teal-600 font-medium">
                Revenue
              </p>
              <p className="mt-1 text-md md:text-xl font-bold text-teal-900">
                ₦{totalRevenue.toLocaleString()}
              </p>
            </div>
            <DollarSign className="absolute md:relative flex-shrink-0 right-0 text-teal-500 opacity-80" />
          </div>
        </div>
      </div>
    </div>
  );
}
