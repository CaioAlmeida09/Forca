import { createContext, ReactNode, useState } from "react";

interface CartContextData {
  cart: CartProps[];
}



interface CartProviderProps {
  children: ReactNode;
}

export const CartContext = createContext({} as CartContextData);
function CartProvider({ children }: CartProviderProps) {
  const [cart, setCart] = useState<CartProps[]>([]);
  return (
    <CartContext.Provider value={{ cart }}>{children}</CartContext.Provider>
