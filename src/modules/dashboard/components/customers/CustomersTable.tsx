// components/customers/CustomersTable.tsx
import React, { useEffect, useState, useMemo } from "react";
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

  // ---------------- Filters ----------------
  const [filters, setFilters] = useState({
    page: 1,
    limit: 5,
    search: "",
    newsletter: undefined as boolean | undefined,
  });

  // ---------------- Sync URL → Filters ----------------
  useEffect(() => {
    const page = Number(searchParams.get("page")) || 1;
    const limit = Number(searchParams.get("perpage")) || 5;
    const search = searchParams.get("search") || "";
    const newsletterParam = searchParams.get("newsletter");

    setFilters({
      page,
      limit,
      search,
      newsletter:
        newsletterParam === "true"
          ? true
          : newsletterParam === "false"
            ? false
            : undefined,
    });
  }, [searchParams]);

  // ---------------- Initial Load (All) ----------------
  const { data, isLoading } = useStoreCustomers(userId, filters);
  const customers: Customer[] = data?.customers ?? [];

  // ---------------- State ----------------
  const [selected, setSelected] = useState<Customer[]>([]);
  const [deleteTarget, setDeleteTarget] = useState<Customer | null>(null);
  const [editTarget, setEditTarget] = useState<Customer | null>(null);

  // ---------------- Delete ----------------
  const { mutateAsync: deleteCustomer, isPending } = useDeleteCustomer();

  const handleDelete = async (customerId: string) => {
    await deleteCustomer(
      { customerId, userId },
      {
        onSuccess: () => {
          setDeleteTarget(null);
          refetch();
        },
      },
    );
  };

  // ---------------- Columns ----------------
  const customerColumns = [
    {
      accessorKey: "createdAt",
      header: "Joined Date",
      cell: (info: any) => formatDate(info.getValue()),
    },
    {
      accessorKey: "name",
      header: "Name",
      cell: ({ row }: any) =>
        `${row.original.firstName} ${row.original.lastName}`,
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
      cell: ({ row }: any) => (
        <div className="flex gap-2">
          <button
            onClick={() => setEditTarget(row.original)}
            className="p-2 rounded-md bg-blue-100 text-blue-700 hover:bg-blue-200"
          >
            <Edit size={16} />
          </button>
          <button
            onClick={() => setDeleteTarget(row.original)}
            className="p-2 rounded-md bg-red-100 text-red-700 hover:bg-red-200"
          >
            <Trash size={16} />
          </button>
        </div>
      ),
    },
  ];

  // ---------------- Fetch Helpers (LIKE PRODUCT HISTORY) ----------------
  const createFetchHandler =
    (subscribed?: "true" | "false") => async (params: TableParamProps) => {
      const response = await fetchStoreCustomers(userId, {
        page: params.page,
        limit: params.perPage,
        search: params.search,
        subscribed:
          subscribed === "true"
            ? true
            : subscribed === "false"
              ? false
              : undefined,
      });

      return {
        data: {
          data: response.customers,
          meta: { total: response.total },
        },
      };
    };

  const fetchAllCustomers = createFetchHandler();
  const fetchSubscribedCustomers = createFetchHandler("true");
  const fetchUnsubscribedCustomers = createFetchHandler("false");

  // ---------------- Tabs ----------------
  const tabs = useMemo(
    () => [
      {
        name: "Subscribed",
        tableKey: "subscribed-customers",
        fetchData: fetchSubscribedCustomers,
        emptyState: "No subscribed customers found.",
      },
      {
        name: "Not Subscribed",
        tableKey: "unsubscribed-customers",
        fetchData: fetchUnsubscribedCustomers,
        emptyState: "No unsubscribed customers found.",
      },
    ],
    [],
  );

  // ---------------- Empty State ----------------
  const emptyState = (
    <EmptyState
      image={person}
      message="No customers found"
      subtext="When customers join, they’ll appear here."
    />
  );

  // ---------------- Render ----------------
  return (
    <div className="bg-white rounded-lg shadow p-4">
      <DataTable<Customer, unknown>
        columns={customerColumns}
        data={customers}
        isLoading={isLoading}
        totalItems={data?.total ?? 0}
        tableKey="customers"
        fetchData={fetchAllCustomers}
        setSelected={setSelected}
        hasTab
        hasAllTab
        emptyState={emptyState}
        tabInfo={tabs.map((tab) => ({
          ...tab,
          columns: customerColumns,
        }))}
      />

      {/* Delete */}
      {deleteTarget && (
        <DeleteModal
          customerName={deleteTarget.firstName}
          loading={isPending}
          onClose={() => setDeleteTarget(null)}
          onConfirm={() => handleDelete(deleteTarget._id)}
        />
      )}

      {/* Edit */}
      {editTarget && (
        <EditSidebar
          customer={editTarget}
          onClose={() => setEditTarget(null)}
          onSave={() => {
            refetch();
            setEditTarget(null);
          }}
        />
      )}

      {/* Selected */}
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
