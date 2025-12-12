// components/customers/CustomersTable.tsx
import React, { useEffect, useState } from "react";
import { DataTable, TableParamProps } from "../../utils/data-table";
import person from "../../assets/personEmpty.png";
import EmptyState from "../../utils/EmptyState";
import { Edit, Trash } from "lucide-react";
import DeleteModal from "./DeleteCustomerModal";
import EditSidebar from "./EditSidebar";
import {
  fetchStoreCustomers,
  useDeleteCustomer,
  useStoreCustomers,
} from "../../lib/api/customer";
import { getDecodedJwt } from "../../lib/auth";
import { Customer } from "../../lib/types/customer";
import { formatDate } from "../../lib/utils/formatDate";
import { useSearchParams } from "react-router-dom";

const CustomersTable = ({ refetch }: { refetch: () => void }) => {
  const user = getDecodedJwt();
  const userId = user?.id;
  const [searchParams] = useSearchParams();

  const [filters, setFilters] = useState({
    page: 1,
    limit: 5,
    search: "",
    newsletter: undefined as boolean | undefined,
  });

  // 🧠 Sync filters with URL search params
  useEffect(() => {
    const pageParam = Number(searchParams.get("page")) || 1;
    const limitParam = Number(searchParams.get("perpage")) || 5;
    const searchParam = searchParams.get("search") || "";
    const newsletterParam = searchParams.get("newsletter");

    setFilters((prev) => ({
      ...prev,
      page: pageParam,
      limit: limitParam,
      search: searchParam,
      newsletter:
        newsletterParam === "true"
          ? true
          : newsletterParam === "false"
            ? false
            : undefined,
    }));
  }, [searchParams]);

  const { data, isLoading } = useStoreCustomers(userId, filters);

  // ✅ Transform API response → Table format
  const customers: Customer[] = data?.customers ?? [];

  const [selected, setSelected] = useState<Customer[]>([]);
  const [deleteTarget, setDeleteTarget] = useState<Customer | null>(null);
  const [editTarget, setEditTarget] = useState<Customer | null>(null);

  const handleRowClick = (customer: Customer) => {
    console.log("Customer clicked:", customer);
  };

  const { mutateAsync: deleteCustomer, isPending } = useDeleteCustomer();

  const handleDelete = async (customerId: string) => {
    try {
      await deleteCustomer(
        { customerId, userId },
        {
          onSuccess: () => {
            setDeleteTarget(null);
            refetch();
          },
        },
      );
    } catch (error) {
      console.error(error);
    }
  };

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

  const fetchTableCustumers = async (params: TableParamProps) => {
    const response = await fetchStoreCustomers(userId, {
      page: params.page,
      limit: params.perPage,
      search: params.search,
    });

    return {
      data: {
        data: response.customers, // array of products
        meta: { total: response.total },
      },
    };
  };

  return (
    <div className="bg-white rounded-lg shadow p-4">
      <DataTable<Customer, unknown>
        columns={customerColumns}
        data={customers}
        isLoading={isLoading}
        totalItems={data?.total ?? 0}
        tableKey="customers"
        fetchData={fetchTableCustumers}
        onRowClick={handleRowClick}
        emptyState={emptyState}
        setSelected={setSelected}
        hasTab={true}
        hasAllTab={true}
        tabInfo={[
          {
            name: "Newsletter Subscribers",
            columns: customerColumns,
            data: customers.filter((c) => c.newsletterSubscribed === true),
            tableKey: "newsletter-subscribers",
            onRowClick: handleRowClick,
            // emptyState: (
            //   <EmptyState image={person} message="No newsletter subscribers." />
            // ),
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
