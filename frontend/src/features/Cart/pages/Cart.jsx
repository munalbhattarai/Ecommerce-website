import { Link } from "react-router-dom";
import { FiArrowRight, FiShield, FiShoppingBag } from "react-icons/fi";
import { useGetCartQuery } from "../api/CartApi";
import CartItem from "../components/CartItem";
import Loading from "../../../components/ui/Loading";
import ErrorMessage from "../../../components/ui/ErrorMessage";
import EmptyState from "../../../components/ui/EmptyState";
import { money } from "../../../lib/formatters";

export default function Cart() {
	const { data, isLoading, isError } = useGetCartQuery();

	if (isLoading) return <Loading message="Loading your cart..." />;
	if (isError) return <ErrorMessage message="Unable to load your cart. Please try again later." />;

	const cartItems = data?.items ?? [];
	const subtotal = cartItems.reduce((sum, item) => sum + Number(item.product.price) * item.quantity, 0);
	const shipping = cartItems.length ? 250 : 0;
	const grandTotal = subtotal + shipping;

	return (
		<div className="page-shell">
			<section className="flex flex-col gap-4 border-b border-[#dedbd2] pb-8 sm:flex-row sm:items-end sm:justify-between">
				<div>
					<p className="eyebrow">Shopping bag</p>
					<h1 className="mt-2 text-4xl font-black sm:text-5xl">Your cart</h1>
				</div>
				<Link to="/products" className="btn-ghost w-fit">
					<FiShoppingBag />
					Continue shopping
				</Link>
			</section>

			{cartItems.length === 0 ? (
				<div className="card p-8">
					<EmptyState message="Your cart is currently empty." />
					<div className="mt-6 flex justify-center">
						<Link to="/products" className="btn-primary">Browse products</Link>
					</div>
				</div>
			) : (
				<div className="grid gap-8 lg:grid-cols-[1fr_380px]">
					<div className="grid gap-4">
						{cartItems.map(item => <CartItem key={item.id} item={item} />)}
					</div>

					<aside className="card h-fit p-6">
						<h2 className="text-xl font-black">Order summary</h2>
						<div className="mt-6 grid gap-4 text-[#5f5a52]">
							<div className="flex justify-between">
								<span>Subtotal</span>
								<span className="font-black text-[#141414]">{money(subtotal)}</span>
							</div>
							<div className="flex justify-between">
								<span>Shipping</span>
								<span className="font-black text-[#141414]">{money(shipping)}</span>
							</div>
							<div className="flex justify-between border-t border-[#dedbd2] pt-5 text-lg">
								<span className="font-black text-[#141414]">Total</span>
								<span className="font-black text-[#c64d2d]">{money(grandTotal)}</span>
							</div>
						</div>
						<Link to="/checkout" className="btn-primary mt-8 w-full">
							Proceed to checkout
							<FiArrowRight />
						</Link>
						<p className="mt-4 flex items-center justify-center gap-2 text-sm font-bold text-[#6f6b63]">
							<FiShield className="text-emerald-700" />
							Secure checkout with cash on delivery
						</p>
					</aside>
				</div>
			)}
		</div>
	);
}
