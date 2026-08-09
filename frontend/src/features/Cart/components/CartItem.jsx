import { useUpdateCartItemMutation } from '../api/cartApi';
import { useDeleteCartItemMutation } from '../api/cartApi';

export default function CartItem({ item }) {
	const [updateQuantity, { isLoading: isUpdating }] =
		useUpdateCartItemMutation();

	const [deleteItem, { isLoading: isDeleting }] = useDeleteCartItemMutation();

	const increaseQuantity = () => {
		updateQuantity({
			id: item.id,
			quantity: item.quantity + 1
		});
	};

	const decreaseQuantity = () => {
		if (item.quantity === 1) {
			deleteItem(item.id);
			return;
		}

		updateQuantity({
			id: item.id,
			quantity: item.quantity - 1
		});
	};

	return (
		<div className="flex items-center justify-between border-b py-4">
			{/* Product */}

			<div>
				<h2 className="font-semibold">{item.product.name}</h2>

				<p className="text-sm text-gray-500">Rs. {item.product.price}</p>
			</div>

			{/* Quantity */}

			<div className="flex items-center gap-3">
				<button
					onClick={decreaseQuantity}
					disabled={isUpdating || isDeleting}
					className="rounded border px-3 py-1"
				>
					-
				</button>

				<span>{item.quantity}</span>

				<button
					onClick={increaseQuantity}
					disabled={isUpdating}
					className="rounded border px-3 py-1"
				>
					+
				</button>
			</div>

			{/* Total */}

			<p className="font-semibold">Rs. {item.product.price * item.quantity}</p>

			{/* Delete */}

			<button
				onClick={() => deleteItem(item.id)}
				disabled={isDeleting}
				className="text-red-500"
			>
				{isDeleting ? 'Deleting...' : 'Delete'}
			</button>
		</div>
	);
}
