/// components/payments/TransactionsTable.tsx
import React, { useState, useMemo } from "react";
import { DataTable, TableParamProps } from "../../utils/data-table";
import { toast } from "sonner";
import { getDecodedJwt } from "../../lib/auth";
import EmptyState from "../../utils/EmptyState";
import { CreditCard } from "lucide-react";
import { fetchUserPayments, useUserPayments } from "../../lib/api/payment";
import { format } from "date-fns";

const TransactionsTable: React.FC = () => {
  const [selectedPayments, setSelectedPayments] = useState<any[]>([]);
  const [selectedPayment, setSelectedPayment] = useState<any | null>(null);

  // ---------------- User ----------------
  const user = getDecodedJwt();
  const userId = user?.id;

  // ---------------- Initial Fetch (All) ----------------
  const { data, isLoading, error } = useUserPayments(userId, {
    page: 1,
    limit: 10,
  });

  if (error) {
    toast.error(error?.message || "Failed to load payments");
  }

  const payments = data?.payments || [];
  const totalItems = data?.total || 0;

  // ---------------- Columns ----------------
  const paymentColumns = [
    { accessorKey: "orderNumber", header: "Order #" },
    {
      accessorKey: "channel",
      header: "Channel",
      cell: (info: any) => (
        <span className="capitalize">{info.getValue()}</span>
      ),
    },
    {
      accessorKey: "amount",
      header: "Amount",
      cell: (info: any) => (
        <span className="font-semibold">
          ₦{Number(info.getValue()).toLocaleString("en-NG")}
        </span>
      ),
    },
    {
      accessorKey: "method",
      header: "Method",
      cell: (info: any) => (
        <span className="capitalize">{info.getValue()}</span>
      ),
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: (info: any) => {
        const status = info.getValue();
        const colors: Record<string, string> = {
          paid: "bg-green-50 text-green-700 border border-green-200",
          pending: "bg-yellow-50 text-yellow-700 border border-yellow-200",
          failed: "bg-red-50 text-red-700 border border-red-200",
          refunded: "bg-gray-100 text-gray-700 border border-gray-200",
        };

        return (
          <span
            className={`px-2 py-1 rounded-full text-sm font-semibold ${
              colors[status] ?? ""
            }`}
          >
            {status?.charAt(0).toUpperCase() + status?.slice(1)}
          </span>
        );
      },
    },
    {
      accessorKey: "paidAt",
      header: "Paid At",
      cell: (info: any) =>
        info.getValue()
          ? format(new Date(info.getValue()), "dd MMM yyyy, hh:mm a")
          : "—",
    },
  ];

  // ---------------- Fetch Helpers (LIKE PRODUCT HISTORY) ----------------
  const createFetchHandler =
    (status?: string) => async (params: TableParamProps) => {
      const response = await fetchUserPayments(userId, {
        page: params.page,
        limit: params.perPage,
        search: params.search,
        status,
      });

      return {
        data: {
          data: response.payments,
          meta: { total: response.total },
        },
      };
    };

  const fetchAllPayments = createFetchHandler();
  const fetchPaidPayments = createFetchHandler("paid");
  const fetchPendingPayments = createFetchHandler("pending");
  const fetchRefundedPayments = createFetchHandler("refunded");

  // ---------------- Tabs ----------------
  const tabs = useMemo(
    () => [
      {
        name: "Paid",
        tableKey: "paid-payments",
        fetchData: fetchPaidPayments,
        emptyState: "No paid payments found.",
      },
      {
        name: "Pending",
        tableKey: "pending-payments",
        fetchData: fetchPendingPayments,
        emptyState: "No pending payments found.",
      },
      {
        name: "Refunded",
        tableKey: "refunded-payments",
        fetchData: fetchRefundedPayments,
        emptyState: "No refunded payments found.",
      },
    ],
    [],
  );

  const emptyState = (
    <EmptyState
      image={CreditCard}
      message="No payments found"
      subtext="When payments occur, they’ll appear here."
    />
  );

  // ---------------- Render ----------------
  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="mb-3">
        <p className="text-gray-600">Manage your customer payments</p>
      </div>

      <div className="bg-white rounded-lg shadow p-4">
        <DataTable<any, unknown>
          columns={paymentColumns}
          data={payments}
          isLoading={isLoading}
          totalItems={totalItems}
          tableKey="payments"
          fetchData={fetchAllPayments}
          setSelected={setSelectedPayments}
          onRowClick={(p) => setSelectedPayment(p)}
          hasTab
          hasAllTab
          emptyState={emptyState}
          tabInfo={tabs.map((tab) => ({
            ...tab,
            columns: paymentColumns,
            onRowClick: (p) => setSelectedPayment(p),
          }))}
        />

        {selectedPayments.length > 0 && (
          <div className="mt-4 p-3 bg-purple-50 rounded-lg">
            <p className="text-purple-800">
              {selectedPayments.length} payment
              {selectedPayments.length > 1 ? "s" : ""} selected
            </p>
          </div>
        )}
      </div>

      {selectedPayment && (
        <div className="mt-4 p-3 bg-blue-50 rounded-lg">
          <p className="text-blue-800">
            Payment details for order: {selectedPayment.orderNumber}
          </p>
          <button
            onClick={() => setSelectedPayment(null)}
            className="mt-2 px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700"
          >
            Close
          </button>
        </div>
      )}
    </div>
  );
};

export default TransactionsTable;
