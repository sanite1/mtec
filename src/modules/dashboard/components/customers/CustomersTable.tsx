// components/customers/CustomersTable.tsx
import React, { useState } from "react";
import { DataTable } from "../../utils/data-table";
import person from "../../assets/personEmpty.png";
import EmptyState from "../../utils/EmptyState";
import { Edit, Trash } from "lucide-react";
import DeleteModal from "./DeleteCustomerModal";
import EditSidebar from "./EditSidebar";

export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  joinedDate: string;
  newsletter: boolean;
}

// Mock data
const mockCustomers: Customer[] = [
  {
    id: "1",
    name: "John Doe",
    email: "john@example.com",
    phone: "+2348012345678",
    joinedDate: "2025-09-01",
    newsletter: true,
  },
  {
    id: "2",
    name: "Jane Smith",
    email: "jane@example.com",
    phone: "+2348098765432",
    joinedDate: "2025-09-05",
    newsletter: false,
  },
  {
    id: "3",
    name: "Michael Johnson",
    email: "michael@example.com",
    phone: "+2347011122233",
    joinedDate: "2025-09-07",
    newsletter: true,
  },
];

const fetchCustomers = async (params: any) => {
  await new Promise((resolve) => setTimeout(resolve, 500));
  const { page = 1, perPage = 10, search, newsletter } = params;
  let filtered = mockCustomers;

  if (search) {
    filtered = filtered.filter(
      (c) =>
        c.name.toLowerCase().includes(search.toLowerCase()) ||
        c.email.toLowerCase().includes(search.toLowerCase()),
    );
  }

  if (newsletter !== undefined) {
    filtered = filtered.filter((c) => c.newsletter === newsletter);
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

const CustomersTable = () => {
  const [selected, setSelected] = useState<Customer[]>([]);

  const handleRowClick = (customer: Customer) => {
    console.log("Customer clicked:", customer);
    // navigate(`/customers/${customer.id}`);
  };
  const [deleteTarget, setDeleteTarget] = useState<any | null>(null);
  const [editTarget, setEditTarget] = useState<any | null>(null);

  const customerColumns = [
    { accessorKey: "id", header: "ID" },
    { accessorKey: "name", header: "Name" },
    { accessorKey: "email", header: "Email" },
    { accessorKey: "phone", header: "Phone" },
    { accessorKey: "joinedDate", header: "Joined Date" },
    {
      accessorKey: "newsletter",
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
      // header: "Actions",
      cell: ({ row }: any) => {
        const customer = row.original; // get full row data
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
        fetchData={fetchCustomers}
        totalItems={mockCustomers.length}
        tableKey="customers"
        onRowClick={handleRowClick}
        setSelected={setSelected}
        hasTab={true}
        hasAllTab={true}
        emptyState={emptyState}
        tabInfo={[
          {
            name: "All Customers",
            columns: customerColumns,
            fetchData: (params) => fetchCustomers(params),
            tableKey: "all-customers",
            onRowClick: handleRowClick,
            emptyState: emptyState,
          },
          {
            name: "Newsletter Subscribers",
            columns: customerColumns,
            fetchData: (params) =>
              fetchCustomers({ ...params, newsletter: true }),
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
          customerName={deleteTarget.name}
          onClose={() => setDeleteTarget(null)}
          onConfirm={() => {
            console.log("Deleting:", deleteTarget);
            setDeleteTarget(null);
          }}
        />
      )}

      {editTarget && (
        <EditSidebar
          customer={editTarget}
          onClose={() => setEditTarget(null)}
          onSave={(updated) => {
            console.log("Updated:", updated);
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
