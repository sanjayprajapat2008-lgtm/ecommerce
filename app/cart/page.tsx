"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useCart } from "@/lib/cart-context";

export default function CartPage() {
  const {
    cart,
    removeFromCart,
    updateQuantity,
    appliedCoupon,
    applyCoupon,
    removeCoupon,
    clearCart,
  } = useCart();

  const [couponCode, setCouponCode] = useState("");
  const [couponError, setCouponError] = useState("");
  const [couponSuccess, setCouponSuccess] = useState(false);

  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
  const subtotal = cart.reduce((total, item) => total + item.product.price * item.quantity, 0);

  // Financial calculations
  const discountPercent = appliedCoupon ? appliedCoupon.discountPercent : 0;
  const discount = Math.round(subtotal * (discountPercent / 100));
  const shippingThreshold = 5000;
  const shipping = subtotal > shippingThreshold || subtotal === 0 ? 0 : 250;
  const taxesEstimate = Math.round((subtotal - discount) * 0.18); // 18% GST simulated
  const grandTotal = subtotal - discount + shipping + taxesEstimate;

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    setCouponError("");
    setCouponSuccess(false);

    if (!couponCode.trim()) return;

    const success = applyCoupon(couponCode);
    if (success) {
      setCouponSuccess(true);
      setCouponCode("");
    } else {
      setCouponError("Invalid coupon code. Try 'ANTIGRAVITY' or 'WELCOME'.");
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-white bg-grid-pattern py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Page Header */}
        <div className="border-b border-zinc-900 pb-6 mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-black text-white sm:text-4xl">Shopping Cart</h1>
            <p className="mt-2 text-sm text-zinc-400">Review selected tech devices before secure checkout.</p>
          </div>
          {cart.length > 0 && (
            <button
              onClick={clearCart}
              className="text-xs text-rose-400 hover:text-rose-300 hover:underline transition self-start sm:self-center"
            >
              Clear Entire Cart
            </button>
          )}
        </div>

        {cart.length === 0 ? (
          /* Empty Cart Panel */
          <div className="text-center py-20 bg-zinc-900/10 rounded-2xl border border-dashed border-zinc-850 p-6 max-w-md mx-auto">
            <svg className="mx-auto h-16 w-16 text-zinc-700 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
            <h3 className="text-lg font-bold text-white">Your Cart is Empty</h3>
            <p className="mt-2 text-xs text-zinc-500 leading-relaxed">
              Looks like you haven&apos;t added any premium workspace upgrades to your cart yet. Explore our custom curated catalog!
            </p>
            <Link
              href="/products"
              className="mt-6 inline-block rounded-full bg-sky-500 px-6 py-2.5 text-xs font-semibold text-white hover:bg-sky-400 transition"
            >
              Start Shopping
            </Link>
          </div>
        ) : (
          /* Cart Layout split */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Items Column */}
            <div className="lg:col-span-8 space-y-4">
              {cart.map((item) => (
                <div
                  key={item.product.id}
                  className="flex flex-col sm:flex-row gap-4 p-4 bg-zinc-900/40 border border-zinc-900 rounded-xl backdrop-blur-sm transition hover:border-zinc-800"
                >
                  {/* Thumbnail */}
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="h-20 w-full sm:h-24 sm:w-24 rounded-lg object-cover bg-zinc-950 border border-zinc-800 flex-shrink-0"
                  />

                  {/* Body Content */}
                  <div className="flex-1 flex flex-col justify-between min-w-0">
                    <div className="flex justify-between items-start gap-4">
                      <div>
                        <h3 className="text-sm font-bold text-white hover:text-sky-400 transition truncate">
                          <Link href={`/products/${item.product.id}`}>{item.product.name}</Link>
                        </h3>
                        <p className="text-[11px] text-zinc-500 mt-0.5">Category: {item.product.category}</p>
                        {item.selectedColor && (
                          <p className="text-[10px] font-bold text-sky-400 bg-sky-500/10 px-1.5 py-0.5 rounded border border-sky-500/20 w-fit mt-1">
                            Finish: {item.selectedColor}
                          </p>
                        )}
                      </div>

                      <button
                        onClick={() => removeFromCart(item.product.id)}
                        className="text-zinc-500 hover:text-rose-400 transition p-1"
                        title="Remove product"
                      >
                        <svg className="h-4.5 w-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={1.5}
                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                          />
                        </svg>
                      </button>
                    </div>

                    {/* Quantity Adjustment & pricing */}
                    <div className="flex items-center justify-between mt-4 sm:mt-2">
                      <div className="flex items-center border border-zinc-800 rounded-lg bg-zinc-950 px-2 py-1">
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                          className="px-1.5 text-zinc-400 hover:text-white font-bold"
                        >
                          -
                        </button>
                        <span className="text-xs font-bold text-white px-3 min-w-[24px] text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                          className="px-1.5 text-zinc-400 hover:text-white font-bold"
                        >
                          +
                        </button>
                      </div>

                      <div className="text-right">
                        <p className="text-xs text-zinc-500">₹{item.product.price} each</p>
                        <p className="text-sm font-black text-sky-400">
                          ₹{(item.product.price * item.quantity).toLocaleString("en-IN")}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Right Summary Column */}
            <div className="lg:col-span-4 space-y-6">
              
              {/* Order pricing breakdown */}
              <div className="bg-zinc-900/40 p-6 rounded-2xl border border-zinc-900 backdrop-blur-sm space-y-4">
                <h3 className="text-sm font-bold text-white uppercase tracking-wider border-b border-zinc-855 pb-2">
                  Order Summary
                </h3>

                <div className="space-y-2 text-xs text-zinc-400">
                  <div className="flex justify-between">
                    <span>Items Total ({cartCount} units)</span>
                    <span className="text-white">₹{subtotal.toLocaleString("en-IN")}</span>
                  </div>

                  {discount > 0 && (
                    <div className="flex justify-between text-emerald-400">
                      <span>Discount ({appliedCoupon?.code})</span>
                      <span>- ₹{discount.toLocaleString("en-IN")}</span>
                    </div>
                  )}

                  <div className="flex justify-between">
                    <span>Shipping Estimate</span>
                    <span className="text-white">
                      {shipping === 0 ? (
                        <span className="text-emerald-400 font-bold uppercase text-[10px]">FREE</span>
                      ) : (
                        `₹${shipping}`
                      )}
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span>GST (18% Simulated)</span>
                    <span className="text-white">₹{taxesEstimate.toLocaleString("en-IN")}</span>
                  </div>
                </div>

                {/* Shipping prompt */}
                {subtotal < shippingThreshold && (
                  <p className="text-[10px] text-amber-400 bg-amber-500/5 px-2.5 py-1.5 rounded border border-amber-500/10">
                    Add <span className="font-bold">₹{(shippingThreshold - subtotal).toLocaleString("en-IN")}</span> more to qualify for <span className="font-bold">FREE SHIPPING</span>!
                  </p>
                )}

                {/* Grand Total */}
                <div className="border-t border-zinc-850 pt-4 flex justify-between items-baseline">
                  <span className="text-xs font-bold text-white uppercase">Grand Total:</span>
                  <span className="text-xl font-black text-sky-400">₹{grandTotal.toLocaleString("en-IN")}</span>
                </div>

                {/* Secure checkout CTA */}
                <Link
                  href="/checkout"
                  className="w-full flex items-center justify-center h-11 rounded-xl bg-sky-500 hover:bg-sky-400 text-sm font-bold text-white btn-glow-sky transition"
                >
                  Proceed to Secure Checkout
                </Link>
                
                <p className="text-[10px] text-zinc-500 text-center flex items-center justify-center gap-1">
                  <svg className="h-3 w-3 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                  Checkout transactions are fully encrypted
                </p>
              </div>

              {/* Coupon Form card */}
              <div className="bg-zinc-900/40 p-6 rounded-2xl border border-zinc-900 backdrop-blur-sm space-y-4">
                <h3 className="text-xs font-bold text-white uppercase tracking-wider">Promo Coupon</h3>
                
                {appliedCoupon ? (
                  <div className="flex items-center justify-between rounded-lg bg-emerald-500/10 border border-emerald-500/25 px-3 py-2">
                    <div>
                      <span className="text-xs font-bold text-emerald-400">{appliedCoupon.code}</span>
                      <span className="text-[10px] text-emerald-500 block">{appliedCoupon.discountPercent}% Discount Applied</span>
                    </div>
                    <button
                      onClick={removeCoupon}
                      className="text-xs font-semibold text-rose-400 hover:text-rose-300"
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleApplyCoupon} className="flex gap-2">
                    <input
                      type="text"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                      placeholder="e.g. ANTIGRAVITY"
                      className="flex-1 rounded-lg border border-zinc-800 bg-zinc-950 px-3 py-2 text-xs text-white placeholder-zinc-650 focus:border-sky-500 focus:outline-none transition uppercase"
                    />
                    <button
                      type="submit"
                      className="rounded-lg bg-zinc-800 border border-zinc-700 px-4 text-xs font-semibold text-white hover:bg-zinc-750 transition"
                    >
                      Apply
                    </button>
                  </form>
                )}

                {couponError && <p className="text-[10px] text-rose-400 animate-pulse">{couponError}</p>}
                {couponSuccess && (
                  <p className="text-[10px] text-emerald-400 animate-pulse">✓ Code applied! You saved {discountPercent}%.</p>
                )}
              </div>

            </div>

          </div>
        )}

      </div>
    </div>
  );
}
