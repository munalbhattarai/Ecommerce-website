import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { FiArrowRight, FiBarChart2, FiDollarSign, FiList, FiPackage, FiPlus, FiShoppingCart } from "react-icons/fi";
import { useGetSellerDashboardQuery, useGetSellerProductsQuery } from "../api/sellerApi";
import Loading from "../../../components/ui/Loading";
import ErrorMessage from "../../../components/ui/ErrorMessage";
import { money, productImage } from "../../../lib/formatters";

export default function SellerDashboard() {
	const sellerName = useSelector(state => state.auth.user?.username);
	const { data: products = [], isLoading: productsLoading, isError: productsError } = useGetSellerProductsQuery();
	const { data: dashboard, isLoading: dashboardLoading, isError: dashboardError } = useGetSellerDashboardQuery();

	if (productsLoading || dashboardLoading) return <Loading message="Loading your dashboard..." />;
	if (dashboardError || productsError) return <ErrorMessage message="Unable to load seller dashboard." />;

	const stats = [
		{ label: "Revenue", value: money(dashboard?.revenue), icon: FiDollarSign },
		{ label: "Orders", value: dashboard?.total_orders ?? 0, icon: FiShoppingCart },
		{ label: "Pending", value: dashboard?.pending_orders ?? 0, icon: FiBarChart2 },
		{ label: "Products", value: dashboard?.total_products ?? products.length, icon: FiPackage }
	];

	const recentProducts = products.slice(0, 5);

	return (
		<div className="page-shell">
			<section className="grid gap-6 border-b border-[#dedbd2] pb-8 lg:grid-cols-[1fr_auto] lg:items-end">
				<div>
					<p className="eyebrow">Seller hub</p>
					<h1 className="mt-2 text-4xl font-black sm:text-5xl">Welcome back{sellerName ? `, ${sellerName}` : ""}</h1>
					<p className="mt-3 max-w-2xl text-[#6f6b63]">Manage catalog inventory, monitor orders, and move fulfillment forward.</p>
				</div>
				<div className="flex gap-3">
					<Link to="/seller/products/new" className="btn-secondary"><FiPlus /> Add product</Link>
					<Link to="/seller/orders" className="btn-primary">Orders <FiArrowRight /></Link>
				</div>
			</section>

			<section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
				{stats.map(({ label, value, icon: Icon }) => (
					<div key={label} className="card p-5">
						<div className="flex items-center justify-between">
							<p className="text-sm font-black uppercase tracking-widest text-[#7c756a]">{label}</p>
							<Icon className="text-xl text-[#c64d2d]" />
						</div>
						<p className="mt-4 text-3xl font-black">{value}</p>
					</div>
				))}
			</section>

			<section className="grid gap-4 md:grid-cols-3">
				<Link to="/seller/products" className="card p-6 hover:-translate-y-0.5">
					<FiList className="text-2xl text-[#c64d2d]" />
					<h2 className="mt-4 text-xl font-black">Product catalog</h2>
					<p className="mt-2 text-sm leading-6 text-[#6f6b63]">Edit prices, stock, availability, and images.</p>
				</Link>
				<Link to="/seller/products/new" className="card p-6 hover:-translate-y-0.5">
					<FiPlus className="text-2xl text-[#c64d2d]" />
					<h2 className="mt-4 text-xl font-black">Create listing</h2>
					<p className="mt-2 text-sm leading-6 text-[#6f6b63]">Publish a new product with category and inventory.</p>
				</Link>
				<Link to="/seller/orders" className="card p-6 hover:-translate-y-0.5">
					<FiShoppingCart className="text-2xl text-[#c64d2d]" />
					<h2 className="mt-4 text-xl font-black">Fulfillment</h2>
					<p className="mt-2 text-sm leading-6 text-[#6f6b63]">Advance orders from pending to delivered.</p>
				</Link>
			</section>

			{recentProducts.length > 0 && (
				<section className="card p-6">
					<div className="flex items-center justify-between gap-4">
						<div>
							<p className="eyebrow">Recent listings</p>
							<h2 className="mt-2 text-2xl font-black">Latest products</h2>
						</div>
						<Link to="/seller/products" className="btn-ghost">View all</Link>
					</div>
					<div className="mt-6 grid gap-3">
						{recentProducts.map(product => (
							<Link key={product.id} to={`/seller/products/${product.id}/edit`} className="grid grid-cols-[72px_1fr_auto] items-center gap-4 rounded-lg border border-[#eeeae2] bg-[#faf9f6] p-3 hover:bg-white">
								<div className="h-[72px] w-[72px] overflow-hidden rounded-md bg-[#ebe6dc]">
									{productImage(product) ? <img src={productImage(product)} alt={product.name} className="h-full w-full object-cover" /> : null}
								</div>
								<div>
									<p className="font-black">{product.name}</p>
									<p className="text-sm text-[#6f6b63]">{product.quantity} in stock</p>
								</div>
								<p className="font-black">{money(product.price)}</p>
							</Link>
						))}
					</div>
				</section>
			)}
		</div>
	);
}
