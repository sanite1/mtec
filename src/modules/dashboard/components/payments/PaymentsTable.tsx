// components/payments/TransactionsTable.tsx
import React, { useState } from "react";
import { DataTable, TableParamProps } from "../../utils/data-table";
import { toast } from "sonner";
import { getDecodedJwt } from "../../lib/auth";
import EmptyState from "../../utils/EmptyState";
import { CreditCard } from "lucide-react";
import { fetchUserPayments, useUserPayments } from "../../lib/api/payment";
import {
  formatDate,
  formatDateTime,
  formatDateTimeMessages,
} from "../../lib/utils/formatDate";
import { format } from "date-fns";

interface TransactionsTableProps {}

const TransactionsTable: React.FC<TransactionsTableProps> = () => {
  const [selectedPayments, setSelectedPayments] = useState<any[]>([]);
  const [selectedPayment, setSelectedPayment] = useState<any | null>(null);

  // 🔹 Get userId from JWT
  const user = getDecodedJwt();
  const userId = user?.id;

  // 🔹 Fetch payments
  const { data, isLoading, error, refetch } = useUserPayments(userId, {
    page: 1,
    limit: 10,
  });

  if (error) {
    toast.error(error?.message || "Failed to load payments");
  }

  const payments = data?.payments || [];
  const totalItems = data?.total || 0;

  // ✅ Table columns
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
            className={`px-2 py-1 rounded-full text-sm font-semibold ${colors[status]}`}
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

  const emptyState = (
    <EmptyState
      image={CreditCard}
      message="No payments found"
      subtext="When payments occur, they’ll appear here."
    />
  );

  // 🔹 Fetch function for DataTable
  const fetchTablePayments = async (params: TableParamProps) => {
    const response = await fetchUserPayments(userId, {
      page: params.page,
      limit: params.perPage,
      search: params.search,
      // status: params.status, // optional status filter
    });

    return {
      data: response.payments,
      meta: { total: response.total },
    };
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="mb-3">
        <p className="text-gray-600">Manage your customer payments</p>
      </div>

      <div className="bg-white rounded-lg shadow p-4">
        <DataTable
          columns={paymentColumns}
          data={payments}
          isLoading={isLoading}
          totalItems={totalItems}
          tableKey="payments"
          fetchData={fetchTablePayments}
          setSelected={setSelectedPayments}
          onRowClick={(p) => setSelectedPayment(p)}
          hasTab={true}
          hasAllTab={true}
          emptyState={emptyState}
          tabInfo={[
            {
              name: "Paid",
              columns: paymentColumns,
              fetchData: (params) => fetchTablePayments({ ...params }),
              tableKey: "paid-payments",
              onRowClick: (p) => setSelectedPayment(p),
              emptyState: (
                <EmptyState
                  image={CreditCard}
                  message="No paid payments found"
                />
              ),
            },
            {
              name: "Pending",
              columns: paymentColumns,
              fetchData: (params) => fetchTablePayments({ ...params }),
              tableKey: "pending-payments",
              onRowClick: (p) => setSelectedPayment(p),
              emptyState: (
                <EmptyState
                  image={CreditCard}
                  message="No pending payments found"
                />
              ),
            },
            {
              name: "Refunded",
              columns: paymentColumns,
              fetchData: (params) => fetchTablePayments({ ...params }),
              tableKey: "refunded-payments",
              onRowClick: (p) => setSelectedPayment(p),
              emptyState: (
                <EmptyState
                  image={CreditCard}
                  message="No refunded payments found"
                />
              ),
            },
          ]}
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
