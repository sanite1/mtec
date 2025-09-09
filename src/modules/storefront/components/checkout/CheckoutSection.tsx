// components/checkout/CheckoutSection.tsx
import React, { useMemo, useState } from "react";
import { Trash2 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import AddressModal, { Address } from "./AddressModal";
import { useCart } from "../../context/CartContext";

const CheckoutSection: React.FC = () => {
  const { state, dispatch } = useCart();
  const { cart } = state;

  const navigate = useNavigate();

  const handlePlaceOrder = () => {
    if (!address) {
      alert("Please add a delivery address first");
      return;
    }

    const order = {
      id: Date.now(), // simple unique ID
      items: cart,
      total,
      shipping: address,
      date: new Date().toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
    };

    dispatch({ type: "SET_ORDER", payload: order });
    dispatch({ type: "CLEAR_CART" });
    navigate("/order-confirmation");
  };
  const [note, setNote] = useState("");
  const [coupon, setCoupon] = useState("");
  const [address, setAddress] = useState<Address | null>(null);
  const [addrOpen, setAddrOpen] = useState(false);

  const subtotal = useMemo(
    () => cart.reduce((s, i) => s + i.price * i.quantity, 0),
    [cart]
  );
  const shipping = 0; // placeholder—integrate provider later
  const total = subtotal + shipping;

  const updateQty = (id: string, delta: number) => {
    const existing = cart.find((i) => i.id === id);
    if (!existing) return;

    const newQty = Math.max(1, existing.quantity + delta);

    // remove + re-add with updated qty
    dispatch({ type: "REMOVE_FROM_CART", payload: id });
    dispatch({
      type: "ADD_TO_CART",
      payload: { ...existing, quantity: newQty },
    });
  };

  const removeItem = (id: string) => {
    dispatch({ type: "REMOVE_FROM_CART", payload: id });
  };

  const applyCoupon = () => {
    alert(`Coupon "${coupon}" captured (no backend yet)`);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* LEFT */}
        <div className="space-y-6">
          {/* Delivery Details */}
          <section className="border rounded-xl p-5">
            <h2 className="text-lg font-semibold mb-4">Delivery Details</h2>

            {!address ? (
              <button
                onClick={() => setAddrOpen(true)}
                className="w-full border rounded-lg px-4 py-3 hover:bg-gray-50"
              >
                Add delivery details
              </button>
            ) : (
              <div className="rounded-lg border bg-gray-50 p-4 text-sm">
                <div className="flex justify-between">
                  <p className="font-medium">
                    {address.firstName} {address.lastName}
                  </p>
                  <button
                    onClick={() => setAddrOpen(true)}
                    className="text-purple-600 hover:underline"
                  >
                    Edit
                  </button>
                </div>
                <p className="text-gray-600">{address.email}</p>
                <p className="text-gray-600">{address.phone}</p>
                <p className="text-gray-700 mt-1">{address.address}</p>
              </div>
            )}
          </section>

          {/* Note */}
          <section>
            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="Note (Optional)"
              className="w-full rounded-xl border px-4 py-3 min-h-[90px] outline-none focus:ring-2 focus:ring-purple-500"
            />
          </section>

          {/* Shipping */}
          <section className="border rounded-xl p-5">
            <h2 className="text-lg font-semibold mb-3">Select Shipping Rate</h2>
            <button
              type="button"
              className="w-full border rounded-lg px-4 py-3 hover:bg-gray-50"
            >
              Click here to see delivery prices
            </button>
          </section>
        </div>

        {/* RIGHT */}
        <div className="border rounded-xl p-5 h-fit">
          <h3 className="text-lg font-semibold mb-4 text-center">Your Order</h3>

          {/* Cart list */}
          {cart.length === 0 ? (
            <p className="text-gray-500 text-center">Your cart is empty.</p>
          ) : (
            <div className="divide-y">
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="flex flex-col sm:flex-row items-center justify-between gap-4 py-4"
                >
                  {/* info */}
                  <div className="flex items-center gap-4 sm:w-2/3 w-full">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-20 h-20 rounded-md object-cover border"
                    />
                    <div className="min-w-0">
                      <p className="font-medium text-gray-800 truncate">
                        {item.name}
                      </p>
                      {item.selectedAttributes &&
                        Object.keys(item.selectedAttributes).length > 0 && (
                          <div className=" text-sm text-gray-500 space-x-1 flex">
                            {Object.entries(item.selectedAttributes).map(
                              ([key, value]) => (
                                <p key={key}>
                                  <span className="font-medium capitalize">
                                    {key}:
                                  </span>{" "}
                                  {String(value)}
                                </p>
                              )
                            )}
                          </div>
                        )}
                      <div className="mt-2 flex items-center gap-2">
                        <button
                          onClick={() => updateQty(item.id, -1)}
                          className="w-8 h-8 border rounded hover:bg-gray-50"
                        >
                          –
                        </button>
                        <span className="px-2">{item.quantity}</span>
                        <button
                          onClick={() => updateQty(item.id, 1)}
                          className="w-8 h-8 border rounded hover:bg-gray-50"
                        >
                          +
                        </button>

                        <button
                          onClick={() => removeItem(item.id)}
                          className="ml-3 text-gray-500 hover:text-red-500"
                          aria-label="Remove item"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* line total */}
                  <p className="sm:w-1/3 w-full text-right font-semibold text-lime-600">
                    ₦{(item.price * item.quantity).toLocaleString()}
                  </p>
                </div>
              ))}
            </div>
          )}

          {/* Totals & coupon */}
          <div className="mt-4 space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">Subtotal</span>
              <span className="font-medium">₦{subtotal.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Shipping</span>
              <span className="font-medium">₦{shipping.toLocaleString()}</span>
            </div>

            <div className="flex gap-2 pt-2">
              <input
                value={coupon}
                onChange={(e) => setCoupon(e.target.value)}
                placeholder="Enter coupon code"
                className="flex-1 rounded-lg border px-3 py-2 outline-none focus:ring-2 focus:ring-purple-500 text-base"
              />
              <button
                onClick={applyCoupon}
                className="px-4 py-2 rounded-lg border hover:bg-gray-50"
              >
                Apply
              </button>
            </div>

            <div className="flex justify-between pt-3 border-t font-semibold">
              <span>Total</span>
              <span>₦{total.toLocaleString()}</span>
            </div>
          </div>

          <button
            disabled={cart.length === 0}
            onClick={handlePlaceOrder}
            className="mt-4 w-full bg-purple-600 hover:bg-purple-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white rounded-lg py-3 font-medium"
          >
            Proceed To Payment
          </button>
        </div>
      </div>

      {/* Modal */}
      <AddressModal
        open={addrOpen}
        onClose={() => setAddrOpen(false)}
        onSave={(a) => {
          setAddress(a);
          setAddrOpen(false);
        }}
        initial={address}
      />
    </div>
  );
};

export default CheckoutSection;
