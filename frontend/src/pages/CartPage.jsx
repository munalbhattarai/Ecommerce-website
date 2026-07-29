import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { increaseQty, decreaseQty, removeFromCart } from "../redux/cartSlice";
import CartItem from "../components/CartItem";
import { Link } from "react-router-dom";


const CartPage = () => {
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  const handleIncreaseQty = (id) => {
    dispatch(increaseQty(id));
  };

  const handleDecreaseQty = (id) => {
    dispatch(decreaseQty(id));
  };

  const handleRemoveItem = (id) => {
    dispatch(removeFromCart(id));
  };

  const total = cartItems.reduce(
    (sum, item) => sum + item.offerPrice * item.quantity,
    0
  );

  return (
    <div className="max-w-6xl mx-auto py-10 px-5">

      <h1 className="text-4xl font-bold mb-8">
        Shopping Cart
      </h1>

      {cartItems.map((item) => (
        <CartItem
          key={item.id}
          item={item}
          increaseQty={handleIncreaseQty}
          decreaseQty={handleDecreaseQty}
          removeItem={handleRemoveItem}
        />
      ))}

      <div className="flex justify-end mt-8">

        <div className="bg-white shadow-lg rounded-2xl p-6 w-80">

          <h2 className="text-2xl font-bold mb-4">
            Order Summary
          </h2>

          <div className="flex justify-between mb-5">
            <span>Total</span>
            <span className="font-bold">
              ${total.toFixed(2)}
            </span>
          </div>

          <button className="w-full bg-indigo-600 text-white py-3 rounded-xl hover:bg-indigo-700">
            <Link to="/checkout">Checkout</Link>
          </button>

        </div>

      </div>

    </div>
  );
};

export default CartPage;