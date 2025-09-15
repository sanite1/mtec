// components/table-skeleton.tsx
import React from "react";

interface TableSkeletonProps {
  columns: number;
  row: number;
}

const TableSkeleton: React.FC<TableSkeletonProps> = ({ columns, row }) => {
  return (
    <div className="animate-pulse">
      <div className="flex space-x-4 p-4 border-b">
        {Array.from({ length: columns }).map((_, index) => (
          <div key={index} className="h-4 bg-gray-200 rounded flex-1"></div>
        ))}
      </div>

      {Array.from({ length: row }).map((_, rowIndex) => (
        <div key={rowIndex} className="flex space-x-4 p-4 border-b">
          {Array.from({ length: columns }).map((_, colIndex) => (
            <div
              key={colIndex}
              className="h-4 bg-gray-100 rounded flex-1"
            ></div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default TableSkeleton;
