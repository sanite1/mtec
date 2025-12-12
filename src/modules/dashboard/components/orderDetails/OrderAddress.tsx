import React from "react";
import { MapPin, Mail, Phone } from "lucide-react";
import { ShippingAddress } from "../../lib/types/orders";

interface Props {
  address?: ShippingAddress;
}

export default function OrderAddress({ address }: Props) {
  return (
    <div className="bg-white border rounded-xl p-6 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded bg-purple-50 text-purple-600">
            <MapPin size={18} />
          </div>
          <div>
            <h3 className="text-lg font-semibold">Shipping</h3>
            <p className="text-sm text-gray-500">Delivery To</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs px-2 py-1 rounded-full bg-yellow-50 text-yellow-800">
            Unfulfilled
          </span>
          <div className="relative inline-block">
            <button className="px-3 py-1 border rounded text-sm">
              Action ▾
            </button>
          </div>
        </div>
      </div>

      <div className="text-sm text-gray-700 space-y-2">
        <p className="font-medium">{address?.fullName ?? "—"}</p>
        <p>{address?.phone ?? "—"}</p>
        <p className="text-gray-600">{address?.addressLine1 ?? "—"}</p>
        {address?.addressLine2 && <p>{address.addressLine2}</p>}
        <p>
          {address?.city}, {address?.state}
        </p>
        <p>{address?.country}</p>

        <div className="mt-3 flex gap-2">
          <button className="px-3 py-1 border rounded text-sm">Edit</button>
          <button className="px-3 py-1 border rounded text-sm">Copy</button>
        </div>
      </div>
    </div>
  );
}
