// components/shipping/ShippingTable.tsx
import React, { useState } from "react";
import { DataTable } from "../../utils/data-table";
import { Edit, Trash } from "lucide-react";
import EmptyState from "../../utils/EmptyState";
import box from "../../assets/boxEmpty.png";
import DeleteShippingModal from "./DeleteShippingModal";
import EditShippingSidebar from "./EditShippingSidebar";
import CreateShippingSidebar from "./CreateShippingSidebar";
// import DeleteShippingModal from "./DeleteShippingModal";
// import EditShippingSidebar from "./EditShippingSidebar";

export interface Shipping {
  id: string;
  dateCreated: string;
  locationName: string;
  description: string;
  fee: string;
}

// Mock data
const mockShipping: Shipping[] = [
  {
    id: "1",
    dateCreated: "2025-09-01",
    locationName: "Lagos",
    description: "Standard shipping within Lagos",
    fee: "2000",
  },
  {
    id: "2",
    dateCreated: "2025-09-03",
    locationName: "Abuja",
    description: "Express shipping to Abuja",
    fee: "5000",
  },
  {
    id: "3",
    dateCreated: "2025-09-07",
    locationName: "Port Harcourt",
    description: "Regional delivery service",
    fee: "3500",
  },
];

const fetchShipping = async (params: any) => {
  await new Promise((resolve) => setTimeout(resolve, 500));
  const { page = 1, perPage = 10, search } = params;
  let filtered = mockShipping;

  if (search) {
    filtered = filtered.filter(
      (s) =>
        s.locationName.toLowerCase().includes(search.toLowerCase()) ||
        s.description.toLowerCase().includes(search.toLowerCase())
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

const ShippingTable = () => {
  const [selected, setSelected] = useState<Shipping[]>([]);
  const [deleteTarget, setDeleteTarget] = useState<Shipping | null>(null);
  const [editTarget, setEditTarget] = useState<Shipping | null>(null);

  const shippingColumns = [
    { accessorKey: "dateCreated", header: "Date Created" },
    { accessorKey: "locationName", header: "Location Name" },
    { accessorKey: "description", header: "Shipping Description" },
    {
      accessorKey: "fee",
      header: "Shipping Fee",
      cell: (info: any) => {
        const fee = info.getValue();
        return <span>₦{fee.toLocaleString()}</span>;
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

  return (
    <div className="bg-white rounded-lg shadow p-4">
      <DataTable<Shipping, unknown>
        columns={shippingColumns}
        fetchData={fetchShipping}
        totalItems={mockShipping.length}
        tableKey="shipping"
        onRowClick={(shipping) => console.log("Clicked shipping:", shipping)}
        setSelected={setSelected}
        hasTab={false}
        emptyState={emptyState}
      />

      {/* Modals (to implement later) */}
      {deleteTarget && (
        <DeleteShippingModal
          locationName={deleteTarget.locationName}
          onClose={() => setDeleteTarget(null)}
          onConfirm={() => {
            console.log("Deleting:", deleteTarget);
            setDeleteTarget(null);
          }}
        />
      )}

      {editTarget && (
        <EditShippingSidebar
          shipping={editTarget}
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
            {selected.length} shipping option(s) selected
          </p>
        </div>
      )}
    </div>
  );
};

export default ShippingTable;
