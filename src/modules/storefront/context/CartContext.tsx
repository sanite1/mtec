import React, {
  createContext,
  useContext,
  useReducer,
  ReactNode,
  useEffect,
} from "react";
import { CartItem } from "../types/products";
import { ShippingAddress } from "../lib/types/orders";

/* ------------------- TYPES ------------------- */

export interface Order {
  id: number;
  items: CartItem[];
  total: number;
  shipping: ShippingAddress;
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
  | { type: "SET_ORDER"; payload: Order }
  | { type: "HYDRATE"; payload: CartState };

/* ------------------- LOCAL STORAGE KEYS ------------------- */

const CART_STORAGE_KEY = "mtec_cart_state";

/* ------------------- INITIAL STATE ------------------- */

const initialState: CartState = {
  cart: [],
  order: null,
};

/* ------------------- REDUCER ------------------- */

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case "HYDRATE":
      return action.payload;

    case "ADD_TO_CART": {
      const incoming = action.payload;

      const existingIndex = state.cart.findIndex((item) => {
        if (incoming.variationId) {
          return (
            item.productId === incoming.productId &&
            item.variationId === incoming.variationId
          );
        }
        return item.productId === incoming.productId;
      });

      if (existingIndex !== -1) {
        const updatedCart = [...state.cart];
        updatedCart[existingIndex] = {
          ...updatedCart[existingIndex],
          quantity: updatedCart[existingIndex].quantity + incoming.quantity,
        };

        return { ...state, cart: updatedCart };
      }

      return { ...state, cart: [...state.cart, incoming] };
    }

    case "REMOVE_FROM_CART":
      return {
        ...state,
        cart: state.cart.filter((item) => item.productId !== action.payload),
      };

    case "CLEAR_CART":
      return { ...state, cart: [] };

    case "SET_ORDER":
      return { ...state, order: action.payload };

    default:
      return state;
  }
}

/* ------------------- CONTEXT ------------------- */

interface CartContextType {
  state: CartState;
  dispatch: React.Dispatch<CartAction>;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

/* ------------------- PROVIDER ------------------- */

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(
    cartReducer,
    initialState,
    (defaultState) => {
      try {
        const stored = localStorage.getItem(CART_STORAGE_KEY);
        return stored ? JSON.parse(stored) : defaultState;
      } catch {
        return defaultState;
      }
    },
  );

  /* ✅ Persist state on every change */
  useEffect(() => {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  return (
    <CartContext.Provider value={{ state, dispatch }}>
      {children}
    </CartContext.Provider>
  );
}

/* ------------------- HOOK ------------------- */

export function useCart(): CartContextType {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
