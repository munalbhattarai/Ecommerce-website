import React, { useState } from "react";
import { FaHeart, FaShoppingCart, FaStar } from "react-icons/fa";
import { Link } from "react-router-dom";

const ProductCard = ({product}) => {
  const [count, setCount] = useState(0);



  return (
  
    <Link to={`/product/${product.id}`}>
    <div className="group bg-white rounded-3xl shadow-sm hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100">

      {/* Image */}
      <div className="relative bg-gray-50 h-64 flex items-center justify-center overflow-hidden">

        <img
          src={product.image}
          alt={product.name}
          className="w-52 h-52 object-cover group-hover:scale-110 transition duration-500"
        />

        <button className="absolute top-4 right-4 bg-white p-3 rounded-full shadow hover:text-red-500 transition">
          <FaHeart />
        </button>

        <span className="absolute top-4 left-4 bg-indigo-600 text-white text-xs px-3 py-1 rounded-full">
          New
        </span>

      </div>


      {/* Content */}
      <div className="p-5">

        <p className="text-sm text-gray-400">
          {product.category}
        </p>

        <h2 className="text-xl font-bold text-gray-800 mt-1 truncate">
          {product.name}
        </h2>


        {/* Rating */}
        <div className="flex items-center gap-1 mt-3">
          {
            Array(5).fill(0).map((_,i)=>(
              <FaStar
                key={i}
                className={
                  i < product.rating
                  ? "text-yellow-400"
                  : "text-gray-300"
                }
                size={14}
              />
            ))
          }

          <span className="text-sm text-gray-500 ml-2">
            ({product.rating})
          </span>
        </div>


        {/* Price + Cart */}
        <div className="flex justify-between items-center mt-5">

          <div>
            <p className="text-2xl font-bold text-indigo-600">
              ${product.offerPrice}
            </p>

            <p className="text-sm text-gray-400 line-through">
              ${product.price}
            </p>
          </div>


          {
            count === 0 ? (
              <button
                onClick={()=>setCount(1)}
                className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-xl hover:bg-indigo-700 transition"
              >
                <FaShoppingCart/>
                Add
              </button>
            )
            :
            (
              <div className="flex items-center bg-indigo-100 rounded-xl overflow-hidden">
                <button
                  onClick={()=>setCount(Math.max(count-1,0))}
                  className="px-3 py-2 text-indigo-700 font-bold"
                >
                  -
                </button>

                <span className="px-3 font-semibold">
                  {count}
                </span>

                <button
                  onClick={()=>setCount(count+1)}
                  className="px-3 py-2 text-indigo-700 font-bold"
                >
                  +
                </button>
              </div>
            )
          }

        </div>

      </div>

    </div>
    </Link>
  );
};

export default ProductCard;
