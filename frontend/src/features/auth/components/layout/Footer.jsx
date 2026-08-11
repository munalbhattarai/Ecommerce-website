import { Link } from "react-router-dom";

export default function Footer() {
	return (
		<footer className="border-t border-[#dedbd2] bg-[#141414] text-white">
			<div className="mx-auto flex w-full max-w-[1320px] flex-col gap-5 px-4 py-8 text-sm sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
				<div>
					<p className="font-black tracking-wide">MyShop</p>
					<p className="mt-1 text-white/60">Modern commerce for buyers and sellers in Nepal.</p>
				</div>
				<div className="flex flex-wrap gap-4 text-white/70">
					<Link to="/products" className="hover:text-white">Products</Link>
					<Link to="/cart" className="hover:text-white">Cart</Link>
					<Link to="/seller" className="hover:text-white">Seller hub</Link>
				</div>
			</div>
		</footer>
	);
}
