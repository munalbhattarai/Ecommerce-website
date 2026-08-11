import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { FiArrowLeft, FiMapPin, FiPackage, FiX } from "react-icons/fi";
import { useCancelOrderMutation, useGetOrderQuery } from "../api/OrderApi";
import Loading from "../../../components/ui/Loading";
import ErrorMessage from "../../../components/ui/ErrorMessage";
import { money, readableStatus, statusTone } from "../../../lib/formatters";

export default function OrderDetails() {
	const { id } = useParams();
	const navigate = useNavigate();
	const location = useLocation();
	const { data: order, isLoading, isError } = useGetOrderQuery(id);
	const [cancelOrder, { isLoading: isCancelling }] = useCancelOrderMutation();

	if (isLoading) return <Loading message="Loading order details..." />;
	if (isError || !order) return <ErrorMessage message="Order not found." />;

	const handleCancel = async () => {
		if (!window.confirm("Are you sure you want to cancel this order?")) return;
		try {
			await cancelOrder(order.id).unwrap();
			navigate("/orders", {
				state: { flash: { type: "success", message: "Order cancelled successfully." } }
			});
		} catch (error) {
			console.error("Failed to cancel order:", error);
		}
	};

	return (
		<div className="page-shell">
			{location.state?.flash && (
				<div className="rounded-lg border border-emerald-200 bg-emerald-50 p-4 text-sm font-bold text-emerald-700">
					{location.state.flash.message}
				</div>
			)}

			<div className="flex items-center justify-between">
				<Link to="/orders" className="text-sm font-black text-[#6f6b63] hover:text-[#141414]">
					<FiArrowLeft className="mr-2 inline" />
					Back to orders
				</Link>
				<span className={`inline-flex rounded-md border px-3 py-1.5 text-xs font-black uppercase tracking-widest ${statusTone(order.status)}`}>
					{readableStatus(order.status)}
				</span>
			</div>

			<section className="grid gap-8 lg:grid-cols-[1fr_380px]">
				<div className="card p-6">
					<p className="eyebrow">Order details</p>
					<h1 className="mt-2 text-4xl font-black">Order #{order.id}</h1>
					<h2 className="mt-8 flex items-center gap-2 text-xl font-black"><FiPackage className="text-[#c64d2d]" /> Items</h2>
					<div className="mt-5 grid gap-3">
						{order.items?.map((item, index) => (
							<div key={`${item.product}-${index}`} className="flex items-center justify-between gap-4 rounded-lg border border-[#eeeae2] bg-[#faf9f6] p-4">
								<div>
									<p className="font-black">{item.product}</p>
									<p className="text-sm text-[#6f6b63]">Qty {item.quantity} at {money(item.price)}</p>
								</div>
								<p className="font-black">{money(Number(item.price) * item.quantity)}</p>
							</div>
						))}
					</div>
				</div>

				<aside className="grid h-fit gap-5">
					<div className="card p-6">
						<h2 className="text-xl font-black">Summary</h2>
						<div className="mt-5 grid gap-4 text-[#6f6b63]">
							<div className="flex justify-between">
								<span>Status</span>
								<span className="font-black capitalize text-[#141414]">{readableStatus(order.status)}</span>
							</div>
							<div className="border-t border-[#dedbd2] pt-4">
								<p className="mb-2 flex items-center gap-2 font-black text-[#141414]"><FiMapPin className="text-[#c64d2d]" /> Shipping address</p>
								<p className="text-sm leading-6">{order.shipping_address}</p>
							</div>
							<div className="flex justify-between border-t border-[#dedbd2] pt-4 text-lg">
								<span className="font-black text-[#141414]">Total</span>
								<span className="font-black text-[#c64d2d]">{money(order.total_amount)}</span>
							</div>
						</div>
					</div>

					{String(order.status).toUpperCase() === "PENDING" && (
						<button onClick={handleCancel} disabled={isCancelling} className="btn-danger w-full">
							<FiX />
							{isCancelling ? "Cancelling..." : "Cancel order"}
						</button>
					)}
				</aside>
			</section>
		</div>
	);
}
