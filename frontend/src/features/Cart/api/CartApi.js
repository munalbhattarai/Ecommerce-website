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

        getCart: builder.query({
            query: () => "cart/",
            providesTags: ["Cart"],
        }),

        addToCart: builder.mutation({
            query: ({ product, quantity }) => ({
                url: "cart/add/",
                method: "POST",
                body: {
                    product,
                    quantity,
                },
            }),

            invalidatesTags: ["Cart"],
        }),

    }),
});

export const {
    useGetCartQuery,
    useAddToCartMutation,
} = cartApi;