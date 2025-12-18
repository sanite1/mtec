import React, { useState, useMemo } from "react";
import { DataTable, TableParamProps } from "../../utils/data-table";
import { toast } from "sonner";
import { getDecodedJwt } from "../../lib/auth";
import { Order } from "../../lib/types/orders";
import { fetchUserOrders, useUserOrders } from "../../lib/api/orders";
import OrderDetailsSidebar from "./OrderSidebar";
import EmptyState from "../../utils/EmptyState";
import box from "../../assets/boxEmpty.png";
import { useNavigate } from "react-router-dom";
import { Edit } from "lucide-react";

// ---------------- Currency Helper ----------------
const safeCurrency = (value?: number) => {
  if (typeof value !== "number" || isNaN(value)) return "₦0.00";
  return `₦${value.toLocaleString("en-NG", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
};

interface OrderTableProps {
  refetchSummary: () => void;
}

const OrdersTable = ({ refetchSummary }: OrderTableProps) => {
  const [selectedOrders, setSelectedOrders] = useState<Order[]>([]);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const navigate = useNavigate();

  // ---------------- User ----------------
  const user = getDecodedJwt();
  const userId = user?.id;

  // ---------------- Columns ----------------
  const orderColumns = [
    {
      accessorKey: "orderNumber",
      header: "Order #",
      cell: (info: any) => info.getValue() || "N/A",
    },
    {
      accessorKey: "shippingAddress",
      header: "Customer",
      cell: (info: any) => info.getValue()?.fullName || "Guest",
    },
    {
      accessorKey: "createdAt",
      header: "Date",
      cell: (info: any) =>
        info.getValue()
          ? new Date(info.getValue()).toLocaleDateString("en-GB")
          : "—",
    },
    {
      accessorKey: "total",
      header: "Total",
      cell: (info: any) => safeCurrency(info.getValue()),
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: (info: any) => {
        const status = info.getValue();
        const styles: Record<string, string> = {
          completed: "bg-green-100 text-green-800",
          pending: "bg-yellow-100 text-yellow-800",
          cancelled: "bg-red-100 text-red-800",
        };

        return (
          <span
            className={`px-2 py-1 rounded-full text-sm font-semibold ${
              styles[status] ?? ""
            }`}
          >
            {status
              ? status.charAt(0).toUpperCase() + status.slice(1)
              : "Unknown"}
          </span>
        );
      },
    },
    {
      accessorKey: "paymentStatus",
      header: "Payment",
      cell: (info: any) => {
        const paymentStatus = info.getValue();
        const styles: Record<string, string> = {
          paid: "bg-green-50 text-green-700 border border-green-200",
          unpaid: "bg-yellow-50 text-yellow-700 border border-yellow-200",
          refunded: "bg-gray-100 text-gray-700 border border-gray-200",
        };

        return (
          <span
            className={`px-2 py-1 rounded-full text-sm font-semibold ${
              styles[paymentStatus] ?? ""
            }`}
          >
            {paymentStatus
              ? paymentStatus.charAt(0).toUpperCase() + paymentStatus.slice(1)
              : "Unknown"}
          </span>
        );
      },
    },
    {
      id: "actions",
      cell: ({ row }: any) => (
        <button
          onClick={() => setSelectedOrder(row.original)}
          className="p-2 rounded-md bg-blue-100 text-blue-700 hover:bg-blue-200"
        >
          <Edit size={16} />
        </button>
      ),
    },
  ];

  // ---------------- Initial Load (All) ----------------
  const { data, isLoading, error, refetch } = useUserOrders(userId, {
    page: 1,
    limit: 10,
  });

  if (error) {
    toast.error(error?.message || "Failed to load orders");
  }

  const safeOrders = data?.orders || [];
  const totalItems = data?.total || 0;

  // ---------------- Row Click ----------------
  const handleRowClick = (order: Order) => {
    navigate(`/orders/${order._id}`);
  };

  const handleCloseSidebar = () => {
    setSelectedOrder(null);
    refetchSummary();
  };

  // ---------------- Fetch Helpers (LIKE PRODUCT HISTORY) ----------------
  const createFetchHandler =
    (status?: string) => async (params: TableParamProps) => {
      const response = await fetchUserOrders(userId, {
        page: params.page,
        limit: params.perPage,
        search: params.search,
        status,
      });

      return {
        data: {
          data: response.orders,
          meta: { total: response.total },
        },
      };
    };

  const fetchAllOrders = createFetchHandler();
  const fetchPendingOrders = createFetchHandler("pending");
  const fetchCompletedOrders = createFetchHandler("completed");
  const fetchCancelledOrders = createFetchHandler("cancelled");

  // ---------------- Tabs ----------------
  const tabs = useMemo(
    () => [
      {
        name: "Pending",
        tableKey: "pending-orders",
        fetchData: fetchPendingOrders,
        emptyState: "No pending orders found.",
      },
      {
        name: "Completed",
        tableKey: "completed-orders",
        fetchData: fetchCompletedOrders,
        emptyState: "No completed orders found.",
      },
      {
        name: "Cancelled",
        tableKey: "cancelled-orders",
        fetchData: fetchCancelledOrders,
        emptyState: "No cancelled orders found.",
      },
    ],
    [],
  );

  const emptyState = (
    <EmptyState
      image={box}
      message="No orders found"
      subtext="When you receive orders, they’ll appear here."
    />
  );

  // ---------------- Render ----------------
  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="mb-3">
        <p className="text-gray-600">Manage your customer orders</p>
      </div>

      <div className="bg-white rounded-lg shadow p-4">
        <DataTable<Order, unknown>
          columns={orderColumns}
          data={safeOrders}
          isLoading={isLoading}
          totalItems={totalItems}
          tableKey="orders"
          fetchData={fetchAllOrders}
          onRowClick={handleRowClick}
          setSelected={setSelectedOrders}
          hasTab
          hasAllTab
          emptyState={emptyState}
          tabInfo={tabs.map((tab) => ({
            ...tab,
            columns: orderColumns,
            onRowClick: handleRowClick,
          }))}
        />

        {selectedOrders.length > 0 && (
          <div className="mt-4 p-3 bg-blue-50 rounded-lg">
            <p className="text-blue-800">
              {selectedOrders.length} order
              {selectedOrders.length > 1 ? "s" : ""} selected
            </p>
          </div>
        )}
      </div>

      {selectedOrder && (
        <OrderDetailsSidebar
          order={selectedOrder}
          onClose={handleCloseSidebar}
          refetch={refetch}
        />
      )}
    </div>
  );
};

export default OrdersTable;
