export default function Loading({ message = "Loading..." }) {
	return (
		<div className="card flex min-h-40 items-center justify-center px-6 py-10">
			<div className="flex items-center gap-3 text-sm font-black uppercase tracking-widest text-[#6f6b63]">
				<span className="h-3 w-3 animate-pulse rounded-full bg-[#c64d2d]" />
				{message}
			</div>
		</div>
	);
}
