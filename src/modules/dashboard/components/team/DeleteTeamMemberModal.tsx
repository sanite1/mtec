import React from "react";
import { X } from "lucide-react";

interface DeleteTeamMemberModalProps {
  memberName: string;
  onClose: () => void;
  onConfirm: () => void;
}

const DeleteTeamMemberModal: React.FC<DeleteTeamMemberModalProps> = ({
  memberName,
  onClose,
  onConfirm,
}) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      ></div>

      {/* Modal */}
      <div className="relative bg-white rounded-lg shadow-lg w-full max-w-md p-6">
        <div className="flex justify-between items-center border-b pb-3">
          <h3 className="text-lg font-semibold">Delete Team Member</h3>
          <button onClick={onClose}>
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        <p className="mt-4 text-gray-600">
          Are you sure you want to remove{" "}
          <span className="font-medium">{memberName}</span> from your team? This
          action cannot be undone.
        </p>

        <div className="mt-6 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 border rounded hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-6 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteTeamMemberModal;
