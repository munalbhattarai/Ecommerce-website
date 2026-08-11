export default function ErrorMessage({ message = "Something went wrong." }) {
	return (
		<div className="flex min-h-40 items-center justify-center rounded-lg border border-rose-200 bg-rose-50 px-6 py-10">
			<p className="text-sm font-bold text-rose-700">{message}</p>
		</div>
	);
}
