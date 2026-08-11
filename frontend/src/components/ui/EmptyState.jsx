import { FiPackage } from "react-icons/fi";

export default function EmptyState({ message }) {
	return (
		<div className="flex min-h-40 flex-col items-center justify-center rounded-lg border border-dashed border-[#d8d2c7] bg-[#faf9f6] px-6 py-10 text-center">
			<FiPackage className="text-3xl text-[#b6ad9f]" />
			<p className="mt-3 text-sm font-bold text-[#6f6b63]">{message}</p>
		</div>
	);
}
