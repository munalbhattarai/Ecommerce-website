import { useNavigate } from 'react-router-dom';

import { useGetCartQuery } from '../../cart/api/cartApi';
import { usePlaceOrderMutation } from '../api/orderApi';
import { useState } from 'react';
import Loading from '../../../components/ui/Loading';
import ErrorMessage from '../../../components/ui/ErrorMessage';

export default function Checkout() {
	const [shippingAddress, setShippingAddress] = useState('');

	const navigate = useNavigate();

	const { data, isLoading, isError } = useGetCartQuery();

	const [placeOrder, { isLoading: isPlacingOrder, error }] =
		usePlaceOrderMutation();

	if (isLoading) {
		return <Loading message="Loading checkout..." />;
	}

	if (isError) {
		return <ErrorMessage message="Unable to load your cart." />;
	}

	const cartItems = data?.items ?? [];

	const total = cartItems.reduce(
		(sum, item) => sum + Number(item.product.price) * item.quantity,
		0
	);

	const handlePlaceOrder = async () => {
		if (!shippingAddress.trim()) {
			return;
		}

		try {
			const order = await placeOrder({
				shipping_address: shippingAddress
			}).unwrap();

			navigate(`/orders/${order.id}`);
		} catch (error) {
			console.error('Order placement failed:', error);
		}
	};

	return (
		<div className="mx-auto max-w-4xl p-6">
			<h1 className="mb-6 text-3xl font-bold">Checkout</h1>

			{/* Order Summary */}

			<div className="mb-6">
				<label htmlFor="shipping-address" className="mb-2 block font-semibold">
					Shipping Address
				</label>

				<textarea
					id="shipping-address"
					value={shippingAddress}
					onChange={e => setShippingAddress(e.target.value)}
					placeholder="Enter your complete shipping address"
					rows={4}
					className="w-full rounded-md border p-3"
				/>
			</div>

			<div className="rounded-lg border p-6">
				<h2 className="mb-4 text-xl font-semibold">Order Summary</h2>

				{cartItems.map(item => (
					<div key={item.id} className="flex justify-between border-b py-3">
						<span>
							{item.product.name}
							{' × '}
							{item.quantity}
						</span>

						<span>Rs. {Number(item.product.price) * item.quantity}</span>
					</div>
				))}

				<div className="mt-4 flex justify-between text-xl font-bold">
					<span>Total</span>

					<span>Rs. {total}</span>
				</div>
			</div>

			{/* Backend Error */}

			{error && (
				<p className="mt-4 text-red-500">
					Failed to place order. Please try again.
				</p>
			)}

			{/* Place Order */}

			<button
				onClick={handlePlaceOrder}
				disabled={
					isPlacingOrder || cartItems.length === 0 || !shippingAddress.trim()
				}
				className="mt-6 rounded-md bg-black px-6 py-3 text-white disabled:opacity-50"
			>
				{isPlacingOrder ? 'Placing Order...' : 'Place Order'}
			</button>
		</div>
	);
}
