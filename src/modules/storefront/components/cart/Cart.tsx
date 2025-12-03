// components/cart/Cart.tsx
import { Trash2 } from "lucide-react";
import { useCart } from "../../context/CartContext";
import { Link } from "react-router-dom";
import { IStoreDetails } from "../../lib/types/store";

export default function Cart() {
  const { state, dispatch } = useCart();
  const { cart } = state;

  const store: IStoreDetails = JSON.parse(
    localStorage.getItem("store") || "null",
  );
  const updateQuantity = (id: string, delta: number) => {
    const updatedItem = cart.find((item) => item.productId === id);
    if (!updatedItem) return;

    const newQty = Math.max(1, updatedItem.quantity + delta);

    // Instead of separate update action, just remove+add with new quantity
    dispatch({
      type: "REMOVE_FROM_CART",
      payload: id,
    });
    dispatch({
      type: "ADD_TO_CART",
      payload: { ...updatedItem, quantity: newQty },
    });
  };

  const removeItem = (id: string) => {
    dispatch({ type: "REMOVE_FROM_CART", payload: id });
  };

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="max-w-5xl mx-auto px-6 py-12 mt-10">
      <h1 className={`text-3xl font-semibold text-[${store.storeColor}] mb-8`}>
        Your cart
      </h1>

      {cart.length === 0 ? (
        <p className="text-gray-600">Your cart is empty.</p>
      ) : (
        <>
          <div className="divide-y">
            {cart.map((item) => (
              <div
                key={item.productId}
                className="flex flex-col md:flex-row md:items-center justify-between py-6 gap-4"
              >
                {/* Product Info */}
                <div className="flex items-center gap-4 w-full md:w-2/3">
                  <img
                    src={
                      item.productDetails.images
                        ? item.productDetails.images[0]
                        : ""
                    }
                    alt={item.name}
                    className="w-28 h-28 object-cover rounded-md border"
                  />
                  <div>
                    <h3 className="font-medium text-gray-700">{item.name}</h3>
                    <p className={`text-[${store.storeColor}] font-semibold`}>
                      ₦{item.price.toLocaleString()}.00
                    </p>

                    {/* Attributes (if any) */}
                    {item.selectedAttributes &&
                      Object.keys(item.selectedAttributes).length > 0 && (
                        <div className="mt-1 text-sm text-gray-500 space-y-1">
                          {Object.entries(item.selectedAttributes).map(
                            ([key, value]) => (
                              <p key={key}>
                                <span className="font-medium capitalize">
                                  {key}:
                                </span>{" "}
                                {String(value)}
                              </p>
                            ),
                          )}
                        </div>
                      )}
                  </div>
                </div>

                {/* Quantity & Actions */}
                <div className="flex items-center gap-4">
                  <div className="flex items-center border rounded">
                    <button
                      onClick={() => updateQuantity(item.productId, -1)}
                      className="px-3 py-1 text-lg"
                    >
                      –
                    </button>
                    <span className="px-4">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.productId, 1)}
                      className="px-3 py-1 text-lg"
                    >
                      +
                    </button>
                  </div>
                  <button
                    onClick={() => removeItem(item.productId)}
                    className="text-gray-500 hover:text-red-500"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>

                {/* Item Total */}
                <p
                  className={`text-[${store.storeColor}] font-semibold w-28 text-right`}
                >
                  ₦{(item.price * item.quantity).toLocaleString()}
                  .00
                </p>
              </div>
            ))}
          </div>

          {/* Summary */}
          <div className="mt-8 flex flex-col items-end">
            <p className="text-gray-600 mb-2">
              Estimated total{" "}
              <span
                className={`text-[${store.storeColor}] font-semibold text-lg`}
              >
                ₦{total.toLocaleString()} NGN
              </span>
            </p>
            <p className="text-sm text-gray-400 mb-6">
              Taxes, Discounts and{" "}
              <span className="underline cursor-pointer">shipping</span>{" "}
              calculated at checkout
            </p>
            <Link to={"/checkout"}>
              <button
                className={`bg-[${store.storeColor}] text-white px-8 py-3 rounded-md font-medium hover:bg-[${store.storeColor}] transition`}
              >
                Checkout
              </button>
            </Link>
          </div>
        </>
      )}
    </div>
  );
}
