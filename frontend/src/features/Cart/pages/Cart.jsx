import { Link } from 'react-router-dom';
import { useGetCartQuery } from '../api/cartApi';
import CartItem from '../components/CartItem';

export default function Cart() {
	const { data, isLoading, isError } = useGetCartQuery();

	if (isLoading) {
		return <div className="p-6">Loading cart...</div>;
	}

	if (isError) {
		return <div className="p-6">Failed to load cart.</div>;
	}

	const cartItems = data?.items ?? [];

	const total = cartItems.reduce(
		(sum, item) => sum + Number(item.product.price) * item.quantity,
		0
	);

	return (
		<div className="mx-auto max-w-6xl p-6">
			<h1 className="mb-6 text-3xl font-bold">Your Cart</h1>

			{cartItems.length === 0 ? (
				<p>Your cart is empty.</p>
			) : (
				<>
					<div>
						{cartItems.map(item => (
							<CartItem key={item.id} item={item} />
						))}
					</div>

					<div className="mt-8 flex justify-end">
						<div>
							<h2 className="text-xl font-bold">Total: Rs. {total}</h2>

							<Link
								to="/checkout"
								className="mt-4 inline-block rounded-md bg-black px-6 py-3 text-white"
							>
								Checkout
							</Link>
						</div>
					</div>
				</>
			)}
		</div>
	);
}
