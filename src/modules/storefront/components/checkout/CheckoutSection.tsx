// components/checkout/CheckoutSection.tsx
import React, { useMemo, useState } from "react";
import { Loader2, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import AddressModal, { Address } from "./AddressModal";
import { useCart } from "../../context/CartContext";
import { Alert } from "@mui/material";
import ShippingAddressSidebar from "./ShippingSidebar";
import { CreateOrderPayload, ShippingAddress } from "../../lib/types/orders";
import { useStoreShipping } from "../../lib/api/shipping";
import { IStoreDetails } from "../../lib/types/store";
import { Shipping } from "../../lib/types/shipping";
import { useCreateOrder } from "../../lib/api/orders";
import { useVerifyDiscount } from "../../lib/api/discount";
import { Discount } from "../../lib/types/discount";
import { ConvertPriceRangeToLocale, lightenHex } from "../../lib/utils/utils";
import { useStoreTax } from "../../lib/api/taxes";

const CheckoutSection: React.FC = () => {
  const { state, dispatch } = useCart();
  const { cart } = state;
  const [showAddressError, setShowAddressError] = useState<Boolean>(false);

  const { mutateAsync: createOrder, isPending } = useCreateOrder();
  const [selectedShipping, setSelectedShipping] = useState<Shipping | null>(
    null,
  );

  const store: IStoreDetails = JSON.parse(
    localStorage.getItem("store") || "null",
  );

  const { data, isLoading } = useStoreShipping(store.userId, {
    page: 1,
    limit: 20,
  });

  const { data: tax, isLoading: loadingTax } = useStoreTax(store.userId);

  const navigate = useNavigate();

  const handlePlaceOrder = async () => {
    if (!address) {
      setShowAddressError(true);

      setTimeout(() => {
        setShowAddressError(false);
      }, 5000);

      return;
    }

    try {
      const cleanedCart = cart.map(
        ({ selectedAttributes, productDetails, ...rest }) => rest,
      );

      const cleanAddress = { ...address };

      if (!cleanAddress.addressLine2) {
        delete cleanAddress.addressLine2;
      }

      const orderPayload: CreateOrderPayload = {
        userId: store.userId,
        items: cleanedCart,
        channel: "website",
        shippingAddress: cleanAddress,
        ...(note ? { note: note } : {}),
        ...(tax ? { tax: (subtotal * tax?.rate) / 100 } : 0),
        discount: totalDiscount || 0,
        shippingFee: selectedShipping?.price,
      };

      const res = await createOrder(orderPayload);

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
      navigate(`/order-confirmation/${res._id}`);
    } catch (error) {
      console.warn(error);
    }
  };

  const [note, setNote] = useState("");
  const [coupon, setCoupon] = useState("");
  const [address, setAddress] = useState<ShippingAddress | null>(null);
  const [discount, setDiscount] = useState<Discount | null>(null);
  const [addrOpen, setAddrOpen] = useState(false);

  const subtotal = useMemo(
    () => cart.reduce((s, i) => s + i.price * i.quantity, 0),
    [cart],
  );
  let shipping = 0;

  // ✅ 2. DISCOUNT CALCULATION ENGINE
  const { totalDiscount, discountedItems } = useMemo(() => {
    if (!discount || !cart.length) {
      return { totalDiscount: 0, discountedItems: [] };
    }

    let totalDiscount = 0;
    let discountedItems: {
      productId: string;
      discountAmount: number;
    }[] = [];

    // ✅ CASE 1: DISCOUNT APPLIES TO ALL PRODUCTS
    if (discount.allProducts) {
      if (discount.discountType === "percentage") {
        totalDiscount = (discount.discountValue / 100) * subtotal;
      }

      if (discount.discountType === "fixed") {
        totalDiscount = Math.min(discount.discountValue, subtotal);
      }

      discountedItems = cart.map((item) => ({
        productId: item.productId,
        discountAmount: 0, // optional to calculate per-item if needed
      }));

      return {
        totalDiscount,
        discountedItems,
      };
    }

    // ✅ CASE 2: DISCOUNT APPLIES TO SPECIFIC PRODUCTS
    const eligibleProducts = new Set(
      discount.products?.map((p) => p.productId) || [],
    );

    cart.forEach((item) => {
      if (!eligibleProducts.has(item.productId)) return;

      const itemTotal = item.price * item.quantity;
      let itemDiscount = 0;

      if (discount.discountType === "percentage") {
        itemDiscount = (discount.discountValue / 100) * itemTotal;
      }

      if (discount.discountType === "fixed") {
        // ⚠️ Fixed discounts must be split safely across multiple products
        itemDiscount = Math.min(itemTotal, discount.discountValue);
      }

      totalDiscount += itemDiscount;

      discountedItems.push({
        productId: item.productId,
        discountAmount: itemDiscount,
      });
    });

    return {
      totalDiscount,
      discountedItems,
    };
  }, [discount, cart, subtotal]);

  // ✅ 3. FINAL TOTAL
  const total = useMemo(() => {
    const shipping = selectedShipping?.price || 0;
    const taxRate = tax?.rate || 0; // e.g. 7.5
    const taxAmount = (subtotal * taxRate) / 100;

    return subtotal + shipping + taxAmount - totalDiscount;
  }, [subtotal, selectedShipping, totalDiscount, tax?.rate]);

  const updateQty = (id: string, delta: number) => {
    const existing = cart.find((i) => i.productDetails._id === id);
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

  const selectedLocation =
    localStorage.getItem("selectedLocation") &&
    JSON.parse(localStorage.getItem("selectedLocation")!);

  const { mutateAsync: verifyDiscount, isPending: verifyingCoupon } =
    useVerifyDiscount();

  const applyCoupon = async () => {
    try {
      const result = await verifyDiscount({
        discountName: coupon.trim(),
        location: selectedLocation.locationName,
      });

      setDiscount(result);
    } catch (error) {}
  };

  console.log(discountedItems);

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
                  <p className="font-medium">{address.fullName}</p>
                  <button
                    onClick={() => setAddrOpen(true)}
                    className={`text-[${store.storeColor}] hover:underline`}
                    style={{
                      color: store.storeColor,
                    }}
                  >
                    Edit
                  </button>
                </div>
                <p className="text-gray-600">{address.email}</p>
                <p className="text-gray-600">{address.phone}</p>
                <p className="text-gray-700 mt-1">{`${address.addressLine1}, ${address.addressLine2 ? `${address.addressLine2},` : ""} ${address.city}, ${address.state}, ${address.country}`}</p>
              </div>
            )}
          </section>

          {/* Note */}
          <section>
            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="Note (Optional)"
              className={`w-full rounded-xl border px-4 py-3 min-h-[90px] outline-none focus:ring-2 focus:ring-[${store.storeColor}]`}
            />
          </section>

          {/* Shipping */}
          <section className="border rounded-xl p-5 space-y-4">
            <h2 className="text-lg font-semibold">Select Shipping Rate</h2>

            {isLoading && (
              <p className="text-sm text-gray-500">
                Loading shipping methods...
              </p>
            )}

            {!isLoading && data?.shipping?.length === 0 && (
              <p className="text-sm text-gray-500">
                No shipping methods available for this store.
              </p>
            )}

            <div className="space-y-3">
              {data?.shipping?.map((method) => {
                const isSelected = selectedShipping?._id === method._id;

                return (
                  <button
                    key={method._id}
                    type="button"
                    onClick={() => {
                      shipping = method.price;
                      setSelectedShipping(method);
                    }}
                    className={`w-full text-left border rounded-lg px-4 py-4 transition flex items-start justify-between gap-4 ${
                      isSelected
                        ? `border-[${store.storeColor}] `
                        : "hover:bg-gray-50 border-gray-300"
                    }`}
                    style={
                      isSelected
                        ? {
                            backgroundColor: store.isLightColor
                              ? undefined
                              : lightenHex(store.storeColor, 90),
                          }
                        : {}
                    }
                  >
                    <div className="flex-1">
                      <p className="font-medium text-gray-900">{method.name}</p>
                      {/* <p className="text-sm text-gray-500 capitalize">
                        {method.location}
                      </p> */}

                      {method.description && (
                        <p className="text-xs text-gray-500 mt-1">
                          {method.description}
                        </p>
                      )}

                      {method.estimatedDeliveryDays && (
                        <p className="text-xs text-gray-600 mt-1">
                          ⏱ Delivery: {method.estimatedDeliveryDays}
                        </p>
                      )}
                    </div>

                    <div className="text-right whitespace-nowrap">
                      <p className="font-semibold text-gray-900">
                        ₦{method.price.toLocaleString("en-NG")}
                      </p>

                      {isSelected && (
                        <p
                          className={`text-xs text-[${store.storeColor}] mt-1 font-medium`}
                          style={{
                            color: store.storeColor,
                          }}
                        >
                          Selected
                        </p>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
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
                  key={item.productId}
                  className="flex flex-col sm:flex-row items-center justify-between gap-4 py-4"
                >
                  {/* info */}
                  <div className="flex items-center gap-4 sm:w-2/3 w-full">
                    <img
                      src={
                        item.productDetails.images
                          ? item.productDetails.images[0]
                          : ""
                      }
                      alt={item.name}
                      className="w-20 h-20 rounded-md object-cover border"
                    />
                    <div className="min-w-0">
                      <p className="font-medium text-gray-800 truncate">
                        {item.name}
                      </p>
                      {/* {item.selectedAttributes &&
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
                        )} */}
                      <div className="mt-2 flex items-center gap-2">
                        <button
                          onClick={() => updateQty(item.productDetails._id, -1)}
                          className="w-8 h-8 border rounded hover:bg-gray-50"
                        >
                          –
                        </button>
                        <span className="px-2">{item.quantity}</span>
                        <button
                          onClick={() => updateQty(item.productDetails._id, 1)}
                          className="w-8 h-8 border rounded hover:bg-gray-50"
                        >
                          +
                        </button>

                        <button
                          onClick={() => removeItem(item.productDetails._id)}
                          className="ml-3 text-gray-500 hover:text-red-500"
                          aria-label="Remove item"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* line total */}
                  <p
                    className={`sm:w-1/3 w-full text-right font-semibold text-[${store.storeColor}]`}
                    style={{
                      color: store.storeColor,
                    }}
                  >
                    ₦{(item.price * item.quantity).toLocaleString()}
                  </p>
                </div>
              ))}
            </div>
          )}

          {/* Totals & coupon */}
          <div className="mt-4 space-y-3 text-sm pt-3 border-t">
            <div className="flex justify-between">
              <span className="text-gray-600">Subtotal</span>
              <span className="font-medium">₦{subtotal.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Shipping</span>
              <span className="font-medium">
                ₦{selectedShipping?.price?.toLocaleString() || 0}
              </span>
            </div>
            {tax && (
              <div className="flex justify-between">
                <span className="text-gray-600">Tax ({tax?.rate}%)</span>
                <span className="font-medium">
                  ₦{((subtotal * tax?.rate) / 100).toLocaleString() || "0"}
                </span>
              </div>
            )}

            {discountedItems.length > 0 && (
              <div className="mt-4 space-y-2 pt-3 border-t">
                {/* ✅ Header */}
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-semibold text-gray-700">
                    Discounts
                  </h4>

                  {/* ✅ Discount Tag */}
                  {discount && (
                    <span className="rounded-full bg-red-100 px-2 py-0.5 text-xs font-medium text-red-600">
                      {discount.discountType === "percentage"
                        ? `${discount.discountValue}%`
                        : `${ConvertPriceRangeToLocale(
                            String(discount.discountValue),
                          )} off`}
                    </span>
                  )}
                </div>

                {/* ✅ Discounted Items */}
                {discountedItems.map((item) => {
                  const product = cart.find(
                    (c) => c.productId === item.productId,
                  );
                  if (!product) return null;

                  return (
                    <div
                      key={item.productId}
                      className="flex justify-between text-sm"
                    >
                      <span className="text-gray-500">{product.name}</span>
                      <span className="font-medium text-red-600">
                        -{" "}
                        {ConvertPriceRangeToLocale(String(item.discountAmount))}
                      </span>
                    </div>
                  );
                })}
              </div>
            )}

            <div className="flex gap-2 pt-2">
              <input
                value={coupon}
                onChange={(e) => setCoupon(e.target.value)}
                placeholder="Enter coupon code"
                className={`flex-1 rounded-lg border px-3 py-2 outline-none focus:ring-2 focus:ring-[${store.storeColor}] text-base`}
              />
              <button
                onClick={applyCoupon}
                disabled={verifyingCoupon}
                className={`px-4 py-2 rounded-lg border hover:bg-gray-50 ${verifyingCoupon ? "cursor-not-allowed" : ""}`}
              >
                {verifyingCoupon ? (
                  <Loader2 className="animate-spin" />
                ) : (
                  "Apply"
                )}
              </button>
            </div>

            <div className="flex justify-between pt-3 border-t font-semibold">
              <span>Total</span>
              <span>₦{total.toLocaleString()}</span>
            </div>
          </div>

          {showAddressError ? (
            <div className="mt-5">
              <Alert severity="error" color="warning">
                Please add a delivery address first.
              </Alert>
            </div>
          ) : (
            <></>
          )}
          <button
            disabled={cart.length === 0}
            onClick={handlePlaceOrder}
            className={`mt-4 w-full flex items-center justify-center bg-[${store.storeColor}] disabled:bg-gray-400 disabled:cursor-not-allowed text-white rounded-lg py-3 font-medium ${
              isPending
                ? "opacity-70 cursor-not-allowed"
                : `hover:bg-[${store.storeColor}]`
            }`}
            style={{
              backgroundColor: store.storeColor,
              color: store.isLightColor ? "#000000" : "#ffffff",
            }}
          >
            {isPending ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin mr-2" />
                Creating Order...
              </>
            ) : (
              <>Proceed To Payment</>
            )}
          </button>
        </div>
      </div>

      {/* Modal */}
      {/* <AddressModal
        open={addrOpen}
        onClose={() => setAddrOpen(false)}
        onSave={(a) => {
          setAddress(a);
          setAddrOpen(false);
        }}
        initial={address}
      /> */}
      {addrOpen && (
        <ShippingAddressSidebar
          onClose={() => setAddrOpen(false)}
          onSave={(a) => {
            setAddress(a);
            setAddrOpen(false);
          }}
          details={address}
        />
      )}
    </div>
  );
};

export default CheckoutSection;
