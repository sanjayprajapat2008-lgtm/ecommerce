"use client";

import React, { useMemo, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useCart } from "@/lib/cart-context";

export default function OrderSuccessPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-zinc-950 text-white flex items-center justify-center">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-sky-500/10 border-t-sky-500" />
      </div>
    }>
      <OrderSuccessContent />
    </Suspense>
  );
}

function OrderSuccessContent() {
  const searchParams = useSearchParams();
  const { orders } = useCart();


  const orderId = searchParams.get("orderId");

  // Find exact order in context orders list
  const order = useMemo(() => orders.find((o) => o.id === orderId), [orders, orderId]);

  // Fallback estimates
  const deliveryDate = useMemo(() => {
    const d = new Date();
    d.setDate(d.getDate() + 3); // 3 days delivery speed
    return d.toLocaleDateString("en-IN", { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
  }, []);

  if (!order) {
    return (
      <div className="min-h-screen bg-zinc-950 text-white flex flex-col items-center justify-center p-6 text-center">
        <svg className="h-16 w-16 text-zinc-700 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
        <h1 className="text-2xl font-black mb-2">Order Not Hydrated</h1>
        <p className="text-sm text-zinc-500 mb-6 max-w-sm">
          We couldn&apos;t load order details. Navigate to your user profile to review your order history.
        </p>
        <Link href="/profile" className="rounded-full bg-sky-500 px-6 py-2.5 text-sm font-semibold hover:bg-sky-400 transition">
          View Profile Orders
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-white bg-grid-pattern py-16 relative overflow-hidden">
      
      {/* Decorative success glowing blobs */}
      <div className="absolute top-20 left-1/3 -z-10 h-72 w-72 rounded-full bg-emerald-500/10 blur-[120px] animate-pulse" />
      
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        
        {/* Success badge banner */}
        <div className="text-center space-y-4 mb-12 animate-in fade-in duration-500">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/25">
            <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <div className="space-y-1">
            <span className="text-[10px] font-black uppercase tracking-widest text-emerald-400">TRANSACTION SECURED</span>
            <h1 className="text-3xl font-black sm:text-4xl text-white tracking-tight">Order Confirmed!</h1>
            <p className="text-xs text-zinc-400">
              Receipt code: <span className="font-mono text-zinc-200 font-bold bg-zinc-900 border border-zinc-800 px-1.5 py-0.5 rounded">{order.id}</span>
            </p>
          </div>
        </div>

        {/* Dispatch Timeline tracker stepper */}
        <div className="bg-zinc-900/40 p-6 rounded-2xl border border-zinc-900 backdrop-blur-sm space-y-6 mb-8 animate-in fade-in slide-in-from-bottom duration-500">
          <h3 className="text-xs font-bold text-zinc-400 uppercase tracking-wider">Tracking Timeline</h3>
          
          <div className="relative">
            <div className="absolute left-6 top-1/2 -mt-0.5 h-1 w-4/5 -translate-y-1/2 bg-zinc-800 -z-10 hidden sm:block" />
            <div className="absolute left-6 top-1/2 -mt-0.5 h-1 w-1/3 -translate-y-1/2 bg-emerald-500 -z-10 hidden sm:block" />
            
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-6 sm:gap-2">
              <div className="flex sm:flex-col items-center gap-3 sm:gap-2 sm:text-center">
                <span className="rounded-full bg-emerald-500 flex h-6.5 w-6.5 items-center justify-center text-xs font-bold text-black ring-4 ring-zinc-950">✓</span>
                <div>
                  <h4 className="text-xs font-bold text-white">Order Placed</h4>
                  <p className="text-[10px] text-zinc-500">{order.date}</p>
                </div>
              </div>
              <div className="flex sm:flex-col items-center gap-3 sm:gap-2 sm:text-center">
                <span className="rounded-full bg-emerald-500 flex h-6.5 w-6.5 items-center justify-center text-xs font-bold text-black ring-4 ring-zinc-950 ring-emerald-500/10">✓</span>
                <div>
                  <h4 className="text-xs font-bold text-white">Processing</h4>
                  <p className="text-[10px] text-zinc-550">Telemetries handshaked</p>
                </div>
              </div>
              <div className="flex sm:flex-col items-center gap-3 sm:gap-2 sm:text-center">
                <span className="rounded-full bg-zinc-900 flex h-6.5 w-6.5 items-center justify-center text-xs font-bold text-zinc-500 border border-zinc-800 ring-4 ring-zinc-950">3</span>
                <div>
                  <h4 className="text-xs font-bold text-zinc-400">Shipped</h4>
                  <p className="text-[10px] text-zinc-550">Awaiting carrier node</p>
                </div>
              </div>
              <div className="flex sm:flex-col items-center gap-3 sm:gap-2 sm:text-center">
                <span className="rounded-full bg-zinc-900 flex h-6.5 w-6.5 items-center justify-center text-xs font-bold text-zinc-500 border border-zinc-800 ring-4 ring-zinc-950">4</span>
                <div>
                  <h4 className="text-xs font-bold text-zinc-400">Delivered</h4>
                  <p className="text-[10px] text-zinc-550">Est. {deliveryDate.split(",")[1]}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Order details breakdown */}
        <div className="bg-zinc-900/40 border border-zinc-900 rounded-2xl p-6 backdrop-blur-sm space-y-6 mb-12 animate-in fade-in slide-in-from-bottom duration-500">
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 border-b border-zinc-900 pb-6">
            <div>
              <h4 className="text-[10px] font-bold text-zinc-500 uppercase tracking-wide">Delivery Node</h4>
              <p className="text-xs font-bold text-white mt-1.5">{order.shippingInfo.fullName}</p>
              <p className="text-xs text-zinc-400 mt-1 leading-relaxed">{order.shippingInfo.address}, {order.shippingInfo.city} - {order.shippingInfo.zipCode}</p>
              <p className="text-[11px] text-zinc-500 mt-0.5">{order.shippingInfo.phone} | {order.shippingInfo.email}</p>
            </div>
            <div>
              <h4 className="text-[10px] font-bold text-zinc-500 uppercase tracking-wide">Shipment Speed</h4>
              <p className="text-xs font-bold text-white mt-1.5">Porto Premium Express (Air Delivery)</p>
              <p className="text-xs text-zinc-450 mt-1">Est. Arrival: <span className="font-bold text-sky-400">{deliveryDate}</span></p>
              <p className="text-xs text-zinc-500 mt-0.5">Method: {order.paymentMethod}</p>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider">Ordered Items Summary</h4>
            <div className="divide-y divide-zinc-900 bg-zinc-950/40 rounded-xl border border-zinc-900/50 overflow-hidden">
              {order.items.map((item) => (
                <div key={item.product.id} className="flex gap-4 p-4 justify-between items-center text-xs">
                  <div className="flex gap-3 items-center min-w-0">
                    <img src={item.product.image} alt={item.product.name} className="h-10 w-10 object-cover bg-zinc-950 border border-zinc-800 rounded flex-shrink-0" />
                    <div className="min-w-0">
                      <p className="font-bold text-white truncate">{item.product.name}</p>
                      <p className="text-[10px] text-zinc-500">Qty: {item.quantity} | Color: {item.selectedColor || "Space Grey"}</p>
                    </div>
                  </div>
                  <span className="font-bold text-white">₹{(item.product.price * item.quantity).toLocaleString("en-IN")}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="border-t border-zinc-900 pt-6 space-y-2 text-xs text-zinc-400">
            <div className="flex justify-between">
              <span>Items Total</span>
              <span className="text-white">₹{order.subtotal.toLocaleString("en-IN")}</span>
            </div>
            {order.discount > 0 && (
              <div className="flex justify-between text-emerald-400">
                <span>Promo Coupon Applied</span>
                <span>- ₹{order.discount.toLocaleString("en-IN")}</span>
              </div>
            )}
            <div className="flex justify-between">
              <span>Encrypted Air Shipping</span>
              <span className="text-white">{order.shipping === 0 ? "FREE" : `₹${order.shipping}`}</span>
            </div>
            <div className="border-t border-zinc-850 pt-4 flex justify-between items-baseline">
              <span className="text-xs font-bold text-white uppercase">Taxes & Amount Paid:</span>
              <span className="text-lg font-black text-sky-400">₹{order.total.toLocaleString("en-IN")}</span>
            </div>
          </div>
        </div>

        {/* CTA Links */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/products"
            className="rounded-xl border border-zinc-800 bg-zinc-900/50 px-6 py-3 text-center text-xs font-bold text-white hover:bg-zinc-850 hover:border-zinc-700 transition"
          >
            Continue Upgrading Workstation
          </Link>
          <Link
            href="/profile"
            className="rounded-xl bg-sky-500 px-6 py-3 text-center text-xs font-bold text-white hover:bg-sky-400 btn-glow-sky transition animate-pulse"
          >
            Track Order History
          </Link>
        </div>

      </div>
    </div>
  );
}
