import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const productApi = createApi({
    reducerPath: "productApi",

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

    endpoints: (builder) => ({
        getProducts: builder.query({
            query: () => "products/",
        }),
    }),
});

export const {
    useGetProductsQuery,
} = productApi;