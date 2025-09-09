import React from "react";
import { CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";

export default function OrderCSummary() {
  // Example order data – in real use, pass via props, context, or state
  const order = {
    id: "ORD123456",
    date: "September 9, 2025",
    total: 59500,
    items: [
      {
        id: "1",
        name: "Leather Wallet",
        qty: 1,
        price: 29000,
      },
      {
        id: "2",
        name: "Running Sneakers",
        qty: 2,
        price: 30500,
      },
    ],
    shipping: {
      name: "John Doe",
      address: "123 Banana Street, Lagos, Nigeria",
      phone: "+234 800 123 4567",
    },
  };

  return (
    <div className="max-w-3xl mx-auto px-6 py-16 text-center">
      {/* Success Icon */}
      <CheckCircle className="w-20 h-20 text-purple-600 mx-auto mb-6" />

      {/* Thank you message */}
      <h1 className="text-3xl font-semibold mb-2 text-gray-800">
        Thank you for your order!
      </h1>
      <p className="text-gray-600 mb-10">
        Your order <span className="font-medium">#{order.id}</span> has been
        successfully placed on {order.date}.
      </p>

      {/* Order Summary */}
      <div className="bg-gray-50 rounded-lg shadow p-6 text-left">
        <h2 className="text-xl font-semibold mb-4 text-gray-700">
          Order Summary
        </h2>
        <div className="divide-y">
          {order.items.map((item) => (
            <div
              key={item.id}
              className="flex justify-between items-center py-3"
            >
              <div>
                <p className="font-medium">{item.name}</p>
                <p className="text-sm text-gray-500">Qty: {item.qty}</p>
              </div>
              <p className="font-semibold text-purple-600">
                ₦{(item.price * item.qty).toLocaleString()}
              </p>
            </div>
          ))}
        </div>
        <div className="flex justify-between mt-6 font-semibold text-lg">
          <span>Total:</span>
          <span className="text-purple-600">
            ₦{order.total.toLocaleString()} NGN
          </span>
        </div>
      </div>

      {/* Shipping Info */}
      <div className="bg-gray-50 rounded-lg shadow p-6 mt-8 text-left">
        <h2 className="text-xl font-semibold mb-4 text-gray-700">
          Shipping Information
        </h2>
        <p className="text-gray-600">{order.shipping.name}</p>
        <p className="text-gray-600">{order.shipping.address}</p>
        <p className="text-gray-600">{order.shipping.phone}</p>
      </div>

      {/* Action Buttons */}
      <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
        <Link
          to="/"
          className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition"
        >
          Continue Shopping
        </Link>
        <Link
          to="/cart"
          className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-100 transition"
        >
          View Cart
        </Link>
      </div>
    </div>
  );
}
