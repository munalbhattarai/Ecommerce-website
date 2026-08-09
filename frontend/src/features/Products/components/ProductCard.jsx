import { Link } from "react-router-dom";

export default function ProductCard({ product }) {
    return (
        <div className="rounded-lg border bg-white p-4 shadow-sm">

            {/* Product Image */}

            <div className="mb-4 h-48 overflow-hidden rounded-md bg-gray-100">
                {product.image ? (
                    <img
                        src={product.image}
                        alt={product.name}
                        className="h-full w-full object-cover"
                    />
                ) : (
                    <div className="flex h-full items-center justify-center text-gray-400">
                        No Image
                    </div>
                )}
            </div>

            {/* Product Information */}

            <h2 className="text-lg font-semibold">
                {product.name}
            </h2>

            <p className="mt-1 text-sm text-gray-500">
                {product.model}
            </p>

            <p className="mt-2 text-lg font-bold">
                Rs. {product.price}
            </p>

            <Link
                to={`/products/${product.id}`}
                className="mt-4 block rounded-md bg-black px-4 py-2 text-center text-white"
            >
                View Product
            </Link>

        </div>
    );
}