import { createApi } from '@reduxjs/toolkit/query/react';
import baseQueryWithReauth from '../../../api/baseApi';

export const productApi = createApi({
	reducerPath: 'productApi',

	baseQuery: baseQueryWithReauth,

	endpoints: (builder) => ({
		getProducts: builder.query({
			query: () => 'products/',
		}),
		getCategories: builder.query({
			query: () => 'categories/',
		}),

		getProduct: builder.query({
			query: (id) => `products/${id}/`,
		}),
	}),
});

export const {
	useGetProductsQuery,
	useGetCategoriesQuery,
	useGetProductQuery,
} = productApi;
