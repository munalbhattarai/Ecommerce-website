import { Link, NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import { FiMenu, FiSearch, FiShoppingBag, FiUser, FiX } from "react-icons/fi";
import useAuth from "../../hooks/useAuth";

const navClass = ({ isActive }) =>
	`rounded-md px-3 py-2 text-sm font-extrabold transition ${
		isActive ? "bg-[#141414] text-white" : "text-[#5f5a52] hover:bg-[#eeeae2] hover:text-[#141414]"
	}`;

export default function Navbar() {
	const navigate = useNavigate();
	const [searchTerm, setSearchTerm] = useState("");
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
	const { isAuthenticated, user, signOut } = useAuth();
	const isSeller = user?.role === "SELLER";

	const handleSearch = event => {
		event.preventDefault();
		const query = searchTerm.trim();
		if (!query) return;
		setIsMobileMenuOpen(false);
		navigate(`/products?search=${encodeURIComponent(query)}`);
	};

	const links = isSeller
		? [
			{ to: "/seller", label: "Dashboard" },
			{ to: "/seller/products", label: "Products" },
			{ to: "/seller/orders", label: "Orders" }
		]
		: [
			{ to: "/products", label: "Shop" },
			...(isAuthenticated ? [
				{ to: "/cart", label: "Cart" },
				{ to: "/orders", label: "Orders" }
			] : [])
		];

	return (
		<header className="sticky top-0 z-50 border-b border-[#dedbd2] bg-[#f5f3ee]/95">
			<div className="mx-auto flex max-w-[1320px] items-center gap-4 px-4 py-3 sm:px-6 lg:px-8">
				<Link to={isSeller ? "/seller" : "/"} className="flex items-center gap-3">
					<span className="flex h-10 w-10 items-center justify-center rounded-md bg-[#141414] text-lg font-black text-white">
						M
					</span>
					<span className="text-lg font-black tracking-wide">MyShop</span>
				</Link>

				<nav className="hidden items-center gap-1 md:flex">
					{links.map(link => (
						<NavLink key={link.to} to={link.to} className={navClass}>
							{link.label}
						</NavLink>
					))}
				</nav>

				{!isSeller && (
					<form onSubmit={handleSearch} className="ml-auto hidden max-w-sm flex-1 items-center rounded-md border border-[#dedbd2] bg-white px-3 py-2 md:flex">
						<FiSearch className="text-[#8b857b]" />
						<input
							value={searchTerm}
							onChange={event => setSearchTerm(event.target.value)}
							placeholder="Search products"
							className="ml-2 w-full bg-transparent text-sm outline-none placeholder:text-[#9d978d]"
						/>
					</form>
				)}

				<div className="ml-auto flex items-center gap-2 md:ml-0">
					{!isSeller && (
						<Link to="/cart" className="btn-ghost h-10 min-h-10 px-3" aria-label="Cart">
							<FiShoppingBag />
							<span className="hidden sm:inline">Cart</span>
						</Link>
					)}

					{isAuthenticated ? (
						<button onClick={signOut} className="btn-primary h-10 min-h-10 px-3">
							<FiUser />
							<span className="hidden sm:inline">Logout</span>
						</button>
					) : (
						<div className="hidden items-center gap-2 sm:flex">
							<Link to="/login" className="btn-ghost h-10 min-h-10">Log in</Link>
							<Link to="/register" className="btn-secondary h-10 min-h-10">Sign up</Link>
						</div>
					)}

					<button
						onClick={() => setIsMobileMenuOpen(value => !value)}
						className="btn-ghost h-10 min-h-10 px-3 md:hidden"
						aria-label="Open menu"
					>
						{isMobileMenuOpen ? <FiX /> : <FiMenu />}
					</button>
				</div>
			</div>

			{isMobileMenuOpen && (
				<div className="border-t border-[#dedbd2] bg-[#f5f3ee] px-4 py-4 md:hidden">
					{!isSeller && (
						<form onSubmit={handleSearch} className="mb-4 flex items-center rounded-md border border-[#dedbd2] bg-white px-3 py-2">
							<FiSearch className="text-[#8b857b]" />
							<input
								value={searchTerm}
								onChange={event => setSearchTerm(event.target.value)}
								placeholder="Search products"
								className="ml-2 w-full bg-transparent text-sm outline-none"
							/>
						</form>
					)}
					<div className="grid gap-2">
						{links.map(link => (
							<NavLink key={link.to} to={link.to} onClick={() => setIsMobileMenuOpen(false)} className={navClass}>
								{link.label}
							</NavLink>
						))}
						{!isAuthenticated && (
							<>
								<Link to="/login" onClick={() => setIsMobileMenuOpen(false)} className="btn-ghost mt-2">Log in</Link>
								<Link to="/register" onClick={() => setIsMobileMenuOpen(false)} className="btn-secondary">Sign up</Link>
							</>
						)}
					</div>
				</div>
			)}
		</header>
	);
}
