import { Outlet, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import Navbar from "../features/auth/components/layout/Navbar";
import Footer from "../features/auth/components/layout/Footer";

export default function MainLayout() {
	const location = useLocation();
	const [flash, setFlash] = useState(location.state?.flash ?? null);
	const isHome = location.pathname === "/";

	useEffect(() => {
		setFlash(location.state?.flash ?? null);
	}, [location]);

	useEffect(() => {
		if (!flash) return;
		const timer = window.setTimeout(() => setFlash(null), 3600);
		return () => window.clearTimeout(timer);
	}, [flash]);

	return (
		<div className="min-h-screen bg-[#f5f3ee] text-[#141414]">
			<Navbar />

			{flash && (
				<div className="border-b border-[#dedbd2] bg-white px-4 py-3">
					<div className="mx-auto max-w-[1320px]">
						<span className="inline-flex rounded-md border border-emerald-200 bg-emerald-50 px-3 py-1.5 text-sm font-bold text-emerald-700">
							{flash.message}
						</span>
					</div>
				</div>
			)}

			{isHome ? (
				<main>
					<Outlet />
				</main>
			) : (
				<main className="mx-auto w-full max-w-[1320px] px-4 py-8 sm:px-6 lg:px-8">
					<Outlet />
				</main>
			)}

			<Footer />
		</div>
	);
}
