import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import {
    loginSuccess,
    setUser,
    logout,
} from "../authSlice";

import {
    loginRequest,
    getProfileRequest,
} from "../api/authApi";

export default function useAuth() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const auth = useSelector((state) => state.auth);

    const login = async (credentials) => {
        try {
            const data = await loginRequest(credentials);

            dispatch(loginSuccess(data));

            const profile = await getProfileRequest();

            dispatch(setUser(profile));

            const destination = profile?.role === "SELLER"
                ? "/seller"
                : "/";

            navigate(destination, {
                state: {
                    flash: {
                        type: "success",
                        message: "Signed in successfully."
                    }
                }
            });

            return profile;
        } catch (error) {
            console.error("AUTH ERROR:", error);
            throw error;
        }
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