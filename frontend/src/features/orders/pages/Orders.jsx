import { Link } from "react-router-dom";
import { useGetOrdersQuery } from "../api/orderApi";

export default function Orders() {

    const {
        data,
        isLoading,
        isError,
    } = useGetOrdersQuery();

    if (isLoading) {
        return (
            <div className="p-6">
                Loading orders...
            </div>
        );
    }

    if (isError) {
        return (
            <div className="p-6">
                Failed to load orders.
            </div>
        );
    }

    const orders = data?.results ?? data ?? [];

    if (orders.length === 0) {
        return (
            <div className="mx-auto max-w-6xl p-6">
                <h1 className="mb-4 text-3xl font-bold">
                    My Orders
                </h1>

                <p>
                    You haven't placed any orders yet.
                </p>
            </div>
        );
    }

    return (
        <div className="mx-auto max-w-6xl p-6">

            <h1 className="mb-6 text-3xl font-bold">
                My Orders
            </h1>

            <div className="space-y-4">

                {orders.map((order) => (

                    <div
                        key={order.id}
                        className="rounded-lg border p-5"
                    >

                        <div className="flex items-center justify-between">

                            <div>

                                <h2 className="font-semibold">
                                    Order #{order.id}
                                </h2>

                                <p className="text-sm text-gray-500">
                                    {order.shipping_address}
                                </p>

                            </div>

                            <div className="text-right">

                                <p className="font-bold">
                                    Rs. {order.total_amount}
                                </p>

                                <p className="text-sm">
                                    {order.status}
                                </p>

                            </div>

                        </div>

                        <Link
                            to={`/orders/${order.id}`}
                            className="mt-4 inline-block rounded-md border px-4 py-2"
                        >
                            View Order
                        </Link>

                    </div>

                ))}

            </div>

        </div>
    );
}