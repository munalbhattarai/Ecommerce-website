import { useEffect, useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { useGetProductQuery } from '../../Products/api/ProductApi';
import { useGetCategoriesQuery, useUpdateProductMutation } from '../api/sellerApi';
import Loading from '../../../components/ui/Loading';
import ErrorMessage from '../../../components/ui/ErrorMessage';
import {
	FiArrowLeft,
	FiUploadCloud,
	FiTag,
	FiPackage,
	FiDollarSign,
	FiList,
	FiSave
} from 'react-icons/fi';

const inputCls = 'w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-3 text-slate-900 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:ring-4 focus:ring-indigo-50 transition-all';
const labelCls = 'mb-1.5 block text-sm font-bold text-slate-700';

export default function EditProduct() {
	const { id } = useParams();
	const navigate = useNavigate();

	const { data: product, isLoading, isError } = useGetProductQuery(id);
	const { data: categories } = useGetCategoriesQuery();
	const [updateProduct, { isLoading: isSaving }] = useUpdateProductMutation();

	const [form, setForm] = useState({
		name: '', price: '', model: '', description: '',
		category: '', brand: '', slug: '', quantity: 0, is_available: true
	});

	const [imageFile, setImageFile] = useState(null);
	const [imagePreview, setImagePreview] = useState(null);
	const [formError, setFormError] = useState('');

	useEffect(() => {
		if (product) {
			setForm({
				name: product.name ?? '',
				price: product.price ?? '',
				model: product.model ?? '',
				description: product.description ?? '',
				category: product.category ?? '',
				brand: product.brand ?? '',
				slug: product.slug ?? '',
				quantity: product.quantity ?? 0,
				is_available: product.is_available ?? true
			});
			if (product.images || product.image) {
				setImagePreview(product.images || product.image);
			}
		}
	}, [product]);

	const handleChange = e => {
		const { name, value, type, checked } = e.target;
		setForm(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
	};

	const handleImageChange = e => {
		const file = e.target.files[0];
		if (file) {
			setImageFile(file);
			setImagePreview(URL.createObjectURL(file));
		}
	};

	const handleSubmit = async e => {
		e.preventDefault();
		setFormError('');

		const formData = new FormData();
		formData.append('name', form.name);
		formData.append('price', form.price);
		formData.append('model', form.model);
		formData.append('description', form.description);
		formData.append('category', form.category);
		formData.append('brand', form.brand);
		formData.append('slug', form.slug);
		formData.append('quantity', form.quantity);
		formData.append('is_available', form.is_available ? 'true' : 'false');
		if (imageFile) formData.append('images', imageFile);

		try {
			await updateProduct({ id, data: formData }).unwrap();
			navigate('/seller/products', {
				state: { flash: { type: 'success', message: 'Product updated successfully.' } }
			});
		} catch (error) {
			setFormError(error?.data?.detail || 'Failed to update product. Please try again.');
		}
	};

	if (isLoading) return <Loading message="Loading product..." />;
	if (isError || !product) return <ErrorMessage message="Unable to load product." />;

	return (
		<div className="animate-in fade-in duration-500 space-y-8">
			{/* Header */}
			<div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
				<div>
					<p className="text-sm font-bold uppercase tracking-widest text-indigo-600">Seller</p>
					<h1 className="mt-1 text-4xl font-black tracking-tight text-slate-900 sm:text-5xl">Edit Product</h1>
					<p className="mt-1 text-sm text-slate-500 font-medium line-clamp-1">{product.name}</p>
				</div>
				<Link
					to="/seller/products"
					className="group flex w-fit items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-bold text-slate-600 shadow-sm transition-all hover:border-slate-300"
				>
					<FiArrowLeft className="transition-transform group-hover:-translate-x-0.5" />
					Back to Products
				</Link>
			</div>

			{formError && (
				<div className="rounded-xl border border-rose-200 bg-rose-50 p-4 text-sm font-medium text-rose-700 shadow-sm animate-in slide-in-from-top-2">
					{formError}
				</div>
			)}

			<form onSubmit={handleSubmit} className="grid gap-8 lg:grid-cols-[1fr_360px]">
				{/* Left: Main Info */}
				<div className="space-y-6">
					{/* Basic Info */}
					<div className="rounded-2xl bg-white p-7 shadow-sm ring-1 ring-slate-200 space-y-6">
						<h2 className="flex items-center gap-3 text-lg font-black text-slate-900">
							<span className="flex h-8 w-8 items-center justify-center rounded-full bg-indigo-100 text-indigo-600"><FiTag /></span>
							Basic Information
						</h2>
						<div className="grid gap-5 sm:grid-cols-2">
							<div>
								<label className={labelCls}>Product Name <span className="text-rose-500">*</span></label>
								<input type="text" name="name" value={form.name} onChange={handleChange} required placeholder="Product name" className={inputCls} />
							</div>
							<div>
								<label className={labelCls}>Brand <span className="text-rose-500">*</span></label>
								<input type="text" name="brand" value={form.brand} onChange={handleChange} required placeholder="Brand" className={inputCls} />
							</div>
							<div>
								<label className={labelCls}>Model</label>
								<input type="text" name="model" value={form.model} onChange={handleChange} placeholder="Model" className={inputCls} />
							</div>
							<div>
								<label className={labelCls}>Slug <span className="text-rose-500">*</span></label>
								<input type="text" name="slug" value={form.slug} onChange={handleChange} required placeholder="url-slug" className={inputCls} />
							</div>
						</div>
					</div>

					{/* Description */}
					<div className="rounded-2xl bg-white p-7 shadow-sm ring-1 ring-slate-200 space-y-4">
						<h2 className="flex items-center gap-3 text-lg font-black text-slate-900">
							<span className="flex h-8 w-8 items-center justify-center rounded-full bg-violet-100 text-violet-600"><FiList /></span>
							Description
						</h2>
						<textarea
							name="description"
							value={form.description}
							onChange={handleChange}
							required
							rows={5}
							placeholder="Describe your product..."
							className={inputCls + ' resize-none'}
						/>
					</div>

					{/* Media */}
					<div className="rounded-2xl bg-white p-7 shadow-sm ring-1 ring-slate-200 space-y-4">
						<h2 className="flex items-center gap-3 text-lg font-black text-slate-900">
							<span className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 text-blue-600"><FiUploadCloud /></span>
							Product Image
						</h2>
						{imagePreview ? (
							<div className="space-y-3">
								<div className="relative overflow-hidden rounded-xl aspect-video">
									<img src={imagePreview} alt="Preview" className="h-full w-full object-cover" />
								</div>
								<label className="inline-flex cursor-pointer items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm font-bold text-slate-600 transition-all hover:border-indigo-200 hover:bg-indigo-50 hover:text-indigo-600">
									<FiUploadCloud />
									Replace Image
									<input type="file" accept="image/*" className="sr-only" onChange={handleImageChange} />
								</label>
							</div>
						) : (
							<label className="flex cursor-pointer flex-col items-center justify-center gap-3 rounded-xl border-2 border-dashed border-slate-200 bg-slate-50 p-10 text-center transition-all hover:border-indigo-300 hover:bg-indigo-50/30">
								<FiUploadCloud className="text-4xl text-slate-300" />
								<div>
									<p className="text-sm font-bold text-slate-700">Click to upload an image</p>
									<p className="text-xs text-slate-500 mt-1">JPG, PNG, WEBP up to 10MB</p>
								</div>
								<input type="file" accept="image/*" className="sr-only" onChange={handleImageChange} />
							</label>
						)}
					</div>
				</div>

				{/* Right: Sidebar */}
				<aside className="space-y-6">
					{/* Pricing */}
					<div className="rounded-2xl bg-white p-7 shadow-sm ring-1 ring-slate-200 space-y-4">
						<h2 className="flex items-center gap-3 text-lg font-black text-slate-900">
							<span className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-100 text-emerald-600"><FiDollarSign /></span>
							Pricing
						</h2>
						<div>
							<label className={labelCls}>Price (Rs.) <span className="text-rose-500">*</span></label>
							<input type="number" name="price" value={form.price} onChange={handleChange} required min="0" className={inputCls} />
						</div>
					</div>

					{/* Inventory */}
					<div className="rounded-2xl bg-white p-7 shadow-sm ring-1 ring-slate-200 space-y-4">
						<h2 className="flex items-center gap-3 text-lg font-black text-slate-900">
							<span className="flex h-8 w-8 items-center justify-center rounded-full bg-amber-100 text-amber-600"><FiPackage /></span>
							Inventory
						</h2>
						<div>
							<label className={labelCls}>Stock Quantity <span className="text-rose-500">*</span></label>
							<input type="number" name="quantity" value={form.quantity} onChange={handleChange} min="0" required className={inputCls} />
						</div>
						<label className="flex cursor-pointer items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 p-4 transition-all hover:border-indigo-200 hover:bg-indigo-50/40">
							<input
								type="checkbox"
								name="is_available"
								checked={form.is_available}
								onChange={handleChange}
								className="h-5 w-5 rounded accent-indigo-600"
							/>
							<div>
								<p className="text-sm font-bold text-slate-800">Available for sale</p>
								<p className="text-xs text-slate-500">Show this product in your storefront</p>
							</div>
						</label>
					</div>

					{/* Category */}
					<div className="rounded-2xl bg-white p-7 shadow-sm ring-1 ring-slate-200 space-y-4">
						<h2 className="text-lg font-black text-slate-900">Category</h2>
						<div>
							<label className={labelCls}>Select Category <span className="text-rose-500">*</span></label>
							<select name="category" value={form.category} onChange={handleChange} required className={inputCls}>
								<option value="">Choose a category...</option>
								{(categories?.results ?? categories ?? []).map(category => (
									<option key={category.id} value={category.id}>{category.name}</option>
								))}
							</select>
						</div>
					</div>

					{/* Submit */}
					<button
						type="submit"
						disabled={isSaving}
						className="group flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 px-6 py-4 text-base font-bold text-white shadow-lg shadow-indigo-600/20 transition-all hover:bg-indigo-700 hover:shadow-xl active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-70"
					>
						{isSaving ? (
							<span className="flex items-center gap-2">
								<div className="h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white" />
								Saving...
							</span>
						) : (
							<>
								<FiSave />
								Save Changes
							</>
						)}
					</button>
				</aside>
			</form>
		</div>
	);
}
