export const listFromResponse = data => data?.results ?? data ?? [];

export const productImage = product => product?.images || product?.image || "";

export const money = value =>
	`Rs. ${Number(value ?? 0).toLocaleString("en-NP", {
		maximumFractionDigits: 0
	})}`;

export const statusTone = status => {
	const key = String(status ?? "").toUpperCase();

	if (["DELIVERED", "COMPLETED"].includes(key)) {
		return "border-emerald-200 bg-emerald-50 text-emerald-700";
	}

	if (key === "CANCELLED") {
		return "border-rose-200 bg-rose-50 text-rose-700";
	}

	if (key === "SHIPPED") {
		return "border-cyan-200 bg-cyan-50 text-cyan-700";
	}

	if (key === "PROCESSING") {
		return "border-sky-200 bg-sky-50 text-sky-700";
	}

	return "border-amber-200 bg-amber-50 text-amber-700";
};

export const readableStatus = status =>
	String(status ?? "pending").replaceAll("_", " ").toLowerCase();
