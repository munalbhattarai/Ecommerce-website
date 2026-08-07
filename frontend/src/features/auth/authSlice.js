import { createSlice } from "@reduxjs/toolkit";

const accessToken = localStorage.getItem("accessToken");
const refreshToken = localStorage.getItem("refreshToken");

const initialState = {
    accessToken,
    refreshToken,
    isAuthenticated: !!accessToken,
};

const authSlice = createSlice({
    name: "auth",

    initialState,

    reducers: {
        loginSuccess(state, action) {
            state.accessToken = action.payload.access;
            state.refreshToken = action.payload.refresh;
            state.isAuthenticated = true;

            localStorage.setItem(
                "accessToken",
                action.payload.access
            );

            localStorage.setItem(
                "refreshToken",
                action.payload.refresh
            );
        },

        updateAccessToken(state, action) {
            state.accessToken = action.payload;

            localStorage.setItem(
                "accessToken",
                action.payload
            );
        },

        logout(state) {
            state.accessToken = null;
            state.refreshToken = null;
            state.isAuthenticated = false;

            localStorage.removeItem("accessToken");
            localStorage.removeItem("refreshToken");
        },
    },
});

export const {
    loginSuccess,
    updateAccessToken,
    logout,
} = authSlice.actions;

export default authSlice.reducer;