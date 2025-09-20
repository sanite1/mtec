// components/payments/TransactionsTable.tsx
import React, { useState } from "react";
import { DataTable } from "../../utils/data-table";
import EmptyState from "../../utils/EmptyState";
import { Edit, Trash, CreditCard } from "lucide-react";

export interface Transaction {
  id: string;
  amount: number;
  status: "success" | "pending" | "failed" | "refunded";
  method: string;
  date: string;
  customer: string;
}

// Mock transactions data
const mockTransactions: Transaction[] = [
  {
    id: "T-001",
    amount: 12000,
    status: "success",
    method: "Bank Transfer",
    date: "2025-09-10",
    customer: "John Doe",
  },
  {
    id: "T-002",
    amount: 5500,
    status: "pending",
    method: "Card",
    date: "2025-09-12",
    customer: "Jane Smith",
  },
  {
    id: "T-003",
    amount: 7800,
    status: "failed",
    method: "USSD",
    date: "2025-09-14",
    customer: "Michael Johnson",
  },
  {
    id: "T-004",
    amount: 2000,
    status: "refunded",
    method: "Card",
    date: "2025-09-15",
    customer: "Sarah Lee",
  },
];

const fetchTransactions = async (params: any) => {
  await new Promise((resolve) => setTimeout(resolve, 500));
  const { page = 1, perPage = 10, search, status } = params;
  let filtered = mockTransactions;

  if (search) {
    filtered = filtered.filter(
      (t) =>
        t.customer.toLowerCase().includes(search.toLowerCase()) ||
        t.id.toLowerCase().includes(search.toLowerCase())
    );
  }

  if (status) {
    filtered = filtered.filter((t) => t.status === status);
  }

  const start = (page - 1) * perPage;
  const paginated = filtered.slice(start, start + perPage);

  return {
    data: paginated,
    meta: {
      total: filtered.length,
      page,
      perPage,
    },
  };
};

const TransactionsTable = () => {
  const [selected, setSelected] = useState<Transaction[]>([]);
  const [deleteTarget, setDeleteTarget] = useState<any | null>(null);
  const [editTarget, setEditTarget] = useState<any | null>(null);

  const transactionColumns = [
    { accessorKey: "id", header: "Transaction ID" },
    {
      accessorKey: "amount",
      header: "Amount",
      cell: (info: any) => (
        <span className="font-semibold">
          ₦{info.getValue().toLocaleString()}
        </span>
      ),
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: (info: any) => {
        const status = info.getValue();
        const colors: Record<string, string> = {
          success: "bg-green-100 text-green-800",
          pending: "bg-yellow-100 text-yellow-800",
          failed: "bg-red-100 text-red-800",
          refunded: "bg-blue-100 text-blue-800",
        };
        return (
          <span
            className={`px-2 py-1 rounded-full text-sm font-semibold ${colors[status]}`}
          >
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </span>
        );
      },
    },
    { accessorKey: "method", header: "Method" },
    { accessorKey: "date", header: "Date" },
    { accessorKey: "customer", header: "Customer" },
    // {
    //   id: "actions",
    //   cell: ({ row }: any) => {
    //     const transaction = row.original;
    //     return (
    //       <div className="flex gap-2">
    //         <button
    //           onClick={() => setEditTarget(transaction)}
    //           className="p-2 rounded-md bg-blue-100 text-blue-700 hover:bg-blue-200 transition"
    //         >
    //           <Edit size={16} />
    //         </button>
    //         <button
    //           onClick={() => setDeleteTarget(transaction)}
    //           className="p-2 rounded-md bg-red-100 text-red-700 hover:bg-red-200 transition"
    //         >
    //           <Trash size={16} />
    //         </button>
    //       </div>
    //     );
    //   },
    // },
  ];

  const emptyState = (
    <EmptyState
      image={CreditCard}
      message="No transactions found"
      subtext="When transactions occur, they’ll appear here."
    />
  );

  return (
    <div className="bg-white rounded-lg shadow p-4">
      <DataTable<Transaction, unknown>
        columns={transactionColumns}
        fetchData={fetchTransactions}
        totalItems={mockTransactions.length}
        tableKey="transactions"
        onRowClick={(t) => console.log("Transaction clicked:", t)}
        setSelected={setSelected}
        hasTab={true}
        hasAllTab={true}
        emptyState={emptyState}
        tabInfo={[
          {
            name: "All Transactions",
            columns: transactionColumns,
            fetchData: (params) => fetchTransactions(params),
            tableKey: "all-transactions",
            onRowClick: (t) => console.log("Transaction clicked:", t),
            emptyState: emptyState,
          },
          {
            name: "Successful",
            columns: transactionColumns,
            fetchData: (params) =>
              fetchTransactions({ ...params, status: "success" }),
            tableKey: "successful-transactions",
            onRowClick: (t) => console.log("Transaction clicked:", t),
            emptyState: (
              <EmptyState
                image={CreditCard}
                message="No successful transactions."
              />
            ),
          },
          {
            name: "Pending",
            columns: transactionColumns,
            fetchData: (params) =>
              fetchTransactions({ ...params, status: "pending" }),
            tableKey: "pending-transactions",
            onRowClick: (t) => console.log("Transaction clicked:", t),
            emptyState: (
              <EmptyState
                image={CreditCard}
                message="No pending transactions."
              />
            ),
          },
        ]}
      />

      {/* Delete / Edit handlers */}
      {deleteTarget && (
        <div className="mt-4 p-3 bg-red-50 rounded-lg">
          <p className="text-red-800">
            Confirm deletion for transaction: {deleteTarget.id}
          </p>
          <button
            onClick={() => {
              console.log("Deleting:", deleteTarget);
              setDeleteTarget(null);
            }}
            className="mt-2 px-4 py-2 rounded-md bg-red-600 text-white hover:bg-red-700"
          >
            Confirm Delete
          </button>
        </div>
      )}

      {editTarget && (
        <div className="mt-4 p-3 bg-blue-50 rounded-lg">
          <p className="text-blue-800">
            Edit transaction: {editTarget.id} (not implemented yet)
          </p>
          <button
            onClick={() => setEditTarget(null)}
            className="mt-2 px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700"
          >
            Close
          </button>
        </div>
      )}

      {selected.length > 0 && (
        <div className="mt-4 p-3 bg-purple-50 rounded-lg">
          <p className="text-purple-800">
            {selected.length} transaction(s) selected
          </p>
        </div>
      )}
    </div>
  );
};

export default TransactionsTable;
