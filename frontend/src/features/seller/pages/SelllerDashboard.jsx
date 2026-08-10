import { configureStore } from "@reduxjs/toolkit";

import authReducer from "../features/auth/authSlice";

import { productApi } from "../features/products/api/productApi";
import { cartApi } from "../features/cart/api/cartApi";
import { orderApi } from "../features/orders/api/orderApi";
import { sellerApi } from "../features/seller/api/sellerApi";

export const store = configureStore({
    reducer: {
        auth: authReducer,

        [productApi.reducerPath]: productApi.reducer,
        [cartApi.reducerPath]: cartApi.reducer,
        [orderApi.reducerPath]: orderApi.reducer,
        [sellerApi.reducerPath]: sellerApi.reducer,
    },

    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware()
            .concat(productApi.middleware)
            .concat(cartApi.middleware)
            .concat(orderApi.middleware)
            .concat(sellerApi.middleware),
});