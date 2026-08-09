import {useGetProductsQuery,} from "../api/productApi";
import ProductCard from "../components/ProductCard";



export default function Products() {

    const {
        data,
        isLoading,
        isError,
    } = useGetProductsQuery();

    if (isLoading) {
        return (
            <div className="p-6">
                <p>Loading products...</p>
            </div>
        );
    }

    if (isError) {
        return (
            <div className="p-6">
                <p>
                    Failed to load products.
                </p>
            </div>
        );
    }

    const products = data?.results ?? [];

    return (
        <div className="mx-auto max-w-7xl p-6">

            <h1 className="mb-6 text-3xl font-bold">
                Products
            </h1>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">

                {products.map((product) => (
                    <ProductCard
                        key={product.id}
                        product={product}
                    />
                ))}

            </div>

        </div>
    );
}