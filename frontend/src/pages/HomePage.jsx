import React from "react";
import Navbar from "../components/Navbar";
import Categories from "../components/Categories";
import HeroSection from "../components/HeroSection";
import ProductCard from "../components/ProductCard";
import tshirt from "../assets/Tshirt.webp";


const HomePage = () => {

  const products = [
    {
      id:20,
      name: "Premium T-Shirt",
      category: "Fashion",
      price: 40,
      offerPrice: 30,
      rating: 5,
      image: tshirt
    },
    {
    id: 1,
    name: "Premium T-Shirt",
    category: "Fashion",
    price: 40,
    offerPrice: 30,
    rating: 5,
    image:
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500"
   },

  {
    id: 2,
    name: "Running Shoes",
    category: "Footwear",
    price: 100,
    offerPrice: 80,
    rating: 4,
    image:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500"
    },

  {
    id: 3,
    name: "Denim Jacket",
    category: "Fashion",
    price: 120,
    offerPrice: 90,
    rating: 5,
    image:
      "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=500"
  },

  {
    id: 4,
    name: "Smart Watch",
    category: "Electronics",
    price: 150,
    offerPrice: 110,
    rating: 4,
    image:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500"
  }
  ]; 


  return (
    <div className="bg-gray-100 min-h-screen" >

      <Navbar />

      <HeroSection />

      <Categories />


      <section className="max-w-7xl mx-auto px-6 py-10">

        <h1 className="text-3xl font-bold mb-8">
          Featured Products
        </h1>


        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">

          {
            products.map((item)=>(
              <ProductCard
                key={item.name}
                product={item}
                
              />
            ))
          }

        </div>

      </section>

    </div>
  );
};


export default HomePage;
