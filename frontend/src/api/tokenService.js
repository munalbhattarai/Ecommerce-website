import axios from "axios";

const refreshAccessToken = async () => {
    const refreshToken = localStorage.getItem("refreshToken");

    if (!refreshToken) {
        throw new Error("No refresh token available");
    }

    const { data } = await axios.post(
        `${import.meta.env.VITE_API_URL}token/refresh/`,
        {
            refresh: refreshToken,
        }
    );

    localStorage.setItem("accessToken", data.access);

    return data.access;
};

export default refreshAccessToken;