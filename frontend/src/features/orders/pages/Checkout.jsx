import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiCheckCircle, FiMapPin, FiPackage, FiShield } from "react-icons/fi";
import { useGetCartQuery } from "../../Cart/api/CartApi";
import { usePlaceOrderMutation } from "../api/OrderApi";
import Loading from "../../../components/ui/Loading";
import ErrorMessage from "../../../components/ui/ErrorMessage";
import { money, productImage } from "../../../lib/formatters";

export default function Checkout() {
	const [shippingAddress, setShippingAddress] = useState("");
	const navigate = useNavigate();
	const { data, isLoading, isError } = useGetCartQuery();
	const [placeOrder, { isLoading: isPlacingOrder, error }] = usePlaceOrderMutation();

	if (isLoading) return <Loading message="Preparing checkout..." />;
	if (isError) return <ErrorMessage message="Unable to load your cart." />;

	const cartItems = data?.items ?? [];
	const subtotal = cartItems.reduce((sum, item) => sum + Number(item.product.price) * item.quantity, 0);
	const shippingCost = subtotal > 0 ? 250 : 0;
	const grandTotal = subtotal + shippingCost;

	const handlePlaceOrder = async () => {
		if (!shippingAddress.trim()) return;
		try {
			const result = await placeOrder({ shipping_address: shippingAddress }).unwrap();
			navigate(`/orders/${result.order_id}`, {
				state: { flash: { type: "success", message: "Order placed successfully." } }
			});
		} catch (err) {
			console.error("Order placement failed:", err);
		}
	};

	return (
		<div className="page-shell">
			<section className="border-b border-[#dedbd2] pb-8">
				<p className="eyebrow">Checkout</p>
				<h1 className="mt-2 text-4xl font-black sm:text-5xl">Place your order</h1>
				<p className="mt-3 text-[#6f6b63]">Cash on delivery is selected by default for this backend.</p>
			</section>

			<div className="grid gap-8 lg:grid-cols-[1fr_390px]">
				<div className="grid gap-6">
					<section className="card p-6">
						<h2 className="flex items-center gap-2 text-xl font-black"><FiMapPin className="text-[#c64d2d]" /> Shipping address</h2>
						<textarea
							value={shippingAddress}
							onChange={event => setShippingAddress(event.target.value)}
							placeholder="Street, city, landmark, phone number"
							rows={5}
							className="input mt-5 resize-none"
						/>
					</section>

					<section className="card p-6">
						<h2 className="flex items-center gap-2 text-xl font-black"><FiShield className="text-[#c64d2d]" /> Payment</h2>
						<div className="mt-5 flex items-center gap-4 rounded-lg border border-[#dedbd2] bg-[#faf9f6] p-4">
							<span className="flex h-11 w-11 items-center justify-center rounded-md bg-[#141414] text-white">
								<FiCheckCircle />
							</span>
							<div>
								<p className="font-black">Cash on Delivery</p>
								<p className="text-sm text-[#6f6b63]">Pay when your products arrive.</p>
							</div>
						</div>
					</section>

					{error && (
						<div className="rounded-lg border border-rose-200 bg-rose-50 p-4 text-sm font-bold text-rose-700">
							Failed to place order. Please check your details and try again.
						</div>
					)}

					<button onClick={handlePlaceOrder} disabled={isPlacingOrder || cartItems.length === 0 || !shippingAddress.trim()} className="btn-primary w-full">
						{isPlacingOrder ? "Placing order..." : "Confirm order"}
					</button>
				</div>

				<aside className="card h-fit p-6">
					<h2 className="flex items-center gap-2 text-xl font-black"><FiPackage className="text-[#c64d2d]" /> Summary</h2>
					<div className="mt-6 grid max-h-[320px] gap-4 overflow-y-auto pr-1">
						{cartItems.map(item => (
							<div key={item.id} className="grid grid-cols-[64px_1fr_auto] items-center gap-3 border-b border-[#eeeae2] pb-4 last:border-0">
								<div className="h-16 w-16 overflow-hidden rounded-md bg-[#ebe6dc]">
									{productImage(item.product) && <img src={productImage(item.product)} alt={item.product.name} className="h-full w-full object-cover" />}
								</div>
								<div>
									<p className="line-clamp-1 font-black">{item.product.name}</p>
									<p className="text-sm text-[#6f6b63]">Qty {item.quantity}</p>
								</div>
								<p className="font-black">{money(Number(item.product.price) * item.quantity)}</p>
							</div>
						))}
					</div>
					<div className="mt-6 grid gap-3 border-t border-[#dedbd2] pt-5">
						<div className="flex justify-between text-[#6f6b63]"><span>Subtotal</span><span className="font-black text-[#141414]">{money(subtotal)}</span></div>
						<div className="flex justify-between text-[#6f6b63]"><span>Shipping</span><span className="font-black text-[#141414]">{money(shippingCost)}</span></div>
						<div className="flex justify-between text-lg"><span className="font-black">Total</span><span className="font-black text-[#c64d2d]">{money(grandTotal)}</span></div>
					</div>
				</aside>
			</div>
		</div>
	);
}
