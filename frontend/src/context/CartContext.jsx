import { createContext, useContext, useMemo, useState } from "react";

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState(() => {
    try { return JSON.parse(localStorage.getItem("prepd-cart") || "[]"); } catch { return []; }
  });

  const addToCart = (product, quantity = 1) => {
    setCartItems((currentItems) => {
      const existingItem = currentItems.find(
        (item) => item.id === product.id,
      );

      if (existingItem) {
        return currentItems.map((item) =>
          item.id === product.id
            ? {
                ...item,
                quantity: item.quantity + quantity,
              }
            : item,
        );
      }

      return [
        ...currentItems,
        {
          id: product.id,
          name: product.name,
          price: product.price,
          currency: product.currency,
          image: product.images?.[0]?.src || null,
          slug: product.slug,
          quantity,
        },
      ];
    });
  };

  const removeFromCart = (productId) => {
    setCartItems((currentItems) =>
      currentItems.filter((item) => item.id !== productId),
    );
  };

  const updateQuantity = (productId, quantity) => {
    if (quantity < 1) return;

    setCartItems((currentItems) =>
      currentItems.map((item) =>
        item.id === productId
          ? { ...item, quantity }
          : item,
      ),
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  useMemo(() => { localStorage.setItem("prepd-cart", JSON.stringify(cartItems)); }, [cartItems]);

  const cartCount = cartItems.reduce(
    (total, item) => total + item.quantity,
    0,
  );

  const cartTotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );

  const value = useMemo(
    () => ({
      cartItems,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      cartCount,
      cartTotal,
    }),
    [cartItems, cartCount, cartTotal],
  );

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error(
      "useCart must be used inside CartProvider",
    );
  }

  return context;
}