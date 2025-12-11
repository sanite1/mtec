import { Product } from "../../types/products";
import { useCart } from "../../context/CartContext";
import { useState } from "react";
import ProductDialog from "./AddToCartDialog";
import { toast } from "sonner";
import { Link } from "react-router-dom";
import { ProductDetails } from "../../lib/types/products";
import { ConvertPriceRangeToLocale } from "../../lib/utils/utils";
import { IStoreDetails } from "../../lib/types/store";

const ProductCard: React.FC<{ product: ProductDetails }> = ({ product }) => {
  const { dispatch } = useCart();
  const [showDialog, setShowDialog] = useState(false);
  const store: IStoreDetails = JSON.parse(
    localStorage.getItem("store") || "null",
  );

  const handleAddToCart = () => {
    // const matchingVariation = findMatchingVariation(
    //   selectedAttributes,
    //   product.variations
    // );
    dispatch({
      type: "ADD_TO_CART",
      payload: {
        productDetails: product,
        quantity: 1,
        productId: product._id,
        name: product.name,
        // ...(selectedAttributes
        //   ? {
        //       variationId: matchingVariation?._id,
        //       price: matchingVariation?.price,
        //       sku: matchingVariation?.sku,
        //     }
        //   : {
        //   }),
        price: product.discountPrice ? product.discountPrice : product?.price,
        sku: product?.sku,
      },
    });

    toast.success(`${product.name} added to cart! 🛒`);
  };

  return (
    <div className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition cursor-pointer">
      <Link to={`/product/${product._id}`}>
        <img
          src={product?.images ? product?.images[0] : ""}
          alt={product.name}
          className="w-full h-56 object-cover"
        />
      </Link>
      <div className="p-4">
        <Link to={`/product/${product._id}`}>
          <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
        </Link>
        <div className="mb-3">
          {product.discountPrice && (
            <span className="text-gray-500 line-through mr-2">
              ₦{product?.price?.toLocaleString()}
            </span>
          )}
          {product.variantsOptionGroup && (
            <span className={`text-[${store.storeColor}] font-bold`}>
              {ConvertPriceRangeToLocale(product?.priceRange)}
            </span>
          )}
          {product.price && (
            <span className={`text-[${store.storeColor}] font-bold`}>
              ₦
              {product.discountPrice
                ? product?.discountPrice?.toLocaleString()
                : product?.price?.toLocaleString()}
            </span>
          )}
          {/* <span className={`text-[${store.storeColor}] font-bold`}>
            ₦
            {product?.variantsOptionGroup
              ? product?.priceRange?.toLocaleString()
              : product?.price?.toLocaleString()}
          </span> */}
        </div>

        {/* Button Behavior */}
        {product.variantsOptionGroup &&
        product.variantsOptionGroup.length > 0 ? (
          <Link to={`/product/${product._id}`}>
            <button
              // onClick={() => setShowDialog(true)}
              className={`w-full py-2 bg-[${store.storeColor}] text-white rounded hover:bg-[${store.storeColor}]`}
              style={{
                backgroundColor: store.storeColor,
                color: store.isLightColor ? "#000000" : "#ffffff",
              }}
            >
              Select Options
            </button>
          </Link>
        ) : (
          <button
            onClick={handleAddToCart}
            className={`w-full py-2 bg-[${store.storeColor}] text-white rounded hover:bg-[${store.storeColor}]`}
            style={{
              backgroundColor: store.storeColor,
              color: store.isLightColor ? "#000000" : "#ffffff",
            }}
          >
            Add to Cart
          </button>
        )}
      </div>

      {/* Attribute Dialog */}
      {showDialog && (
        <ProductDialog product={product} onClose={() => setShowDialog(false)} />
      )}
    </div>
  );
};

export default ProductCard;
