import { useGetProductsQuery } from '../api/productApi';
import ProductCard from '../components/ProductCard';
import Loading from '../../../components/ui/Loading';
import ErrorMessage from '../../../components/ui/ErrorMessage';
import EmptyState from '../../../components/ui/EmptyState';

export default function Products() {
	const { data, isLoading, isError } = useGetProductsQuery();

	if (isLoading) {
		return <Loading message="Loading products..." />;
	}

	if (isError) {
		return <ErrorMessage message="Unable to load products." />;
	}

	const products = data?.results ?? [];
    if (products.length === 0) {
    return (
        <EmptyState message="No products available." />
    );
}

	return (
		<div className="mx-auto max-w-7xl p-6">
			<h1 className="mb-6 text-3xl font-bold">Products</h1>

			<div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
				{products.map(product => (
					<ProductCard key={product.id} product={product} />
				))}
			</div>
		</div>
	);
}
