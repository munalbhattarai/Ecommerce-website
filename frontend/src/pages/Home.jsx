import { Link } from "react-router-dom";
import {
	FiArrowRight,
	FiBox,
	FiCheckCircle,
	FiCreditCard,
	FiShoppingBag,
	FiTag,
	FiTruck
} from "react-icons/fi";
import { useGetCategoriesQuery, useGetProductsQuery } from "../features/Products/api/ProductApi";
import ProductCard from "../features/Products/components/ProductCard";
import { listFromResponse, money, productImage } from "../lib/formatters";

function Feature({ icon: Icon, title, text }) {
	return (
		<div className="border-l border-[#d8d2c7] pl-5">
			<Icon className="text-xl text-[#c64d2d]" />
			<p className="mt-3 font-black">{title}</p>
			<p className="mt-1 text-sm leading-6 text-[#6f6b63]">{text}</p>
		</div>
	);
}

export default function Home() {
	const { data: productsData } = useGetProductsQuery();
	const { data: categoriesData } = useGetCategoriesQuery();
	const products = listFromResponse(productsData).slice(0, 8);
	const categories = listFromResponse(categoriesData).slice(0, 6);
	const heroProduct = products[0];
	const heroImage = productImage(heroProduct);

	return (
		<div>
			<section className="border-b border-[#dedbd2] bg-[#f5f3ee]">
				<div className="mx-auto grid min-h-[calc(100vh-4.25rem)] max-w-[1320px] gap-10 px-4 py-10 sm:px-6 lg:grid-cols-[0.95fr_1.05fr] lg:px-8">
					<div className="flex flex-col justify-center">
						<p className="eyebrow">Curated commerce</p>
						<h1 className="mt-5 max-w-3xl text-5xl font-black leading-[1.02] tracking-normal sm:text-6xl lg:text-7xl">
							Modern essentials, local sellers, cleaner shopping.
						</h1>
						<p className="mt-6 max-w-xl text-lg leading-8 text-[#5f5a52]">
							Shop quality products, manage your cart, place cash-on-delivery orders, or run a seller catalog from one fast ecommerce experience.
						</p>
						<div className="mt-8 flex flex-col gap-3 sm:flex-row">
							<Link to="/products" className="btn-primary">
								<FiShoppingBag />
								Shop collection
								<FiArrowRight />
							</Link>
							<Link to="/register" className="btn-ghost">
								Open a seller account
							</Link>
						</div>
						<div className="mt-12 grid grid-cols-3 gap-4 border-y border-[#dedbd2] py-6">
							<div>
								<p className="text-2xl font-black">{products.length || "New"}</p>
								<p className="mt-1 text-xs font-bold uppercase tracking-widest text-[#7c756a]">Featured</p>
							</div>
							<div>
								<p className="text-2xl font-black">{categories.length || "Fresh"}</p>
								<p className="mt-1 text-xs font-bold uppercase tracking-widest text-[#7c756a]">Categories</p>
							</div>
							<div>
								<p className="text-2xl font-black">COD</p>
								<p className="mt-1 text-xs font-bold uppercase tracking-widest text-[#7c756a]">Checkout</p>
							</div>
						</div>
					</div>

					<div className="flex items-end">
						<Link to={heroProduct ? `/products/${heroProduct.id}/` : "/products"} className="group relative block w-full overflow-hidden rounded-lg border border-[#d7d1c7] bg-white">
							<div className="aspect-[4/5] bg-[#ebe6dc]">
								{heroImage ? (
									<img src={heroImage} alt={heroProduct.name} className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]" />
								) : (
									<div className="flex h-full w-full items-center justify-center">
										<FiBox className="text-6xl text-[#bdb4a6]" />
									</div>
								)}
							</div>
							<div className="absolute bottom-0 left-0 right-0 border-t border-[#dedbd2] bg-white p-5">
								<p className="eyebrow">Featured pick</p>
								<div className="mt-2 flex items-end justify-between gap-4">
									<div>
										<p className="text-xl font-black">{heroProduct?.name ?? "Explore the latest arrivals"}</p>
										<p className="mt-1 text-sm text-[#6f6b63]">{heroProduct?.brand ?? "Products from active sellers"}</p>
									</div>
									<p className="text-lg font-black text-[#c64d2d]">{heroProduct ? money(heroProduct.price) : ""}</p>
								</div>
							</div>
						</Link>
					</div>
				</div>
			</section>

			<section className="bg-white px-4 py-12 sm:px-6 lg:px-8">
				<div className="mx-auto grid max-w-[1320px] gap-6 md:grid-cols-4">
					<Feature icon={FiTruck} title="Fast local delivery" text="Clear cart totals and shipping estimates before checkout." />
					<Feature icon={FiCreditCard} title="Cash on delivery" text="Place orders with a shipping address and pay on arrival." />
					<Feature icon={FiCheckCircle} title="Seller controls" text="Create products, edit stock, and advance order status." />
					<Feature icon={FiTag} title="Category browsing" text="Filter catalog items by category or search by name and brand." />
				</div>
			</section>

			{categories.length > 0 && (
				<section className="border-y border-[#dedbd2] bg-[#f5f3ee] px-4 py-14 sm:px-6 lg:px-8">
					<div className="mx-auto max-w-[1320px]">
						<div className="flex items-end justify-between gap-4">
							<div>
								<p className="eyebrow">Departments</p>
								<h2 className="mt-2 text-3xl font-black sm:text-4xl">Shop by category</h2>
							</div>
							<Link to="/products" className="btn-ghost hidden sm:inline-flex">View all</Link>
						</div>
						<div className="mt-8 grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-6">
							{categories.map(category => (
								<Link key={category.id} to={`/products?category=${category.id}`} className="card flex min-h-28 flex-col justify-between p-4 hover:-translate-y-0.5">
									<FiTag className="text-xl text-[#c64d2d]" />
									<span className="text-base font-black">{category.name}</span>
								</Link>
							))}
						</div>
					</div>
				</section>
			)}

			<section className="bg-white px-4 py-14 sm:px-6 lg:px-8">
				<div className="mx-auto max-w-[1320px]">
					<div className="flex items-end justify-between gap-4">
						<div>
							<p className="eyebrow">New in store</p>
							<h2 className="mt-2 text-3xl font-black sm:text-4xl">Featured products</h2>
						</div>
						<Link to="/products" className="btn-primary hidden sm:inline-flex">
							Browse all
							<FiArrowRight />
						</Link>
					</div>
					<div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
						{products.map(product => (
							<ProductCard key={product.id} product={product} />
						))}
					</div>
				</div>
			</section>

			<section className="bg-[#141414] px-4 py-14 text-white sm:px-6 lg:px-8">
				<div className="mx-auto flex max-w-[1320px] flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
					<div>
						<p className="text-xs font-black uppercase tracking-widest text-white/50">Seller tools included</p>
						<h2 className="mt-2 text-3xl font-black">List, stock, sell, fulfill.</h2>
					</div>
					<Link to="/register" className="btn-secondary">Start selling</Link>
				</div>
			</section>
		</div>
	);
}
