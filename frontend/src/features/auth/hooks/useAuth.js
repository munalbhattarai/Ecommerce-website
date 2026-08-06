import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import {
    loginSuccess,
    logout,
} from "../authSlice";

import {
    loginRequest,
} from "../api/authAPI";

export default function useAuth() {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const auth = useSelector(state => state.auth);

    const login = async (credentials) => {

        const data = await loginRequest(credentials);

        dispatch(loginSuccess(data));

        navigate("/");
    };

    const signOut = () => {

        dispatch(logout());

        navigate("/login");

    };

    return {
        ...auth,
        login,
        signOut,
    };
}