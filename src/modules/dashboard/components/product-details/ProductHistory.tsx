import React, { useState, useMemo } from "react";
import { DataTable, TableParamProps } from "../../utils/data-table";
import { IProductHistory } from "../../lib/types/products";
import { formatDate } from "../../lib/utils/formatDate";
import { fetchProductHistory } from "../../lib/api/products";
import { useParams } from "react-router-dom";

// ---------------- Columns ----------------
const historyColumns = [
  {
    accessorKey: "createdAt",
    header: "Date",
    cell: (info: any) => formatDate(info.getValue()),
  },
  {
    accessorKey: "source",
    header: "Source",
    cell: (info: any) => info.getValue()?.toUpperCase(),
  },
  {
    accessorKey: "activity",
    header: "Activity",
    cell: (info: any) => {
      const value = info.getValue();
      const colors: Record<string, string> = {
        sold: "bg-blue-100 text-blue-800",
        added: "bg-green-100 text-green-800",
        returned: "bg-yellow-100 text-yellow-800",
        removed: "bg-red-100 text-red-800",
      };

      return (
        <span
          className={`px-2 py-1 rounded-full text-xs font-semibold ${
            colors[value] ?? ""
          }`}
        >
          {value?.charAt(0).toUpperCase() + value?.slice(1)}
        </span>
      );
    },
  },
  { accessorKey: "qtyBefore", header: "Qty Before" },
  {
    accessorKey: "qtyChange",
    header: "Change",
    cell: (info: any) => {
      const val = info.getValue();
      const activity = info.row.original.activity?.toLowerCase();

      const isPositive = activity === "added" || activity === "returned";

      return (
        <span className={isPositive ? "text-green-600" : "text-red-600"}>
          {isPositive ? `+${val}` : val}
        </span>
      );
    },
  },
  { accessorKey: "qtyAfter", header: "Qty After" },
];

// ---------------- Component ----------------
interface Props {
  history: IProductHistory[];
  isLoading: boolean;
  error: any;
  total: number;
}

const ProductHistory = ({ history, isLoading, error, total }: Props) => {
  const { id } = useParams();
  const [selectedRows, setSelectedRows] = useState<IProductHistory[]>([]);

  const handleRowClick = (entry: IProductHistory) => {
    console.log("History entry clicked:", entry);
  };

  // ---------------- Fetch Helpers ----------------
  const createFetchHandler =
    (activity?: string) => async (params: TableParamProps) => {
      const response = await fetchProductHistory(id as string, {
        page: params.page,
        limit: params.perPage,
        activity,
      });

      return {
        data: {
          data: response.history,
          meta: { total: response.total },
        },
      };
    };

  const fetchAllHistory = createFetchHandler();
  const fetchSoldHistory = createFetchHandler("sold");
  const fetchAddedHistory = createFetchHandler("added");
  const fetchRemovedHistory = createFetchHandler("removed");
  const fetchReturnedHistory = createFetchHandler("returned");

  // ---------------- Tabs ----------------
  const tabs = useMemo(
    () => [
      {
        name: "Sold",
        tableKey: "sold-history",
        fetchData: fetchSoldHistory,
        emptyState: "No sold history entries.",
      },
      {
        name: "Added",
        tableKey: "added-history",
        fetchData: fetchAddedHistory,
        emptyState: "No added stock entries.",
      },
      {
        name: "Removed",
        tableKey: "removed-history",
        fetchData: fetchRemovedHistory,
        emptyState: "No removed stock entries.",
      },
      {
        name: "Returned",
        tableKey: "returned-history",
        fetchData: fetchReturnedHistory,
        emptyState: "No returned stock entries.",
      },
    ],
    [],
  );

  if (error) {
    return (
      <div className="p-4 bg-red-50 text-red-600 rounded-md">
        Failed to load product history.
      </div>
    );
  }

  return (
    <div className="bg-gray-50">
      <div className="mb-3">
        <p className="text-gray-600">
          Track all product history activities (sales, additions, removals, and
          returns).
        </p>
      </div>

      <div className="bg-white rounded-lg shadow p-4">
        <DataTable<IProductHistory, unknown>
          columns={historyColumns}
          data={history}
          isLoading={isLoading}
          totalItems={total}
          tableKey="product-history"
          onRowClick={handleRowClick}
          setSelected={setSelectedRows}
          fetchData={fetchAllHistory}
          hasTab
          hasAllTab
          tabInfo={tabs.map((tab) => ({
            ...tab,
            columns: historyColumns,
            onRowClick: handleRowClick,
          }))}
        />

        {selectedRows.length > 0 && (
          <div className="mt-4 p-3 bg-blue-50 rounded-lg">
            <p className="text-blue-800">
              {selectedRows.length} history record(s) selected
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductHistory;
