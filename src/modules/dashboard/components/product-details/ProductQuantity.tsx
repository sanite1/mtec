import React, { useState } from "react";
import AdjustQuantityModal from "./AdjustQuantityModal";
import { Package } from "lucide-react";
import { useUpdateProductQuantity } from "../../lib/api/products";
import { ProductDetailsResponse } from "../../lib/types/products";

export default function ProductQuantity({
  productDetails,
  refetchDetails,
  refetchHistory,
}: {
  productDetails: ProductDetailsResponse | undefined;
  refetchDetails: () => void;
  refetchHistory: () => void;
}) {
  const [showModal, setShowModal] = useState(false);
  const { mutateAsync: updateQuantity, isPending } = useUpdateProductQuantity();

  const handleConfirm = async ({
    type,
    quantity,
    note,
  }: {
    type: "added" | "removed" | "returned";
    quantity: number;
    note?: string;
  }) => {
    console.log("Quantity update:", { type, quantity, note });

    await updateQuantity({
      id: productDetails?._id || "",
      data: {
        type: type,
        quantity: quantity,
        ...(note ? { note: note } : {}),
      },
    });
    refetchDetails();
    refetchHistory();
    setShowModal(false);
  };

  return (
    <div className="p-4 border rounded-lg bg-white flex items-center justify-between">
      <div>
        <h3 className="text-base font-semibold text-gray-800 flex items-center gap-2">
          <Package size={16} /> Stock Quantity
        </h3>
        <p className="text-2xl font-bold mt-1">{productDetails?.totalStock}</p>
      </div>
      <button
        onClick={() => setShowModal(true)}
        className="px-4 py-2 rounded-lg bg-black text-white text-sm font-medium hover:bg-gray-800 transition"
      >
        Adjust Quantity
      </button>

      {showModal && (
        <AdjustQuantityModal
          productName={productDetails?.name}
          onClose={() => setShowModal(false)}
          onConfirm={handleConfirm}
          loading={isPending}
        />
      )}
    </div>
  );
}
