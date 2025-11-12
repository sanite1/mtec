import React, { useState } from "react";
import { DataTable } from "../../utils/data-table";
import { Edit, Trash } from "lucide-react";
import EmptyState from "../../utils/EmptyState";
import box from "../../assets/boxEmpty.png";
import DeleteShippingModal from "./DeleteShippingModal";
import EditShippingSidebar from "./EditShippingSidebar";
import { Shipping } from "../../lib/types/shipping";
import { getDecodedJwt } from "../../lib/auth";
import {
  useDeleteShipping,
  useStoreShipping,
  useUpdateShipping,
} from "../../lib/api/shipping";
import { formatDate } from "../../lib/utils/formatDate";

const ShippingTable = () => {
  const [selected, setSelected] = useState<Shipping[]>([]);
  const [deleteTarget, setDeleteTarget] = useState<Shipping | null>(null);
  const [editTarget, setEditTarget] = useState<Shipping | null>(null);

  // 🧩 Get logged-in user's store ID
  const user = getDecodedJwt();
  const userId = user?._id || user?.id;

  // 📦 Fetch shipping data
  const { data, isLoading, refetch } = useStoreShipping(userId, {
    page: 1,
    limit: 20,
  });

  // 🗑️ Delete mutation
  const { mutate: deleteShipping, isPending: isDeleting } = useDeleteShipping();

  // ✏️ Update mutation
  const { mutate: updateShipping, isPending: isUpdating } = useUpdateShipping();

  // 🧮 Columns
  const shippingColumns = [
    {
      accessorKey: "createdAt",
      header: "Date Created",
      cell: (info: any) => {
        const date = info.getValue();
        return <span>{formatDate(date)}</span>;
      },
    },
    { accessorKey: "name", header: "Location Name" },
    { accessorKey: "location", header: "Location" },
    {
      accessorKey: "description",
      header: "Shipping Description",
      cell: (info: any) => info.getValue() || "N/A",
    },
    {
      accessorKey: "price",
      header: "Shipping Fee",
      cell: (info: any) => {
        const fee = info.getValue();
        return <span>₦{Number(fee).toLocaleString()}</span>;
      },
    },
    {
      id: "actions",
      cell: ({ row }: any) => {
        const shipping = row.original as Shipping;
        return (
          <div className="flex gap-2">
            <button
              onClick={() => setEditTarget(shipping)}
              className="p-2 rounded-md bg-blue-100 text-blue-700 hover:bg-blue-200 transition"
            >
              <Edit size={16} />
            </button>
            <button
              onClick={() => setDeleteTarget(shipping)}
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
      image={box}
      message="No shipping options found"
      subtext="When you add shipping locations, they’ll appear here."
    />
  );

  // 🧾 Handle Delete
  const handleDelete = async () => {
    if (!deleteTarget) return;
    await deleteShipping(deleteTarget._id, {
      onSuccess: () => {
        setDeleteTarget(null);
        refetch();
      },
    });
  };

  // 🧾 Handle Edit Save
  const handleEditSave = async (updatedData: Partial<Shipping>) => {
    if (!editTarget) return;

    await updateShipping(
      { id: editTarget._id, data: updatedData },
      {
        onSuccess: () => {
          setEditTarget(null);
          refetch();
        },
      },
    );
  };

  const shippingData = data?.shipping || [];

  return (
    <div className="bg-white rounded-lg shadow p-4">
      <DataTable<Shipping, unknown>
        columns={shippingColumns}
        data={shippingData}
        totalItems={data?.total || 0}
        isLoading={isLoading}
        tableKey="shipping"
        onRowClick={(shipping) => console.log("Clicked shipping:", shipping)}
        setSelected={setSelected}
        hasTab={false}
        emptyState={emptyState}
      />

      {/* 🗑️ Delete Modal */}
      {deleteTarget && (
        <DeleteShippingModal
          locationName={deleteTarget.name}
          onClose={() => setDeleteTarget(null)}
          onConfirm={handleDelete}
          loading={isDeleting}
        />
      )}

      {/* ✏️ Edit Sidebar */}
      {editTarget && (
        <EditShippingSidebar
          shipping={editTarget}
          onClose={() => setEditTarget(null)}
          onSave={handleEditSave}
          loading={isUpdating}
        />
      )}

      {/* ✅ Selected state footer */}
      {selected.length > 0 && (
        <div className="mt-4 p-3 bg-blue-50 rounded-lg">
          <p className="text-blue-800">
            {selected.length} shipping option(s) selected
          </p>
        </div>
      )}
    </div>
  );
};

export default ShippingTable;
