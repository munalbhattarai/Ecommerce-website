import React from "react";
import { Link } from "react-router-dom";
import { FaShoppingCart, FaUser, FaSearch } from "react-icons/fa";
import { useSelector } from "react-redux";

const Navbar = () => {
  const cartItems = useSelector((state) => state.cart.items);
  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
        
        {/* Logo */}
        <Link
          to="/"
          className="text-3xl font-extrabold text-blue-600"
        >
          ShopEasy
        </Link>

        {/* Search Bar */}
        <div className="flex items-center border rounded-lg overflow-hidden w-96">
          <input
            type="text"
            placeholder="Search products..."
            className="flex-1 px-4 py-2 outline-none"
          />
          <button className="bg-blue-600 text-white px-4 py-3 hover:bg-blue-700">
            <FaSearch />
          </button>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-6">
          <Link
            to="/cartdetails"
            className="flex items-center gap-2 text-gray-700 hover:text-blue-600 relative"
          >
            <FaShoppingCart size={20} />
            {cartCount > 0 && (
              <span className="absolute -top-2 -left-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {cartCount}
              </span>
            )}
            Cart
          </Link>

          <Link
            to="/login"
            className="flex items-center gap-2 bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700"
          >
            <FaUser />
            Login
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
