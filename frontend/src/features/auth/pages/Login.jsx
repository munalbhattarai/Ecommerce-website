import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { FiArrowRight, FiLock, FiMail, FiShoppingBag } from "react-icons/fi";
import useAuth from "../hooks/useAuth";
import { loginSchema } from "../validation/authSchema";

export default function Login() {
	const { login } = useAuth();
	const location = useLocation();
	const [serverError, setServerError] = useState("");
	const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
		resolver: zodResolver(loginSchema)
	});

	const onSubmit = async data => {
		try {
			setServerError("");
			await login(data);
		} catch (error) {
			setServerError(error?.response?.data?.detail || "Login failed. Please check your credentials.");
		}
	};

	return (
		<div className="grid min-h-[calc(100vh-10rem)] gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-stretch">
			<section className="hidden rounded-lg bg-[#141414] p-8 text-white lg:flex lg:flex-col lg:justify-between">
				<Link to="/" className="flex items-center gap-3">
					<span className="flex h-11 w-11 items-center justify-center rounded-md bg-white text-lg font-black text-[#141414]">M</span>
					<span className="text-xl font-black">MyShop</span>
				</Link>
				<div>
					<p className="text-xs font-black uppercase tracking-widest text-white/50">One account</p>
					<h1 className="mt-4 text-5xl font-black leading-tight">Shop, sell, and track orders.</h1>
					<p className="mt-5 max-w-md leading-7 text-white/65">
						Sign in to access your cart, order history, or seller dashboard depending on your account role.
					</p>
				</div>
				<div className="grid grid-cols-3 gap-3 border-t border-white/15 pt-6 text-sm">
					<p><span className="block font-black">Cart</span><span className="text-white/55">Saved items</span></p>
					<p><span className="block font-black">Orders</span><span className="text-white/55">Live status</span></p>
					<p><span className="block font-black">Seller</span><span className="text-white/55">Catalog tools</span></p>
				</div>
			</section>

			<section className="card flex flex-col justify-center p-6 sm:p-10">
				<div className="mx-auto w-full max-w-md">
					<div className="mb-8">
						<p className="eyebrow">Welcome back</p>
						<h2 className="mt-2 text-4xl font-black">Sign in</h2>
						<p className="mt-3 text-[#6f6b63]">
							New here? <Link to="/register" className="font-black text-[#c64d2d]">Create an account</Link>
						</p>
					</div>

					{location.state?.flash && (
						<div className="mb-5 rounded-lg border border-emerald-200 bg-emerald-50 p-4 text-sm font-bold text-emerald-700">
							{location.state.flash.message}
						</div>
					)}
					{serverError && (
						<div className="mb-5 rounded-lg border border-rose-200 bg-rose-50 p-4 text-sm font-bold text-rose-700">
							{serverError}
						</div>
					)}

					<form onSubmit={handleSubmit(onSubmit)} className="grid gap-5">
						<div>
							<label className="label">Username</label>
							<div className="relative">
								<FiMail className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[#8f877b]" />
								<input type="text" placeholder="Enter your username" {...register("username")} className="input pl-10" />
							</div>
							{errors.username && <p className="mt-1 text-xs font-bold text-rose-600">{errors.username.message}</p>}
						</div>
						<div>
							<label className="label">Password</label>
							<div className="relative">
								<FiLock className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[#8f877b]" />
								<input type="password" placeholder="Your password" {...register("password")} className="input pl-10" />
							</div>
							{errors.password && <p className="mt-1 text-xs font-bold text-rose-600">{errors.password.message}</p>}
						</div>
						<button type="submit" disabled={isSubmitting} className="btn-primary w-full">
							{isSubmitting ? "Signing in..." : "Sign in"}
							{!isSubmitting && <FiArrowRight />}
						</button>
					</form>

					<div className="mt-8 flex items-center gap-3 rounded-lg border border-[#dedbd2] bg-[#faf9f6] p-4 text-sm text-[#6f6b63]">
						<FiShoppingBag className="shrink-0 text-[#c64d2d]" />
						Product, cart, order, and seller features use the connected Django backend.
					</div>
				</div>
			</section>
		</div>
	);
}
