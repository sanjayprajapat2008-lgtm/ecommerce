"use client";

import React, { useState, useMemo, useEffect, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { PRODUCTS, Product } from "@/lib/products";
import { useCart } from "@/lib/cart-context";

export default function ProductsPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-zinc-950 text-white flex items-center justify-center">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-sky-500/10 border-t-sky-500" />
      </div>
    }>
      <ProductsContent />
    </Suspense>
  );
}

function ProductsContent() {
  const searchParams = useSearchParams();
  const { addToCart, wishlist, toggleWishlist } = useCart();


  // URL query params logic
  const initialCategory = searchParams.get("category") || "All";

  // Filter States
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [maxPrice, setMaxPrice] = useState(30000);
  const [sortBy, setSortBy] = useState("recommended");
  const [inStockOnly, setInStockOnly] = useState(false);

  // Sync category filter if URL param changes
  useEffect(() => {
    const cat = searchParams.get("category");
    if (cat) {
      setSelectedCategory(cat);
    }
  }, [searchParams]);

  // Categories list
  const categories = ["All", "Audio", "Wearables", "Inputs", "Screen", "Accessories"];

  // Filter and Sort calculation
  const filteredProducts = useMemo(() => {
    let result = [...PRODUCTS];

    // Search Filter
    if (searchTerm.trim() !== "") {
      const term = searchTerm.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(term) ||
          p.description.toLowerCase().includes(term) ||
          p.category.toLowerCase().includes(term)
      );
    }

    // Category Filter
    if (selectedCategory !== "All") {
      result = result.filter((p) => p.category === selectedCategory);
    }

    // Price Filter
    result = result.filter((p) => p.price <= maxPrice);

    // Stock Filter
    if (inStockOnly) {
      result = result.filter((p) => p.inStock);
    }

    // Sorting
    if (sortBy === "price-asc") {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === "price-desc") {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === "rating") {
      result.sort((a, b) => b.rating - a.rating);
    } else if (sortBy === "name") {
      result.sort((a, b) => a.name.localeCompare(b.name));
    }

    return result;
  }, [searchTerm, selectedCategory, maxPrice, sortBy, inStockOnly]);

  const handleResetFilters = () => {
    setSearchTerm("");
    setSelectedCategory("All");
    setMaxPrice(30000);
    setSortBy("recommended");
    setInStockOnly(false);
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-white bg-grid-pattern py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Page Header */}
        <div className="border-b border-zinc-900 pb-6 mb-8">
          <h1 className="text-3xl font-black text-white sm:text-4xl">Tech Catalog</h1>
          <p className="mt-2 text-sm text-zinc-400">
            Browse through our premium selection of developer-approved workstation gear.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* Sidebar Filters - Desktop */}
          <div className="lg:col-span-1 space-y-6 bg-zinc-900/40 p-6 rounded-2xl border border-zinc-900 backdrop-blur-sm h-fit">
            <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider">Filters</h3>
              <button
                onClick={handleResetFilters}
                className="text-xs text-sky-400 hover:text-sky-300 transition"
              >
                Clear All
              </button>
            </div>

            {/* Search Input */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-zinc-400 uppercase">Search</label>
              <div className="relative">
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Headphones, watch, screen..."
                  className="w-full rounded-lg border border-zinc-800 bg-zinc-950 px-3 py-2 text-xs text-white placeholder-zinc-600 focus:border-sky-500 focus:outline-none transition"
                />
                {searchTerm && (
                  <button
                    onClick={() => setSearchTerm("")}
                    className="absolute right-2.5 top-2.5 text-zinc-500 hover:text-white"
                  >
                    ×
                  </button>
                )}
              </div>
            </div>

            {/* Categories */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-zinc-400 uppercase">Categories</label>
              <div className="space-y-1">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`w-full flex items-center justify-between rounded-lg px-3 py-2 text-xs text-left transition ${
                      selectedCategory === cat
                        ? "bg-zinc-800 text-sky-400 font-bold"
                        : "text-zinc-400 hover:bg-zinc-900 hover:text-white"
                    }`}
                  >
                    <span>{cat}</span>
                    <span className="text-[10px] bg-zinc-950 px-1.5 py-0.5 rounded text-zinc-500 font-normal">
                      {cat === "All"
                        ? PRODUCTS.length
                        : PRODUCTS.filter((p) => p.category === cat).length}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Price Slider */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-xs font-semibold text-zinc-400 uppercase">Max Price</label>
                <span className="text-xs font-bold text-sky-400">₹{maxPrice.toLocaleString("en-IN")}</span>
              </div>
              <input
                type="range"
                min="500"
                max="30000"
                step="500"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-full accent-sky-500 cursor-pointer bg-zinc-800 rounded-lg appearance-none h-1"
              />
              <div className="flex items-center justify-between text-[10px] text-zinc-500">
                <span>₹500</span>
                <span>₹30,000+</span>
              </div>
            </div>

            {/* Availability */}
            <div className="space-y-2 border-t border-zinc-800/50 pt-4">
              <label className="flex items-center gap-2 cursor-pointer text-xs text-zinc-400 hover:text-white transition">
                <input
                  type="checkbox"
                  checked={inStockOnly}
                  onChange={(e) => setInStockOnly(e.target.checked)}
                  className="rounded border-zinc-800 text-sky-500 focus:ring-0 cursor-pointer h-4 w-4 bg-zinc-950"
                />
                <span>In Stock Only</span>
              </label>
            </div>
          </div>

          {/* Product Listing Section */}
          <div className="lg:col-span-3 space-y-6">
            
            {/* Top Sort Panel */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-zinc-900/30 p-4 rounded-xl border border-zinc-900 backdrop-blur-sm">
              <p className="text-xs text-zinc-400">
                Showing <span className="font-bold text-white">{filteredProducts.length}</span> of{" "}
                <span className="font-bold text-white">{PRODUCTS.length}</span> items
              </p>
              
              <div className="flex items-center gap-2">
                <span className="text-xs text-zinc-400">Sort by:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="rounded-lg border border-zinc-800 bg-zinc-950 px-3 py-1.5 text-xs text-white focus:border-sky-500 focus:outline-none transition cursor-pointer"
                >
                  <option value="recommended">Featured Recommended</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="rating">Highest Rated</option>
                  <option value="name">Alphabetical</option>
                </select>
              </div>
            </div>

            {/* No Products Found */}
            {filteredProducts.length === 0 && (
              <div className="text-center py-20 bg-zinc-900/10 rounded-2xl border border-dashed border-zinc-850 p-6">
                <svg className="mx-auto h-12 w-12 text-zinc-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <h3 className="mt-4 text-sm font-bold text-white">No Products Found</h3>
                <p className="mt-2 text-xs text-zinc-500 max-w-sm mx-auto leading-relaxed">
                  We couldn&apos;t find any devices matching your filters. Try search adjustments or resetting filters.
                </p>
                <button
                  onClick={handleResetFilters}
                  className="mt-6 rounded-full bg-sky-500 px-6 py-2 text-xs font-semibold text-white hover:bg-sky-400 transition"
                >
                  Reset All Filters
                </button>
              </div>
            )}

            {/* Product Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 animate-in fade-in duration-300">
              {filteredProducts.map((product) => {
                const isWishlisted = wishlist.includes(product.id);
                return (
                  <div
                    key={product.id}
                    className="group relative flex flex-col overflow-hidden rounded-2xl border border-zinc-850 bg-zinc-900/30 p-4 transition-all duration-300 hover:-translate-y-1.5 hover:border-zinc-700 hover:bg-zinc-900/50 backdrop-blur-md"
                  >
                    {/* Image Area */}
                    <div className="relative aspect-video w-full overflow-hidden rounded-xl bg-zinc-950 border border-zinc-800/50">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <span className="absolute top-3 left-3 rounded-md bg-zinc-950/85 backdrop-blur-sm px-2.5 py-1 text-[10px] font-bold text-zinc-300 border border-zinc-800">
                        {product.category}
                      </span>
                      
                      {/* Stock Warning */}
                      {product.stock <= 10 && product.inStock && (
                        <span className="absolute bottom-2 left-2 rounded bg-amber-500/10 backdrop-blur-sm border border-amber-500/25 px-1.5 py-0.5 text-[9px] font-bold text-amber-400">
                          Only {product.stock} left!
                        </span>
                      )}

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

                    {/* Details Area */}
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
                          <span className="text-base font-black text-white">₹{product.price.toLocaleString("en-IN")}</span>
                          <span className="text-[10px] text-zinc-500 line-through">₹{product.originalPrice.toLocaleString("en-IN")}</span>
                        </div>

                        <button
                          onClick={() => addToCart(product, 1)}
                          disabled={!product.inStock}
                          className={`rounded-lg px-3 py-1.5 text-xs font-bold transition active:scale-95 flex items-center gap-1 ${
                            product.inStock
                              ? "bg-sky-500/10 border border-sky-500/25 text-sky-400 hover:bg-sky-500 hover:text-white"
                              : "bg-zinc-900 border border-zinc-800 text-zinc-600 cursor-not-allowed"
                          }`}
                        >
                          {product.inStock ? (
                            <>
                              <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
                              </svg>
                              Add
                            </>
                          ) : (
                            "Sold Out"
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
