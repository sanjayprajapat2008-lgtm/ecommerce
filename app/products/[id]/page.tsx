"use client";

import React, { use, useState, useMemo } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { PRODUCTS, Product, Review } from "@/lib/products";
import { useCart } from "@/lib/cart-context";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function ProductDetailPage({ params }: PageProps) {
  const router = useRouter();
  const { id } = use(params);
  const { addToCart, wishlist, toggleWishlist } = useCart();

  // Find product in DB
  const product = useMemo(() => PRODUCTS.find((p) => p.id === id), [id]);

  // Page interactive states
  const [selectedColor, setSelectedColor] = useState("Space Grey");
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState("specs"); // 'specs' | 'reviews'

  // Review states
  const [reviewName, setReviewName] = useState("");
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewComment, setReviewComment] = useState("");
  const [customReviews, setCustomReviews] = useState<Review[]>([]);
  const [reviewSubmitted, setReviewSubmitted] = useState(false);

  if (!product) {
    return (
      <div className="min-h-screen bg-zinc-950 text-white flex flex-col items-center justify-center p-6 text-center">
        <svg className="h-16 w-16 text-zinc-700 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
        <h1 className="text-2xl font-black mb-2">Device Not Found</h1>
        <p className="text-sm text-zinc-500 mb-6 max-w-sm">
          We couldn&apos;t locate the workstation upgrade you requested. It may have been discontinued or sold out.
        </p>
        <Link href="/products" className="rounded-full bg-sky-500 px-6 py-2.5 text-sm font-semibold hover:bg-sky-400 transition">
          Return to Catalog
        </Link>
      </div>
    );
  }

  // Related products
  const relatedProducts = PRODUCTS.filter(
    (p) => p.category === product.category && p.id !== product.id
  ).slice(0, 3);

  const isWishlisted = wishlist.includes(product.id);

  // Combine static reviews from DB + user custom reviews in state
  const allReviews = [...customReviews, ...product.reviews];

  const handleAddReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (reviewName.trim() && reviewComment.trim()) {
      const newRev: Review = {
        id: "custom-" + Date.now(),
        userName: reviewName,
        rating: reviewRating,
        date: new Date().toISOString().split("T")[0],
        comment: reviewComment,
      };

      setCustomReviews([newRev, ...customReviews]);
      setReviewName("");
      setReviewComment("");
      setReviewSubmitted(true);
      setTimeout(() => setReviewSubmitted(false), 5000);
    }
  };

  const handleBuyNow = () => {
    addToCart(product, quantity, selectedColor);
    router.push("/checkout");
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-white bg-grid-pattern py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs text-zinc-500 mb-8">
          <Link href="/" className="hover:text-white transition">Home</Link>
          <span>/</span>
          <Link href="/products" className="hover:text-white transition">Products</Link>
          <span>/</span>
          <Link href={`/products?category=${product.category}`} className="hover:text-white transition">{product.category}</Link>
          <span>/</span>
          <span className="text-zinc-300 truncate max-w-[200px]">{product.name}</span>
        </nav>

        {/* Product Details Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 border-b border-zinc-900 pb-16">
          
          {/* Left - Image Gallery preview */}
          <div className="lg:col-span-6 space-y-4">
            <div className="relative aspect-video sm:aspect-square overflow-hidden rounded-2xl border border-zinc-850 bg-zinc-950 p-4">
              <img
                src={product.image}
                alt={product.name}
                className="h-full w-full object-cover rounded-xl"
              />
              <button
                onClick={() => toggleWishlist(product.id)}
                className="absolute top-6 right-6 rounded-full bg-zinc-950/80 backdrop-blur p-3 text-zinc-400 hover:text-rose-500 border border-zinc-800 hover:scale-110 active:scale-95 transition"
                title={isWishlisted ? "Remove from Wishlist" : "Add to Wishlist"}
              >
                <svg className="h-5 w-5" fill={isWishlisted ? "currentColor" : "none"} viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  />
                </svg>
              </button>
            </div>
            
            {/* Gallery Thumbnails (Simulation) */}
            <div className="grid grid-cols-3 gap-4">
              <div className="aspect-video rounded-xl border border-sky-500/50 bg-zinc-950 overflow-hidden cursor-pointer p-1">
                <img src={product.image} alt="view 1" className="h-full w-full object-cover rounded-lg" />
              </div>
              <div className="aspect-video rounded-xl border border-zinc-850 bg-zinc-950 overflow-hidden hover:border-zinc-700 cursor-pointer p-1 opacity-60 hover:opacity-100 transition">
                <img src={product.image} alt="view 2" className="h-full w-full object-cover rounded-lg scale-x-[-1]" />
              </div>
              <div className="aspect-video rounded-xl border border-zinc-850 bg-zinc-950 overflow-hidden hover:border-zinc-700 cursor-pointer p-1 opacity-60 hover:opacity-100 transition">
                <img src={product.image} alt="view 3" className="h-full w-full object-cover rounded-lg rotate-12" />
              </div>
            </div>
          </div>

          {/* Right - Product configuration & CTA */}
          <div className="lg:col-span-6 space-y-6">
            
            {/* Badge & Stock */}
            <div className="flex items-center justify-between">
              <span className="rounded bg-sky-500/10 px-2.5 py-1 text-xs font-bold text-sky-400 border border-sky-500/25 uppercase tracking-wider">
                {product.category}
              </span>
              <div className="flex items-center gap-2">
                <span className={`h-2.5 w-2.5 rounded-full ${product.inStock ? "bg-emerald-500" : "bg-rose-500"}`} />
                <span className="text-xs text-zinc-400 font-semibold">
                  {product.inStock ? `In Stock (${product.stock} units)` : "Temporarily Sold Out"}
                </span>
              </div>
            </div>

            {/* Title & Rating */}
            <div className="space-y-2">
              <h1 className="text-3xl font-black tracking-tight text-white sm:text-4xl">{product.name}</h1>
              <div className="flex items-center gap-2">
                <div className="flex items-center text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className={`h-4.5 w-4.5 fill-current ${
                        i < Math.floor(product.rating) ? "text-amber-400" : "text-zinc-700"
                      }`}
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <span className="text-sm font-semibold text-white">{product.rating} / 5</span>
                <span className="text-xs text-zinc-500">({allReviews.length} customer reviews)</span>
              </div>
            </div>

            {/* Price block */}
            <div className="bg-zinc-900/40 p-4 rounded-xl border border-zinc-900 flex items-baseline gap-3">
              <span className="text-3xl font-black text-white">₹{product.price.toLocaleString("en-IN")}</span>
              <span className="text-sm text-zinc-500 line-through">₹{product.originalPrice.toLocaleString("en-IN")}</span>
              <span className="text-xs font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                Save ₹{(product.originalPrice - product.price).toLocaleString("en-IN")} ({Math.round(((product.originalPrice - product.price)/product.originalPrice)*100)}% OFF)
              </span>
            </div>

            {/* Description */}
            <p className="text-sm text-zinc-400 leading-relaxed">{product.description}</p>

            {/* Features list */}
            <div className="space-y-2">
              <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-300">Key Features</h3>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-zinc-400">
                {product.features.map((feat, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <svg className="h-4 w-4 text-sky-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Variant picker */}
            <div className="space-y-3 pt-3 border-t border-zinc-900">
              <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-300">Select Finish</h3>
              <div className="flex gap-2">
                {["Space Grey", "Midnight Cobalt", "Liquid Silver"].map((color) => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`rounded-lg border px-4 py-2 text-xs font-semibold transition ${
                      selectedColor === color
                        ? "bg-zinc-800 border-sky-400 text-sky-400"
                        : "bg-zinc-950 border-zinc-800 text-zinc-400 hover:text-white"
                    }`}
                  >
                    {color}
                  </button>
                ))}
              </div>
            </div>

            {/* CTAs */}
            <div className="space-y-4 pt-6">
              <div className="flex items-center gap-4">
                {/* Quantity */}
                <div className="flex items-center border border-zinc-800 rounded-xl bg-zinc-950 px-3 py-2 h-12">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    disabled={!product.inStock}
                    className="px-2 text-zinc-400 hover:text-white font-bold disabled:opacity-50"
                  >
                    -
                  </button>
                  <span className="text-sm font-bold text-white px-4 min-w-[32px] text-center">
                    {product.inStock ? quantity : 0}
                  </span>
                  <button
                    onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                    disabled={!product.inStock}
                    className="px-2 text-zinc-400 hover:text-white font-bold disabled:opacity-50"
                  >
                    +
                  </button>
                </div>

                {/* Add to Cart CTA */}
                <button
                  onClick={() => addToCart(product, quantity, selectedColor)}
                  disabled={!product.inStock}
                  className={`flex-1 h-12 rounded-xl text-sm font-bold flex items-center justify-center gap-2 transition active:scale-[0.98] ${
                    product.inStock
                      ? "border border-sky-500 bg-sky-500/10 text-sky-400 hover:bg-sky-500 hover:text-white btn-glow-sky"
                      : "bg-zinc-900 border border-zinc-850 text-zinc-600 cursor-not-allowed"
                  }`}
                >
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                  </svg>
                  {product.inStock ? "Add to Cart" : "Sold Out"}
                </button>
              </div>

              {/* Buy Now CTA */}
              <button
                onClick={handleBuyNow}
                disabled={!product.inStock}
                className="w-full h-12 rounded-xl bg-gradient-to-r from-sky-400 to-indigo-500 text-sm font-bold text-white hover:brightness-110 transition active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Buy Now
              </button>
            </div>

          </div>

        </div>

        {/* Dynamic Detail Specs & Reviews Tabs */}
        <section className="py-16">
          <div className="flex border-b border-zinc-900 gap-6">
            <button
              onClick={() => setActiveTab("specs")}
              className={`pb-4 text-sm font-bold tracking-wider uppercase border-b-2 transition ${
                activeTab === "specs"
                  ? "border-sky-500 text-sky-400"
                  : "border-transparent text-zinc-400 hover:text-white"
              }`}
            >
              Technical Specifications
            </button>
            <button
              onClick={() => setActiveTab("reviews")}
              className={`pb-4 text-sm font-bold tracking-wider uppercase border-b-2 transition ${
                activeTab === "reviews"
                  ? "border-sky-500 text-sky-400"
                  : "border-transparent text-zinc-400 hover:text-white"
              }`}
            >
              Customer Reviews ({allReviews.length})
            </button>
          </div>

          <div className="mt-8 animate-in fade-in duration-300">
            {/* Specs Panel */}
            {activeTab === "specs" && (
              <div className="max-w-2xl bg-zinc-900/20 rounded-2xl border border-zinc-900 overflow-hidden">
                <table className="w-full text-sm">
                  <tbody className="divide-y divide-zinc-900">
                    {Object.entries(product.specifications).map(([key, value]) => (
                      <tr key={key} className="hover:bg-zinc-900/40 transition">
                        <td className="px-6 py-4 font-semibold text-zinc-400 w-1/3 bg-zinc-900/30">{key}</td>
                        <td className="px-6 py-4 text-white font-medium">{value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {/* Reviews Panel */}
            {activeTab === "reviews" && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                {/* Left - Reviews List */}
                <div className="lg:col-span-7 space-y-6">
                  <div className="divide-y divide-zinc-900">
                    {allReviews.map((rev) => (
                      <div key={rev.id} className="py-6 first:pt-0">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="text-sm font-bold text-white">{rev.userName}</h4>
                          <span className="text-[10px] text-zinc-500">{rev.date}</span>
                        </div>
                        <div className="flex items-center text-amber-400 gap-1 mb-3">
                          {[...Array(5)].map((_, i) => (
                            <svg
                              key={i}
                              className={`h-3.5 w-3.5 fill-current ${
                                i < rev.rating ? "text-amber-400" : "text-zinc-800"
                              }`}
                              viewBox="0 0 20 20"
                            >
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                          ))}
                        </div>
                        <p className="text-xs text-zinc-400 leading-relaxed italic">&quot;{rev.comment}&quot;</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Right - Add review Form */}
                <div className="lg:col-span-5 bg-zinc-900/30 p-6 rounded-2xl border border-zinc-900 backdrop-blur-sm h-fit space-y-4">
                  <h3 className="text-sm font-bold text-white uppercase tracking-wider border-b border-zinc-850 pb-2">
                    Write a Review
                  </h3>
                  
                  <form onSubmit={handleAddReview} className="space-y-4">
                    <div className="space-y-1">
                      <label className="text-xs text-zinc-400 uppercase font-semibold">Your Name</label>
                      <input
                        type="text"
                        required
                        value={reviewName}
                        onChange={(e) => setReviewName(e.target.value)}
                        placeholder="John Doe"
                        className="w-full rounded-lg border border-zinc-800 bg-zinc-950 px-3 py-2 text-xs text-white placeholder-zinc-650 focus:border-sky-500 focus:outline-none transition"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs text-zinc-400 uppercase font-semibold">Rating</label>
                      <div className="flex items-center gap-1.5">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <button
                            key={star}
                            type="button"
                            onClick={() => setReviewRating(star)}
                            className="text-zinc-600 hover:text-amber-400 transition"
                          >
                            <svg
                              className={`h-6 w-6 fill-current ${
                                star <= reviewRating ? "text-amber-400" : "text-zinc-700"
                              }`}
                              viewBox="0 0 20 20"
                            >
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs text-zinc-400 uppercase font-semibold">Comments</label>
                      <textarea
                        required
                        rows={4}
                        value={reviewComment}
                        onChange={(e) => setReviewComment(e.target.value)}
                        placeholder="What did you like or dislike about this workstation upgrade?"
                        className="w-full rounded-lg border border-zinc-800 bg-zinc-950 px-3 py-2 text-xs text-white placeholder-zinc-650 focus:border-sky-500 focus:outline-none transition resize-none"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full rounded-xl bg-sky-500 py-2.5 text-xs font-bold text-white hover:bg-sky-400 transition"
                    >
                      Submit Review
                    </button>
                  </form>
                  
                  {reviewSubmitted && (
                    <p className="text-xs text-emerald-400 text-center animate-pulse mt-2">
                      ✓ Thank you! Your review was successfully appended.
                    </p>
                  )}
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Related Products Grid */}
        {relatedProducts.length > 0 && (
          <section className="border-t border-zinc-900 pt-16">
            <h2 className="text-xl font-black mb-8 text-white">Workstation Recommendations</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {relatedProducts.map((p) => (
                <div
                  key={p.id}
                  className="group relative rounded-xl border border-zinc-850 bg-zinc-900/30 p-4 transition-all duration-300 hover:-translate-y-1.5 hover:border-zinc-700 hover:bg-zinc-900/50"
                >
                  <div className="relative aspect-video rounded-lg overflow-hidden bg-zinc-950 border border-zinc-800">
                    <img src={p.image} alt={p.name} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                  </div>
                  <h3 className="text-sm font-bold text-white group-hover:text-sky-400 transition truncate mt-3">
                    <Link href={`/products/${p.id}`}>{p.name}</Link>
                  </h3>
                  <div className="flex items-center justify-between mt-2 border-t border-zinc-850/50 pt-2">
                    <span className="text-sm font-black text-white">₹{p.price.toLocaleString("en-IN")}</span>
                    <Link href={`/products/${p.id}`} className="text-[10px] font-bold text-sky-400 hover:text-sky-300">
                      View Details &rarr;
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

      </div>
    </div>
  );
}
