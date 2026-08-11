import { createApi } from '@reduxjs/toolkit/query/react';
import baseQueryWithReauth from "../../../api/baseApi";



export const orderApi = createApi({
	reducerPath: 'orderApi',

	baseQuery: baseQueryWithReauth,

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
