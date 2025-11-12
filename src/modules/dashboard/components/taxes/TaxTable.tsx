import React, { useState } from "react";
import { DataTable } from "../../utils/data-table";
import { Edit, Trash } from "lucide-react";
import EmptyState from "../../utils/EmptyState";
import receipt from "../../assets/boxEmpty.png";
import DeleteTaxModal from "./DeleteTaxModal";
import EditTaxSidebar from "./EditTaxSidebar";
import { Tax, TaxPayload, TaxResponseData } from "../../lib/types/taxes";
import { useDeleteTax, useUpdateTax } from "../../lib/api/taxes";
import { formatDate } from "../../lib/utils/formatDate";

const TaxTable = ({
  data,
  isLoading,
  refetchTable,
}: {
  data: TaxResponseData | undefined;
  isLoading: boolean;
  refetchTable: () => void;
}) => {
  const { mutateAsync: deleteTax, isPending: deletingTax } = useDeleteTax();
  const { mutateAsync: updateTax, isPending: updatingTax } = useUpdateTax();

  const [selected, setSelected] = useState<Tax[]>([]);
  const [deleteTarget, setDeleteTarget] = useState<Tax | null>(null);
  const [editTarget, setEditTarget] = useState<Tax | null>(null);

  const taxes = data?.taxes || [];
  const totalItems = data?.total || 0;

  const handleDelete = async (tax: Tax) => {
    await deleteTax(
      { id: tax._id },
      {
        onSuccess: () => {
          setDeleteTarget(null);
          refetchTable();
        },
      },
    );
  };

  const handleUpdate = async (id: string, updated: TaxPayload) => {
    await updateTax(
      { id, data: updated },
      {
        onSuccess: () => {
          setEditTarget(null);
          refetchTable();
        },
      },
    );
  };

  const taxColumns = [
    {
      accessorKey: "createdAt",
      header: "Date Created",
      cell: (info: any) => {
        const date = info.getValue();
        return <span>{formatDate(date)}</span>;
      },
    },
    { accessorKey: "name", header: "Tax Name" },
    {
      accessorKey: "description",
      header: "Description",
      cell: (info: any) => info.getValue() || "N/A",
    },
    {
      accessorKey: "applyToCheckout",
      header: "Applied To Checkout",
      cell: (info: any) => {
        const applyToCheckout = info.getValue() ?? true; // default to active
        const status = applyToCheckout ? "Applied" : "Not Applied";

        const statusClass = applyToCheckout
          ? "bg-green-100 text-green-800"
          : "bg-gray-100 text-gray-800";

        return (
          <span
            className={`px-2 py-1 rounded-full text-sm font-semibold ${statusClass}`}
          >
            {status}
          </span>
        );
      },
    },
    {
      accessorKey: "rate",
      header: "Tax Rate",
      cell: (info: any) => {
        const rate = info.getValue();
        return <span>{rate}%</span>;
      },
    },
    {
      id: "actions",
      cell: ({ row }: any) => {
        const tax = row.original as Tax;
        return (
          <div className="flex gap-2">
            <button
              onClick={() => setEditTarget(tax)}
              className="p-2 rounded-md bg-blue-100 text-blue-700 hover:bg-blue-200 transition"
            >
              <Edit size={16} />
            </button>
            <button
              onClick={() => setDeleteTarget(tax)}
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
      image={receipt}
      message="No taxes found"
      subtext="When you add taxes, they’ll appear here."
    />
  );

  return (
    <div className="bg-white rounded-lg shadow p-4">
      <DataTable<Tax, unknown>
        columns={taxColumns}
        data={taxes}
        isLoading={isLoading}
        totalItems={totalItems}
        tableKey="taxes"
        onRowClick={(tax) => console.log("Clicked tax:", tax)}
        setSelected={setSelected}
        hasTab={false}
        emptyState={emptyState}
      />

      {/* Delete Modal */}
      {deleteTarget && (
        <DeleteTaxModal
          taxName={deleteTarget.name}
          onClose={() => setDeleteTarget(null)}
          onConfirm={() => handleDelete(deleteTarget)}
          loading={deletingTax}
        />
      )}

      {/* Edit Sidebar */}
      {editTarget && (
        <EditTaxSidebar
          tax={editTarget}
          onClose={() => setEditTarget(null)}
          onSave={(updated) => handleUpdate(editTarget._id, updated)}
          loading={updatingTax}
        />
      )}

      {/* Selection info */}
      {selected.length > 0 && (
        <div className="mt-4 p-3 bg-blue-50 rounded-lg">
          <p className="text-blue-800">{selected.length} tax(es) selected</p>
        </div>
      )}
    </div>
  );
};

export default TaxTable;
