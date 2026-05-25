"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { Product } from "./products";

export interface CartItem {
  product: Product;
  quantity: number;
  selectedColor?: string;
  selectedStorage?: string;
}

export interface Order {
  id: string;
  date: string;
  items: CartItem[];
  subtotal: number;
  discount: number;
  shipping: number;
  total: number;
  shippingInfo: {
    fullName: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    zipCode: string;
  };
  paymentMethod: string;
  status: "Pending" | "Processing" | "Shipped" | "Delivered";
}

interface Coupon {
  code: string;
  discountPercent: number;
}

interface CartContextType {
  cart: CartItem[];
  wishlist: string[];
  orders: Order[];
  appliedCoupon: Coupon | null;
  addToCart: (product: Product, quantity?: number, color?: string, storage?: string) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  toggleWishlist: (productId: string) => void;
  applyCoupon: (code: string) => boolean;
  removeCoupon: () => void;
  placeOrder: (shippingInfo: Order["shippingInfo"], paymentMethod: string) => Order;
  updateOrderStatus: (orderId: string, status: Order["status"]) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [appliedCoupon, setAppliedCoupon] = useState<Coupon | null>(null);
  const [isHydrated, setIsHydrated] = useState(false);

  // Load state on mount
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem("porto_cart");
      const savedWishlist = localStorage.getItem("porto_wishlist");
      const savedOrders = localStorage.getItem("porto_orders");
      const savedCoupon = localStorage.getItem("porto_coupon");

      if (savedCart) setCart(JSON.parse(savedCart));
      if (savedWishlist) setWishlist(JSON.parse(savedWishlist));
      if (savedOrders) setOrders(JSON.parse(savedOrders));
      if (savedCoupon) setAppliedCoupon(JSON.parse(savedCoupon));
    } catch (e) {
      console.error("Failed to load local storage states", e);
    }
    setIsHydrated(true);
  }, []);

  // Save states to local storage when they change (only after hydration)
  useEffect(() => {
    if (!isHydrated) return;
    localStorage.setItem("porto_cart", JSON.stringify(cart));
  }, [cart, isHydrated]);

  useEffect(() => {
    if (!isHydrated) return;
    localStorage.setItem("porto_wishlist", JSON.stringify(wishlist));
  }, [wishlist, isHydrated]);

  useEffect(() => {
    if (!isHydrated) return;
    localStorage.setItem("porto_orders", JSON.stringify(orders));
  }, [orders, isHydrated]);

  useEffect(() => {
    if (!isHydrated) return;
    if (appliedCoupon) {
      localStorage.setItem("porto_coupon", JSON.stringify(appliedCoupon));
    } else {
      localStorage.removeItem("porto_coupon");
    }
  }, [appliedCoupon, isHydrated]);

  const addToCart = (product: Product, quantity = 1, color?: string, storage?: string) => {
    setCart((prevCart) => {
      const existingItemIndex = prevCart.findIndex((item) => item.product.id === product.id);
      if (existingItemIndex > -1) {
        const newCart = [...prevCart];
        newCart[existingItemIndex].quantity += quantity;
        return newCart;
      }
      return [...prevCart, { product, quantity, selectedColor: color, selectedStorage: storage }];
    });
  };

  const removeFromCart = (productId: string) => {
    setCart((prevCart) => prevCart.filter((item) => item.product.id !== productId));
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
    setAppliedCoupon(null);
  };

  const toggleWishlist = (productId: string) => {
    setWishlist((prevWishlist) =>
      prevWishlist.includes(productId)
        ? prevWishlist.filter((id) => id !== productId)
        : [...prevWishlist, productId]
    );
  };

  const applyCoupon = (code: string): boolean => {
    const cleanCode = code.toUpperCase().trim();
    if (cleanCode === "ANTIGRAVITY") {
      setAppliedCoupon({ code: "ANTIGRAVITY", discountPercent: 20 });
      return true;
    } else if (cleanCode === "WELCOME") {
      setAppliedCoupon({ code: "WELCOME", discountPercent: 10 });
      return true;
    }
    return false;
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
  };

  const placeOrder = (shippingInfo: Order["shippingInfo"], paymentMethod: string): Order => {
    const subtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
    const discount = appliedCoupon ? Math.round(subtotal * (appliedCoupon.discountPercent / 100)) : 0;
    const shipping = subtotal > 5000 || subtotal === 0 ? 0 : 250;
    const total = subtotal - discount + shipping;

    const newOrder: Order = {
      id: "OR-" + Math.floor(100000 + Math.random() * 900000),
      date: new Date().toISOString().split("T")[0],
      items: [...cart],
      subtotal,
      discount,
      shipping,
      total,
      shippingInfo,
      paymentMethod,
      status: "Pending",
    };

    setOrders((prevOrders) => [newOrder, ...prevOrders]);
    clearCart();
    return newOrder;
  };

  const updateOrderStatus = (orderId: string, status: Order["status"]) => {
    setOrders((prevOrders) =>
      prevOrders.map((order) => (order.id === orderId ? { ...order, status } : order))
    );
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        wishlist,
        orders,
        appliedCoupon,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        toggleWishlist,
        applyCoupon,
        removeCoupon,
        placeOrder,
        updateOrderStatus,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
