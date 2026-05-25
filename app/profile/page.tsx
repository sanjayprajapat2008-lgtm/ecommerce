"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { useCart, Order } from "@/lib/cart-context";
import { PRODUCTS } from "@/lib/products";

export default function ProfilePage() {
  const { orders, wishlist, toggleWishlist, addToCart } = useCart();

  // Profile Simulated details
  const [profile, setProfile] = useState({
    fullName: "Sanjay Kumar",
    email: "sanjay@example.com",
    phone: "+91 98765 43210",
    rank: "Titanium Techie",
    joinDate: "September 2025",
    points: 2450,
  });

  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({ ...profile });
  const [activeTab, setActiveTab] = useState("orders"); // 'orders' | 'wishlist' | 'settings'

  // Modal active order display state
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  // Hydrate wishlist items from PRODUCTS database
  const wishlistedProducts = useMemo(() => {
    return PRODUCTS.filter((p) => wishlist.includes(p.id));
  }, [wishlist]);

  const handleProfileSave = (e: React.FormEvent) => {
    e.preventDefault();
    setProfile({ ...profile, ...editForm });
    setIsEditing(false);
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-white bg-grid-pattern py-12">
      
      {/* Order Detail Modal */}
      {selectedOrder && (
        <>
          <div className="fixed inset-0 z-40 bg-black/85 backdrop-blur-sm" onClick={() => setSelectedOrder(null)} />
          <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 max-w-lg w-full rounded-2xl border border-zinc-800 bg-zinc-900 p-6 shadow-2xl animate-in fade-in zoom-in-95 duration-200">
            
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-zinc-800 pb-3 mb-4">
              <div>
                <h3 className="text-sm font-bold text-white">Order Details</h3>
                <p className="text-[10px] text-zinc-500 font-mono mt-0.5">Code: {selectedOrder.id}</p>
              </div>
              <button
                onClick={() => setSelectedOrder(null)}
                className="text-zinc-500 hover:text-white transition"
              >
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Modal Details */}
            <div className="space-y-4 max-h-[350px] overflow-y-auto pr-1">
              {/* Status */}
              <div className="flex items-center justify-between bg-zinc-950/65 border border-zinc-850 rounded-xl p-3">
                <span className="text-xs text-zinc-500 font-semibold">Delivery Status:</span>
                <span className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold border uppercase tracking-wider ${
                  selectedOrder.status === "Delivered"
                    ? "bg-emerald-500/10 border-emerald-500/25 text-emerald-400"
                    : selectedOrder.status === "Shipped"
                    ? "bg-sky-500/10 border-sky-500/25 text-sky-400"
                    : "bg-amber-500/10 border-amber-500/25 text-amber-400"
                }`}>
                  {selectedOrder.status}
                </span>
              </div>

              {/* Items */}
              <div className="space-y-2">
                <h4 className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider">Ordered Items</h4>
                <div className="divide-y divide-zinc-900 border border-zinc-900 rounded-xl bg-zinc-950/30 overflow-hidden">
                  {selectedOrder.items.map((item) => (
                    <div key={item.product.id} className="flex justify-between items-center p-3 text-xs">
                      <div>
                        <p className="font-bold text-white truncate max-w-[200px]">{item.product.name}</p>
                        <p className="text-[10px] text-zinc-500">Qty: {item.quantity} | Finish: {item.selectedColor || "Default"}</p>
                      </div>
                      <span className="font-bold text-white">₹{(item.product.price * item.quantity).toLocaleString("en-IN")}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Financials */}
              <div className="border-t border-zinc-850 pt-3 space-y-1.5 text-xs text-zinc-400">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="text-white">₹{selectedOrder.subtotal.toLocaleString("en-IN")}</span>
                </div>
                {selectedOrder.discount > 0 && (
                  <div className="flex justify-between text-emerald-400">
                    <span>Discount</span>
                    <span>- ₹{selectedOrder.discount.toLocaleString("en-IN")}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Shipping Fee</span>
                  <span className="text-white">{selectedOrder.shipping === 0 ? "FREE" : `₹${selectedOrder.shipping}`}</span>
                </div>
                <div className="flex justify-between font-bold text-sky-450 border-t border-zinc-900 pt-2 text-sm">
                  <span className="text-white font-bold">Total Paid:</span>
                  <span className="text-sky-400">₹{selectedOrder.total.toLocaleString("en-IN")}</span>
                </div>
              </div>

              {/* Address */}
              <div className="bg-zinc-950/30 border border-zinc-850 p-3 rounded-xl">
                <h4 className="text-[9px] font-bold text-zinc-500 uppercase tracking-wide">Destination Address</h4>
                <p className="text-xs font-bold text-white mt-1">{selectedOrder.shippingInfo.fullName}</p>
                <p className="text-xs text-zinc-400 mt-0.5 leading-relaxed">
                  {selectedOrder.shippingInfo.address}, {selectedOrder.shippingInfo.city} - {selectedOrder.shippingInfo.zipCode}
                </p>
              </div>
            </div>

            <button
              onClick={() => setSelectedOrder(null)}
              className="mt-6 w-full rounded-xl bg-zinc-850 hover:bg-zinc-800 text-xs font-bold text-white py-2.5 transition"
            >
              Close Overlay
            </button>
          </div>
        </>
      )}

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Profile Card Header */}
        <div className="bg-zinc-900/40 p-6 rounded-3xl border border-zinc-900 backdrop-blur-sm grid grid-cols-1 md:grid-cols-12 gap-6 items-center mb-8">
          {/* Avatar */}
          <div className="md:col-span-2 flex justify-center">
            <div className="h-24 w-24 rounded-full bg-gradient-to-tr from-sky-400 via-blue-400 to-indigo-500 p-1">
              <div className="h-full w-full rounded-full bg-zinc-950 flex items-center justify-center font-black text-white text-3xl select-none">
                SK
              </div>
            </div>
          </div>
          
          {/* Details */}
          <div className="md:col-span-7 space-y-1.5 text-center md:text-left">
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-2">
              <h1 className="text-2xl font-black tracking-tight text-white">{profile.fullName}</h1>
              <span className="rounded bg-sky-500/10 border border-sky-500/20 px-2 py-0.5 text-[10px] font-bold text-sky-400 uppercase tracking-wider">
                {profile.rank}
              </span>
            </div>
            <p className="text-xs text-zinc-400">{profile.email} | {profile.phone}</p>
            <p className="text-[10px] text-zinc-500">Porto member since {profile.joinDate}</p>
          </div>

          {/* Loyalty metrics */}
          <div className="md:col-span-3 border-t md:border-t-0 md:border-l border-zinc-850 pt-4 md:pt-0 pl-0 md:pl-6 text-center md:text-left space-y-1">
            <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider">LOYALTY TOKENS</span>
            <p className="text-3xl font-black text-sky-400">{profile.points} <span className="text-xs font-semibold text-zinc-400">Pts</span></p>
            <p className="text-[10px] text-zinc-500">100 Pts = ₹100 Checkout credits</p>
          </div>
        </div>

        {/* Tab Selection */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Navigation Bar list */}
          <div className="lg:col-span-3 space-y-1.5 bg-zinc-900/40 p-4 rounded-2xl border border-zinc-900 backdrop-blur-sm h-fit">
            {[
              { id: "orders", label: "Completed Orders", count: orders.length },
              { id: "wishlist", label: "My Wishlist Upgrade", count: wishlist.length },
              { id: "settings", label: "Profile Credentials", count: null }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => { setActiveTab(tab.id); setIsEditing(false); }}
                className={`w-full flex items-center justify-between rounded-lg px-4 py-2.5 text-xs font-semibold transition ${
                  activeTab === tab.id
                    ? "bg-zinc-800 text-sky-400"
                    : "text-zinc-400 hover:bg-zinc-900 hover:text-white"
                }`}
              >
                <span>{tab.label}</span>
                {tab.count !== null && (
                  <span className="text-[10px] bg-zinc-950 px-1.5 py-0.5 rounded text-zinc-500 font-normal">
                    {tab.count}
                  </span>
                )}
              </button>
            ))}
          </div>

          {/* Right Area content boxes */}
          <div className="lg:col-span-9 bg-zinc-900/30 p-6 rounded-2xl border border-zinc-900 backdrop-blur-sm min-h-[350px]">
            
            {/* ORDERS TAB */}
            {activeTab === "orders" && (
              <div className="space-y-4 animate-in fade-in duration-300">
                <h2 className="text-sm font-bold text-white uppercase tracking-wider border-b border-zinc-850 pb-2">
                  Completed Purchase History
                </h2>

                {orders.length === 0 ? (
                  <div className="text-center py-16">
                    <p className="text-xs text-zinc-500">You haven&apos;t completed any orders yet.</p>
                    <Link
                      href="/products"
                      className="mt-4 inline-block text-xs font-bold text-sky-400 hover:text-sky-300 hover:underline"
                    >
                      Shop featured catalog upgrades &rarr;
                    </Link>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {orders.map((order) => (
                      <div
                        key={order.id}
                        onClick={() => setSelectedOrder(order)}
                        className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-4 bg-zinc-950/60 border border-zinc-900 rounded-xl cursor-pointer hover:border-zinc-800 transition"
                      >
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-bold text-white font-mono">{order.id}</span>
                            <span className="text-[10px] text-zinc-500">{order.date}</span>
                          </div>
                          <p className="text-[10px] text-zinc-400">
                            {order.items.length} product{order.items.length > 1 ? "s" : ""} | Paid:{" "}
                            <span className="font-bold text-sky-400">₹{order.total.toLocaleString("en-IN")}</span>
                          </p>
                        </div>

                        <div className="flex items-center gap-3 mt-3 sm:mt-0">
                          <span className={`rounded-full px-2 py-0.5 text-[9px] font-bold border uppercase tracking-wider ${
                            order.status === "Delivered"
                              ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-400"
                              : order.status === "Shipped"
                              ? "bg-sky-500/10 border-sky-500/20 text-sky-400"
                              : "bg-amber-500/10 border-amber-500/20 text-amber-400"
                          }`}>
                            {order.status}
                          </span>
                          <span className="text-xs font-bold text-sky-400 hover:underline">View Receipt</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* WISHLIST TAB */}
            {activeTab === "wishlist" && (
              <div className="space-y-4 animate-in fade-in duration-300">
                <h2 className="text-sm font-bold text-white uppercase tracking-wider border-b border-zinc-850 pb-2">
                  My Wishlist Upgrade Items
                </h2>

                {wishlistedProducts.length === 0 ? (
                  <div className="text-center py-16">
                    <p className="text-xs text-zinc-500">Your wishlist is currently empty.</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {wishlistedProducts.map((p) => (
                      <div
                        key={p.id}
                        className="flex gap-3 p-3 bg-zinc-950/60 border border-zinc-900 rounded-xl items-center hover:border-zinc-850 transition"
                      >
                        <img src={p.image} alt={p.name} className="h-12 w-12 object-cover bg-zinc-950 border border-zinc-800 rounded flex-shrink-0" />
                        <div className="min-w-0 flex-1">
                          <h4 className="text-xs font-bold text-white truncate hover:text-sky-400">
                            <Link href={`/products/${p.id}`}>{p.name}</Link>
                          </h4>
                          <p className="text-xs font-bold text-sky-400 mt-0.5">₹{p.price.toLocaleString("en-IN")}</p>
                          
                          <div className="flex gap-3 items-center mt-2">
                            <button
                              onClick={() => addToCart(p, 1)}
                              className="text-[10px] font-bold text-sky-400 hover:text-sky-300 transition"
                            >
                              Add to Cart
                            </button>
                            <button
                              onClick={() => toggleWishlist(p.id)}
                              className="text-[10px] font-bold text-rose-400 hover:text-rose-300 transition"
                            >
                              Remove
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* SETTINGS CREDENTIALS TAB */}
            {activeTab === "settings" && (
              <div className="space-y-4 animate-in fade-in duration-300">
                <h2 className="text-sm font-bold text-white uppercase tracking-wider border-b border-zinc-850 pb-2 flex justify-between items-center">
                  <span>Profile Credentials</span>
                  {!isEditing && (
                    <button
                      onClick={() => { setIsEditing(true); setEditForm({ ...profile }); }}
                      className="text-xs text-sky-400 hover:underline hover:text-sky-300 transition"
                    >
                      Edit profile details
                    </button>
                  )}
                </h2>

                {isEditing ? (
                  <form onSubmit={handleProfileSave} className="space-y-4 max-w-md">
                    <div className="space-y-1">
                      <label className="text-xs text-zinc-400 uppercase font-semibold">Full Name</label>
                      <input
                        type="text"
                        required
                        value={editForm.fullName}
                        onChange={(e) => setEditForm({ ...editForm, fullName: e.target.value })}
                        className="w-full rounded-lg border border-zinc-800 bg-zinc-950 px-3 py-2 text-xs text-white focus:border-sky-500 focus:outline-none transition"
                      />
                    </div>
                    
                    <div className="space-y-1">
                      <label className="text-xs text-zinc-400 uppercase font-semibold">Email Address</label>
                      <input
                        type="email"
                        required
                        value={editForm.email}
                        onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                        className="w-full rounded-lg border border-zinc-800 bg-zinc-950 px-3 py-2 text-xs text-white focus:border-sky-500 focus:outline-none transition"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs text-zinc-400 uppercase font-semibold">Phone Number</label>
                      <input
                        type="text"
                        required
                        value={editForm.phone}
                        onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })}
                        className="w-full rounded-lg border border-zinc-800 bg-zinc-950 px-3 py-2 text-xs text-white focus:border-sky-500 focus:outline-none transition"
                      />
                    </div>

                    <div className="pt-2 flex gap-3">
                      <button
                        type="submit"
                        className="rounded-lg bg-sky-500 px-4 py-2 text-xs font-semibold text-white hover:bg-sky-400 transition"
                      >
                        Save Settings
                      </button>
                      <button
                        type="button"
                        onClick={() => setIsEditing(false)}
                        className="rounded-lg bg-zinc-850 px-4 py-2 text-xs font-semibold text-zinc-400 hover:text-white transition"
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                ) : (
                  <div className="max-w-md space-y-4 text-xs">
                    <div className="grid grid-cols-3 border-b border-zinc-900 pb-3">
                      <span className="text-zinc-500 font-semibold">Full Name</span>
                      <span className="col-span-2 text-white font-medium">{profile.fullName}</span>
                    </div>
                    <div className="grid grid-cols-3 border-b border-zinc-900 pb-3">
                      <span className="text-zinc-500 font-semibold">Email Address</span>
                      <span className="col-span-2 text-white font-medium">{profile.email}</span>
                    </div>
                    <div className="grid grid-cols-3 border-b border-zinc-900 pb-3">
                      <span className="text-zinc-500 font-semibold">Phone Number</span>
                      <span className="col-span-2 text-white font-medium">{profile.phone}</span>
                    </div>
                    <div className="grid grid-cols-3 pb-3">
                      <span className="text-zinc-500 font-semibold">Security Token</span>
                      <span className="col-span-2 text-zinc-400 font-mono">porto-sess-sha256-auth99x</span>
                    </div>
                  </div>
                )}
              </div>
            )}

          </div>

        </div>

      </div>
    </div>
  );
}
