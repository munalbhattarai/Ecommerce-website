import {
    fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";

const rawBaseQuery = fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL,

    prepareHeaders: (headers) => {

        const token =
            localStorage.getItem("accessToken");

        if (token) {
            headers.set(
                "Authorization",
                `Bearer ${token}`
            );
        }

        return headers;
    },
});

const baseQueryWithReauth = async (
    args,
    api,
    extraOptions
) => {

    let result = await rawBaseQuery(
        args,
        api,
        extraOptions
    );

    // Access token expired
    if (result.error?.status === 401) {

        console.log(
            "Access token expired. Refreshing..."
        );

        const refreshToken =
            localStorage.getItem("refreshToken");

        if (!refreshToken) {
            return result;
        }

        // Request new access token
        const refreshResult =
            await rawBaseQuery(
                {
                    url: "accounts/refresh/",
                    method: "POST",
                    body: {
                        refresh: refreshToken,
                    },
                },
                api,
                extraOptions
            );

        if (refreshResult.data) {

            const newAccessToken =
                refreshResult.data.access;

            localStorage.setItem(
                "accessToken",
                newAccessToken
            );

            // Retry original request
            result = await rawBaseQuery(
                args,
                api,
                extraOptions
            );
        } else {

            // Refresh token also expired
            localStorage.removeItem(
                "accessToken"
            );

            localStorage.removeItem(
                "refreshToken"
            );
        }
    }

    return result;
};

export default baseQueryWithReauth;