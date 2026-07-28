import React from 'react'
import Tshirt from '../assets/Tshirt.webp'

const HeroSection = () => {
  return (
    <div>
    <section className="max-w-7xl mx-auto px-6 py-16 flex flex-col md:flex-row items-center justify-between">
        {/* Left Side */}
        <div className="md:w-1/2 space-y-6">
          <h1 className="text-5xl font-extrabold text-gray-800 leading-tight">
            Style That <span className="text-blue-600">Inspires</span>
          </h1>

          <p className="text-lg text-gray-600">
            Discover the latest trends, premium quality products,
            and exclusive deals crafted just for you.
          </p>

          <div className="flex gap-4">
            <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition">
              Shop Now
            </button>

            <button className="border border-blue-600 text-blue-600 px-6 py-3 rounded-lg hover:bg-blue-600 hover:text-white transition">
              Explore
            </button>
          </div>
        </div>

        {/* Right Side */}
        <div className="md:w-1/2 flex justify-center mt-10 md:mt-0">
          <img
            src={Tshirt}
            alt="Shopping"
            className="w-full max-w-md rounded-xl shadow-xl"
          />
        </div>
      </section>
    </div>
  )
}

export default HeroSection