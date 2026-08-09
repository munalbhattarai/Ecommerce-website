import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const cartApi = createApi({
    reducerPath: "cartApi",

    baseQuery: fetchBaseQuery({
        baseUrl: import.meta.env.VITE_API_URL,

        prepareHeaders: (headers) => {
            const token = localStorage.getItem("accessToken");

            if (token) {
                headers.set(
                    "Authorization",
                    `Bearer ${token}`
                );
            }

            return headers;
        },
    }),

    tagTypes: ["Cart"],

    endpoints: (builder) => ({

        // GET /api/cart/
        getCart: builder.query({
            query: () => "cart/",
            providesTags: ["Cart"],
        }),

        // POST /api/cart/add/
        addToCart: builder.mutation({
            query: ({ product_id, quantity }) => ({
                url: "cart/add/",
                method: "POST",
                body: {
                    product_id,
                    quantity,
                },
            }),

            invalidatesTags: ["Cart"],
        }),

        // PATCH /api/cart/items/<id>/
        updateCartItem: builder.mutation({
            query: ({ id, quantity }) => ({
                url: `cart/items/${id}/`,
                method: "PATCH",
                body: {
                    quantity,
                },
            }),

            invalidatesTags: ["Cart"],
        }),

        // DELETE /api/cart/items/<id>/delete/
        deleteCartItem: builder.mutation({
            query: (id) => ({
                url: `cart/items/${id}/delete/`,
                method: "DELETE",
            }),

            invalidatesTags: ["Cart"],
        }),

    }),
});

export const {
    useGetCartQuery,
    useAddToCartMutation,
    useUpdateCartItemMutation,
    useDeleteCartItemMutation,
} = cartApi;