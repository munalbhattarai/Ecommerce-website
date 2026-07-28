import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { FaStar, FaShoppingCart, FaBolt } from "react-icons/fa";

const ProductDetailsPage = () => {

  const { id } = useParams();

  const [quantity, setQuantity] = useState(1);

  const [selectedImage, setSelectedImage] = useState(
    "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=700"
  );


  // Later this data will come from API using id
  const product = {
    id: id,
    name: "Premium Cotton T-Shirt",
    rating: 4,
    price: 40,
    offerPrice: 30,
    stock: 15,

    description:
      "High quality cotton t-shirt with a comfortable fit. Perfect for casual wear and everyday style.",

    images: [
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=700",
      "https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=700",
      "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=700"
    ]
  };


  return (

    
    <div className="bg-gray-100 min-h-screen py-10">


      <div className="max-w-7xl mx-auto bg-white rounded-3xl p-8 grid grid-cols-1 md:grid-cols-2 gap-10">


        {/* Images Section */}

        <div>


          {/* Main Image */}

          <div className="bg-gray-100 rounded-2xl overflow-hidden">

            <img
              src={selectedImage}
              alt={product.name}
              className="w-full h-125 object-cover hover:scale-105 transition duration-500"
            />

          </div>



          {/* Thumbnail Images */}

          <div className="flex gap-4 mt-5">

            {
              product.images.map((image,index)=>(

                <img
                  key={index}
                  src={image}
                  alt="thumbnail"
                  onClick={()=>setSelectedImage(image)}
                  className={`w-20 h-20 object-cover rounded-xl cursor-pointer border-2 transition
                  
                  ${
                    selectedImage === image
                    ? "border-blue-600"
                    : "border-transparent"
                  }

                  `}
                />

              ))
            }

          </div>


        </div>





        {/* Product Details */}


        <div className="space-y-6">


          <h1 className="text-4xl font-bold text-gray-800">
            {product.name}
          </h1>



          {/* Rating */}

          <div className="flex items-center gap-1">

            {
              Array(5)
              .fill(0)
              .map((_,index)=>(

                <FaStar
                  key={index}
                  className={
                    index < product.rating
                    ? "text-yellow-400"
                    : "text-gray-300"
                  }
                />

              ))
            }


            <span className="text-gray-500 ml-2">
              ({product.rating}/5)
            </span>


          </div>




          {/* Price */}

          <div>

            <h2 className="text-4xl font-bold text-blue-600">
              ${product.offerPrice}
            </h2>

            <p className="text-gray-400 line-through">
              ${product.price}
            </p>

          </div>





          {/* Description */}

          <p className="text-gray-600 leading-relaxed">
            {product.description}
          </p>





          {/* Stock */}

          <p className="text-green-600 font-semibold">
            Available Stock: {product.stock}
          </p>






          {/* Quantity */}

          <div className="flex items-center gap-5">

            <span className="font-semibold">
              Quantity:
            </span>


            <div className="flex items-center border rounded-xl overflow-hidden">


              <button
                onClick={()=>
                  setQuantity(
                    Math.max(1, quantity-1)
                  )
                }

                className="px-4 py-2 hover:bg-gray-100"
              >
                -
              </button>



              <span className="px-5 font-semibold">
                {quantity}
              </span>




              <button

                onClick={()=>
                  setQuantity(
                    Math.min(product.stock, quantity+1)
                  )
                }

                className="px-4 py-2 hover:bg-gray-100"
              >
                +
              </button>


            </div>


          </div>






          {/* Buttons */}


          <div className="flex gap-4 pt-4">


            <button

              className="
              flex items-center gap-3 
              bg-blue-600 text-white 
              px-8 py-3 rounded-xl
              hover:bg-blue-700
              transition
              "

            >

              <FaShoppingCart />

              Add To Cart

            </button>





            <button

              className="
              flex items-center gap-3
              bg-orange-500 text-white
              px-8 py-3 rounded-xl
              hover:bg-orange-600
              transition
              "

            >

              <FaBolt />

              Buy Now

            </button>



          </div>



        </div>


      </div>


    </div>
    

  );
};


export default ProductDetailsPage;
