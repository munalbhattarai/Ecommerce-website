import React from "react";
import { Link } from "react-router-dom";
import { FaShoppingCart, FaUser, FaSearch } from "react-icons/fa";

const Navbar = () => {
  return (
    <nav className="bg-white shadow-lg">
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
            to="/cart"
            className="flex items-center gap-2 text-gray-700 hover:text-blue-600"
          >
            <FaShoppingCart size={20} />
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
