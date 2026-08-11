import { createApi } from "@reduxjs/toolkit/query/react";
import baseQueryWithReauth from "../../../api/baseApi";

export const sellerApi = createApi({
    reducerPath: "sellerApi",

    baseQuery: baseQueryWithReauth,

    tagTypes: [
        "Seller",
        "SellerProducts",
        "SellerOrders",
    ],

    endpoints: (builder) => ({

        // GET /api/products/seller/
        getSellerProducts: builder.query({
            query: () => "products/seller/",
            providesTags: ["SellerProducts"],
        }),

        // GET /api/order/seller/dashboard/
        getSellerDashboard: builder.query({
            query: () => "order/seller/dashboard/",
            providesTags: ["Seller"],
        }),

        // POST /api/products/
        createProduct: builder.mutation({
            query: (formData) => ({
                url: "products/",
                method: "POST",
                body: formData,
            }),

            invalidatesTags: ["SellerProducts", "Seller"],
        }),

        // PATCH /api/products/{id}/
        updateProduct: builder.mutation({
            query: ({ id, data }) => ({
                url: `products/${id}/`,
                method: "PATCH",
                body: data,
            }),

            invalidatesTags: ["SellerProducts", "Seller"],
        }),

        // DELETE /api/products/{id}/
        deleteProduct: builder.mutation({
            query: (id) => ({
                url: `products/${id}/`,
                method: "DELETE",
            }),

            invalidatesTags: ["SellerProducts", "Seller"],
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
    useGetSellerProductsQuery,
    useGetSellerDashboardQuery,
    useCreateProductMutation,
    useUpdateProductMutation,
    useDeleteProductMutation,
    useGetCategoriesQuery,
    useCreateCategoryMutation,
    useGetSellerOrdersQuery,
    useGetSellerOrderQuery,
    useUpdateSellerOrderMutation,
    usePatchSellerOrderMutation,
} = sellerApi;