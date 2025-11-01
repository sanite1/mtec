import React, { useState } from "react";
import { DataTable } from "../../utils/data-table";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { getDecodedJwt } from "../../lib/auth";
import { Order } from "../../lib/types/orders";
import { useUserOrders } from "../../lib/api/orders";
import OrderDetailsSidebar from "./OrderSidebar";

// ✅ Safe order type for UI display
// export interface Order extends Partial<Order> {
//   _id?: string;
//   customerName?: string;
//   date?: string;
//   total?: number;
//   status?: "completed" | "pending" | "cancelled";
//   paymentStatus?: "paid" | "unpaid" | "refunded";
// }

// ✅ Helper for currency formatting
const safeCurrency = (value?: number) => {
  if (typeof value !== "number" || isNaN(value)) return "₦0.00";
  return `₦${value.toLocaleString("en-NG", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
};

// ✅ Table columns
const orderColumns = [
  {
    accessorKey: "orderNumber",
    header: "Order #",
    cell: (info: any) => info.getValue() || "N/A",
  },
  {
    accessorKey: "shippingAddress",
    header: "Customer",
    cell: (info: any) => {
      const customerName = info.getValue().fullName;
      return customerName || "Guest";
    },
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
      let statusClass = "";

      if (status === "completed") statusClass = "bg-green-100 text-green-800";
      if (status === "pending") statusClass = "bg-yellow-100 text-yellow-800";
      if (status === "cancelled") statusClass = "bg-red-100 text-red-800";

      return (
        <span
          className={`px-2 py-1 rounded-full text-sm font-semibold ${statusClass}`}
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
      let statusClass = "";

      if (paymentStatus === "paid")
        statusClass = "bg-green-50 text-green-700 border border-green-200";
      else if (paymentStatus === "unpaid")
        statusClass = "bg-yellow-50 text-yellow-700 border border-yellow-200";
      else if (paymentStatus === "refunded")
        statusClass = "bg-gray-100 text-gray-700 border border-gray-200";

      return (
        <span
          className={`px-2 py-1 rounded-full text-sm font-semibold ${statusClass}`}
        >
          {paymentStatus
            ? paymentStatus.charAt(0).toUpperCase() + paymentStatus.slice(1)
            : "Unknown"}
        </span>
      );
    },
  },
];

interface OrderTableProps {
  refetchSummary: () => void;
}

const OrdersTable = ({ refetchSummary }: OrderTableProps) => {
  const [selectedOrders, setSelectedOrders] = useState<Order[]>([]);
  const navigate = useNavigate();

  // 🔹 Get userId from JWT
  const user = getDecodedJwt();
  const userId = user?.id;

  // 🔹 Fetch orders via hook
  const { data, isLoading, error, refetch } = useUserOrders(userId, {
    page: 1,
    limit: 10,
  });

  if (error) {
    toast.error(error?.message || "Failed to load orders");
  }

  const safeOrders: Order[] = data?.orders || [];

  const totalItems = data?.total || 0;

  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  const handleRowClick = (order: Order) => {
    setSelectedOrder(order); // open sidebar with order details
  };

  const handleCloseSidebar = () => {
    setSelectedOrder(null);
    refetchSummary();
  };

  const handleEditPaymentStatus = () => {
    console.log("Edit Payment Status clicked", selectedOrder);
    // Open modal or form to update payment status
  };

  const handleEditOrderStatus = () => {
    console.log("Edit Order Status clicked", selectedOrder);
    // Open modal or form to update order status
  };

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
          onRowClick={handleRowClick}
          setSelected={setSelectedOrders}
          hasTab={true}
          hasAllTab={true}
          tabInfo={[
            {
              name: "Pending",
              columns: orderColumns,
              data: safeOrders.filter((o) => o.status === "pending"),
              tableKey: "pending-orders",
              onRowClick: handleRowClick,
              emptyState: "No pending orders found.",
            },
            {
              name: "Completed",
              columns: orderColumns,
              data: safeOrders.filter((o) => o.status === "completed"),
              tableKey: "completed-orders",
              onRowClick: handleRowClick,
              emptyState: "No completed orders found.",
            },
            {
              name: "Cancelled",
              columns: orderColumns,
              data: safeOrders.filter((o) => o.status === "cancelled"),
              tableKey: "cancelled-orders",
              onRowClick: handleRowClick,
              emptyState: "No cancelled orders found.",
            },
          ]}
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
          onEditPaymentStatus={handleEditPaymentStatus}
          onEditOrderStatus={handleEditOrderStatus}
          refetch={refetch}
        />
      )}
    </div>
  );
};

export default OrdersTable;
