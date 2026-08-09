import { useGetProductsQuery } from "../api/productApi";

export default function Products() {

    const {
        data,
        isLoading,
        isError,
    } = useGetProductsQuery();

    if (isLoading) {
        return <p>Loading products...</p>;
    }

    if (isError) {
        return <p>Failed to load products.</p>;
    }

    return (
        <div>

            <h1>Products</h1>

            {data?.results?.map((product) => (
                <div key={product.id}>

                    <h2>{product.name}</h2>

                    <p>
                        Rs. {product.price}
                    </p>

                </div>
            ))}

        </div>
    );
}