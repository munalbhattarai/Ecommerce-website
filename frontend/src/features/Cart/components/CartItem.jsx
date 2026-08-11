import { Link } from "react-router-dom";
import { FiMinus, FiPlus, FiTrash2 } from "react-icons/fi";
import { useDeleteCartItemMutation, useUpdateCartItemMutation } from "../api/CartApi";
import { money, productImage } from "../../../lib/formatters";

export default function CartItem({ item }) {
	const imageUrl = productImage(item.product);
	const [updateQuantity, { isLoading: isUpdating }] = useUpdateCartItemMutation();
	const [deleteItem, { isLoading: isDeleting }] = useDeleteCartItemMutation();

	const decreaseQuantity = () => {
		if (item.quantity === 1) {
			deleteItem(item.id);
			return;
		}
		updateQuantity({ id: item.id, quantity: item.quantity - 1 });
	};

	return (
		<div className="grid gap-4 rounded-lg border border-[#dedbd2] bg-white p-4 sm:grid-cols-[96px_1fr_auto] sm:items-center">
			<Link to={`/products/${item.product.id}/`} className="h-28 w-full overflow-hidden rounded-md bg-[#ebe6dc] sm:h-24 sm:w-24">
				{imageUrl ? (
					<img src={imageUrl} alt={item.product.name} className="h-full w-full object-cover" />
				) : (
					<div className="flex h-full items-center justify-center text-xs font-bold text-[#8f877b]">No image</div>
				)}
			</Link>

			<div>
				<p className="text-xs font-black uppercase tracking-widest text-[#9a432d]">{item.product.brand}</p>
				<Link to={`/products/${item.product.id}/`}>
					<h2 className="mt-1 text-lg font-black hover:text-[#c64d2d]">{item.product.name}</h2>
				</Link>
				<p className="mt-1 text-sm text-[#6f6b63]">{money(item.product.price)} each</p>
			</div>

			<div className="flex items-center justify-between gap-5 sm:justify-end">
				<div className="flex items-center rounded-md border border-[#dedbd2] bg-[#faf9f6]">
					<button onClick={decreaseQuantity} disabled={isUpdating || isDeleting} className="flex h-10 w-10 items-center justify-center">
						<FiMinus />
					</button>
					<span className="min-w-10 text-center text-sm font-black">{item.quantity}</span>
					<button onClick={() => updateQuantity({ id: item.id, quantity: item.quantity + 1 })} disabled={isUpdating} className="flex h-10 w-10 items-center justify-center">
						<FiPlus />
					</button>
				</div>
				<p className="min-w-28 text-right text-lg font-black">{money(Number(item.product.price) * item.quantity)}</p>
				<button onClick={() => deleteItem(item.id)} disabled={isDeleting} className="flex h-10 w-10 items-center justify-center rounded-md border border-rose-200 bg-rose-50 text-rose-600" aria-label="Remove item">
					<FiTrash2 />
				</button>
			</div>
		</div>
	);
}
