import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { FiArrowLeft, FiEdit2, FiEye, FiEyeOff, FiPackage, FiPlus, FiTrash2 } from "react-icons/fi";
import { useDeleteProductMutation, useGetSellerProductsQuery } from "../api/sellerApi";
import Loading from "../../../components/ui/Loading";
import ErrorMessage from "../../../components/ui/ErrorMessage";
import EmptyState from "../../../components/ui/EmptyState";
import { money, productImage } from "../../../lib/formatters";

export default function SellerProducts() {
	const navigate = useNavigate();
	const location = useLocation();
	const [feedback, setFeedback] = useState(location.state?.flash?.message || "");
	const { data: products = [], isLoading, isError } = useGetSellerProductsQuery();
	const [deleteProduct, { isLoading: isDeleting }] = useDeleteProductMutation();

	const handleDelete = async id => {
		if (!window.confirm("Delete this product? This action cannot be undone.")) return;
		try {
			await deleteProduct(id).unwrap();
			setFeedback("Product deleted successfully.");
		} catch (error) {
			console.error("Failed to delete product:", error);
		}
	};

	if (isLoading) return <Loading message="Loading your products..." />;
	if (isError) return <ErrorMessage message="Unable to load seller products." />;

	return (
		<div className="page-shell">
			<section className="flex flex-col gap-4 border-b border-[#dedbd2] pb-8 sm:flex-row sm:items-end sm:justify-between">
				<div>
					<p className="eyebrow">Catalog</p>
					<h1 className="mt-2 text-4xl font-black sm:text-5xl">My products</h1>
				</div>
				<div className="flex gap-3">
					<Link to="/seller" className="btn-ghost"><FiArrowLeft /> Dashboard</Link>
					<Link to="/seller/products/new" className="btn-secondary"><FiPlus /> Add product</Link>
				</div>
			</section>

			{feedback && <div className="rounded-lg border border-emerald-200 bg-emerald-50 p-4 text-sm font-bold text-emerald-700">{feedback}</div>}

			{products.length === 0 ? (
				<div className="card p-8">
					<EmptyState message="You haven't listed any products yet." />
					<div className="mt-6 flex justify-center">
						<button onClick={() => navigate("/seller/products/new")} className="btn-secondary"><FiPlus /> Add your first product</button>
					</div>
				</div>
			) : (
				<div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
					{products.map(product => (
						<article key={product.id} className="card overflow-hidden">
							<div className="aspect-video bg-[#ebe6dc]">
								{productImage(product) ? (
									<img src={productImage(product)} alt={product.name} className="h-full w-full object-cover" />
								) : (
									<div className="flex h-full items-center justify-center"><FiPackage className="text-4xl text-[#b6ad9f]" /></div>
								)}
							</div>
							<div className="p-5">
								<div className="flex items-start justify-between gap-3">
									<div>
										<p className="text-xs font-black uppercase tracking-widest text-[#9a432d]">{product.brand}</p>
										<h2 className="mt-1 line-clamp-1 text-lg font-black">{product.name}</h2>
									</div>
									<span className={`inline-flex items-center gap-1 rounded-md border px-2 py-1 text-xs font-black ${product.is_available ? "border-emerald-200 bg-emerald-50 text-emerald-700" : "border-[#dedbd2] bg-[#faf9f6] text-[#6f6b63]"}`}>
										{product.is_available ? <FiEye /> : <FiEyeOff />}
										{product.is_available ? "Live" : "Hidden"}
									</span>
								</div>
								<div className="mt-5 flex items-center justify-between">
									<p className="text-xl font-black">{money(product.price)}</p>
									<p className="rounded-md border border-[#dedbd2] px-3 py-1 text-sm font-bold text-[#6f6b63]">{product.quantity} stock</p>
								</div>
								<div className="mt-5 grid grid-cols-2 gap-3">
									<Link to={`/seller/products/${product.id}/edit`} className="btn-ghost"><FiEdit2 /> Edit</Link>
									<button onClick={() => handleDelete(product.id)} disabled={isDeleting} className="btn-danger"><FiTrash2 /> Delete</button>
								</div>
							</div>
						</article>
					))}
				</div>
			)}
		</div>
	);
}
