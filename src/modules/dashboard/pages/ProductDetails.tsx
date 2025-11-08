import React, { useState } from "react";
import ProductStats from "../components/product-details/ProductStats";
import ProductImages from "../components/product-details/ProductImages";
import ProductDetails from "../components/product-details/ ProductDetails";
import ProductHistory from "../components/product-details/ProductHistory";
import { ArrowLeft, Edit, Trash } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import DeleteProductModal from "../components/product-details/DeleteProductModal";
import {
  useDeleteProduct,
  useFetchSingleProduct,
  useProductHistory,
} from "../lib/api/products";
import { getDecodedJwt } from "../lib/auth";
import StockDisplay from "../components/product-details/StockDisplay";
import ProductQuantity from "../components/product-details/ProductQuantity";
// import ProductQuantityControl from "../components/product-details/ProductQuantity";

export default function ProductDetailsPage() {
  const [open, setOpen] = useState(false);

  const { id } = useParams();

  const user = getDecodedJwt();
  const userId = user?.id;

  const {
    data: history,
    isLoading: loadingHistory,
    error: historyError,
    refetch: refetchHistory,
  } = useProductHistory(id as string, {
    page: 1,
    limit: 10,
  });

  const {
    data: productDetails,
    // isLoading: loadingProductDetails,
    refetch: refetchDetails,
  } = useFetchSingleProduct(userId, id as string);

  const { mutateAsync: deleteProduct, isPending: loadingDelete } =
    useDeleteProduct();

  const handleDelete = async () => {
    try {
      await deleteProduct(id as string);
      setOpen(false);
      navigate("/products");
    } catch (err) {
      console.error("Failed to delete product", err);
    }
  };
  const navigate = useNavigate();

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
          <h1 className="text-2xl font-bold">{productDetails?.name}</h1>
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
          loading={loadingDelete}
        />
      )}

      {/* Top Stats */}
      <ProductStats productDetails={productDetails} />

      {/* Middle Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="h-fit space-y-6">
          <ProductDetails productDetails={productDetails} />
          {productDetails?.variantsOptionGroup?.length === 0 && (
            <ProductQuantity
              productDetails={productDetails}
              refetchDetails={refetchDetails}
              refetchHistory={refetchHistory}
            />
          )}
        </div>
        <div className="md:col-span-2 space-y-6">
          <StockDisplay productDetails={productDetails} />
          <ProductImages images={productDetails?.images || []} />
        </div>
      </div>

      {/* Product History */}
      <ProductHistory
        history={history?.history || []}
        isLoading={loadingHistory}
        error={historyError}
      />
    </div>
  );
}
