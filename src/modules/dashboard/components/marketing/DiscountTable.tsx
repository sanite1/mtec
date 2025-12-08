// components/discount/DiscountTable.tsx
import React, { useState } from "react";
import { DataTable, TableParamProps } from "../../utils/data-table";
import { Edit, Trash } from "lucide-react";
import EmptyState from "../../utils/EmptyState";
import gift from "../../assets/boxEmpty.png";
import DeleteDiscountModal from "./DeleteDiscountModal";
import DiscountFormSidebar from "./DiscountFormSidebar";
import {
  Discount,
  DiscountPayload,
  DiscountResponseData,
} from "../../lib/types/discount";
import {
  fetchDiscounts,
  useDeleteDiscount,
  useUpdateDiscount,
} from "../../lib/api/discount";
import { formatDate } from "../../lib/utils/formatDate";
import { getDecodedJwt } from "../../lib/auth";

// ----------------- Component -----------------
const DiscountTable = ({
  data,
  isLoading,
  refetchTable,
  refetchSummary,
}: {
  data: DiscountResponseData | undefined;
  isLoading: boolean;
  refetchTable: () => void;
  refetchSummary: () => void;
}) => {
  const [selected, setSelected] = useState<Discount[]>([]);
  const [deleteTarget, setDeleteTarget] = useState<Discount | null>(null);
  const [editTarget, setEditTarget] = useState<Discount | null>(null);
  const { mutateAsync: deleteDiscount, isPending: deletingDiscount } =
    useDeleteDiscount();
  const { mutateAsync: updateDiscount, isPending: updatingDiscount } =
    useUpdateDiscount();

  const discountColumns = [
    { accessorKey: "discountName", header: "Discount Name" },
    {
      accessorKey: "value",
      header: "Discount Value",
      cell: ({ row }: any) => {
        const discount = row.original as Discount;
        return discount.discountType === "percentage"
          ? `${discount.discountValue}%`
          : `₦${discount.discountValue}`;
      },
    },
    { accessorKey: "locationName", header: "Location" },
    {
      accessorKey: "startDate",
      header: "Start Date",
      cell: (info: any) => {
        const date = info.getValue();
        return <span>{formatDate(date)}</span>;
      },
    },
    {
      accessorKey: "endDate",
      header: "End Date",
      cell: (info: any) => {
        const date = info.getValue();
        return <span>{formatDate(date)}</span>;
      },
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }: any) => {
        const discount = row.original;
        const now = new Date();

        const start = new Date(discount.startDate);
        const end = new Date(discount.endDate);

        let status = "";

        if (start <= now && end >= now) {
          status = "active";
        } else if (start > now) {
          status = "scheduled";
        } else if (end < now) {
          status = "expired";
        }

        let statusClass = "";
        if (status === "active") statusClass = "bg-green-100 text-green-800";
        if (status === "scheduled")
          statusClass = "bg-yellow-100 text-yellow-800";
        if (status === "expired") statusClass = "bg-red-100 text-red-800";

        return (
          <span
            className={`px-2 py-1 rounded-full text-sm font-semibold ${statusClass}`}
          >
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </span>
        );
      },
    },
    {
      id: "actions",
      cell: ({ row }: any) => {
        const discount = row.original as Discount;
        return (
          <div className="flex gap-2">
            <button
              onClick={() => setEditTarget(discount)}
              className="p-2 rounded-md bg-blue-100 text-blue-700 hover:bg-blue-200 transition"
            >
              <Edit size={16} />
            </button>
            <button
              onClick={() => setDeleteTarget(discount)}
              className="p-2 rounded-md bg-red-100 text-red-700 hover:bg-red-200 transition"
            >
              <Trash size={16} />
            </button>
          </div>
        );
      },
    },
  ];

  const user = getDecodedJwt();
  const userId = user?._id || user?.id;

  const fetchTableDiscount = async (params: TableParamProps) => {
    const response = await fetchDiscounts(userId, {
      page: params.page,
      limit: params.perPage,
      search: params.search,
    });

    return {
      data: {
        data: response.discounts, // array of products
        meta: { total: response.total },
      },
    };
  };

  // 🔹 Delete Handler
  const handleDelete = async (discount: Discount) => {
    try {
      await deleteDiscount(discount._id, {
        onSuccess: () => {
          setDeleteTarget(null);
          refetchTable();
          refetchSummary();
        },
      });
    } catch (error) {
      console.error();
    }
  };

  // 🔹 Update Handler
  const handleUpdate = async (id: string, updated: DiscountPayload) => {
    try {
      await updateDiscount(
        { id, data: updated },
        {
          onSuccess: () => {
            setEditTarget(null);
            refetchTable();
            refetchSummary();
          },
        },
      );
    } catch (error) {
      console.error();
    }
  };

  const emptyState = (
    <EmptyState
      image={gift}
      message="No discounts found"
      subtext="When you create discounts, they’ll appear here."
    />
  );

  // const user = getDecodedJwt();
  return (
    <div className="bg-white rounded-lg shadow p-4">
      <DataTable<Discount, unknown>
        data={data?.discounts}
        isLoading={isLoading}
        fetchData={fetchTableDiscount}
        columns={discountColumns}
        // fetchData={() => fetchDiscounts(user?.id)}
        totalItems={data?.total}
        tableKey="discounts"
        onRowClick={(discount) => console.log("Clicked discount:", discount)}
        setSelected={setSelected}
        hasTab={false}
        emptyState={emptyState}
      />

      {/* Delete Modal */}
      {deleteTarget && (
        <DeleteDiscountModal
          loading={deletingDiscount}
          discountName={deleteTarget.discountName}
          onClose={() => setDeleteTarget(null)}
          onConfirm={() => handleDelete(deleteTarget)}
        />
      )}

      {/* Edit Sidebar */}
      {editTarget && (
        <DiscountFormSidebar
          loading={updatingDiscount}
          discount={editTarget}
          onClose={() => setEditTarget(null)}
          onSave={(updated) => handleUpdate(editTarget._id, updated)}
        />
      )}

      {/* Selection info */}
      {selected.length > 0 && (
        <div className="mt-4 p-3 bg-blue-50 rounded-lg">
          <p className="text-blue-800">
            {selected.length} discount(s) selected
          </p>
        </div>
      )}
    </div>
  );
};

export default DiscountTable;
