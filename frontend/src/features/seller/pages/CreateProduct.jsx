import { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
    useCreateProductMutation,
    useGetCategoriesQuery,
} from "../api/sellerApi";

export default function CreateProduct() {

    const navigate = useNavigate();

    const [createProduct, { isLoading }] =
        useCreateProductMutation();

    const {
        data: categories,
        isLoading: categoriesLoading,
    } = useGetCategoriesQuery();

    const [form, setForm] = useState({
        name: "",
        price: "",
        model: "",
        specs: "",
        category: "",
    });

    const [image, setImage] = useState(null);

    const handleChange = (e) => {

        const { name, value } = e.target;

        setForm((previous) => ({
            ...previous,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        const formData = new FormData();

        formData.append("name", form.name);
        formData.append("price", form.price);
        formData.append("model", form.model);
        formData.append("specs", form.specs);
        formData.append("category", form.category);

        if (image) {
            formData.append("image", image);
        }

        try {

            await createProduct(formData).unwrap();

            navigate("/seller/products");

        } catch (error) {

            console.error(
                "Failed to create product:",
                error
            );

        }
    };

    return (
        <div className="mx-auto max-w-3xl p-6">

            <h1 className="mb-8 text-3xl font-bold">
                Add Product
            </h1>

            <form
                onSubmit={handleSubmit}
                className="space-y-5 rounded-2xl border p-6"
            >

                <div>
                    <label className="mb-2 block font-medium">
                        Product Name
                    </label>

                    <input
                        type="text"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        required
                        className="w-full rounded-lg border p-3"
                    />
                </div>

                <div>
                    <label className="mb-2 block font-medium">
                        Price
                    </label>

                    <input
                        type="number"
                        name="price"
                        value={form.price}
                        onChange={handleChange}
                        required
                        min="0"
                        className="w-full rounded-lg border p-3"
                    />
                </div>

                <div>
                    <label className="mb-2 block font-medium">
                        Model
                    </label>

                    <input
                        type="text"
                        name="model"
                        value={form.model}
                        onChange={handleChange}
                        className="w-full rounded-lg border p-3"
                    />
                </div>

                <div>
                    <label className="mb-2 block font-medium">
                        Specifications
                    </label>

                    <textarea
                        name="specs"
                        value={form.specs}
                        onChange={handleChange}
                        rows={5}
                        className="w-full rounded-lg border p-3"
                    />
                </div>

                <div>
                    <label className="mb-2 block font-medium">
                        Category
                    </label>

                    <select
                        name="category"
                        value={form.category}
                        onChange={handleChange}
                        required
                        disabled={categoriesLoading}
                        className="w-full rounded-lg border p-3"
                    >
                        <option value="">
                            Select category
                        </option>

                        {(categories?.results ?? categories ?? [])
                            .map((category) => (
                                <option
                                    key={category.id}
                                    value={category.id}
                                >
                                    {category.name}
                                </option>
                            ))}
                    </select>
                </div>

                <div>
                    <label className="mb-2 block font-medium">
                        Product Image
                    </label>

                    <input
                        type="file"
                        accept="image/*"
                        onChange={(e) =>
                            setImage(e.target.files[0])
                        }
                    />
                </div>

                <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full rounded-lg bg-black px-6 py-3 font-medium text-white disabled:opacity-50"
                >
                    {isLoading
                        ? "Creating..."
                        : "Create Product"}
                </button>

            </form>

        </div>
    );
}