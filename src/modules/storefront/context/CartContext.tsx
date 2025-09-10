import React, { createContext, useContext, useReducer, ReactNode } from "react";
import { CartItem } from "../types/products";

export interface Order {
  id: number;
  items: CartItem[];
  total: number;
  shipping: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    address: string;
  };
  date: string;
}

interface CartState {
  cart: CartItem[];
  order: Order | null;
}

type CartAction =
  | { type: "ADD_TO_CART"; payload: CartItem }
  | { type: "REMOVE_FROM_CART"; payload: string }
  | { type: "CLEAR_CART" }
  | { type: "SET_ORDER"; payload: Order };

// --- Initial State ---
const initialState: CartState = {
  cart: [],
  order: null,
};

// --- Reducer ---
function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case "ADD_TO_CART":
      return { ...state, cart: [...state.cart, action.payload] };

    case "REMOVE_FROM_CART":
      return {
        ...state,
        cart: state.cart.filter((item) => item.id !== action.payload),
      };

    case "CLEAR_CART":
      return { ...state, cart: [] };

    case "SET_ORDER":
      return { ...state, order: action.payload };

    default:
      return state;
  }
}

// --- Context Types ---
interface CartContextType {
  state: CartState;
  dispatch: React.Dispatch<CartAction>;
}

// --- Create Context ---
const CartContext = createContext<CartContextType | undefined>(undefined);

// --- Provider ---
export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  return (
    <CartContext.Provider value={{ state, dispatch }}>
      {children}
    </CartContext.Provider>
  );
}

// --- Custom Hook ---
export function useCart(): CartContextType {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
