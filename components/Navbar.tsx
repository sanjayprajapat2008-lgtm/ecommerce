"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCart } from "@/lib/cart-context";

export const Navbar: React.FC = () => {
  const { cart, wishlist, removeFromCart, updateQuantity } = useCart();
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [cartDropdownOpen, setCartDropdownOpen] = useState(false);

  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
  const cartSubtotal = cart.reduce((total, item) => total + item.product.price * item.quantity, 0);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Products", href: "/products" },
    { name: "Profile", href: "/profile" },
    { name: "Admin Portal", href: "/admin" },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-zinc-800 bg-zinc-950/80 backdrop-blur-md">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="group flex items-center gap-2 text-2xl font-black tracking-wider text-white">
              <span className="bg-gradient-to-r from-sky-400 to-indigo-500 bg-clip-text text-transparent group-hover:brightness-110 transition">
                PORTO
              </span>
              <span className="rounded-md bg-sky-500/10 px-1.5 py-0.5 text-xs font-bold text-sky-400 border border-sky-500/20">
                TECH
              </span>
            </Link>
          </div>

          {/* Navigation Links - Desktop */}
          <nav className="hidden md:flex space-x-1">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`rounded-lg px-4 py-2 text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? "bg-zinc-800 text-white shadow-inner shadow-black/50"
                      : "text-zinc-400 hover:bg-zinc-900/50 hover:text-white"
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>

          {/* User Controls */}
          <div className="flex items-center gap-4">
            {/* Wishlist Indicator */}
            <Link
              href="/profile"
              className="relative hidden sm:block rounded-full p-2 text-zinc-400 hover:bg-zinc-900 hover:text-white transition"
              title="Wishlist"
            >
              <svg className="h-6 w-6" fill={wishlist.length > 0 ? "currentColor" : "none"} viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  className={wishlist.length > 0 ? "text-rose-500" : ""}
                />
              </svg>
              {wishlist.length > 0 && (
                <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-rose-500 text-[10px] font-bold text-white ring-2 ring-zinc-950">
                  {wishlist.length}
                </span>
              )}
            </Link>

            {/* Shopping Cart Indicator and Dropdown */}
            <div className="relative">
              <button
                onClick={() => setCartDropdownOpen(!cartDropdownOpen)}
                className="relative rounded-full p-2 text-zinc-400 hover:bg-zinc-900 hover:text-white transition"
                title="Shopping Cart"
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                  />
                </svg>
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-sky-500 text-[10px] font-bold text-white ring-2 ring-zinc-950">
                    {cartCount}
                  </span>
                )}
              </button>

              {/* Cart Dropdown Drawer */}
              {cartDropdownOpen && (
                <>
                  <div className="fixed inset-0 z-10" onClick={() => setCartDropdownOpen(false)} />
                  <div className="absolute right-0 mt-2 z-20 w-80 sm:w-96 rounded-xl border border-zinc-800 bg-zinc-900/95 p-4 shadow-2xl backdrop-blur-md transition-all duration-300 animate-in fade-in slide-in-from-top-2">
                    <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
                      <h3 className="text-base font-semibold text-white">Cart Summary ({cartCount} items)</h3>
                      <button
                        onClick={() => setCartDropdownOpen(false)}
                        className="text-zinc-400 hover:text-white transition"
                      >
                        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>

                    {cart.length === 0 ? (
                      <div className="flex flex-col items-center justify-center py-10 text-center">
                        <svg className="mb-3 h-12 w-12 text-zinc-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={1.5}
                            d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                          />
                        </svg>
                        <p className="text-sm text-zinc-400">Your shopping cart is currently empty</p>
                        <Link
                          href="/products"
                          onClick={() => setCartDropdownOpen(false)}
                          className="mt-4 rounded-full bg-sky-500 px-4 py-1.5 text-xs font-semibold text-white hover:bg-sky-400 transition"
                        >
                          Shop Best Sellers
                        </Link>
                      </div>
                    ) : (
                      <>
                        <div className="max-h-60 overflow-y-auto divide-y divide-zinc-800/50 py-2 pr-1">
                          {cart.map((item) => (
                            <div key={item.product.id} className="flex gap-3 py-3">
                              <img
                                src={item.product.image}
                                alt={item.product.name}
                                className="h-14 w-14 rounded-lg object-cover bg-zinc-950 border border-zinc-800"
                              />
                              <div className="flex-1 min-w-0">
                                <h4 className="truncate text-xs font-semibold text-white hover:text-sky-400 transition">
                                  <Link href={`/products/${item.product.id}`} onClick={() => setCartDropdownOpen(false)}>
                                    {item.product.name}
                                  </Link>
                                </h4>
                                <p className="text-xs text-zinc-400 mt-0.5">₹{item.product.price} each</p>
                                <div className="mt-2 flex items-center justify-between">
                                  <div className="flex items-center gap-2 border border-zinc-800 rounded-md bg-zinc-950 px-1 py-0.5 scale-90 origin-left">
                                    <button
                                      onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                                      className="px-1 text-zinc-400 hover:text-white"
                                    >
                                      -
                                    </button>
                                    <span className="text-xs font-bold text-white px-1">{item.quantity}</span>
                                    <button
                                      onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                                      className="px-1 text-zinc-400 hover:text-white"
                                    >
                                      +
                                    </button>
                                  </div>
                                  <button
                                    onClick={() => removeFromCart(item.product.id)}
                                    className="text-zinc-500 hover:text-rose-400 transition"
                                  >
                                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                      <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={1.5}
                                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                      />
                                    </svg>
                                  </button>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>

                        <div className="border-t border-zinc-850 pt-3 mt-1">
                          <div className="flex items-center justify-between text-sm font-semibold text-white">
                            <span>Subtotal:</span>
                            <span className="text-sky-400">₹{cartSubtotal.toLocaleString("en-IN")}</span>
                          </div>
                          <div className="grid grid-cols-2 gap-2 mt-4">
                            <Link
                              href="/cart"
                              onClick={() => setCartDropdownOpen(false)}
                              className="rounded-lg border border-zinc-800 bg-zinc-900 text-center py-2 text-xs font-semibold text-white hover:bg-zinc-850 transition"
                            >
                              View Cart
                            </Link>
                            <Link
                              href="/checkout"
                              onClick={() => setCartDropdownOpen(false)}
                              className="rounded-lg bg-sky-500 text-center py-2 text-xs font-semibold text-white hover:bg-sky-400 transition"
                            >
                              Checkout
                            </Link>
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                </>
              )}
            </div>

            {/* Mobile Menu Toggle Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden rounded-lg p-2 text-zinc-400 hover:bg-zinc-900 hover:text-white transition"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {mobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-zinc-900 bg-zinc-950 p-4 space-y-2 animate-in slide-in-from-top duration-200">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`block rounded-lg px-4 py-2.5 text-sm font-medium transition ${
                  isActive
                    ? "bg-zinc-900 text-white border-l-2 border-sky-500"
                    : "text-zinc-400 hover:bg-zinc-900/50 hover:text-white"
                }`}
              >
                {link.name}
              </Link>
            );
          })}
        </div>
      )}
    </header>
  );
};
