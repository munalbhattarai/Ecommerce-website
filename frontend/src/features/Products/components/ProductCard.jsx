import { Link } from "react-router-dom";
import { FiShoppingBag } from "react-icons/fi";
import { useAddToCartMutation } from "../../Cart/api/CartApi";
import { money, productImage } from "../../../lib/formatters";

export default function ProductCard({ product }) {
	const imageUrl = productImage(product);
	const isOutOfStock = Number(product.quantity) <= 0 || !product.is_available;
	const [addToCart, { isLoading }] = useAddToCartMutation();

	const handleAdd = event => {
		event.preventDefault();
		if (isOutOfStock || isLoading) return;
		addToCart({ product_id: product.id, quantity: 1 });
	};

	return (
		<article className="group flex min-h-full flex-col overflow-hidden rounded-lg border border-[#dedbd2] bg-white shadow-[0_18px_45px_rgb(20_20_20/0.06)]">
			<Link to={`/products/${product.id}/`} className="block">
				<div className="relative aspect-[4/5] bg-[#ebe6dc]">
					{imageUrl ? (
						<img
							src={imageUrl}
							alt={product.name}
							className={`h-full w-full object-cover transition duration-500 group-hover:scale-[1.03] ${isOutOfStock ? "opacity-60 grayscale" : ""}`}
						/>
					) : (
						<div className="flex h-full items-center justify-center text-sm font-bold text-[#8f877b]">
							No image
						</div>
					)}
					{isOutOfStock && (
						<span className="absolute left-3 top-3 rounded-md bg-[#141414] px-3 py-1 text-xs font-black uppercase tracking-widest text-white">
							Sold out
						</span>
					)}
				</div>
			</Link>

			<div className="flex flex-1 flex-col p-4">
				<div className="flex items-start justify-between gap-3">
					<div>
						<p className="text-xs font-black uppercase tracking-widest text-[#9a432d]">{product.brand}</p>
						<Link to={`/products/${product.id}/`}>
							<h2 className="mt-1 line-clamp-2 min-h-12 text-base font-black leading-6 hover:text-[#c64d2d]">
								{product.name}
							</h2>
						</Link>
					</div>
					<span className="rounded-md border border-[#dedbd2] px-2 py-1 text-xs font-bold text-[#6f6b63]">
						{product.quantity ?? 0}
					</span>
				</div>

				<p className="mt-2 line-clamp-1 text-sm text-[#6f6b63]">{product.model}</p>

				<div className="mt-auto flex items-center justify-between gap-3 pt-5">
					<p className="text-lg font-black">{money(product.price)}</p>
					<button
						onClick={handleAdd}
						disabled={isOutOfStock || isLoading}
						className="flex h-10 w-10 items-center justify-center rounded-md bg-[#141414] text-white hover:bg-[#c64d2d] disabled:bg-[#c9c3b8]"
						aria-label="Add to cart"
						title="Add to cart"
					>
						<FiShoppingBag />
					</button>
				</div>
			</div>
		</article>
	);
}
