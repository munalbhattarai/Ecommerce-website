import { useMemo } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { FiFilter, FiShoppingBag, FiX } from "react-icons/fi";
import { useGetCategoriesQuery, useGetProductsQuery } from "../api/ProductApi";
import ProductCard from "../components/ProductCard";
import Loading from "../../../components/ui/Loading";
import ErrorMessage from "../../../components/ui/ErrorMessage";
import EmptyState from "../../../components/ui/EmptyState";
import { listFromResponse } from "../../../lib/formatters";

export default function Products() {
	const [searchParams, setSearchParams] = useSearchParams();
	const searchTerm = searchParams.get("search") ?? "";
	const categoryId = searchParams.get("category") ?? "";

	const { data, isLoading, isError } = useGetProductsQuery();
	const { data: categoriesData = [] } = useGetCategoriesQuery();

	const categories = listFromResponse(categoriesData);
	const products = useMemo(() => {
		const list = listFromResponse(data);

		return list.filter(product => {
			const searchable = `${product.name ?? ""} ${product.brand ?? ""} ${product.model ?? ""}`.toLowerCase();
			const matchesSearch = !searchTerm || searchable.includes(searchTerm.toLowerCase());
			const matchesCategory = !categoryId || String(product.category) === categoryId;
			return matchesSearch && matchesCategory;
		});
	}, [data, searchTerm, categoryId]);

	if (isLoading) return <Loading message="Loading the collection..." />;
	if (isError) return <ErrorMessage message="Unable to load products. Please sign in or check your connection." />;

	const clearFilters = () => setSearchParams({});
	const setCategory = id => {
		const next = new URLSearchParams(searchParams);
		if (id) next.set("category", String(id));
		else next.delete("category");
		setSearchParams(next);
	};

	return (
		<div className="page-shell">
			<section className="grid gap-6 border-b border-[#dedbd2] pb-8 lg:grid-cols-[1fr_auto] lg:items-end">
				<div>
					<p className="eyebrow">Shop</p>
					<h1 className="mt-2 text-4xl font-black sm:text-5xl">Browse the collection</h1>
					<p className="mt-3 max-w-2xl text-[#6f6b63]">
						Search product names, brands, and models. Filter by category to find the right item faster.
					</p>
				</div>
				<div className="flex gap-3">
					{(searchTerm || categoryId) && (
						<button onClick={clearFilters} className="btn-ghost">
							<FiX />
							Clear
						</button>
					)}
					<Link to="/cart" className="btn-primary">
						<FiShoppingBag />
						View cart
					</Link>
				</div>
			</section>

			<section className="rounded-lg border border-[#dedbd2] bg-white p-3">
				<div className="flex items-center gap-2 overflow-x-auto">
					<span className="flex shrink-0 items-center gap-2 px-2 text-sm font-black text-[#6f6b63]">
						<FiFilter />
						Category
					</span>
					<button onClick={() => setCategory("")} className={`shrink-0 rounded-md px-4 py-2 text-sm font-black ${!categoryId ? "bg-[#141414] text-white" : "bg-[#f5f3ee] text-[#5f5a52] hover:bg-[#eeeae2]"}`}>
						All
					</button>
					{categories.map(category => (
						<button
							key={category.id}
							onClick={() => setCategory(category.id)}
							className={`shrink-0 rounded-md px-4 py-2 text-sm font-black ${categoryId === String(category.id) ? "bg-[#c64d2d] text-white" : "bg-[#f5f3ee] text-[#5f5a52] hover:bg-[#eeeae2]"}`}
						>
							{category.name}
						</button>
					))}
				</div>
			</section>

			{products.length === 0 ? (
				<div className="card p-8">
					<EmptyState message="No products matched your filters." />
					<div className="mt-6 flex justify-center">
						<button onClick={clearFilters} className="btn-primary">Clear filters</button>
					</div>
				</div>
			) : (
				<div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
					{products.map(product => (
						<ProductCard key={product.id} product={product} />
					))}
				</div>
			)}
		</div>
	);
}
