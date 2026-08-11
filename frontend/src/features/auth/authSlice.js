import { createSlice } from "@reduxjs/toolkit";

const accessToken = localStorage.getItem("accessToken");
const refreshToken = localStorage.getItem("refreshToken");

const user = JSON.parse(localStorage.getItem("user"));

const initialState = {
    accessToken,
    refreshToken,
    isAuthenticated: !!accessToken,
    user,
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

        setUser(state, action) {
    state.user = action.payload;

    localStorage.setItem(
        "user",
        JSON.stringify(action.payload)
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
            state.user = null;

            localStorage.removeItem("accessToken");
            localStorage.removeItem("refreshToken");
            localStorage.removeItem("user");
        },
    },
});

export const {
    loginSuccess,
    setUser,
    updateAccessToken,
    logout,
} = authSlice.actions;

export default authSlice.reducer;