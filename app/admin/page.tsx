"use client";

import React, { useState, useMemo } from "react";
import { useCart, Order } from "@/lib/cart-context";
import { PRODUCTS, Product } from "@/lib/products";

export default function AdminPage() {
  const { orders, updateOrderStatus } = useCart();
  const [adminProducts, setAdminProducts] = useState<Product[]>([...PRODUCTS]);

  // Product Creator Form States
  const [showAddModal, setShowAddModal] = useState(false);
  const [newProduct, setNewProduct] = useState({
    name: "",
    category: "Audio",
    price: "",
    originalPrice: "",
    description: "",
    stock: "",
  });

  const [formSuccess, setFormSuccess] = useState(false);
  const [activeAdminTab, setActiveAdminTab] = useState("analytics"); // 'analytics' | 'orders' | 'inventory'

  // Dynamic Metrics calculations
  const metrics = useMemo(() => {
    // Baseline constants + current orders totals
    const baselineSales = 340500;
    const currentOrdersTotal = orders.reduce((sum, o) => sum + o.total, 0);
    const totalSales = baselineSales + currentOrdersTotal;

    const totalOrdersCount = 142 + orders.length;
    const conversionRate = "3.84%";
    
    // Count total product reviews in database
    const staticReviewsCount = PRODUCTS.reduce((sum, p) => sum + p.reviews.length, 0);
    const totalReviews = 412 + staticReviewsCount;

    return {
      totalSales,
      totalOrdersCount,
      conversionRate,
      totalReviews,
    };
  }, [orders]);

  // Handle order status dropdown adjustments
  const handleStatusChange = (orderId: string, status: Order["status"]) => {
    updateOrderStatus(orderId, status);
  };

  const handleAddProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (newProduct.name.trim() && newProduct.price && newProduct.stock) {
      const priceNum = Number(newProduct.price);
      const origNum = newProduct.originalPrice ? Number(newProduct.originalPrice) : priceNum * 1.5;
      const stockNum = Number(newProduct.stock);

      const addedProd: Product = {
        id: "prod-" + (adminProducts.length + 1),
        name: newProduct.name,
        category: newProduct.category,
        price: priceNum,
        originalPrice: Math.round(origNum),
        image: "/image-2.png", // Fallback to spot image
        rating: 5.0,
        reviewsCount: 0,
        description: newProduct.description || "Premium high performance workplace equipment upgrades.",
        features: ["Developer certified quality", "Ergonomically customized standard"],
        specifications: {
          "Form Standard": "Esports Quality",
          "Production": "Crafted",
        },
        stock: stockNum,
        inStock: stockNum > 0,
        reviews: [],
      };

      setAdminProducts([addedProd, ...adminProducts]);
      setNewProduct({
        name: "",
        category: "Audio",
        price: "",
        originalPrice: "",
        description: "",
        stock: "",
      });
      setFormSuccess(true);
      setTimeout(() => {
        setFormSuccess(false);
        setShowAddModal(false);
      }, 1500);
    }
  };

  // Simulated Analytics graph vector data (Sales over last 6 months)
  const chartPoints = "10,90 40,75 70,80 100,55 130,45 160,25 190,10";
  const areaPoints = "10,90 40,75 70,80 100,55 130,45 160,25 190,10 190,95 10,95";

  return (
    <div className="min-h-screen bg-zinc-950 text-white bg-grid-pattern py-12">
      
      {/* Product Creator Slide-over Overlay */}
      {showAddModal && (
        <>
          <div className="fixed inset-0 z-40 bg-black/85 backdrop-blur-sm" onClick={() => setShowAddModal(false)} />
          <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 max-w-md w-full rounded-2xl border border-zinc-800 bg-zinc-900 p-6 shadow-2xl animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between border-b border-zinc-800 pb-3 mb-4">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider">Create New Tech Item</h3>
              <button onClick={() => setShowAddModal(false)} className="text-zinc-500 hover:text-white">
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <form onSubmit={handleAddProduct} className="space-y-4">
              <div className="space-y-1">
                <label className="text-[10px] text-zinc-400 uppercase font-semibold">Product Name</label>
                <input
                  type="text"
                  required
                  value={newProduct.name}
                  onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                  placeholder="e.g. Ergonomic Desk Armrest"
                  className="w-full rounded-lg border border-zinc-800 bg-zinc-950 px-3 py-2 text-xs text-white placeholder-zinc-650 focus:border-sky-500 focus:outline-none transition"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] text-zinc-400 uppercase font-semibold">Category</label>
                  <select
                    value={newProduct.category}
                    onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
                    className="w-full rounded-lg border border-zinc-800 bg-zinc-950 px-3 py-2 text-xs text-white focus:border-sky-500 focus:outline-none transition cursor-pointer"
                  >
                    <option>Audio</option>
                    <option>Wearables</option>
                    <option>Inputs</option>
                    <option>Screen</option>
                    <option>Accessories</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] text-zinc-400 uppercase font-semibold">Stock Count</label>
                  <input
                    type="number"
                    required
                    min="0"
                    value={newProduct.stock}
                    onChange={(e) => setNewProduct({ ...newProduct, stock: e.target.value })}
                    placeholder="30"
                    className="w-full rounded-lg border border-zinc-800 bg-zinc-950 px-3 py-2 text-xs text-white placeholder-zinc-650 focus:border-sky-500 focus:outline-none transition"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] text-zinc-400 uppercase font-semibold">Price (INR ₹)</label>
                  <input
                    type="number"
                    required
                    min="1"
                    value={newProduct.price}
                    onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                    placeholder="1999"
                    className="w-full rounded-lg border border-zinc-800 bg-zinc-950 px-3 py-2 text-xs text-white placeholder-zinc-650 focus:border-sky-500 focus:outline-none transition"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] text-zinc-400 uppercase font-semibold">Original Price</label>
                  <input
                    type="number"
                    min="1"
                    value={newProduct.originalPrice}
                    onChange={(e) => setNewProduct({ ...newProduct, originalPrice: e.target.value })}
                    placeholder="2999"
                    className="w-full rounded-lg border border-zinc-800 bg-zinc-950 px-3 py-2 text-xs text-white placeholder-zinc-650 focus:border-sky-500 focus:outline-none transition"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] text-zinc-400 uppercase font-semibold">Description</label>
                <textarea
                  rows={3}
                  value={newProduct.description}
                  onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                  placeholder="Summarize product features and specifications..."
                  className="w-full rounded-lg border border-zinc-800 bg-zinc-950 px-3 py-2 text-xs text-white placeholder-zinc-655 focus:border-sky-500 focus:outline-none transition resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full rounded-xl bg-sky-500 py-2.5 text-xs font-bold text-white hover:bg-sky-400 transition"
              >
                Create Product
              </button>

              {formSuccess && (
                <p className="text-xs text-emerald-400 text-center animate-pulse mt-2">
                  ✓ Success! Tech item injected into local state.
                </p>
              )}
            </form>
          </div>
        </>
      )}

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Page Header */}
        <div className="border-b border-zinc-900 pb-6 mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-black text-white sm:text-4xl">Admin Portal</h1>
            <p className="mt-2 text-sm text-zinc-400">View real-time store performance, orders timeline, and stock inventory.</p>
          </div>

          <div className="flex gap-2">
            {["analytics", "orders", "inventory"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveAdminTab(tab)}
                className={`rounded-full px-5 py-2 text-xs font-semibold border transition-all ${
                  activeAdminTab === tab
                    ? "bg-sky-500 border-sky-500 text-white shadow-lg shadow-sky-500/25"
                    : "bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-white"
                }`}
              >
                {tab === "analytics" ? "Sales Analytics" : tab === "orders" ? "Manage Orders" : "Stock Inventory"}
              </button>
            ))}
          </div>
        </div>

        {/* Live Metrics Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-zinc-900/40 p-5 rounded-2xl border border-zinc-900 backdrop-blur-sm space-y-1">
            <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider">Gross Revenues</span>
            <p className="text-2xl font-black text-white">₹{metrics.totalSales.toLocaleString("en-IN")}</p>
            <span className="text-[9px] text-emerald-400 flex items-center gap-0.5 font-bold">
              ↑ 12.4% <span className="text-zinc-550 font-normal">vs last month</span>
            </span>
          </div>

          <div className="bg-zinc-900/40 p-5 rounded-2xl border border-zinc-900 backdrop-blur-sm space-y-1">
            <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider">Total Sales Count</span>
            <p className="text-2xl font-black text-white">{metrics.totalOrdersCount} <span className="text-xs font-semibold text-zinc-450">orders</span></p>
            <span className="text-[9px] text-sky-400 flex items-center gap-0.5 font-bold">
              + {orders.length} <span className="text-zinc-550 font-normal">active sessions</span>
            </span>
          </div>

          <div className="bg-zinc-900/40 p-5 rounded-2xl border border-zinc-900 backdrop-blur-sm space-y-1">
            <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider">Session Conversions</span>
            <p className="text-2xl font-black text-white">{metrics.conversionRate}</p>
            <span className="text-[9px] text-zinc-500">Benchmark target: 3.5%</span>
          </div>

          <div className="bg-zinc-900/40 p-5 rounded-2xl border border-zinc-900 backdrop-blur-sm space-y-1">
            <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider">Customer Feedback</span>
            <p className="text-2xl font-black text-white">{metrics.totalReviews} <span className="text-xs font-semibold text-zinc-450">reviews</span></p>
            <span className="text-[9px] text-amber-400 flex items-center gap-0.5 font-bold">
              ★ 4.75 <span className="text-zinc-550 font-normal">average stars</span>
            </span>
          </div>
        </div>

        {/* Tab contents */}
        <div className="bg-zinc-900/30 p-6 rounded-2xl border border-zinc-900 backdrop-blur-sm min-h-[350px]">
          
          {/* TAB 1: SALES ANALYTICS GRAPH */}
          {activeAdminTab === "analytics" && (
            <div className="space-y-6 animate-in fade-in duration-300">
              <h2 className="text-sm font-bold text-white uppercase tracking-wider border-b border-zinc-850 pb-2">
                Sales Activity Trends (6 Months)
              </h2>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                
                {/* SVG glowing graph */}
                <div className="lg:col-span-8 bg-zinc-950/80 p-6 rounded-xl border border-zinc-900">
                  <div className="relative h-60 w-full">
                    <svg viewBox="0 0 200 100" className="h-full w-full" preserveAspectRatio="none">
                      {/* Grid lines */}
                      <line x1="0" y1="20" x2="200" y2="20" stroke="#1f2937" strokeWidth="0.25" strokeDasharray="3" />
                      <line x1="0" y1="50" x2="200" y2="50" stroke="#1f2937" strokeWidth="0.25" strokeDasharray="3" />
                      <line x1="0" y1="80" x2="200" y2="80" stroke="#1f2937" strokeWidth="0.25" strokeDasharray="3" />
                      
                      {/* Area Fill Gradient */}
                      <defs>
                        <linearGradient id="glowGrad" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#0ea5e9" stopOpacity="0.3" />
                          <stop offset="100%" stopColor="#0ea5e9" stopOpacity="0.0" />
                        </linearGradient>
                      </defs>
                      <polygon points={areaPoints} fill="url(#glowGrad)" />

                      {/* Spark line vector */}
                      <polyline
                        fill="none"
                        stroke="#0ea5e9"
                        strokeWidth="1.5"
                        points={chartPoints}
                        className="drop-shadow-[0_0_8px_rgba(14,165,233,0.5)]"
                      />
                    </svg>
                    
                    {/* Graph Labels */}
                    <div className="absolute bottom-1 left-0 right-0 flex justify-between px-1 text-[9px] font-bold text-zinc-650">
                      <span>DEC</span>
                      <span>JAN</span>
                      <span>FEB</span>
                      <span>MAR</span>
                      <span>APR</span>
                      <span>MAY (LIVE)</span>
                    </div>
                  </div>
                </div>

                {/* Left metrics details */}
                <div className="lg:col-span-4 space-y-4">
                  <h3 className="text-xs font-bold text-zinc-400 uppercase tracking-wide">Live Stream Feed</h3>
                  <div className="space-y-3">
                    {orders.length === 0 ? (
                      <div className="py-8 text-center text-xs text-zinc-600 bg-zinc-950/40 rounded-lg border border-zinc-900/50">
                        No orders recorded this session yet.
                      </div>
                    ) : (
                      orders.slice(0, 3).map((o) => (
                        <div key={o.id} className="p-3 rounded-lg bg-zinc-950/80 border border-zinc-900 flex justify-between items-center text-xs">
                          <div>
                            <span className="font-bold text-white font-mono">{o.id}</span>
                            <p className="text-[10px] text-zinc-500">{o.shippingInfo.fullName} placed checkout</p>
                          </div>
                          <span className="font-black text-sky-400">₹{o.total.toLocaleString("en-IN")}</span>
                        </div>
                      ))
                    )}
                  </div>
                </div>

              </div>
            </div>
          )}

          {/* TAB 2: ORDERS MANAGER TABLE */}
          {activeAdminTab === "orders" && (
            <div className="space-y-4 animate-in fade-in duration-300">
              <h2 className="text-sm font-bold text-white uppercase tracking-wider border-b border-zinc-850 pb-2">
                Manage Active Customer Orders
              </h2>

              {orders.length === 0 ? (
                <div className="text-center py-16 text-xs text-zinc-500">
                  No customer orders completed this session yet. Complete checkout to populate ledger.
                </div>
              ) : (
                <div className="overflow-x-auto rounded-xl border border-zinc-900">
                  <table className="w-full text-xs text-left border-collapse bg-zinc-950/40">
                    <thead>
                      <tr className="border-b border-zinc-900 bg-zinc-950 font-bold text-zinc-400">
                        <th className="px-4 py-3">Order ID</th>
                        <th className="px-4 py-3">Recipient Node</th>
                        <th className="px-4 py-3">Ordered Items</th>
                        <th className="px-4 py-3">Total Paid</th>
                        <th className="px-4 py-3">Shipment Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-900">
                      {orders.map((order) => (
                        <tr key={order.id} className="hover:bg-zinc-900/30 transition">
                          <td className="px-4 py-3 font-mono font-bold text-white">{order.id}</td>
                          <td className="px-4 py-3">
                            <p className="font-bold text-zinc-200">{order.shippingInfo.fullName}</p>
                            <p className="text-[10px] text-zinc-500">{order.shippingInfo.city}</p>
                          </td>
                          <td className="px-4 py-3 max-w-[200px] truncate">
                            {order.items.map((i) => `${i.product.name} (x${i.quantity})`).join(", ")}
                          </td>
                          <td className="px-4 py-3 font-black text-sky-400">₹{order.total.toLocaleString("en-IN")}</td>
                          <td className="px-4 py-3">
                            <select
                              value={order.status}
                              onChange={(e) => handleStatusChange(order.id, e.target.value as Order["status"])}
                              className="rounded bg-zinc-900 border border-zinc-800 px-2.5 py-1 text-[11px] font-bold text-white focus:outline-none transition cursor-pointer"
                            >
                              <option value="Pending">Pending</option>
                              <option value="Processing">Processing</option>
                              <option value="Shipped">Shipped</option>
                              <option value="Delivered">Delivered</option>
                            </select>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {/* TAB 3: STOCK INVENTORY MANAGER */}
          {activeAdminTab === "inventory" && (
            <div className="space-y-4 animate-in fade-in duration-300">
              <div className="flex justify-between items-center border-b border-zinc-850 pb-2">
                <h2 className="text-sm font-bold text-white uppercase tracking-wider">
                  Workstation Upgrades Inventory
                </h2>
                <button
                  onClick={() => setShowAddModal(true)}
                  className="rounded-lg bg-sky-500 px-4 py-1.5 text-xs font-semibold text-white hover:bg-sky-400 transition"
                >
                  Create New Product
                </button>
              </div>

              <div className="overflow-x-auto rounded-xl border border-zinc-900 bg-zinc-950/40">
                <table className="w-full text-xs text-left border-collapse">
                  <thead>
                    <tr className="border-b border-zinc-900 bg-zinc-950 font-bold text-zinc-400">
                      <th className="px-4 py-3">Product details</th>
                      <th className="px-4 py-3">Category</th>
                      <th className="px-4 py-3">Price</th>
                      <th className="px-4 py-3">Stock Units</th>
                      <th className="px-4 py-3">Stock Level</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-900">
                    {adminProducts.map((p) => {
                      const isLowStock = p.stock <= 10;
                      return (
                        <tr key={p.id} className="hover:bg-zinc-900/30 transition">
                          <td className="px-4 py-3">
                            <p className="font-bold text-white">{p.name}</p>
                            <p className="text-[10px] text-zinc-500">ID: {p.id}</p>
                          </td>
                          <td className="px-4 py-3">
                            <span className="rounded bg-zinc-900 px-2 py-0.5 text-[10px] text-zinc-450 border border-zinc-850">
                              {p.category}
                            </span>
                          </td>
                          <td className="px-4 py-3 font-bold text-sky-400">₹{p.price.toLocaleString("en-IN")}</td>
                          <td className="px-4 py-3 font-semibold">{p.stock} units</td>
                          <td className="px-4 py-3">
                            {p.stock === 0 ? (
                              <span className="text-[10px] text-rose-400 font-bold bg-rose-500/10 px-2 py-0.5 rounded border border-rose-500/20">OUT OF STOCK</span>
                            ) : isLowStock ? (
                              <span className="text-[10px] text-amber-400 font-bold bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">LOW STOCK</span>
                            ) : (
                              <span className="text-[10px] text-emerald-400 font-bold bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">HEALTHY</span>
                            )}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
}
