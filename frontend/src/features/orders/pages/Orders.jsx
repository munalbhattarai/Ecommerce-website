import { Link } from "react-router-dom";
import { FiArrowRight, FiClock, FiPackage } from "react-icons/fi";
import { useGetOrdersQuery } from "../api/OrderApi";
import Loading from "../../../components/ui/Loading";
import ErrorMessage from "../../../components/ui/ErrorMessage";
import EmptyState from "../../../components/ui/EmptyState";
import { listFromResponse, money, readableStatus, statusTone } from "../../../lib/formatters";

export default function Orders() {
	const { data, isLoading, isError } = useGetOrdersQuery();

	if (isLoading) return <Loading message="Loading your orders..." />;
	if (isError) return <ErrorMessage message="Unable to load your orders." />;

	const orders = listFromResponse(data);

	return (
		<div className="page-shell">
			<section className="border-b border-[#dedbd2] pb-8">
				<p className="eyebrow">History</p>
				<h1 className="mt-2 text-4xl font-black sm:text-5xl">My orders</h1>
			</section>

			{orders.length === 0 ? (
				<div className="card p-8">
					<EmptyState message="You haven't placed any orders yet." />
					<div className="mt-6 flex justify-center">
						<Link to="/products" className="btn-primary">Start shopping</Link>
					</div>
				</div>
			) : (
				<div className="grid gap-4">
					{orders.map(order => (
						<Link key={order.id} to={`/orders/${order.id}`} className="card grid gap-5 p-5 hover:-translate-y-0.5 sm:grid-cols-[1fr_auto] sm:items-center">
							<div className="flex items-start gap-4">
								<span className="flex h-12 w-12 items-center justify-center rounded-md bg-[#141414] text-white">
									<FiPackage />
								</span>
								<div>
									<div className="flex flex-wrap items-center gap-3">
										<h2 className="text-lg font-black">Order #{order.id}</h2>
										<span className={`inline-flex items-center gap-1.5 rounded-md border px-2.5 py-1 text-xs font-black uppercase tracking-widest ${statusTone(order.status)}`}>
											<FiClock />
											{readableStatus(order.status)}
										</span>
									</div>
									<p className="mt-1 text-sm text-[#6f6b63]">
										Placed {new Date(order.created_at).toLocaleDateString()}
									</p>
								</div>
							</div>
							<div className="flex items-center justify-between gap-5 sm:justify-end">
								<p className="text-xl font-black">{money(order.total_amount)}</p>
								<span className="btn-ghost h-10 min-h-10">Details <FiArrowRight /></span>
							</div>
						</Link>
					))}
				</div>
			)}
		</div>
	);
}
