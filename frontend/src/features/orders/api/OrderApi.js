import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const orderApi = createApi({
	reducerPath: 'orderApi',

	baseQuery: fetchBaseQuery({
		baseUrl: import.meta.env.VITE_API_URL,

		prepareHeaders: headers => {
			const token = localStorage.getItem('accessToken');

			if (token) {
				headers.set('Authorization', `Bearer ${token}`);
			}

			return headers;
		}
	}),

	tagTypes: ['Orders'],

	endpoints: builder => ({
		// GET /api/order/
		getOrders: builder.query({
			query: () => 'order/',
			providesTags: ['Orders']
		}),

		// POST /api/order/place/
		placeOrder: builder.mutation({
			query: ({ shipping_address }) => ({
				url: 'order/place/',
				method: 'POST',
				body: {
					shipping_address
				}
			}),

			invalidatesTags: ['Orders']
		}),

		// GET /api/order/<pk>/
		getOrder: builder.query({
			query: id => `order/${id}/`,
			providesTags: ['Orders']
		}),

		// PATCH /api/order/<pk>/cancel/
		cancelOrder: builder.mutation({
			query: id => ({
				url: `order/${id}/cancel/`,
				method: 'POST'
			}),

			invalidatesTags: ['Orders']
		})
	})
});

export const {
	useGetOrdersQuery,
	usePlaceOrderMutation,
	useGetOrderQuery,
	useCancelOrderMutation
} = orderApi;
