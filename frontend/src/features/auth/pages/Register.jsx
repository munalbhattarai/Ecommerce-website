import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { FiArrowRight, FiBriefcase, FiLock, FiMail, FiShoppingBag, FiUser } from "react-icons/fi";
import { registerRequest } from "../api/authApi";
import { registerSchema } from "../validation/authSchema";

export default function Register() {
	const navigate = useNavigate();
	const [serverError, setServerError] = useState("");
	const { register, handleSubmit, watch, formState: { errors, isSubmitting } } = useForm({
		resolver: zodResolver(registerSchema),
		defaultValues: { role: "BUYER" }
	});
	const selectedRole = watch("role");

	const onSubmit = async data => {
		try {
			setServerError("");
			await registerRequest(data);
			navigate("/login", {
				state: { flash: { type: "success", message: "Account created successfully. Sign in to continue." } }
			});
		} catch (error) {
			setServerError(error?.response?.data?.detail || "Registration failed. Please try again.");
		}
	};

	return (
		<div className="grid min-h-[calc(100vh-10rem)] gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-stretch">
			<section className="card flex flex-col justify-center p-6 sm:p-10">
				<div className="mx-auto w-full max-w-2xl">
					<div className="mb-8">
						<p className="eyebrow">Join MyShop</p>
						<h1 className="mt-2 text-4xl font-black">Create your account</h1>
						<p className="mt-3 text-[#6f6b63]">
							Already registered? <Link to="/login" className="font-black text-[#c64d2d]">Sign in</Link>
						</p>
					</div>

					{serverError && <div className="mb-5 rounded-lg border border-rose-200 bg-rose-50 p-4 text-sm font-bold text-rose-700">{serverError}</div>}

					<form onSubmit={handleSubmit(onSubmit)} className="grid gap-5">
						<div>
							<label className="label">Account type</label>
							<div className="grid gap-3 sm:grid-cols-2">
								<label className={`cursor-pointer rounded-lg border p-4 ${selectedRole === "BUYER" ? "border-[#141414] bg-[#141414] text-white" : "border-[#dedbd2] bg-white"}`}>
									<input type="radio" value="BUYER" {...register("role")} className="sr-only" />
									<FiShoppingBag className="text-xl" />
									<span className="mt-3 block font-black">Buyer</span>
									<span className={`mt-1 block text-sm ${selectedRole === "BUYER" ? "text-white/65" : "text-[#6f6b63]"}`}>Shop and place orders</span>
								</label>
								<label className={`cursor-pointer rounded-lg border p-4 ${selectedRole === "SELLER" ? "border-[#141414] bg-[#141414] text-white" : "border-[#dedbd2] bg-white"}`}>
									<input type="radio" value="SELLER" {...register("role")} className="sr-only" />
									<FiBriefcase className="text-xl" />
									<span className="mt-3 block font-black">Seller</span>
									<span className={`mt-1 block text-sm ${selectedRole === "SELLER" ? "text-white/65" : "text-[#6f6b63]"}`}>List products and fulfill orders</span>
								</label>
							</div>
							{errors.role && <p className="mt-1 text-xs font-bold text-rose-600">{errors.role.message}</p>}
						</div>

						<div className="grid gap-5 sm:grid-cols-2">
							<div>
								<label className="label">Username</label>
								<div className="relative">
									<FiUser className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[#8f877b]" />
									<input type="text" placeholder="Choose a username" {...register("username")} className="input pl-10" />
								</div>
								{errors.username && <p className="mt-1 text-xs font-bold text-rose-600">{errors.username.message}</p>}
							</div>
							<div>
								<label className="label">Email</label>
								<div className="relative">
									<FiMail className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[#8f877b]" />
									<input type="email" placeholder="you@example.com" {...register("email")} className="input pl-10" />
								</div>
								{errors.email && <p className="mt-1 text-xs font-bold text-rose-600">{errors.email.message}</p>}
							</div>
						</div>

						<div className="grid gap-5 sm:grid-cols-2">
							<div>
								<label className="label">Password</label>
								<div className="relative">
									<FiLock className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[#8f877b]" />
									<input type="password" placeholder="At least 8 characters" {...register("password")} className="input pl-10" />
								</div>
								{errors.password && <p className="mt-1 text-xs font-bold text-rose-600">{errors.password.message}</p>}
							</div>
							<div>
								<label className="label">Confirm password</label>
								<div className="relative">
									<FiLock className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[#8f877b]" />
									<input type="password" placeholder="Repeat password" {...register("password2")} className="input pl-10" />
								</div>
								{errors.password2 && <p className="mt-1 text-xs font-bold text-rose-600">{errors.password2.message}</p>}
							</div>
						</div>

						<button type="submit" disabled={isSubmitting} className="btn-secondary w-full">
							{isSubmitting ? "Creating account..." : "Create account"}
							{!isSubmitting && <FiArrowRight />}
						</button>
					</form>
				</div>
			</section>

			<section className="hidden rounded-lg bg-[#141414] p-8 text-white lg:flex lg:flex-col lg:justify-between">
				<Link to="/" className="flex items-center gap-3">
					<span className="flex h-11 w-11 items-center justify-center rounded-md bg-white text-lg font-black text-[#141414]">M</span>
					<span className="text-xl font-black">MyShop</span>
				</Link>
				<div>
					<p className="text-xs font-black uppercase tracking-widest text-white/50">Buyer or seller</p>
					<h2 className="mt-4 text-5xl font-black leading-tight">One backend, two workflows.</h2>
					<p className="mt-5 leading-7 text-white/65">
						Buyer accounts can manage carts and orders. Seller accounts unlock product creation, inventory, and fulfillment tools.
					</p>
				</div>
				<p className="border-t border-white/15 pt-6 text-sm text-white/55">Role-based routing is applied after login.</p>
			</section>
		</div>
	);
}
