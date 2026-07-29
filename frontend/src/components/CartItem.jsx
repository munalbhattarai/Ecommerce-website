import React from "react";

const CartItem = ({ item, increaseQty, decreaseQty, removeItem }) => {
  return (
    <div className="flex items-center justify-between bg-white p-5 rounded-2xl shadow mb-5">

      {/* Product */}
      <div className="flex items-center gap-5">
        <img
          src={item.image}
          alt={item.name}
          className="w-28 h-28 object-cover rounded-xl bg-gray-100"
        />

        <div>
          <h2 className="text-xl font-semibold">{item.name}</h2>
          <p className="text-gray-500">{item.category}</p>

          <p className="text-indigo-600 font-bold mt-2">
            ${item.offerPrice}
          </p>
        </div>
      </div>

      {/* Quantity */}

      <div className="flex items-center bg-indigo-100 rounded-lg overflow-hidden">

        <button
          onClick={() => decreaseQty(item.id)}
          className="px-4 py-2 font-bold text-indigo-700"
        >
          -
        </button>

        <span className="px-5 font-semibold">
          {item.quantity}
        </span>

        <button
          onClick={() => increaseQty(item.id)}
          className="px-4 py-2 font-bold text-indigo-700"
        >
          +
        </button>

      </div>

      {/* Total */}

      <div>
        <p className="text-lg font-bold">
          ${(item.offerPrice * item.quantity).toFixed(2)}
        </p>
      </div>

      {/* Remove */}

      <button
        onClick={() => removeItem(item.id)}
        className="bg-red-500 text-white px-5 py-2 rounded-lg hover:bg-red-600"
      >
        Remove
      </button>

    </div>
  );
};

export default CartItem;