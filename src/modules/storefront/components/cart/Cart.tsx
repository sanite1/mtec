import { useState } from "react";
import { Trash2 } from "lucide-react";
import wallet from "../../pages/wallet.png";
import sneakers from "../../pages/sneakers.png";
import { Link } from "react-router-dom";

interface CartItem {
  id: string;
  name: string;
  image: string;
  price: number;
  quantity: number;
}

const initialCart: CartItem[] = [
  {
    id: "1",
    name: "Leather Wallet",
    image: wallet,
    price: 29000,
    quantity: 1,
  },
  {
    id: "2",
    name: "Jogging Sneakers",
    image: sneakers,
    price: 30500,
    quantity: 2,
  },
];

export default function Cart() {
  const [cart, setCart] = useState<CartItem[]>(initialCart);

  const updateQuantity = (id: string, delta: number) => {
    setCart((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + delta) }
          : item
      )
    );
  };

  const removeItem = (id: string) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10 mt-6">
      <h1 className="text-2xl sm:text-3xl font-semibold text-purple-600 mb-8">
        Your cart
      </h1>

      <div className="divide-y">
        {cart.map((item) => (
          <div
            key={item.id}
            className="flex flex-col sm:flex-row sm:items-center justify-between py-6 gap-4"
          >
            {/* Product Info */}
            <div className="flex items-start sm:items-center gap-4 sm:w-2/3">
              <img
                src={item.image}
                alt={item.name}
                className="w-24 h-24 sm:w-28 sm:h-28 object-cover rounded-md border"
              />
              <div>
                <h3 className="font-medium text-gray-700 text-sm sm:text-base">
                  {item.name}
                </h3>
                <p className="text-purple-600 font-semibold text-sm sm:text-base">
                  ₦{item.price.toLocaleString()}.00
                </p>
              </div>
            </div>

            {/* Quantity + Remove */}
            <div className="flex items-center gap-3 sm:gap-4">
              <div className="flex items-center border rounded">
                <button
                  onClick={() => updateQuantity(item.id, -1)}
                  className="px-3 py-1 text-lg"
                >
                  –
                </button>
                <span className="px-3 sm:px-4">{item.quantity}</span>
                <button
                  onClick={() => updateQuantity(item.id, 1)}
                  className="px-3 py-1 text-lg"
                >
                  +
                </button>
              </div>
              <button
                onClick={() => removeItem(item.id)}
                className="text-gray-500 hover:text-red-500"
              >
                <Trash2 size={18} />
              </button>
            </div>

            {/* Total */}
            <p className="text-purple-600 font-semibold text-right sm:w-28 text-sm sm:text-base">
              ₦{(item.price * item.quantity).toLocaleString()}.00
            </p>
          </div>
        ))}
      </div>

      {/* Summary */}
      <div className="mt-8 flex flex-col items-end text-right">
        <p className="text-gray-600 mb-2 text-sm sm:text-base">
          Estimated total{" "}
          <span className="text-purple-600 font-semibold text-lg sm:text-xl">
            ₦{total.toLocaleString()} NGN
          </span>
        </p>
        <p className="text-xs sm:text-sm text-gray-400 mb-6">
          Taxes, Discounts and{" "}
          <span className="underline cursor-pointer">shipping</span> calculated
          at checkout
        </p>
        <Link to={"/checkout"}>
          <button className="w-full cursor-pointer sm:w-auto bg-purple-600 text-white px-6 sm:px-8 py-3 rounded-md font-medium hover:bg-purple-700 transition">
            Check out
          </button>
        </Link>
      </div>
    </div>
  );
}
