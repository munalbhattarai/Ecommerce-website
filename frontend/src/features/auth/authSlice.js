import { createSlice } from "@reduxjs/toolkit";


const savedToken = localStorage.getItem("accessToken");
const initialState = {
    accessToken : savedToken || null ,
    isAuthenticated : !!savedToken,
};

const authSlice = createSlice({
    name : "auth",
    initialState,
    reducers :{
        loginSuccess(state, action ){
            state.accessToken = action.payload;
            state.isAuthenticated = true;

            localStorage.setItem(
                "accessToken",
                action.payload
            );
        },

        logout(state){
            state.accessToken = null;
            state.isAuthenticated = false;
            localStorage.removeItem("accessToken");
        }
    }

});
export const {
    loginSuccess,
    logout
}= authSlice.actions;

export default authSlice.reducer;