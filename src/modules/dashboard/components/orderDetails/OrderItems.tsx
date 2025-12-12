import React from "react";
import { OrderProductItem } from "../../lib/types/orders";

interface Props {
  items?: OrderProductItem[];
}

export default function OrderItems({ items }: Props) {
  return (
    <div className="bg-white border rounded-xl p-2 shadow-sm">
      <div className="divide-y rounded-md overflow-hidden">
        {items?.map((item, idx) => (
          <div key={idx} className="flex items-center gap-4 p-2">
            <img
              src={item?.productId?.images?.[0] || "/placeholder-80.png"}
              alt={item.name}
              className="w-16 h-16 object-cover rounded-md border"
            />

            <div className="flex-1">
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-medium text-gray-900">{item.name}</p>
                  <p>
                    {item.quantity} × ₦{item.price.toLocaleString()}
                  </p>
                </div>

                <div className="text-right">
                  <p className="font-semibold">
                    ₦{item.subtotal.toLocaleString()}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}

        {(!items || items.length === 0) && (
          <div className="p-6 text-center text-gray-500">
            No items in this order.
          </div>
        )}
      </div>
    </div>
  );
}
