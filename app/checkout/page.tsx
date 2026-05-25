"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCart } from "@/lib/cart-context";

export default function CheckoutPage() {
  const router = useRouter();
  const { cart, appliedCoupon, placeOrder } = useCart();

  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
  const subtotal = cart.reduce((total, item) => total + item.product.price * item.quantity, 0);

  // Financial calculations
  const discountPercent = appliedCoupon ? appliedCoupon.discountPercent : 0;
  const discount = Math.round(subtotal * (discountPercent / 100));
  const shipping = subtotal > 5000 || subtotal === 0 ? 0 : 250;
  const taxesEstimate = Math.round((subtotal - discount) * 0.18);
  const grandTotal = subtotal - discount + shipping + taxesEstimate;

  // Checkout State
  const [step, setStep] = useState(1); // 1: Shipping, 2: Payment, 3: Confirm
  const [isProcessing, setIsProcessing] = useState(false);
  const [consoleLogs, setConsoleLogs] = useState<string[]>([]);

  // Shipping Form Data
  const [shippingInfo, setShippingInfo] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    zipCode: "",
  });

  // Payment Form Data
  const [paymentMethod, setPaymentMethod] = useState("Credit Card");
  const [cardInfo, setCardInfo] = useState({
    cardNumber: "",
    expiry: "",
    cvv: "",
  });
  const [upiId, setUpiId] = useState("");

  if (cart.length === 0 && !isProcessing) {
    return (
      <div className="min-h-screen bg-zinc-950 text-white flex flex-col items-center justify-center p-6 text-center">
        <svg className="h-16 w-16 text-zinc-700 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
        </svg>
        <h1 className="text-2xl font-black mb-2">Cart is Empty</h1>
        <p className="text-sm text-zinc-500 mb-6 max-w-sm">
          You need items in your cart to proceed to the checkout terminal.
        </p>
        <Link href="/products" className="rounded-full bg-sky-500 px-6 py-2.5 text-sm font-semibold hover:bg-sky-400 transition">
          Return to Products
        </Link>
      </div>
    );
  }

  const handleShippingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(2);
  };

  const handlePaymentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(3);
  };

  const addTelemetryLog = (log: string, delay: number) => {
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        setConsoleLogs((prev) => [...prev, log]);
        resolve();
      }, delay);
    });
  };

  const handlePlaceOrder = async () => {
    setIsProcessing(true);
    setConsoleLogs([]);

    // Tech processing simulation logs
    await addTelemetryLog("Initializing secure handshake protocols...", 200);
    await addTelemetryLog("Connecting with Porto payment gateway node...", 400);
    await addTelemetryLog(`Encrypting transaction payload with AES-256 (Hash: ${Math.random().toString(16).substr(2, 8)})...`, 300);
    await addTelemetryLog("Validating billing and shipping signatures...", 450);
    await addTelemetryLog("Processing transaction ledger records...", 500);
    await addTelemetryLog("Order successfully recorded! Dispatching confirmation hook...", 400);

    setTimeout(() => {
      // Place actual order in context
      const newOrder = placeOrder(shippingInfo, paymentMethod);
      setIsProcessing(false);
      // Redirect
      router.push(`/order-success?orderId=${newOrder.id}`);
    }, 2800);
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-white bg-grid-pattern py-12">
      
      {/* Checkout Terminal Loading Overlay */}
      {isProcessing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-zinc-950/95 backdrop-blur-md p-6">
          <div className="max-w-md w-full rounded-2xl border border-sky-500/20 bg-zinc-900/60 p-6 shadow-2xl backdrop-blur space-y-6">
            <div className="flex flex-col items-center text-center">
              {/* Spinner */}
              <div className="h-10 w-10 animate-spin rounded-full border-4 border-sky-500/10 border-t-sky-500" />
              <h3 className="mt-4 text-base font-bold text-white uppercase tracking-wider">Securing Transaction</h3>
              <p className="text-xs text-zinc-500 mt-1">Please do not refresh the page or click back.</p>
            </div>

            {/* Terminal Logging box */}
            <div className="rounded-lg bg-black/90 p-4 border border-zinc-800 font-mono text-[10px] text-sky-400 h-40 overflow-y-auto space-y-1.5 scrollbar-thin scrollbar-thumb-zinc-800">
              {consoleLogs.map((log, idx) => (
                <div key={idx} className="flex gap-1.5 leading-relaxed items-start">
                  <span className="text-zinc-600 select-none">&gt;</span>
                  <span>{log}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Stepper indicator header */}
        <div className="border-b border-zinc-900 pb-6 mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div>
            <h1 className="text-3xl font-black text-white sm:text-4xl">Secure Checkout</h1>
            <p className="mt-2 text-sm text-zinc-400">Complete the transaction form in our encrypted gateway.</p>
          </div>

          {/* Checkout Steps Stepper */}
          <div className="flex items-center gap-2 select-none self-start md:self-center">
            <span className={`rounded-full flex h-6 w-6 items-center justify-center text-xs font-bold ${
              step >= 1 ? "bg-sky-500 text-white font-bold" : "bg-zinc-900 text-zinc-600"
            }`}>1</span>
            <span className="text-xs font-semibold text-zinc-500">Shipping</span>
            <span className="h-px w-6 bg-zinc-800" />
            <span className={`rounded-full flex h-6 w-6 items-center justify-center text-xs font-bold ${
              step >= 2 ? "bg-sky-500 text-white font-bold" : "bg-zinc-900 text-zinc-600"
            }`}>2</span>
            <span className="text-xs font-semibold text-zinc-500">Payment</span>
            <span className="h-px w-6 bg-zinc-800" />
            <span className={`rounded-full flex h-6 w-6 items-center justify-center text-xs font-bold ${
              step >= 3 ? "bg-sky-500 text-white font-bold" : "bg-zinc-900 text-zinc-600"
            }`}>3</span>
            <span className="text-xs font-semibold text-zinc-500">Confirm</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Main Checkout Form Left Side */}
          <div className="lg:col-span-8 bg-zinc-900/30 p-6 rounded-2xl border border-zinc-900 backdrop-blur-sm">
            
            {/* STEP 1: SHIPPING DETAILS FORM */}
            {step === 1 && (
              <form onSubmit={handleShippingSubmit} className="space-y-6 animate-in fade-in duration-300">
                <h2 className="text-base font-bold text-white uppercase tracking-wider border-b border-zinc-850 pb-2">
                  1. Shipping Information
                </h2>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs text-zinc-400 uppercase font-semibold">Full Name</label>
                    <input
                      type="text"
                      required
                      value={shippingInfo.fullName}
                      onChange={(e) => setShippingInfo({ ...shippingInfo, fullName: e.target.value })}
                      placeholder="Sanjay Sharma"
                      className="w-full rounded-lg border border-zinc-800 bg-zinc-950 px-3 py-2 text-xs text-white placeholder-zinc-650 focus:border-sky-500 focus:outline-none transition"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs text-zinc-400 uppercase font-semibold">Email Address</label>
                    <input
                      type="email"
                      required
                      value={shippingInfo.email}
                      onChange={(e) => setShippingInfo({ ...shippingInfo, email: e.target.value })}
                      placeholder="sanjay@example.com"
                      className="w-full rounded-lg border border-zinc-800 bg-zinc-950 px-3 py-2 text-xs text-white placeholder-zinc-655 focus:border-sky-500 focus:outline-none transition"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs text-zinc-400 uppercase font-semibold">Phone Number</label>
                    <input
                      type="tel"
                      required
                      value={shippingInfo.phone}
                      onChange={(e) => setShippingInfo({ ...shippingInfo, phone: e.target.value })}
                      placeholder="+91 98765 43210"
                      className="w-full rounded-lg border border-zinc-800 bg-zinc-950 px-3 py-2 text-xs text-white placeholder-zinc-655 focus:border-sky-500 focus:outline-none transition"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs text-zinc-400 uppercase font-semibold">Zip Code</label>
                    <input
                      type="text"
                      required
                      value={shippingInfo.zipCode}
                      onChange={(e) => setShippingInfo({ ...shippingInfo, zipCode: e.target.value })}
                      placeholder="400001"
                      className="w-full rounded-lg border border-zinc-800 bg-zinc-950 px-3 py-2 text-xs text-white placeholder-zinc-655 focus:border-sky-500 focus:outline-none transition"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs text-zinc-400 uppercase font-semibold">Street Address</label>
                  <input
                    type="text"
                    required
                    value={shippingInfo.address}
                    onChange={(e) => setShippingInfo({ ...shippingInfo, address: e.target.value })}
                    placeholder="Apartment 4B, Sky Heights, Sector 15"
                    className="w-full rounded-lg border border-zinc-800 bg-zinc-950 px-3 py-2 text-xs text-white placeholder-zinc-655 focus:border-sky-500 focus:outline-none transition"
                  />
                </div>

                <div className="space-y-1 col-span-2">
                  <label className="text-xs text-zinc-400 uppercase font-semibold">City / Region</label>
                  <input
                    type="text"
                    required
                    value={shippingInfo.city}
                    onChange={(e) => setShippingInfo({ ...shippingInfo, city: e.target.value })}
                    placeholder="Mumbai, Maharashtra"
                    className="w-full rounded-lg border border-zinc-800 bg-zinc-950 px-3 py-2 text-xs text-white placeholder-zinc-655 focus:border-sky-500 focus:outline-none transition"
                  />
                </div>

                <div className="pt-4 border-t border-zinc-900 flex justify-end">
                  <button
                    type="submit"
                    className="rounded-xl bg-sky-500 px-6 py-2.5 text-xs font-bold text-white hover:bg-sky-400 transition"
                  >
                    Proceed to Payment Details &rarr;
                  </button>
                </div>
              </form>
            )}

            {/* STEP 2: PAYMENT METHODS FORM */}
            {step === 2 && (
              <form onSubmit={handlePaymentSubmit} className="space-y-6 animate-in fade-in duration-300">
                <div className="flex items-center justify-between border-b border-zinc-850 pb-2">
                  <h2 className="text-base font-bold text-white uppercase tracking-wider">
                    2. Choose Payment Method
                  </h2>
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="text-xs text-zinc-400 hover:text-white"
                  >
                    Edit Shipping &larr;
                  </button>
                </div>

                {/* Mode Selectors */}
                <div className="grid grid-cols-3 gap-4">
                  {["Credit Card", "UPI Terminal", "Net Banking"].map((method) => (
                    <button
                      key={method}
                      type="button"
                      onClick={() => setPaymentMethod(method)}
                      className={`rounded-xl border p-4 text-center space-y-1.5 transition ${
                        paymentMethod === method
                          ? "bg-zinc-950 border-sky-400 text-sky-400"
                          : "bg-zinc-950 border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-700"
                      }`}
                    >
                      <span className="block text-xs font-bold">{method}</span>
                    </button>
                  ))}
                </div>

                {/* Sub Forms */}
                {paymentMethod === "Credit Card" && (
                  <div className="space-y-4 pt-2">
                    <div className="space-y-1">
                      <label className="text-xs text-zinc-400 uppercase font-semibold">Card Number</label>
                      <input
                        type="text"
                        required
                        value={cardInfo.cardNumber}
                        onChange={(e) => setCardInfo({ ...cardInfo, cardNumber: e.target.value })}
                        placeholder="4111 2222 3333 4444"
                        className="w-full rounded-lg border border-zinc-800 bg-zinc-950 px-3 py-2 text-xs text-white placeholder-zinc-655 focus:border-sky-500 focus:outline-none transition"
                      />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="text-xs text-zinc-400 uppercase font-semibold">Expiry Date</label>
                        <input
                          type="text"
                          required
                          value={cardInfo.expiry}
                          onChange={(e) => setCardInfo({ ...cardInfo, expiry: e.target.value })}
                          placeholder="MM/YY"
                          className="w-full rounded-lg border border-zinc-800 bg-zinc-950 px-3 py-2 text-xs text-white placeholder-zinc-655 focus:border-sky-500 focus:outline-none transition"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-xs text-zinc-400 uppercase font-semibold">CVV</label>
                        <input
                          type="password"
                          maxLength={3}
                          required
                          value={cardInfo.cvv}
                          onChange={(e) => setCardInfo({ ...cardInfo, cvv: e.target.value })}
                          placeholder="123"
                          className="w-full rounded-lg border border-zinc-800 bg-zinc-950 px-3 py-2 text-xs text-white placeholder-zinc-655 focus:border-sky-500 focus:outline-none transition"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {paymentMethod === "UPI Terminal" && (
                  <div className="space-y-4 pt-2">
                    <div className="space-y-1">
                      <label className="text-xs text-zinc-400 uppercase font-semibold">UPI Virtual ID</label>
                      <input
                        type="text"
                        required
                        value={upiId}
                        onChange={(e) => setUpiId(e.target.value)}
                        placeholder="sanjay@oksbi"
                        className="w-full rounded-lg border border-zinc-800 bg-zinc-950 px-3 py-2 text-xs text-white placeholder-zinc-655 focus:border-sky-500 focus:outline-none transition"
                      />
                    </div>
                  </div>
                )}

                {paymentMethod === "Net Banking" && (
                  <div className="space-y-4 pt-2">
                    <div className="space-y-1">
                      <label className="text-xs text-zinc-400 uppercase font-semibold">Choose Preferred Bank</label>
                      <select className="w-full rounded-lg border border-zinc-800 bg-zinc-950 px-3 py-2 text-xs text-white focus:border-sky-500 focus:outline-none transition">
                        <option>State Bank of India (SBI)</option>
                        <option>HDFC Bank</option>
                        <option>ICICI Bank</option>
                        <option>Axis Bank</option>
                      </select>
                    </div>
                  </div>
                )}

                <div className="pt-4 border-t border-zinc-900 flex justify-end">
                  <button
                    type="submit"
                    className="rounded-xl bg-sky-500 px-6 py-2.5 text-xs font-bold text-white hover:bg-sky-400 transition"
                  >
                    Proceed to Review Summary &rarr;
                  </button>
                </div>
              </form>
            )}

            {/* STEP 3: REVIEW & PLACE ORDER */}
            {step === 3 && (
              <div className="space-y-6 animate-in fade-in duration-300">
                <div className="flex items-center justify-between border-b border-zinc-850 pb-2">
                  <h2 className="text-base font-bold text-white uppercase tracking-wider">
                    3. Review Order & Placements
                  </h2>
                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    className="text-xs text-zinc-400 hover:text-white"
                  >
                    Edit Payment &larr;
                  </button>
                </div>

                {/* Info grids */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 bg-zinc-950/60 p-4 rounded-xl border border-zinc-850">
                  <div>
                    <h3 className="text-xs font-bold text-zinc-500 uppercase tracking-wide">Shipping Address</h3>
                    <p className="text-xs font-bold text-white mt-1.5">{shippingInfo.fullName}</p>
                    <p className="text-xs text-zinc-400 mt-1">{shippingInfo.address}, {shippingInfo.city} - {shippingInfo.zipCode}</p>
                    <p className="text-xs text-zinc-450 mt-1">{shippingInfo.phone} | {shippingInfo.email}</p>
                  </div>
                  <div>
                    <h3 className="text-xs font-bold text-zinc-500 uppercase tracking-wide">Payment Method</h3>
                    <p className="text-xs font-bold text-sky-400 mt-1.5 uppercase">{paymentMethod}</p>
                    <p className="text-xs text-zinc-500 mt-1">Transaction status: Pending validation authorization</p>
                  </div>
                </div>

                {/* Items preview list */}
                <div className="space-y-2">
                  <h3 className="text-xs font-bold text-zinc-400 uppercase tracking-wider">Purchasing Items</h3>
                  <div className="divide-y divide-zinc-900 border border-zinc-900 rounded-xl overflow-hidden bg-zinc-950/40">
                    {cart.map((item) => (
                      <div key={item.product.id} className="flex gap-4 p-3 items-center justify-between">
                        <div className="flex gap-3 items-center min-w-0">
                          <img src={item.product.image} alt={item.product.name} className="h-10 w-10 object-cover bg-zinc-950 border border-zinc-800 rounded" />
                          <div className="min-w-0">
                            <p className="text-xs font-bold text-white truncate">{item.product.name}</p>
                            <p className="text-[10px] text-zinc-500">Qty: {item.quantity} | {item.selectedColor || "Default Finish"}</p>
                          </div>
                        </div>
                        <span className="text-xs font-black text-sky-400 flex-shrink-0">
                          ₹{(item.product.price * item.quantity).toLocaleString("en-IN")}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-zinc-900 flex justify-end">
                  <button
                    onClick={handlePlaceOrder}
                    className="rounded-xl bg-gradient-to-r from-sky-400 to-indigo-500 px-8 py-3 text-sm font-bold text-white hover:brightness-110 btn-glow-sky active:scale-98 transition flex items-center gap-2"
                  >
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                    Place Secure Order
                  </button>
                </div>
              </div>
            )}

          </div>

          {/* Right Summary Panel */}
          <div className="lg:col-span-4 bg-zinc-900/30 p-6 rounded-2xl border border-zinc-900 backdrop-blur-sm space-y-4">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider border-b border-zinc-850 pb-2">
              Order Breakdown
            </h3>

            <div className="space-y-2 text-xs text-zinc-400 border-b border-zinc-850 pb-4">
              <div className="flex justify-between">
                <span>Items Subtotal</span>
                <span className="text-white">₹{subtotal.toLocaleString("en-IN")}</span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-emerald-400">
                  <span>Promo Discount ({appliedCoupon?.code})</span>
                  <span>- ₹{discount.toLocaleString("en-IN")}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Secure Shipping</span>
                <span className="text-white">
                  {shipping === 0 ? <span className="text-emerald-400 font-bold uppercase text-[10px]">FREE</span> : `₹${shipping}`}
                </span>
              </div>
              <div className="flex justify-between">
                <span>GST Tax (18% simulated)</span>
                <span className="text-white">₹{taxesEstimate.toLocaleString("en-IN")}</span>
              </div>
            </div>

            <div className="flex justify-between items-baseline pt-2">
              <span className="text-xs font-bold text-white uppercase">Final Charge:</span>
              <span className="text-xl font-black text-sky-400">₹{grandTotal.toLocaleString("en-IN")}</span>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
