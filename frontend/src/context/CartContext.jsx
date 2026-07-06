import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { cartApi } from '../axios/apiCall';

const CartContext = createContext(null);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState({ items: [], totalPrice: 0, totalItems: 0 });
  const [loading, setLoading] = useState(false);

  const fetchCart = useCallback(async () => {
    try {
      setLoading(true);
      const response = await cartApi.getCart();
      setCart(response.data || { items: [], totalPrice: 0, totalItems: 0 });
    } catch {
      setCart({ items: [], totalPrice: 0, totalItems: 0 });
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

  const addToCart = async (productId, quantity = 1) => {
    const response = await cartApi.addToCart(productId, quantity);
    setCart(response.data);
    return response;
  };

  const updateQuantity = async (productId, quantity) => {
    const response = await cartApi.updateQuantity(productId, quantity);
    setCart(response.data);
    return response;
  };

  const removeFromCart = async (productId) => {
    const response = await cartApi.removeFromCart(productId);
    setCart(response.data);
    return response;
  };

  const clearCart = async () => {
    const response = await cartApi.clearCart();
    setCart(response.data);
    return response;
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        loading,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        fetchCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
