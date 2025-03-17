// services/cartService.js

const CART_KEY = 'cart';

export const addToCart = (item) => {
  const cartString = localStorage.getItem(CART_KEY);
  const cartItems = cartString ? JSON.parse(cartString) : [];
  cartItems.push(item);
  localStorage.setItem(CART_KEY, JSON.stringify(cartItems));
};

export const getCartItems = () => {
  const cartString = localStorage.getItem(CART_KEY);
  return cartString ? JSON.parse(cartString) : [];
};

export const clearCart = () => {
  localStorage.removeItem(CART_KEY);
};
