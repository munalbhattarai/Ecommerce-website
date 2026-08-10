import { createApi } from "@reduxjs/toolkit/query/react";
import baseQueryWithReauth from "../../../app/api/baseApi";

export const sellerApi = createApi({
    reducerPath: "sellerApi",

    baseQuery: baseQueryWithReauth,

    tagTypes: [
        "Seller",
        "SellerProducts",
        "SellerOrders",
    ],

    endpoints: (builder) => ({

        // GET /api/seller/
        getSellerProfile: builder.query({
            query: () => "seller/",
            providesTags: ["Seller"],
        }),

        // GET /api/order/seller/dashboard/
        getSellerDashboard: builder.query({
            query: () => "order/seller/dashboard/",
            providesTags: ["SellerOrders"],
        }),

        // GET /api/products/
        getSellerProducts: builder.query({
            query: () => "products/",
            providesTags: ["SellerProducts"],
        }),

        // POST /api/products/
        createProduct: builder.mutation({
            query: (formData) => ({
                url: "products/",
                method: "POST",
                body: formData,
            }),

            invalidatesTags: ["SellerProducts"],
        }),

        // GET /api/categories/
        getCategories: builder.query({
            query: () => "categories/",
        }),

        // POST /api/categories/
        createCategory: builder.mutation({
            query: (data) => ({
                url: "categories/",
                method: "POST",
                body: data,
            }),

            invalidatesTags: ["SellerProducts"],
        }),

        // GET /api/order/
        getSellerOrders: builder.query({
            query: () => "order/",
            providesTags: ["SellerOrders"],
        }),

        // GET /api/order/{id}/
        getSellerOrder: builder.query({
            query: (id) => `order/${id}/`,
            providesTags: ["SellerOrders"],
        }),

        // PUT /api/order/seller/{id}/
        updateSellerOrder: builder.mutation({
            query: ({ id, ...data }) => ({
                url: `order/seller/${id}/`,
                method: "PUT",
                body: data,
            }),

            invalidatesTags: ["SellerOrders"],
        }),

        // PATCH /api/order/seller/{id}/
        patchSellerOrder: builder.mutation({
            query: ({ id, ...data }) => ({
                url: `order/seller/${id}/`,
                method: "PATCH",
                body: data,
            }),

            invalidatesTags: ["SellerOrders"],
        }),

    }),
});

export const {
    useGetSellerProfileQuery,
    useGetSellerDashboardQuery,
    useGetSellerProductsQuery,
    useCreateProductMutation,
    useGetCategoriesQuery,
    useCreateCategoryMutation,
    useGetSellerOrdersQuery,
    useGetSellerOrderQuery,
    useUpdateSellerOrderMutation,
    usePatchSellerOrderMutation,
} = sellerApi;