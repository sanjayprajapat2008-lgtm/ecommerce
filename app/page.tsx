"use client";

import React, { useState } from "react";
import Link from "next/link";
import { PRODUCTS } from "@/lib/products";
import { useCart } from "@/lib/cart-context";

export default function Home() {
  const { addToCart, wishlist, toggleWishlist } = useCart();
  const [activeCategory, setActiveCategory] = useState("All");

  const categories = ["All", "Audio", "Wearables", "Inputs", "Screen"];

  // Filter products based on active category
  const filteredProducts = activeCategory === "All"
    ? PRODUCTS.slice(0, 3) // Show first 3 featured products
    : PRODUCTS.filter(p => p.category === activeCategory).slice(0, 3);

  // Quick stats
  const stats = [
    { value: "99.4%", label: "Positive Feedback" },
    { value: "24h", label: "Average Dispatch Time" },
    { value: "50k+", label: "Happy Customers" },
    { value: "100%", label: "Secure Payment" }
  ];

  return (
    <div className="relative min-h-screen bg-zinc-950 text-white bg-grid-pattern">
      {/* Decorative Glow */}
      <div className="absolute top-20 left-1/4 -z-10 h-72 w-72 rounded-full bg-sky-500/10 blur-[120px]" />
      <div className="absolute top-80 right-1/4 -z-10 h-96 w-96 rounded-full bg-indigo-500/10 blur-[150px]" />

      {/* Hero Section */}
      <section className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-12 items-center">
          {/* Left Text */}
          <div className="lg:col-span-7 space-y-8 animate-in fade-in slide-in-from-left duration-700">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-sky-500/10 px-3 py-1 text-xs font-semibold text-sky-400 border border-sky-500/20">
              ⚡ NEW SEASON ARRIVALS
            </span>
            <h1 className="text-4xl sm:text-6xl font-black tracking-tight leading-[1.1] text-white">
              Upgrade Your <br />
              <span className="bg-gradient-to-r from-sky-400 via-blue-400 to-indigo-500 bg-clip-text text-transparent glow-text">
                Digital Sandbox
              </span>
            </h1>
            <p className="max-w-xl text-base sm:text-lg text-zinc-400 leading-relaxed">
              Curating high-performance gear, premium accessories, and ergonomically engineered tools to fuel your coding sessions, gaming campaigns, and creative marathons.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              <Link
                href="/products"
                className="btn-glow-sky rounded-xl bg-sky-500 px-8 py-4 text-center text-sm font-bold text-white hover:bg-sky-400 transition"
              >
                EXPLORE CATALOG
              </Link>
              <Link
                href="/admin"
                className="rounded-xl border border-zinc-800 bg-zinc-900/50 px-8 py-4 text-center text-sm font-semibold text-white hover:bg-zinc-850 hover:border-zinc-700 transition"
              >
                ADMIN DASHBOARD
              </Link>
            </div>

            {/* Quick trust metrics */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-6 border-t border-zinc-900">
              {stats.map((stat, i) => (
                <div key={i} className="space-y-1">
                  <p className="text-xl font-bold text-white">{stat.value}</p>
                  <p className="text-xs text-zinc-500">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right Hero Image Panel */}
          <div className="lg:col-span-5 relative overflow-hidden rounded-2xl border border-zinc-850 bg-zinc-900/40 p-6 backdrop-blur animate-in fade-in slide-in-from-right duration-700">
            <div className="relative aspect-square overflow-hidden rounded-xl bg-zinc-950 border border-zinc-800 group">
              <img
                src="/image-2.png"
                alt="QuantumView Curved Monitor"
                className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent opacity-60" />
              <div className="absolute bottom-4 left-4 right-4 bg-zinc-900/80 backdrop-blur-md p-4 rounded-xl border border-zinc-800">
                <span className="text-[10px] font-bold uppercase tracking-widest text-sky-400">SPOTLIGHT PRODUCT</span>
                <h3 className="text-sm font-bold text-white mt-1">QuantumView 34&quot; Curved Monitor</h3>
                <div className="flex items-center justify-between mt-3">
                  <span className="text-sm font-black text-sky-400">₹24,999</span>
                  <Link
                    href="/products/prod-4"
                    className="text-xs font-semibold text-zinc-300 hover:text-white flex items-center gap-1 transition"
                  >
                    View Details
                    <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Banner Stats */}
      <section className="bg-zinc-900/30 border-y border-zinc-900 py-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="space-y-2">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-sky-500/10 text-sky-400">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-sm font-semibold text-white">Genuine Tech Guarantees</h3>
              <p className="text-xs text-zinc-500">100% authentic devices & components</p>
            </div>
            <div className="space-y-2">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-500/10 text-indigo-400">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
              </div>
              <h3 className="text-sm font-semibold text-white">Free Express Shipping</h3>
              <p className="text-xs text-zinc-500">On all purchase carts above ₹5,000</p>
            </div>
            <div className="space-y-2">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-sky-500/10 text-sky-400">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 4v5h.582m15.356 2A8.001 8.001 0 1121.21 7.89M9 11l3 3L22 4" />
                </svg>
              </div>
              <h3 className="text-sm font-semibold text-white">30-Day No-Hassle Return</h3>
              <p className="text-xs text-zinc-500">Fast self-service refunds & swaps</p>
            </div>
            <div className="space-y-2">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-500/10 text-indigo-400">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h3 className="text-sm font-semibold text-white">Ultra-Secure Encryption</h3>
              <p className="text-xs text-zinc-500">Certified payment gateway safety</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Shop Categories & Dynamic Product Grid */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="mb-10 flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-widest text-sky-400">CURATED SELECTION</span>
            <h2 className="text-3xl font-black text-white">Trending Pro Gear</h2>
          </div>

          {/* Category Selector Tabs */}
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`rounded-full px-5 py-2 text-xs font-semibold border transition-all ${
                  activeCategory === cat
                    ? "bg-sky-500 border-sky-500 text-white shadow-lg shadow-sky-500/25"
                    : "bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-700"
                }`}
              >
                {cat === "All" ? "Featured All" : cat}
              </button>
            ))}
          </div>
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredProducts.map((product) => {
            const isWishlisted = wishlist.includes(product.id);
            return (
              <div
                key={product.id}
                className="group relative flex flex-col overflow-hidden rounded-2xl border border-zinc-850 bg-zinc-900/30 p-4 transition-all duration-300 hover:-translate-y-1.5 hover:border-zinc-700 hover:bg-zinc-900/50 backdrop-blur-md"
              >
                {/* Image panel */}
                <div className="relative aspect-video w-full overflow-hidden rounded-xl bg-zinc-950 border border-zinc-800/50">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  {/* Category Chip */}
                  <span className="absolute top-3 left-3 rounded-md bg-zinc-950/85 backdrop-blur-sm px-2.5 py-1 text-[10px] font-bold text-zinc-300 border border-zinc-800">
                    {product.category}
                  </span>

                  {/* Wishlist Button */}
                  <button
                    onClick={() => toggleWishlist(product.id)}
                    className="absolute top-3 right-3 rounded-full bg-zinc-950/85 backdrop-blur-sm p-2 text-zinc-400 hover:text-rose-500 border border-zinc-800 hover:scale-110 active:scale-95 transition"
                    title={isWishlisted ? "Remove from Wishlist" : "Add to Wishlist"}
                  >
                    <svg className="h-4 w-4" fill={isWishlisted ? "currentColor" : "none"} viewBox="0 0 24 24" stroke="currentColor">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                        className={isWishlisted ? "text-rose-500" : ""}
                      />
                    </svg>
                  </button>
                </div>

                {/* Body details */}
                <div className="flex-1 flex flex-col mt-4">
                  {/* Rating */}
                  <div className="flex items-center gap-1 text-amber-400">
                    <svg className="h-4 w-4 fill-current" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    <span className="text-xs font-semibold text-white">{product.rating}</span>
                    <span className="text-[10px] text-zinc-500">({product.reviewsCount})</span>
                  </div>

                  <h3 className="mt-2 text-base font-bold text-white group-hover:text-sky-400 transition truncate">
                    <Link href={`/products/${product.id}`}>
                      {product.name}
                    </Link>
                  </h3>
                  <p className="mt-1 text-xs text-zinc-400 line-clamp-2 leading-relaxed flex-1">
                    {product.description}
                  </p>

                  <div className="mt-4 flex items-center justify-between border-t border-zinc-850 pt-4">
                    <div className="flex items-baseline gap-1.5">
                      <span className="text-lg font-black text-white">₹{product.price.toLocaleString("en-IN")}</span>
                      <span className="text-xs text-zinc-500 line-through">₹{product.originalPrice.toLocaleString("en-IN")}</span>
                    </div>

                    <button
                      onClick={() => addToCart(product, 1)}
                      className="rounded-lg bg-sky-500/10 border border-sky-500/25 px-3 py-1.5 text-xs font-bold text-sky-400 hover:bg-sky-500 hover:text-white transition active:scale-95 flex items-center gap-1"
                    >
                      <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
                      </svg>
                      Add
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* View All Button */}
        <div className="mt-12 text-center">
          <Link
            href="/products"
            className="inline-flex items-center gap-2 rounded-full border border-zinc-800 bg-zinc-900/30 px-6 py-3 text-sm font-semibold text-white hover:bg-zinc-850 transition-all hover:scale-105"
          >
            Browse Full Catalog
            <svg className="h-4 w-4 text-sky-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </section>

      {/* Immersive Testimonials Section */}
      <section className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 border-t border-zinc-900">
        <div className="text-center space-y-2 mb-12">
          <span className="text-xs font-bold uppercase tracking-widest text-sky-400">USER EXPERIENCES</span>
          <h2 className="text-3xl font-black text-white">Vouched by Builders</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="glass-panel rounded-2xl p-6 flex flex-col justify-between space-y-6">
            <p className="text-sm text-zinc-300 italic leading-relaxed">
              &quot;The AcousticMax headphones changed the way I work. The active noise cancelling completely blocks the office noise, allowing me to focus on complex algorithm structures.&quot;
            </p>
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-gradient-to-tr from-sky-400 to-indigo-500 flex items-center justify-center font-bold text-white text-sm">
                MK
              </div>
              <div>
                <h4 className="text-xs font-bold text-white">Manoj Kumar</h4>
                <p className="text-[10px] text-zinc-500">Lead Architect at FinTech</p>
              </div>
            </div>
          </div>

          <div className="glass-panel rounded-2xl p-6 flex flex-col justify-between space-y-6">
            <p className="text-sm text-zinc-300 italic leading-relaxed">
              &quot;I am extremely picky about keyboard layouts and switch latency. The HyperStrike keyboard is unbelievably smooth out of the box and matches my premium desk setup beautifully.&quot;
            </p>
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-gradient-to-tr from-emerald-400 to-teal-500 flex items-center justify-center font-bold text-white text-sm">
                SD
              </div>
              <div>
                <h4 className="text-xs font-bold text-white">Sarah D&apos;souza</h4>
                <p className="text-[10px] text-zinc-500">Professional UI Designer</p>
              </div>
            </div>
          </div>

          <div className="glass-panel rounded-2xl p-6 flex flex-col justify-between space-y-6">
            <p className="text-sm text-zinc-300 italic leading-relaxed">
              &quot;Fast delivery, secure packaging, and outstanding support. When my curved monitor had a shipping delay query, their support was incredibly quick and helpful! Highly recommend Porto.&quot;
            </p>
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-gradient-to-tr from-amber-400 to-rose-500 flex items-center justify-center font-bold text-white text-sm">
                AB
              </div>
              <div>
                <h4 className="text-xs font-bold text-white">Anirudh Bose</h4>
                <p className="text-[10px] text-zinc-500">Competitive FPS Esports Player</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Coupon Promotion Banner */}
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl border border-sky-500/20 bg-gradient-to-r from-zinc-900 via-sky-950/20 to-zinc-900 px-6 py-12 sm:px-12 text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-6 backdrop-blur">
          <div className="space-y-2">
            <span className="text-xs font-bold text-sky-400 uppercase tracking-wider">EXCLUSIVE FLASH COUPON</span>
            <h2 className="text-2xl sm:text-3xl font-black text-white">Save 20% on Your Upgrades</h2>
            <p className="text-sm text-zinc-400 max-w-lg">
              Apply coupon code <span className="font-mono text-white font-bold bg-zinc-800 px-1.5 py-0.5 rounded border border-zinc-700">ANTIGRAVITY</span> at checkout page to unlock instant savings.
            </p>
          </div>
          <Link
            href="/products"
            className="btn-glow-sky rounded-xl bg-sky-500 px-6 py-3 text-sm font-bold text-white hover:bg-sky-400 transition"
          >
            CLAIM NOW
          </Link>
        </div>
      </section>
    </div>
  );
}