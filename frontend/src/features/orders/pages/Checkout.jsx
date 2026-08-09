import { useNavigate } from "react-router-dom";

import { useGetCartQuery } from "../../cart/api/cartApi";
import { usePlaceOrderMutation } from "../api/orderApi";

export default function Checkout() {

    const navigate = useNavigate();

    const {
        data,
        isLoading,
        isError,
    } = useGetCartQuery();

    const [
        placeOrder,
        {
            isLoading: isPlacingOrder,
            error,
        },
    ] = usePlaceOrderMutation();

    if (isLoading) {
        return (
            <div className="p-6">
                Loading checkout...
            </div>
        );
    }

    if (isError) {
        return (
            <div className="p-6">
                Failed to load cart.
            </div>
        );
    }

    const cartItems = data?.items ?? [];

    const total = cartItems.reduce(
        (sum, item) =>
            sum +
            Number(item.product.price) *
            item.quantity,
        0
    );

    const handlePlaceOrder = async () => {

        try {

            const order = await placeOrder().unwrap();

            navigate(`/orders/${order.id}`);

        } catch (error) {

            console.error(
                "Order placement failed:",
                error
            );

        }
    };

    return (
        <div className="mx-auto max-w-4xl p-6">

            <h1 className="mb-6 text-3xl font-bold">
                Checkout
            </h1>

            {/* Order Summary */}

            <div className="rounded-lg border p-6">

                <h2 className="mb-4 text-xl font-semibold">
                    Order Summary
                </h2>

                {cartItems.map((item) => (

                    <div
                        key={item.id}
                        className="flex justify-between border-b py-3"
                    >

                        <span>
                            {item.product.name}
                            {" × "}
                            {item.quantity}
                        </span>

                        <span>
                            Rs.{" "}
                            {
                                Number(item.product.price) *
                                item.quantity
                            }
                        </span>

                    </div>

                ))}

                <div className="mt-4 flex justify-between text-xl font-bold">

                    <span>
                        Total
                    </span>

                    <span>
                        Rs. {total}
                    </span>

                </div>

            </div>

            {/* Backend Error */}

            {error && (
                <p className="mt-4 text-red-500">
                    Failed to place order. Please try again.
                </p>
            )}

            {/* Place Order */}

            <button
                onClick={handlePlaceOrder}
                disabled={
                    isPlacingOrder ||
                    cartItems.length === 0
                }
                className="mt-6 rounded-md bg-black px-6 py-3 text-white disabled:opacity-50"
            >
                {isPlacingOrder
                    ? "Placing Order..."
                    : "Place Order"}
            </button>

        </div>
    );
}