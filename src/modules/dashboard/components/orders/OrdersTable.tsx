// components/orders/OrdersTable.tsx
import React, { useState } from "react";
import { DataTable } from "../../utils/data-table";
import { useNavigate } from "react-router-dom";

// Define the Order type
export interface Order {
  id: string;
  customer: string;
  date: string;
  amount: number;
  status: "completed" | "pending" | "cancelled";
}

// Mock data for orders
const mockOrders: Order[] = [
  {
    id: "1",
    customer: "John Doe",
    date: "2025-09-10",
    amount: 45000,
    status: "completed",
  },
  {
    id: "2",
    customer: "Jane Smith",
    date: "2025-09-11",
    amount: 30000,
    status: "pending",
  },
  {
    id: "3",
    customer: "Michael Johnson",
    date: "2025-09-12",
    amount: 20000,
    status: "cancelled",
  },
  {
    id: "4",
    customer: "Emily Brown",
    date: "2025-09-13",
    amount: 75000,
    status: "completed",
  },
  {
    id: "5",
    customer: "David Wilson",
    date: "2025-09-14",
    amount: 15000,
    status: "pending",
  },
];

// Define table columns
const orderColumns = [
  { accessorKey: "id", header: "Order ID" },
  { accessorKey: "customer", header: "Customer" },
  { accessorKey: "date", header: "Date" },
  {
    accessorKey: "amount",
    header: "Amount",
    cell: (info: any) => `₦${info.getValue().toLocaleString()}`,
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: (info: any) => {
      const status = info.getValue();
      let statusClass = "";

      if (status === "completed") statusClass = "bg-green-100 text-green-800";
      if (status === "pending") statusClass = "bg-yellow-100 text-yellow-800";
      if (status === "cancelled") statusClass = "bg-red-100 text-red-800";

      return (
        <span
          className={`px-2 py-1 rounded-full text-sm font-semibold ${statusClass}`}
        >
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </span>
      );
    },
  },
];

// Mock API function to fetch orders
const fetchOrders = async (params: any) => {
  await new Promise((resolve) => setTimeout(resolve, 500));

  const { page = 1, perPage = 10, search, status } = params;
  let filteredOrders = mockOrders;

  if (search) {
    filteredOrders = filteredOrders.filter(
      (order) =>
        order.customer.toLowerCase().includes(search.toLowerCase()) ||
        order.id.includes(search)
    );
  }

  if (status) {
    filteredOrders = filteredOrders.filter((order) => order.status === status);
  }

  const startIndex = (page - 1) * perPage;
  const endIndex = startIndex + perPage;
  const paginatedOrders = filteredOrders.slice(startIndex, endIndex);

  return {
    data: paginatedOrders,
    meta: {
      total: filteredOrders.length,
      page,
      perPage,
    },
  };
};

// Orders Table Component
const OrdersTable = () => {
  const [selectedOrders, setSelectedOrders] = useState<Order[]>([]);
  const navigate = useNavigate();

  const handleRowClick = (order: Order) => {
    console.log("Order clicked:", order);
    // navigate(`/orders/${order.id}`);
  };

  return (
    <div className="bg-white rounded-lg shadow p-4">
      <DataTable<Order, unknown>
        columns={orderColumns}
        fetchData={fetchOrders}
        totalItems={mockOrders.length}
        tableKey="orders"
        onRowClick={handleRowClick}
        setSelected={setSelectedOrders}
        hasTab={true}
        hasAllTab={true}
        tabInfo={[
          {
            name: "Completed",
            columns: orderColumns,
            fetchData: (params) =>
              fetchOrders({ ...params, status: "completed" }),
            tableKey: "completed-orders",
            onRowClick: handleRowClick,
            emptyState: "No completed orders.",
          },
          {
            name: "Pending",
            columns: orderColumns,
            fetchData: (params) =>
              fetchOrders({ ...params, status: "pending" }),
            tableKey: "pending-orders",
            onRowClick: handleRowClick,
            emptyState: "No pending orders.",
          },
          {
            name: "Cancelled",
            columns: orderColumns,
            fetchData: (params) =>
              fetchOrders({ ...params, status: "cancelled" }),
            tableKey: "cancelled-orders",
            onRowClick: handleRowClick,
            emptyState: "No cancelled orders.",
          },
        ]}
      />

      {selectedOrders.length > 0 && (
        <div className="mt-4 p-3 bg-blue-50 rounded-lg">
          <p className="text-blue-800">
            {selectedOrders.length} order(s) selected
          </p>
        </div>
      )}
    </div>
  );
};

export default OrdersTable;
