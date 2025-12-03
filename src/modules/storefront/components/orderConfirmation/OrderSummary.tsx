import React from "react";
import { CheckCircle } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import { useOrderById } from "../../lib/api/orders";
import { IStoreDetails } from "../../lib/types/store";

export default function OrderCSummary() {
  const { state } = useCart();
  const order = state.order;
  const { id } = useParams();
  const { data, isError, isLoading } = useOrderById(id as string);

  const store: IStoreDetails = JSON.parse(
    localStorage.getItem("store") || "null",
  );
  if (isLoading) {
    return (
      <div className="max-w-2xl mx-auto px-6 py-16 text-center h-[100vh] items-center flex justify-center ">
        <p className="text-lg text-gray-600">Loading order...</p>
      </div>
    );
  }
  if (!order || isError) {
    return (
      <div className="max-w-2xl mx-auto px-6 py-16 text-center  h-[100vh] items-center flex justify-center">
        <div className="">
          <p className="text-lg text-gray-600">
            No order found. Please place an order first.
          </p>
          <Link
            to="/"
            className={`mt-6 inline-block px-6 py-3 bg-[${store.storeColor}] text-white rounded-lg hover:bg-[${store.storeColor}] transition`}
          >
            Go Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-6 py-16 text-center">
      <CheckCircle
        className={`w-20 h-20 text-[${store.storeColor}] mx-auto mb-6`}
      />

      <h1 className="text-3xl font-semibold mb-2 text-gray-800">
        Thank you for your order!
      </h1>
      <p className="text-gray-600 mb-10">
        Your order <span className="font-medium">#{data?.orderNumber}</span> has
        been successfully placed on {order.date}.
      </p>

      <div className="bg-gray-50 rounded-lg shadow p-6 text-left">
        <h2 className="text-xl font-semibold mb-2 text-gray-700">
          Order Summary
        </h2>
        <div className="divide-y">
          {order.items.map((item) => (
            <div
              key={item.productId}
              className="flex justify-between items-center py-3"
            >
              <div>
                <p className="font-medium">{item.name}</p>
                <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
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
                        ),
                      )}
                    </div>
                  )}
              </div>
              {item.price && (
                <p className={`font-semibold text-[${store.storeColor}]`}>
                  ₦{(item.price * item.quantity).toLocaleString()}
                </p>
              )}
            </div>
          ))}
        </div>
        <div className="flex justify-between mt-2 font-semibold text-lg">
          <span>Total:</span>
          <span className={`text-[${store.storeColor}]`}>
            ₦{order.total.toLocaleString()} NGN
          </span>
        </div>
      </div>

      <div className="bg-gray-50 rounded-lg shadow p-6 mt-8 text-left">
        <h2 className="text-xl font-semibold mb-4 text-gray-700">
          Shipping Information
        </h2>
        <p className="text-gray-600">{order.shipping.fullName}</p>
        <p className="text-gray-600">{order.shipping.email}</p>
        <p className="text-gray-600">{order.shipping.phone}</p>
        <p className="text-gray-700 mt-1">{`${order.shipping.addressLine1}, ${order.shipping.addressLine2 ? `${order.shipping.addressLine2},` : ""} ${order.shipping.city}, ${order.shipping.state}, ${order.shipping.country}`}</p>
      </div>

      <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
        <Link
          to="/"
          className={`px-3 py-1 bg-[${store.storeColor}] text-white rounded-lg hover:bg-[${store.storeColor}] transition`}
        >
          Continue Shopping
        </Link>
        <Link
          to="/cart"
          className="px-3 py-1 border border-gray-300 rounded-lg hover:bg-gray-100 transition"
        >
          View Cart
        </Link>
      </div>
    </div>
  );
}
