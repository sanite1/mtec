// components/customers/CustomersTable.tsx
import React, { useState } from "react";
import { DataTable } from "../../utils/data-table";
import person from "../../assets/personEmpty.png";
import EmptyState from "../../utils/EmptyState";
import { Edit, Trash } from "lucide-react";
import DeleteModal from "./DeleteCustomerModal";
import EditSidebar from "./EditSidebar";
import { useAuth } from "../../context/AuthContext";
import { useDeleteCustomer, useStoreCustomers } from "../../lib/api/customer";
import { getDecodedJwt } from "../../lib/auth";
import { Customer } from "../../lib/types/customer";
import { formatDate } from "../../lib/utils/formatDate";

const CustomersTable = ({ refetch }: { refetch: () => void }) => {
  const user = getDecodedJwt();
  const userId = user?.id;

  // ⭐ Table filters
  const [filters, setFilters] = useState({
    page: 1,
    limit: 10,
    search: "",
    newsletter: undefined as boolean | undefined,
  });

  const { data, isLoading } = useStoreCustomers(userId, filters);

  // ✅ Transform API response → Table format
  const customers: Customer[] = data?.customers ?? [];

  const [selected, setSelected] = useState<Customer[]>([]);
  const [deleteTarget, setDeleteTarget] = useState<Customer | null>(null);
  const [editTarget, setEditTarget] = useState<Customer | null>(null);

  const handleRowClick = (customer: Customer) => {
    console.log("Customer clicked:", customer);
  };

  const { mutate: deleteCustomer, isPending } = useDeleteCustomer();

  const handleDelete = (customerId: string) => {
    deleteCustomer(
      { customerId, userId },
      {
        onSuccess: () => {
          setDeleteTarget(null);
          refetch();
        },
      },
    );
  };

  console.log(customers);

  const customerColumns = [
    // { accessorKey: "id", header: "ID" },
    {
      accessorKey: "createdAt",
      header: "Joined Date",
      cell: (info: any) => {
        const date = info.getValue();

        return formatDate(date);
      },
    },
    {
      accessorKey: "name",
      header: "Name",
      cell: ({ row }: any) => {
        const cus = row.original;
        return `${cus.firstName} ${cus.lastName}`;
      },
    },
    { accessorKey: "email", header: "Email" },
    { accessorKey: "phone", header: "Phone" },
    {
      accessorKey: "newsletterSubscribed",
      header: "Newsletter",
      cell: (info: any) => {
        const subscribed = info.getValue();
        return (
          <span
            className={`px-2 py-1 rounded-full text-sm font-semibold ${
              subscribed
                ? "bg-green-100 text-green-800"
                : "bg-red-100 text-red-800"
            }`}
          >
            {subscribed ? "Subscribed" : "Not Subscribed"}
          </span>
        );
      },
    },
    {
      id: "actions",
      cell: ({ row }: any) => {
        const customer = row.original;
        return (
          <div className="flex gap-2">
            <button
              onClick={() => setEditTarget(customer)}
              className="p-2 rounded-md bg-blue-100 text-blue-700 hover:bg-blue-200 transition"
            >
              <Edit size={16} />
            </button>
            <button
              onClick={() => setDeleteTarget(customer)}
              className="p-2 rounded-md bg-red-100 text-red-700 hover:bg-red-200 transition"
            >
              <Trash size={16} />
            </button>
          </div>
        );
      },
    },
  ];

  const emptyState = (
    <EmptyState
      image={person}
      message="No customers found"
      subtext="When customers join, they’ll appear here."
    />
  );

  return (
    <div className="bg-white rounded-lg shadow p-4">
      <DataTable<Customer, unknown>
        columns={customerColumns}
        data={customers}
        isLoading={isLoading}
        totalItems={data?.total ?? 0}
        tableKey="customers"
        onRowClick={handleRowClick}
        setSelected={setSelected}
        hasTab={true}
        hasAllTab={true}
        emptyState={emptyState}
        tabInfo={[
          {
            name: "Newsletter Subscribers",
            columns: customerColumns,
            data: customers.filter((c) => c.newsletterSubscribed === true),
            tableKey: "newsletter-subscribers",
            onRowClick: handleRowClick,
            emptyState: (
              <EmptyState image={person} message="No newsletter subscribers." />
            ),
          },
        ]}
      />

      {deleteTarget && (
        <DeleteModal
          customerName={deleteTarget.firstName}
          onClose={() => setDeleteTarget(null)}
          loading={isPending}
          onConfirm={() => {
            handleDelete(deleteTarget._id);
          }}
        />
      )}

      {editTarget && (
        <EditSidebar
          customer={editTarget}
          onClose={() => setEditTarget(null)}
          onSave={(updated) => {
            console.log("Updated:", updated);
            refetch();
            setEditTarget(null);
          }}
        />
      )}

      {selected.length > 0 && (
        <div className="mt-4 p-3 bg-blue-50 rounded-lg">
          <p className="text-blue-800">
            {selected.length} customer(s) selected
          </p>
        </div>
      )}
    </div>
  );
};

export default CustomersTable;
