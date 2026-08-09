import { useParams } from "react-router-dom";

import {useGetProductQuery,} from "../api/productApi";

export default function ProductDetails() {

    const { id } = useParams();

    const {
        data: product,
        isLoading,
        isError,
    } = useGetProductQuery(id);

    if (isLoading) {
        return <p>Loading product...</p>;
    }

    if (isError) {
        return <p>Product not found.</p>;
    }

    return (
        <div className="mx-auto max-w-6xl p-6">

            <div className="grid gap-8 md:grid-cols-2">

                {/* Image */}

                <div className="h-96 overflow-hidden rounded-lg bg-gray-100">

                    {product.image && (
                        <img
                            src={product.image}
                            alt={product.name}
                            className="h-full w-full object-cover"
                        />
                    )}

                </div>

                {/* Information */}

                <div>

                    <h1 className="text-3xl font-bold">
                        {product.name}
                    </h1>

                    <p className="mt-2 text-gray-500">
                        Model: {product.model}
                    </p>

                    <p className="mt-4 text-2xl font-bold">
                        Rs. {product.price}
                    </p>

                    <p className="mt-6">
                        {product.specs}
                    </p>

                    <p className="mt-4">
                        Stock: {product.stock}
                    </p>

                    <button
                        className="mt-6 rounded-md bg-black px-6 py-3 text-white"
                    >
                        Add to Cart
                    </button>

                </div>

            </div>

        </div>
    );
}