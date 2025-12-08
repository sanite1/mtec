import React, { useState } from "react";
import { DataTable, TableParamProps } from "../../utils/data-table";
import { Edit, Trash } from "lucide-react";
import EmptyState from "../../utils/EmptyState";
import mapPin from "../../assets/boxEmpty.png";
import DeleteLocationModal from "./DeleteLocationModal";
import {
  Location,
  LocationPayload,
  LocationResponseData,
} from "../../lib/types/locations";
import {
  fetchStoreLocations,
  useDeleteLocation,
  useUpdateLocation,
} from "../../lib/api/locations";
import { formatDate } from "../../lib/utils/formatDate";
import EditLocationSidebar from "./LocationFormSidebar";
import { getDecodedJwt } from "../../lib/auth";

const LocationTable = ({
  data,
  isLoading,
  refetchTable,
}: {
  data: LocationResponseData | undefined;
  isLoading: boolean;
  refetchTable: () => void;
}) => {
  // 🔹 API Hooks
  const { mutateAsync: deleteLocation, isPending: deletingLocation } =
    useDeleteLocation();
  const { mutateAsync: updateLocation, isPending: updatingLocation } =
    useUpdateLocation();

  // 🔹 State
  const [selected, setSelected] = useState<Location[]>([]);
  const [deleteTarget, setDeleteTarget] = useState<Location | null>(null);
  const [editTarget, setEditTarget] = useState<Location | null>(null);

  const locations = data?.locations || [];
  const totalItems = data?.total || 0;

  // 🔹 Delete Handler
  const handleDelete = async (location: Location) => {
    try {
      await deleteLocation(
        { id: location._id },
        {
          onSuccess: () => {
            setDeleteTarget(null);
            refetchTable();
          },
        },
      );
    } catch (error) {
      console.error();
    }
  };

  // 🔹 Update Handler
  const handleUpdate = async (id: string, updated: LocationPayload) => {
    try {
      await updateLocation(
        { id, data: updated },
        {
          onSuccess: () => {
            setEditTarget(null);
            refetchTable();
          },
        },
      );
    } catch (error) {
      console.error();
    }
  };

  // 🔹 Table Columns
  const locationColumns = [
    {
      accessorKey: "createdAt",
      header: "Date Created",
      cell: (info: any) => {
        const date = info.getValue();
        return <span>{formatDate(date)}</span>;
      },
    },
    { accessorKey: "name", header: "Location Name" },
    // {
    //   accessorKey: "description",
    //   header: "Description",
    //   cell: (info: any) => info.getValue() || "N/A",
    // },
    { accessorKey: "address", header: "Address" },
    { accessorKey: "city", header: "City" },
    { accessorKey: "state", header: "State" },
    { accessorKey: "country", header: "Country" },
    {
      id: "actions",
      header: "Actions",
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

  const user = getDecodedJwt();
  const userId = user?._id || user?.id;

  const fetchTableLocations = async (params: TableParamProps) => {
    const response = await fetchStoreLocations(userId, {
      page: params.page,
      limit: params.perPage,
      search: params.search,
    });

    return {
      data: {
        data: response.locations, // array of products
        meta: { total: response.total },
      },
    };
  };

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
        data={locations}
        isLoading={isLoading}
        fetchData={fetchTableLocations}
        totalItems={totalItems}
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
          onConfirm={() => handleDelete(deleteTarget)}
          loading={deletingLocation}
        />
      )}

      {/* Edit Sidebar */}
      {editTarget && (
        <EditLocationSidebar
          location={editTarget}
          onClose={() => setEditTarget(null)}
          onSave={(updated) => handleUpdate(editTarget._id, updated)}
          loading={updatingLocation}
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
