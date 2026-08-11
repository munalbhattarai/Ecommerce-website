import { Link, useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import { FiArrowLeft, FiMinus, FiPlus, FiShield, FiShoppingBag, FiTruck } from "react-icons/fi";
import { useGetProductQuery } from "../api/ProductApi";
import { useAddToCartMutation } from "../../Cart/api/CartApi";
import Loading from "../../../components/ui/Loading";
import ErrorMessage from "../../../components/ui/ErrorMessage";
import { money, productImage } from "../../../lib/formatters";

export default function ProductDetails() {
	const [quantity, setQuantity] = useState(1);
	const [message, setMessage] = useState("");
	const navigate = useNavigate();
	const { id } = useParams();
	const { data: product, isLoading, isError } = useGetProductQuery(id);
	const [addToCart, { isLoading: isAdding }] = useAddToCartMutation();

	if (isLoading) return <Loading message="Loading product details..." />;
	if (isError || !product) return <ErrorMessage message="Product not found. It might have been removed." />;

	const imageUrl = productImage(product);
	const isOutOfStock = Number(product.quantity) <= 0 || !product.is_available;

	const handleAddToCart = async shouldCheckout => {
		if (isOutOfStock) return;
		setMessage("");
		try {
			await addToCart({ product_id: product.id, quantity }).unwrap();
			if (shouldCheckout) {
				navigate("/cart");
			} else {
				setMessage("Added to cart.");
			}
		} catch {
			setMessage("Unable to add this product to cart. Please sign in and try again.");
		}
	};

	return (
		<div className="page-shell">
			<Link to="/products" className="w-fit text-sm font-black text-[#6f6b63] hover:text-[#141414]">
				<FiArrowLeft className="mr-2 inline" />
				Back to collection
			</Link>

			<section className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
				<div className="overflow-hidden rounded-lg border border-[#dedbd2] bg-white">
					<div className="aspect-[4/5] bg-[#ebe6dc]">
						{imageUrl ? (
							<img src={imageUrl} alt={product.name} className={`h-full w-full object-cover ${isOutOfStock ? "opacity-60 grayscale" : ""}`} />
						) : (
							<div className="flex h-full items-center justify-center text-[#8f877b]">No image available</div>
						)}
					</div>
				</div>

				<div className="card h-fit p-6 sm:p-8">
					<div className="flex flex-wrap items-center gap-2">
						<span className="rounded-md bg-[#f0e3dc] px-3 py-1 text-xs font-black uppercase tracking-widest text-[#9a432d]">
							{product.brand}
						</span>
						<span className="rounded-md border border-[#dedbd2] px-3 py-1 text-xs font-black uppercase tracking-widest text-[#6f6b63]">
							{product.model || "Product"}
						</span>
					</div>

					<h1 className="mt-5 text-4xl font-black leading-tight sm:text-5xl">{product.name}</h1>
					<p className="mt-5 text-3xl font-black text-[#c64d2d]">{money(product.price)}</p>
					<p className="mt-6 leading-8 text-[#5f5a52]">{product.description}</p>

					<div className="mt-8 grid gap-3 sm:grid-cols-2">
						<div className="rounded-lg border border-[#dedbd2] bg-[#faf9f6] p-4">
							<p className="text-xs font-black uppercase tracking-widest text-[#7c756a]">Availability</p>
							<p className={`mt-2 font-black ${isOutOfStock ? "text-rose-600" : "text-emerald-700"}`}>
								{isOutOfStock ? "Out of stock" : `${product.quantity} in stock`}
							</p>
						</div>
						<div className="rounded-lg border border-[#dedbd2] bg-[#faf9f6] p-4">
							<p className="text-xs font-black uppercase tracking-widest text-[#7c756a]">Seller</p>
							<p className="mt-2 font-black">{product.seller ?? "Verified seller"}</p>
						</div>
					</div>

					<div className="mt-8 flex flex-wrap items-center gap-4">
						<div className="flex items-center rounded-md border border-[#dedbd2] bg-white">
							<button onClick={() => setQuantity(Math.max(1, quantity - 1))} disabled={isOutOfStock || quantity <= 1} className="flex h-11 w-11 items-center justify-center">
								<FiMinus />
							</button>
							<span className="min-w-12 text-center font-black">{quantity}</span>
							<button onClick={() => setQuantity(Math.min(Number(product.quantity), quantity + 1))} disabled={isOutOfStock || quantity >= Number(product.quantity)} className="flex h-11 w-11 items-center justify-center">
								<FiPlus />
							</button>
						</div>
						<button onClick={() => handleAddToCart(false)} disabled={isAdding || isOutOfStock} className="btn-primary flex-1">
							<FiShoppingBag />
							{isAdding ? "Adding..." : "Add to cart"}
						</button>
						<button onClick={() => handleAddToCart(true)} disabled={isAdding || isOutOfStock} className="btn-secondary flex-1">
							Buy now
						</button>
					</div>

					{message && <p className="mt-4 text-sm font-bold text-[#9a432d]">{message}</p>}

					<div className="mt-8 grid gap-3 border-t border-[#dedbd2] pt-6 sm:grid-cols-2">
						<p className="flex items-center gap-2 text-sm font-bold text-[#6f6b63]"><FiTruck /> Delivery estimate shown at checkout</p>
						<p className="flex items-center gap-2 text-sm font-bold text-[#6f6b63]"><FiShield /> Secure account checkout</p>
					</div>
				</div>
			</section>
		</div>
	);
}
