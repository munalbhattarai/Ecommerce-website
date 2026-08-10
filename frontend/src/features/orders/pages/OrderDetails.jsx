import { Link, useNavigate, useParams } from 'react-router-dom';

import { useGetOrderQuery, useCancelOrderMutation } from '../api/orderApi';

export default function OrderDetails() {
	const { id } = useParams();
	const navigate = useNavigate();

	const { data: order, isLoading, isError } = useGetOrderQuery(id);

	const [cancelOrder, { isLoading: isCancelling }] = useCancelOrderMutation();

	if (isLoading) {
		return <div className="p-6">Loading order...</div>;
	}

	if (isError) {
		return <div className="p-6">Order not found.</div>;
	}

	const handleCancel = async () => {
		const confirmed = window.confirm(
			'Are you sure you want to cancel this order?'
		);

		if (!confirmed) {
			return;
		}

		try {
			await cancelOrder(order.id).unwrap();
			navigate('/orders');
		} catch (error) {
			console.error('Failed to cancel order:', error);
		}
	};

	return (
		<div className="mx-auto max-w-5xl p-6">
			<div className="mb-6">
				<Link to="/orders" className="text-sm text-gray-500">
					← Back to Orders
				</Link>

				<h1 className="mt-3 text-3xl font-bold">Order #{order.id}</h1>
			</div>

			{/* Order Information */}

			<div className="mb-6 rounded-lg border p-6">
				<p>
					<strong>Status:</strong> {order.status}
				</p>

				<p className="mt-2">
					<strong>Shipping Address:</strong> {order.shipping_address}
				</p>

				<p className="mt-2">
					<strong>Total:</strong> Rs. {order.total_amount}
				</p>
			</div>

			{/* Order Items */}

			<div className="rounded-lg border p-6">
				<h2 className="mb-4 text-xl font-semibold">Items</h2>

				{order.items?.map(item => (
					<div key={item.id} className="flex justify-between border-b py-4">
						<div>
							<p className="font-semibold">{item.product_name}</p>

							<p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
						</div>

						<div>
							<p>Rs. {item.price}</p>

							<p className="font-semibold">
								Rs. {Number(item.price) * item.quantity}
							</p>
						</div>
					</div>
				))}
			</div>

			{/* Cancel */}

			{order.status !== 'cancelled' && (
				<button
					onClick={handleCancel}
					disabled={isCancelling}
					className="mt-6 rounded-md bg-red-600 px-6 py-3 text-white"
				>
					{isCancelling ? 'Cancelling...' : 'Cancel Order'}
				</button>
			)}
		</div>
	);
}
