import { createContext, useState, useEffect, useContext } from "react";
import { CartItem, WishlistItem, Product } from "@/mockData";

interface CartContextType {
  cart: CartItem[];
  wishlist: WishlistItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: number) => void;
  updateCartQuantity: (productId: number, quantity: number) => void; 
  addToWishlist: (product: Product) => void;
  removeFromWishlist: (productId: number) => void;
  isInCart: (productId: number) => boolean;
  isInWishlist: (productId: number) => boolean;
  cartTotal: number;
  cartQuantity: number;
  cartItemQuantity: (productId: number) => number;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<WishlistItem[]>([]);
  const [isInitialized, setIsInitialized] = useState(false);

  // Load cart/wishlist from local storage on mount
  useEffect(() => {
    try {
      const savedCart = JSON.parse(localStorage.getItem("cart") || "[]");
      const savedWishlist = JSON.parse(localStorage.getItem("wishlist") || "[]");
      setCart(savedCart);
      setWishlist(savedWishlist);
    } catch (error) {
      console.error("Error loading from localStorage:", error);
    } finally {
      setIsInitialized(true);
    }
  }, []);

  // Update local storage whenever cart/wishlist changes
  useEffect(() => {
    if (isInitialized) {
      localStorage.setItem("cart", JSON.stringify(cart));
    }
  }, [cart, isInitialized]);

  useEffect(() => {
    if (isInitialized) {
      localStorage.setItem("wishlist", JSON.stringify(wishlist));
    }
  }, [wishlist, isInitialized]);

  const addToCart = (product: Product) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.productId === product.id);
      if (existingItem) {
        return prevCart.map(item =>
          item.productId === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      const newItem: CartItem = {
        id: product.id,
        productId: product.id,
        name: product.name,
        price: product.price,
        oldPrice: product.oldPrice,
        image: product.images[0].url,
        quantity: 1,
        stock: product.stock,
        deliveryDate: "2-3 business days",
        rating: product.rating || 0,
        reviewCount: product.reviews?.length || 0
      };
      return [...prevCart, newItem];
    });
  };

  const removeFromCart = (productId: number) => {
    setCart(prevCart => prevCart.filter(item => item.productId !== productId));
  };

  const updateCartQuantity = (productId: number, quantity: number) => {
    if (quantity < 1) return; // Prevent negative quantities
    
    setCart(prevCart =>
      prevCart.map(item =>
        item.productId === productId
          ? { ...item, quantity: Math.max(1, Math.min(quantity, item.stock)) }
          : item
      )
    );
  };

  const addToWishlist = (product: Product) => {
    setWishlist(prevWishlist => {
      if (prevWishlist.some(item => item.productId === product.id)) {
        return prevWishlist;
      }
      const newItem: WishlistItem = {
        id: product.id,
        productId: product.id,
        name: product.name,
        price: product.price,
        oldPrice: product.oldPrice,
        image: product.images[0].url,
        inStock: product.stock > 0,
        rating: product.rating || 0,
        reviewCount: product.reviews?.length || 0
      };
      return [...prevWishlist, newItem];
    });
  };

  const removeFromWishlist = (productId: number) => {
    setWishlist(prevWishlist => 
      prevWishlist.filter(item => item.productId !== productId)
    );
  };

  const isInCart = (productId: number) => {
    return cart.some(item => item.productId === productId);
  };

  const isInWishlist = (productId: number) => {
    return wishlist.some(item => item.productId === productId);
  };

  const cartTotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const cartQuantity = cart.reduce((sum, item) => sum + item.quantity, 0);

  const cartItemQuantity = (productId: number) => {
    const item = cart.find(item => item.productId === productId);
    return item ? item.quantity : 0;
  };

  const clearCart = () => {
    setCart([]);
  };

  const value = {
    cart,
    wishlist,
    addToCart,
    removeFromCart,
    updateCartQuantity,
    addToWishlist,
    removeFromWishlist,
    isInCart,
    isInWishlist,
    cartTotal,
    cartQuantity,
    cartItemQuantity,
    clearCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
