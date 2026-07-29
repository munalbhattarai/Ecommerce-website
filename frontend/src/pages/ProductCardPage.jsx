import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FaStar, FaShoppingCart, FaBolt } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/cartSlice";
import Navbar from "../components/Navbar";

const ProductCardPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [quantity, setQuantity] = useState(1);

  const product = {
    id: parseInt(id),
    name: "Premium Cotton T-Shirt",
    rating: 4,
    price: 40,
    offerPrice: 30,
    stock: 15,
    description:
      "High quality cotton t-shirt with a comfortable fit. Perfect for casual wear.",
    images: [
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=700",
      "https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=700",
      "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=700",
    ],
  };

  const [selectedImage, setSelectedImage] = useState(product.images[0]);

  const handleAddToCart = () => {
    dispatch(
      addToCart({
        ...product,
        quantity,
      })
    );

    alert("Added to cart!");
  };

  const handleBuyNow = () => {
    dispatch(
      addToCart({
        ...product,
        quantity,
      })
    );

    navigate("/checkout");
  };

  return (
    <>
      <Navbar />

      <div className="bg-gray-100 min-h-screen py-10">
        <div className="max-w-7xl mx-auto bg-white rounded-3xl p-8 grid md:grid-cols-2 gap-10">

          {/* Images */}

          <div>
            <div className="bg-gray-100 rounded-2xl overflow-hidden">
              <img
                src={selectedImage}
                alt={product.name}
                className="w-full h-[500px] object-cover"
              />
            </div>

            <div className="flex gap-3 mt-5">
              {product.images.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt=""
                  onClick={() => setSelectedImage(img)}
                  className={`w-20 h-20 rounded-xl cursor-pointer border-2 ${selectedImage === img
                    ? "border-blue-600"
                    : "border-transparent"
                    }`}
                />
              ))}
            </div>
          </div>

          {/* Product Details */}

          <div>

            <h1 className="text-4xl font-bold">
              {product.name}
            </h1>

            <div className="flex items-center gap-1 mt-4">
              {Array(5)
                .fill(0)
                .map((_, i) => (
                  <FaStar
                    key={i}
                    className={
                      i < product.rating
                        ? "text-yellow-400"
                        : "text-gray-300"
                    }
                  />
                ))}

              <span className="ml-2">
                ({product.rating})
              </span>
            </div>

            <div className="mt-5">
              <h2 className="text-4xl font-bold text-blue-600">
                ${product.offerPrice}
              </h2>

              <p className="line-through text-gray-400">
                ${product.price}
              </p>
            </div>

            <p className="mt-6 text-gray-600">
              {product.description}
            </p>

            <p className="mt-4 text-green-600 font-semibold">
              In Stock : {product.stock}
            </p>

            {/* Quantity */}

            <div className="flex items-center gap-5 mt-8">

              <span className="font-semibold">
                Quantity
              </span>

              <div className="flex border rounded-xl overflow-hidden">

                <button
                  onClick={() =>
                    setQuantity(Math.max(1, quantity - 1))
                  }
                  className="px-4 py-2"
                >
                  -
                </button>

                <span className="px-5 py-2">
                  {quantity}
                </span>

                <button
                  onClick={() =>
                    setQuantity(
                      Math.min(
                        product.stock,
                        quantity + 1
                      )
                    )
                  }
                  className="px-4 py-2"
                >
                  +
                </button>

              </div>

            </div>

            {/* Buttons */}

            <div className="flex gap-4 mt-10">

              <button
                onClick={handleAddToCart}
                className="flex items-center gap-3 bg-blue-600 text-white px-8 py-3 rounded-xl hover:bg-blue-700"
              >
                <FaShoppingCart />
                Add To Cart
              </button>

              <button
                onClick={handleBuyNow}
                className="flex items-center gap-3 bg-orange-500 text-white px-8 py-3 rounded-xl hover:bg-orange-600"
              >
                <FaBolt />
                Buy Now
              </button>

            </div>

          </div>

        </div>
      </div>
    </>
  );
};

export default ProductCardPage;