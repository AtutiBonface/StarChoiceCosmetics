/* // Purpose: Service for wishlist functionality

const WISHLIST_KEY = 'wishlist';

export const addToWishlist = (item) => {
  const wishlistString = localStorage.getItem(WISHLIST_KEY);
  const wishlist = wishlistString ? JSON.parse(wishlistString) : [];
  wishlist.push(item);
  localStorage.setItem(WISHLIST_KEY, JSON.stringify(wishlist));
};

export const getWishlistItems = () => {
  const wishlist = localStorage.getItem(WISHLIST_KEY);
  return wishlist ? JSON.parse(wishlist) : [];
};

export const clearWishlist = () => {
  localStorage.removeItem(WISHLIST_KEY);
};
 */