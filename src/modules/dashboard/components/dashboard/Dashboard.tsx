import React from "react";
import OverviewCards from "./OverviewCards";
import SalesOverview from "./SalesOverview";
import TodoList from "./TodoList";
import TopSalesChannels from "./TopSalesChannels";
import QuickActions from "./QuickActions";
import RecentOrders from "./RecentOrders";
// import { useDashboardStats } from "../../lib/api/dashboard";
import { getDecodedJwt } from "../../lib/auth";

export default function Dashboard() {
  return (
    <div className=" min-h-screen">
      {/* Header */}
      <header className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">
          Welcome back, Collins 👋
        </h1>
        <p className="text-gray-600">
          Here’s a quick snapshot of your business today
        </p>
      </header>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Side */}
        <div className="lg:col-span-2 space-y-6">
          <OverviewCards />
          <SalesOverview />
          <RecentOrders />
        </div>

        {/* Right Side */}
        <div className="space-y-6">
          <TodoList />
          <TopSalesChannels />
          <QuickActions />
        </div>
      </div>
    </div>
  );
}
