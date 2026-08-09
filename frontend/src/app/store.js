import { configureStore } from "@reduxjs/toolkit";

import authReducer from "../features/auth/authSlice";
import { productApi } from "../features/Products/api/ProductApi";
;

export const store = configureStore({
    reducer: {
        auth: authReducer,

        [productApi.reducerPath]: productApi.reducer,
    },

    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(
            productApi.middleware
        ),
});