// components/location/LocationTable.tsx
import React, { useState } from "react";
import { DataTable } from "../../utils/data-table";
import { Edit, Trash } from "lucide-react";
import EmptyState from "../../utils/EmptyState";
import mapPin from "../../assets/boxEmpty.png"; // 📌 Add a relevant image
import DeleteLocationModal from "./DeleteLocationModal";
import EditLocationSidebar from "./LocationFormSidebar";

// ----------------- Types -----------------
export interface Location {
  id: string;
  dateCreated: string;
  name: string;
  description?: string;
  address: string;
  city: string;
  state: string;
  country: string;
}

// ----------------- Mock Locations -----------------
const mockLocations: Location[] = [
  {
    id: "1",
    dateCreated: "2025-09-01",
    name: "Main Warehouse",
    description: "Primary storage facility",
    address: "123 Industrial Road",
    city: "Lagos",
    state: "Lagos",
    country: "Nigeria",
  },
  {
    id: "2",
    dateCreated: "2025-09-05",
    name: "Retail Outlet",
    description: "Flagship retail store",
    address: "45 Bode Thomas Street",
    city: "Surulere",
    state: "Lagos",
    country: "Nigeria",
  },
  {
    id: "3",
    dateCreated: "2025-09-10",
    name: "Abuja Branch",
    description: "Northern distribution hub",
    address: "Plot 22 Garki",
    city: "Abuja",
    state: "FCT",
    country: "Nigeria",
  },
];

// ----------------- Fetch Function -----------------
const fetchLocations = async (params: any) => {
  await new Promise((resolve) => setTimeout(resolve, 500));
  const { page = 1, perPage = 10, search } = params;
  let filtered = mockLocations;

  if (search) {
    filtered = filtered.filter(
      (loc) =>
        loc.name.toLowerCase().includes(search.toLowerCase()) ||
        loc.city.toLowerCase().includes(search.toLowerCase()) ||
        loc.state.toLowerCase().includes(search.toLowerCase()) ||
        loc.country.toLowerCase().includes(search.toLowerCase())
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

// ----------------- Component -----------------
const LocationTable = () => {
  const [selected, setSelected] = useState<Location[]>([]);
  const [deleteTarget, setDeleteTarget] = useState<Location | null>(null);
  const [editTarget, setEditTarget] = useState<Location | null>(null);

  const locationColumns = [
    { accessorKey: "dateCreated", header: "Date Created" },
    { accessorKey: "name", header: "Location Name" },
    // { accessorKey: "description", header: "Description" },
    { accessorKey: "address", header: "Address" },
    { accessorKey: "city", header: "City" },
    { accessorKey: "state", header: "State" },
    { accessorKey: "country", header: "Country" },
    {
      id: "actions",
      cell: ({ row }: any) => {
        const location = row.original as Location;
        return (
          <div className="flex gap-2">
            <button
              onClick={() => setEditTarget(location)}
              className="p-2 rounded-md bg-blue-100 text-blue-700 hover:bg-blue-200 transition"
            >
              <Edit size={16} />
            </button>
            <button
              onClick={() => setDeleteTarget(location)}
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
      image={mapPin}
      message="No locations found"
      subtext="When you create locations, they’ll appear here."
    />
  );

  return (
    <div className="bg-white rounded-lg shadow p-4">
      <DataTable<Location, unknown>
        columns={locationColumns}
        fetchData={fetchLocations}
        totalItems={mockLocations.length}
        tableKey="locations"
        onRowClick={(loc) => console.log("Clicked location:", loc)}
        setSelected={setSelected}
        hasTab={false}
        emptyState={emptyState}
      />

      {/* Delete Modal */}
      {deleteTarget && (
        <DeleteLocationModal
          locationName={deleteTarget.name}
          onClose={() => setDeleteTarget(null)}
          onConfirm={() => {
            console.log("Deleting:", deleteTarget);
            setDeleteTarget(null);
          }}
        />
      )}

      {/* Edit Sidebar */}
      {editTarget && (
        <EditLocationSidebar
          location={editTarget}
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
          <p className="text-blue-800">
            {selected.length} location(s) selected
          </p>
        </div>
      )}
    </div>
  );
};

export default LocationTable;
