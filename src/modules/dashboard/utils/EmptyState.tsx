import React from "react";

interface EmptyStateProps {
  image: any;
  message: string;
  subtext?: string;
}

const EmptyState: React.FC<EmptyStateProps> = ({ image, message, subtext }) => {
  return (
    <div className="flex flex-col items-center justify-center text-center py-10">
      <img
        src={image}
        alt="Empty State"
        className="w-32 h-32 object-contain mb-4 opacity-80"
      />
      <h3 className="text-lg font-semibold text-gray-700">{message}</h3>
      {subtext && <p className="text-sm text-gray-500 mt-1">{subtext}</p>}
    </div>
  );
};

export default EmptyState;
