import React, {
  Dispatch,
  SetStateAction,
  useEffect,
  useMemo,
  useState,
} from "react";

import { useQuery } from "@tanstack/react-query";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

// Custom hook for debouncing
import useDebounce from "./use-debounce";
import ColumnFilterSelect from "./filter";
import ExportSelect from "./export-table";
import TableSkeleton from "./table-skeleton";
import Pagination from "./pagination";
import { Search } from "lucide-react";

interface TableParamProps {
  page: number;
  perPage: number;
  search?: string;
}

interface DataTableProps<TData, TValue> {
  data?: TData[];
  columns: ColumnDef<TData, TValue>[];
  fetchData?: (params: TableParamProps) => any;
  totalItems?: number;
  emptyState?: React.ReactNode;
  tableKey: string;
  onRowClick?: (row: TData) => void;
  isLoading?: boolean;
  hasTab?: boolean;
  setSelected?: Dispatch<SetStateAction<TData[]>>;
  hasAllTab?: boolean;
  tabInfo?: {
    name: string;
    columns: ColumnDef<TData, TValue>[];
    fetchData?: (params: TableParamProps) => any;
    data?: TData[];
    emptyState?: React.ReactNode;
    tableKey: string;
    onRowClick?: (row: TData) => void;
  }[];
}

interface ColumnWithVisibility<TData, TValue> {
  columnDef: ColumnDef<TData, TValue> & {
    accessorKey: string;
    header: string;
  };
  isVisible: boolean;
}

export function DataTable<TData, TValue>({
  data,
  columns,
  fetchData,
  totalItems = 1,
  emptyState = "No results found.",
  tableKey,
  onRowClick,
  isLoading,
  hasTab = false,
  tabInfo,
  hasAllTab = true,
  setSelected,
}: DataTableProps<TData, TValue>) {
  const [activeTab, setActiveTab] = useState(
    hasAllTab ? "all" : tabInfo ? tabInfo[0].name : "",
  );
  const emptyStateComponent =
    tabInfo && tabInfo?.length > 0
      ? tabInfo.find((tab) => tab.name === activeTab)?.emptyState
      : emptyState;

  // For URL parameters in React (without Next.js)
  const [searchParams, setSearchParams] = useState<URLSearchParams>(
    new URLSearchParams(window.location.search),
  );

  // Update URL when searchParams change
  useEffect(() => {
    const current = window.location.search.replace(/^\?/, "");
    const next = searchParams.toString();
    if (current !== next) {
      const newUrl = `${window.location.pathname}?${next}`;
      window.history.replaceState(null, "", newUrl);
    }
  }, [searchParams]);

  const page = Number(searchParams.get("page") || "1") || 1;
  const perPage = Number(searchParams.get("perPage") || "5") || 1;
  const search = searchParams.get("search") || "";

  const [searchValue, setSearchValue] = useState<string>(search);

  const activeTableKey = tabInfo
    ? activeTab === "all"
      ? tableKey
      : (tabInfo.find((tab) => tab.name === activeTab)?.tableKey ?? "")
    : tableKey;

  const activeFetchData = tabInfo
    ? activeTab === "all"
      ? fetchData
      : tabInfo.find((tab) => tab.name === activeTab)?.fetchData
    : fetchData;

  const activeData = tabInfo
    ? activeTab === "all"
      ? data
      : (tabInfo.find((tab) => tab.name === activeTab)?.data ?? [])
    : data;

  const activeRowClick = tabInfo
    ? activeTab === "all"
      ? onRowClick
      : tabInfo.find((tab) => tab.name === activeTab)?.onRowClick
    : onRowClick;

  const initialColumns: ColumnWithVisibility<TData, TValue>[] = useMemo(() => {
    const activeColumns: ColumnDef<TData, TValue>[] = tabInfo
      ? activeTab === "all"
        ? columns
        : (tabInfo.find((tab) => tab.name === activeTab)?.columns ?? [])
      : columns;

    return activeColumns.map((col) => ({
      columnDef: {
        ...col,
        accessorKey: (col as any).accessorKey,
        header: (col as any).header,
      },
      isVisible: true,
    }));
  }, [activeTab, columns, tabInfo]);

  const [visibleColumns, setVisibleColumns] =
    useState<ColumnWithVisibility<TData, TValue>[]>(initialColumns);

  useEffect(() => {
    setVisibleColumns(initialColumns);
  }, [initialColumns]);

  const {
    data: fetchedData,
    isLoading: queryIsLoading,
    isError,
  } = useQuery({
    queryKey: [activeTableKey, page, perPage, searchValue || undefined],
    queryFn: () => {
      const params = {
        page,
        perPage,
        ...(searchValue ? { search: searchValue } : {}),
      };

      return activeFetchData
        ? activeFetchData(params)
        : Promise.resolve(activeData);
    },
    enabled: !!activeFetchData,
  });

  const activeTabInParams = searchParams.get("activeTab");
  useEffect(() => {
    if (activeTabInParams) {
      setActiveTab(activeTabInParams);
    }
  }, [activeTabInParams]);

  const tableData =
    activeTabInParams === "Receivables" && fetchedData?.data?.debitNotes
      ? fetchedData?.data?.debitNotes
      : fetchedData?.data?.data ||
        (Array.isArray(fetchedData?.data) ? fetchedData?.data : activeData) ||
        [];
  const totalPage =
    fetchedData?.data?.meta?.total || fetchedData?.meta?.total || totalItems;

  const filteredColumns = visibleColumns
    ?.filter((column) => column.isVisible)
    ?.map((column) => column.columnDef);

  const table = useReactTable({
    data: tableData,
    columns: filteredColumns,
    getCoreRowModel: getCoreRowModel(),
  });

  const debouncedSearch = useDebounce(searchValue, 300);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  const handlePageChange = (newPage: number) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set("activeTab", activeTab);
    newParams.set("page", String(newPage));
    newParams.set("perPage", String(perPage));
    setSearchParams(newParams);
  };

  const handleRowsPerPageChange = (newPerPage: number) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set("activeTab", activeTab);
    newParams.set("page", "1");
    newParams.set("perPage", String(newPerPage));
    setSearchParams(newParams);
  };

  const handleRowClick = (row: TData) => {
    if (activeRowClick) activeRowClick(row);
  };

  const normalizedSearch = search || "";

  useEffect(() => {
    if (debouncedSearch !== normalizedSearch) {
      const newParams = new URLSearchParams(searchParams);
      newParams.set("activeTab", activeTab);
      if (debouncedSearch) {
        newParams.set("search", debouncedSearch);
      } else {
        newParams.delete("search");
      }
      newParams.set("page", "1");
      setSearchParams(newParams);
    }
  }, [debouncedSearch, normalizedSearch, activeTab, searchParams]);

  // Memoize selected rows
  const selectedRows = useMemo(
    () => table.getSelectedRowModel().rows.map((v) => v.original),
    [table],
  );

  useEffect(() => {
    if (setSelected) setSelected(selectedRows);
  }, [selectedRows, setSelected]);

  if (isError) {
    return <div>Error loading data. Please try again.</div>;
  }

  return (
    <div className="mb-5 flex flex-col gap-2">
      <div className="mb-2 sm:flex items-center justify-between space-y-5 sm:space-y-0">
        <div className="relative w-full max-w-sm rounded-md border border-transparent">
          <div className="absolute left-2 top-1/2 -translate-y-1/2 transform text-gray-400">
            <Search className="h-5 w-5 text-gray-400" />
          </div>

          <input
            type="text"
            placeholder="Search..."
            value={searchValue}
            onChange={handleSearch}
            className="h-10 w-full rounded-md border border-gray-300 pl-8 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>
        <div className="flex gap-2">
          <ColumnFilterSelect
            columns={visibleColumns}
            setVisibleColumns={setVisibleColumns}
          />
          <ExportSelect data={activeData || []} />
        </div>
      </div>

      {/* Tab navigation */}
      {hasTab && tabInfo && (
        <div className="my-4 overflow-x-scroll sm:overflow-auto w-[80vw] sm:w-full">
          <div className="flex gap-4 border-b pl-2">
            {hasAllTab && (
              <button
                className={`px-2 pb-4 text-sm font-medium whitespace-nowrap ${
                  activeTab === "all"
                    ? "border-b-4 border-b-purple-400 text-gray-800"
                    : "text-gray-500"
                }`}
                onClick={() => {
                  setActiveTab("all");
                  const newParams = new URLSearchParams(searchParams);
                  newParams.set("activeTab", "all");
                  newParams.set("page", "1");
                  newParams.set("perPage", String(perPage));
                  setSearchParams(newParams);
                }}
              >
                All
              </button>
            )}
            {tabInfo?.map((tab) => (
              <button
                key={tab.name}
                className={`px-2 pb-4 text-sm font-medium whitespace-nowrap ${
                  activeTab === tab.name
                    ? "border-b-4 border-b-purple-400 text-gray-800"
                    : "text-gray-500"
                }`}
                onClick={() => {
                  setActiveTab(tab.name);
                  const newParams = new URLSearchParams(searchParams);
                  newParams.set("activeTab", tab.name);
                  newParams.set("page", "1");
                  newParams.set("perPage", String(perPage));
                  setSearchParams(newParams);
                }}
              >
                {tab.name}
              </button>
            ))}
          </div>
        </div>
      )}

      <div
        className={
          tableData.length > 0
            ? "rounded-md max-w-[80vw] sm:min-w-full border"
            : ""
        }
      >
        {isLoading || queryIsLoading ? (
          <TableSkeleton columns={columns.length} row={perPage} />
        ) : (
          <>
            {tableData.length === 0 || !tableData ? (
              <div className="p-4 text-center text-gray-500">
                {emptyStateComponent}
              </div>
            ) : (
              <div className="overflow-x-auto max-w-full lg:min-w-full">
                <table className="max-w-full lg:min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    {table.getHeaderGroups().map((headerGroup) => (
                      <tr key={headerGroup.id}>
                        {headerGroup.headers.map((header) => (
                          <th
                            key={header.id}
                            className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                          >
                            {header.isPlaceholder
                              ? null
                              : flexRender(
                                  header.column.columnDef.header,
                                  header.getContext(),
                                )}
                          </th>
                        ))}
                      </tr>
                    ))}
                  </thead>
                  <tbody className="divide-y divide-gray-200 bg-white">
                    {!isLoading &&
                      !isError &&
                      tableData.length &&
                      table.getRowModel().rows.map((row) => (
                        <tr
                          key={row.id}
                          onClick={() => handleRowClick(row.original)}
                          className="cursor-pointer hover:bg-gray-50"
                        >
                          {row.getVisibleCells().map((cell) => (
                            <td
                              key={cell.id}
                              className="whitespace-nowrap px-6 py-4"
                            >
                              {flexRender(
                                cell.column.columnDef.cell,
                                cell.getContext(),
                              )}
                            </td>
                          ))}
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            )}
          </>
        )}
      </div>

      {tableData.length > 0 && (
        <Pagination
          totalItems={totalPage}
          currentPage={page}
          rowsPerPage={perPage}
          onPageChange={handlePageChange}
          onRowsPerPageChange={handleRowsPerPageChange}
        />
      )}
    </div>
  );
}
