// components/domains/NoDomainsEmptyState.tsx
import React from "react";
import boxEmpty from "../../assets/boxEmpty.png";

interface NoDomainsEmptyStateProps {
  onAddDomain?: () => void;
}

const NoDomainsEmptyState: React.FC<NoDomainsEmptyStateProps> = ({
  onAddDomain,
}) => {
  return (
    <div className="flex flex-col items-center justify-center text-center py-16 bg-white rounded-lg  border border-gray-200">
      <img src={boxEmpty} alt="No Domains" className="w-32 h-32 mb-4" />
      <h2 className="text-lg font-semibold text-gray-800">
        No Domains Connected
      </h2>
      <p className="text-gray-500 mt-2 max-w-md">
        You don’t have any domain connected to your account. Connect a domain to
        start using it with your store.
      </p>
      {onAddDomain && (
        <button
          onClick={onAddDomain}
          className="mt-6 px-6 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 transition"
        >
          Connect Domain
        </button>
      )}
    </div>
  );
};

export default NoDomainsEmptyState;
