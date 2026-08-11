import { useState } from "react";
import { Link } from "react-router-dom";
import { FiArrowLeft, FiArrowRight, FiCheckCircle, FiClock, FiMapPin, FiPackage } from "react-icons/fi";
import { useGetSellerOrdersQuery, usePatchSellerOrderMutation } from "../api/sellerApi";
import Loading from "../../../components/ui/Loading";
import ErrorMessage from "../../../components/ui/ErrorMessage";
import EmptyState from "../../../components/ui/EmptyState";
import { listFromResponse, money, readableStatus, statusTone } from "../../../lib/formatters";

const nextStatusMap = {
	PENDING: "PROCESSING",
	PROCESSING: "SHIPPED",
	SHIPPED: "DELIVERED"
};

export default function SellerOrders() {
	const { data, isLoading, isError } = useGetSellerOrdersQuery();
	const [feedback, setFeedback] = useState("");
	const [patchSellerOrder, { isLoading: isUpdating }] = usePatchSellerOrderMutation();
	const orders = listFromResponse(data);

	const handleAdvance = async order => {
		const nextStatus = nextStatusMap[order.status];
		if (!nextStatus) return;

		try {
			await patchSellerOrder({ id: order.id, status: nextStatus }).unwrap();
			setFeedback(`Order #${order.id} advanced to ${nextStatus}.`);
			setTimeout(() => setFeedback(""), 4000);
		} catch (error) {
			console.error("Failed to update order:", error);
		}
	};

	if (isLoading) return <Loading message="Loading seller orders..." />;
	if (isError) return <ErrorMessage message="Unable to load seller orders." />;

	return (
		<div className="page-shell">
			<section className="flex flex-col gap-4 border-b border-[#dedbd2] pb-8 sm:flex-row sm:items-end sm:justify-between">
				<div>
					<p className="eyebrow">Fulfillment</p>
					<h1 className="mt-2 text-4xl font-black sm:text-5xl">Seller orders</h1>
				</div>
				<Link to="/seller" className="btn-ghost w-fit"><FiArrowLeft /> Dashboard</Link>
			</section>

			{feedback && <div className="rounded-lg border border-emerald-200 bg-emerald-50 p-4 text-sm font-bold text-emerald-700">{feedback}</div>}

			{orders.length === 0 ? (
				<div className="card p-8">
					<EmptyState message="No orders received yet. Orders placed for your products will appear here." />
				</div>
			) : (
				<div className="grid gap-4">
					{orders.map(order => {
						const nextStatus = nextStatusMap[order.status];
						return (
							<article key={order.id} className="card p-5">
								<div className="grid gap-5 lg:grid-cols-[1fr_auto] lg:items-start">
									<div className="flex items-start gap-4">
										<span className="flex h-12 w-12 items-center justify-center rounded-md bg-[#141414] text-white">
											<FiPackage />
										</span>
										<div>
											<div className="flex flex-wrap items-center gap-3">
												<h2 className="text-lg font-black">Order #{order.id}</h2>
												<span className={`inline-flex rounded-md border px-2.5 py-1 text-xs font-black uppercase tracking-widest ${statusTone(order.status)}`}>
													{readableStatus(order.status)}
												</span>
											</div>
											<p className="mt-1 flex items-center gap-2 text-sm text-[#6f6b63]">
												<FiClock />
												{new Date(order.created_at).toLocaleString()}
											</p>
											{order.shipping_address && (
												<p className="mt-2 flex items-start gap-2 text-sm text-[#6f6b63]">
													<FiMapPin className="mt-0.5 shrink-0" />
													<span>{order.shipping_address}</span>
												</p>
											)}
										</div>
									</div>

									<div className="flex flex-col gap-3 lg:items-end">
										<p className="text-2xl font-black">{money(order.total_amount)}</p>
										{nextStatus ? (
											<button onClick={() => handleAdvance(order)} disabled={isUpdating} className="btn-secondary">
												{isUpdating ? "Updating..." : `Mark ${readableStatus(nextStatus)}`}
												<FiArrowRight />
											</button>
										) : (
											<span className="inline-flex items-center gap-2 rounded-md border border-emerald-200 bg-emerald-50 px-4 py-2 text-sm font-black text-emerald-700">
												<FiCheckCircle />
												Completed
											</span>
										)}
									</div>
								</div>
							</article>
						);
					})}
				</div>
			)}
		</div>
	);
}
