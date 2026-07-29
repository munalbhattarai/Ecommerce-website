import React, { useState } from "react";
import Navbar from "../components/Navbar";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const CheckoutPage = () => {
  const cartItems = useSelector((state) => state.cart.items);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
    city: "",
    zip: "",
    cardNumber: "",
    expiry: "",
    cvv: "",
  });

  const total = cartItems.reduce(
    (sum, item) => sum + item.offerPrice * item.quantity,
    0
  );

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCheckout = (e) => {
    e.preventDefault();
    alert("Payment Successful! Order placed.");
  };

  return (
    <>
      <Navbar />
      <div className="bg-gray-50 min-h-screen py-10">
        <div className="max-w-6xl mx-auto px-5">
          <h1 className="text-3xl font-bold text-gray-800 mb-8">Checkout</h1>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {/* Form Section */}
            <div className="md:col-span-2 space-y-8">
              <form onSubmit={handleCheckout} className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
                {/* Shipping Address */}
                <h2 className="text-xl font-semibold mb-5 text-gray-700">Shipping Details</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-8">
                  <input
                    type="text"
                    name="name"
                    placeholder="Full Name"
                    required
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition"
                  />
                  <input
                    type="email"
                    name="email"
                    placeholder="Email Address"
                    required
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition"
                  />
                  <input
                    type="text"
                    name="address"
                    placeholder="Street Address"
                    required
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition sm:col-span-2"
                  />
                  <input
                    type="text"
                    name="city"
                    placeholder="City"
                    required
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition"
                  />
                  <input
                    type="text"
                    name="zip"
                    placeholder="Zip Code"
                    required
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition"
                  />
                </div>

                {/* Payment Details */}
                <h2 className="text-xl font-semibold mb-5 text-gray-700">Payment Details</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <input
                    type="text"
                    name="cardNumber"
                    placeholder="Card Number"
                    required
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition sm:col-span-2"
                  />
                  <input
                    type="text"
                    name="expiry"
                    placeholder="MM/YY"
                    required
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition"
                  />
                  <input
                    type="password"
                    name="cvv"
                    placeholder="CVV"
                    required
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-indigo-600 text-white font-bold py-4 rounded-xl mt-8 hover:bg-indigo-700 transition shadow-lg shadow-indigo-200"
                >
                  Pay ${total.toFixed(2)}
                </button>
              </form>
            </div>

            {/* Order Summary */}
            <div className="md:col-span-1">
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 sticky top-24">
                <h2 className="text-xl font-semibold mb-5 text-gray-700">Order Summary</h2>
                
                <div className="space-y-4 mb-6 max-h-64 overflow-y-auto pr-2">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex gap-4">
                      <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded-lg bg-gray-50" />
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-800 text-sm">{item.name}</h3>
                        <p className="text-xs text-gray-500 mt-1">Qty: {item.quantity}</p>
                        <p className="font-bold text-indigo-600 text-sm mt-1">${(item.offerPrice * item.quantity).toFixed(2)}</p>
                      </div>
                    </div>
                  ))}
                  {cartItems.length === 0 && (
                    <p className="text-gray-500 text-sm">Your cart is empty.</p>
                  )}
                </div>

                <div className="border-t border-gray-100 pt-4 space-y-3">
                  <div className="flex justify-between text-gray-600 text-sm">
                    <span>Subtotal</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-gray-600 text-sm">
                    <span>Shipping</span>
                    <span>Free</span>
                  </div>
                  <div className="flex justify-between font-bold text-lg text-gray-800 pt-2 border-t border-gray-100">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>
                
                {cartItems.length === 0 && (
                  <Link to="/" className="block text-center mt-6 text-indigo-600 font-semibold hover:underline">
                    Back to Shop
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CheckoutPage;
