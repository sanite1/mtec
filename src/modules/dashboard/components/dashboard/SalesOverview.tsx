import React, { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  BarChart,
  Bar,
} from "recharts";
import { SalesRangeFilter } from "../../lib/types/dashboard";
import { useDashboardSalesOverview } from "../../lib/api/dashboard";
import { getDecodedJwt } from "../../lib/auth";
import { ConvertPriceRangeToLocale } from "../../lib/utils/utils";

export default function SalesOverview() {
  const user = getDecodedJwt();
  const [filter, setFilter] = useState<SalesRangeFilter>("this_month");

  const { data, isLoading } = useDashboardSalesOverview(user?.id, filter);

  // ✅ Convert API response into chart-ready format
  const chartData =
    data?.labels?.map((label, index) => ({
      name: label,
      value: data?.data?.[index] || 0,
    })) || [];

  return (
    <div className="bg-white rounded-lg shadow p-6">
      {/* ✅ HEADER */}
      <div className="flex justify-between items-center mb-4">
        <div>
          <h2 className="text-lg font-semibold text-gray-800">
            Sales Overview
          </h2>
          {data?.totalRevenue !== undefined && (
            <p className="text-sm text-gray-500">
              Total: {ConvertPriceRangeToLocale(String(data.totalRevenue))}
            </p>
          )}
        </div>

        {/* ✅ FILTER SELECT (Connected to Hook) */}
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value as SalesRangeFilter)}
          className="border rounded-md text-sm px-2 py-1"
        >
          <option value="this_month">This Month</option>
          <option value="3_months">Last 3 Months</option>
          <option value="6_months">Last 6 Months</option>
          <option value="1_year">This Year</option>
        </select>
      </div>

      {/* ✅ LOADING STATE */}
      {isLoading && (
        <div className="h-[300px] bg-gray-100 rounded animate-pulse" />
      )}

      {/* ✅ EMPTY STATE */}
      {!isLoading && chartData.length === 0 && (
        <div className="text-center text-gray-500 py-12">
          <p>No sales data available</p>
          <button className="mt-3 px-4 py-2 bg-blue-600 text-white rounded-md text-sm hover:bg-blue-700">
            Record Order
          </button>
        </div>
      )}

      {/* ✅ GRAPH STATE */}
      {!isLoading && chartData.length > 0 && (
        <div className="h-[300px] w-full mt-6">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip
                formatter={(value) => ConvertPriceRangeToLocale(String(value))}
              />
              <Bar
                dataKey="value"
                barSize={40}
                radius={[6, 6, 0, 0]}
                fill="#8B5CF6" // purple
              />{" "}
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
}
