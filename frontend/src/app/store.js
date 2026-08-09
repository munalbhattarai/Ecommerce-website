import { configureStore } from "@reduxjs/toolkit";

import authReducer from "../features/auth/authSlice";

import { productApi } from "../features/products/api/productApi";
import { cartApi } from "../features/cart/api/cartApi";

export const store = configureStore({
    reducer: {
        auth: authReducer,

        [productApi.reducerPath]: productApi.reducer,
        [cartApi.reducerPath]: cartApi.reducer,
    },

    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware()
            .concat(productApi.middleware)
            .concat(cartApi.middleware),
});