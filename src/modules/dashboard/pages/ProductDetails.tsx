import React, { useState } from "react";
import ProductStats from "../components/product-details/ProductStats";
import ProductQuantityControl from "../components/product-details/ProductQuantityControl";
import ProductImages from "../components/product-details/ProductImages";
import ProductDetails from "../components/product-details/ ProductDetails";
import ProductHistory from "../components/product-details/ProductHistory";
import { ArrowLeft, Edit, Trash } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import DeleteProductModal from "../components/product-details/DeleteProductModal";

export default function ProductDetailsPage() {
  const [open, setOpen] = useState(false);

  const handleDelete = () => {
    setOpen(false);
    console.log("Account deleted!");
  };

  const navigate = useNavigate();

  const { id } = useParams();

  return (
    <div className=" bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <div className="flex items-center">
          <button
            onClick={() => navigate("/products")}
            className="p-2 rounded bg-gray-200 hover:bg-gray-300 relative mr-3"
          >
            <ArrowLeft className="w-6 h-6 text-gray-600" />
          </button>
          <h1 className="text-2xl font-bold">Product Name</h1>
        </div>

        {
          <div className="flex items-center">
            <button
              onClick={() => {
                navigate(`/products/${id}/edit`);
              }}
              className="flex text-sm mr-3 items-center gap-2 px-5 py-2.5 rounded-lg shadow-lg bg-purple-600 text-white font-medium hover:bg-purple-700 cursor-pointer"
            >
              <Edit size={20} />
              Edit Product
            </button>

            <button
              onClick={() => setOpen(true)}
              className="p-2 bg-gray-200 rounded hover:bg-gray-300 relative"
            >
              <Trash className="w-6 h-6 text-gray-600" />
            </button>
          </div>
        }
      </div>

      {open && (
        <DeleteProductModal
          onClose={() => setOpen(false)}
          onConfirm={handleDelete}
        />
      )}

      {/* Top Stats */}
      <ProductStats />

      {/* Middle Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <ProductDetails />
        <div className="md:col-span-2 space-y-6">
          <ProductQuantityControl />
          <ProductImages />
        </div>
      </div>

      {/* Product History */}
      <ProductHistory />
    </div>
  );
}
