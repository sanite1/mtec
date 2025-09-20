// components/tax/TaxTable.tsx
import React, { useState } from "react";
import { DataTable } from "../../utils/data-table";
import { Edit, Trash } from "lucide-react";
import EmptyState from "../../utils/EmptyState";
import receipt from "../../assets/boxEmpty.png";
import DeleteTaxModal from "./DeleteTaxModal";
import EditTaxSidebar from "./EditTaxSidebar";

export interface Tax {
  id: string;
  dateCreated: string;
  name: string;
  description: string;
  rate: string; // percentage (e.g. "7.5")
}

// Mock data
const mockTaxes: Tax[] = [
  {
    id: "1",
    dateCreated: "2025-09-01",
    name: "VAT",
    description: "Value Added Tax (standard)",
    rate: "7.5",
  },
  {
    id: "2",
    dateCreated: "2025-09-04",
    name: "Service Tax",
    description: "Applicable on service-related products",
    rate: "5",
  },
  {
    id: "3",
    dateCreated: "2025-09-08",
    name: "Luxury Goods Tax",
    description: "Extra charge for luxury items",
    rate: "10",
  },
];

const fetchTaxes = async (params: any) => {
  await new Promise((resolve) => setTimeout(resolve, 500));
  const { page = 1, perPage = 10, search } = params;
  let filtered = mockTaxes;

  if (search) {
    filtered = filtered.filter(
      (t) =>
        t.name.toLowerCase().includes(search.toLowerCase()) ||
        t.description.toLowerCase().includes(search.toLowerCase())
    );
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

const TaxTable = () => {
  const [selected, setSelected] = useState<Tax[]>([]);
  const [deleteTarget, setDeleteTarget] = useState<Tax | null>(null);
  const [editTarget, setEditTarget] = useState<Tax | null>(null);

  const taxColumns = [
    { accessorKey: "dateCreated", header: "Date Created" },
    { accessorKey: "name", header: "Tax Name" },
    { accessorKey: "description", header: "Description" },
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
        fetchData={fetchTaxes}
        totalItems={mockTaxes.length}
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
          onConfirm={() => {
            console.log("Deleting:", deleteTarget);
            setDeleteTarget(null);
          }}
        />
      )}

      {/* Edit Sidebar */}
      {editTarget && (
        <EditTaxSidebar
          tax={editTarget}
          onClose={() => setEditTarget(null)}
          onSave={(updated) => {
            console.log("Updated:", updated);
            setEditTarget(null);
          }}
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
