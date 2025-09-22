import React, { useState } from "react";

interface EditDefaultDomainModalProps {
  currentDomain: string;
  onClose: () => void;
  onSave: (newDomain: string) => void;
}

export default function EditDefaultDomainModal({
  currentDomain,
  onClose,
  onSave,
}: EditDefaultDomainModalProps) {
  const [domain, setDomain] = useState(currentDomain);

  const handleSave = () => {
    if (domain.trim()) {
      onSave(domain.trim());
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Background */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      ></div>

      {/* Content */}
      <div className="relative bg-white w-full max-w-md rounded-xl shadow-lg p-6 z-10 mx-4">
        <h3 className="text-lg font-semibold text-gray-800">
          Edit Default Domain
        </h3>
        <p className="text-sm text-gray-500 mt-2">
          Update your default domain for your storefront.
        </p>

        {/* Input field */}
        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Domain
          </label>
          <input
            type="text"
            value={domain}
            onChange={(e) => setDomain(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg focus:ring-purple-500 focus:border-purple-500"
            placeholder="example.com"
          />
        </div>

        {/* Footer */}
        <div className="mt-6 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg border text-gray-700 hover:bg-gray-100 transition"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 rounded-lg bg-purple-600 text-white hover:bg-purple-700 transition"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
