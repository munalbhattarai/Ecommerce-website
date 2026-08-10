import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import baseQueryWithReauth from "../../../api/baseApi";

export const productApi = createApi({
	reducerPath: 'productApi',

	baseQuery: baseQueryWithReauth({
		baseUrl: import.meta.env.VITE_API_URL,

		prepareHeaders: headers => {
			const token = localStorage.getItem('accessToken');

			if (token) {
				headers.set('Authorization', `Bearer ${token}`);
			}

			return headers;
		}
	}),

	endpoints: builder => ({
		getProducts: builder.query({
			query: () => 'products/'
		}),

		getProduct: builder.query({
			query: id => `products/${id}/`
		}),
	})
});

export const {
    useGetProductsQuery,
    useGetProductQuery,
} = productApi;
