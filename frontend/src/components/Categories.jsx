import React from "react";

const categories = [
  "Electronics",
  "Fashion",
  "Books",
  "Shoes",
];

const Categories = () => {
  return (
    <section className="max-w-7xl mx-auto py-10 px-6">
      <h2 className="text-3xl font-bold mb-6">Categories</h2>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {categories.map((category) => (
          <div
            key={category}
            className="bg-white shadow-md rounded-lg p-6 text-center cursor-pointer hover:bg-blue-600 hover:text-white transition duration-300"
          >
            <h3 className="text-lg font-semibold">{category}</h3>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Categories;
