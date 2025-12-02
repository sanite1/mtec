import { PlusCircle } from "lucide-react";
import React, { useState } from "react";
import CreateTaxSidebar from "./CreateTaxSidebar";
import { TaxPayload } from "../../lib/types/taxes";
import { useCreateTax } from "../../lib/api/taxes";
import { getDecodedJwt } from "../../lib/auth";

export default function TaxHeader({ refetch }: { refetch: () => void }) {
  const [openCreate, setOpenCreate] = useState<boolean>(false);
  const user = getDecodedJwt();

  const { mutateAsync: createTax, isPending: creatingTax } = useCreateTax();

  const handleSave = async (data: TaxPayload) => {
    try {
      await createTax(
        { userId: user?.id, ...data },
        {
          onSuccess: () => {
            setOpenCreate(false);
            refetch();
          },
        },
      );
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold">Taxes</h1>
          <p className="text-gray-600 mt-1">Manage your taxes on checkout</p>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={() => {
              setOpenCreate(true);
            }}
            className="flex items-center gap-2 px-3 py-2 rounded-lg bg-purple-600 text-white font-medium hover:bg-purple-700"
          >
            <PlusCircle size={20} />
            Create Tax
          </button>
        </div>
      </div>
      {openCreate && (
        <CreateTaxSidebar
          onClose={() => setOpenCreate(false)}
          onSave={handleSave}
          loading={creatingTax}
        />
      )}
    </div>
  );
}
