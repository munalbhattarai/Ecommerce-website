import api from "../../../api/axios";

export const loginRequest = async (credentials) => {
    const { data } = await api.post(
        "accounts/login/",
        credentials
    );

    return data;
};

export const registerRequest = async (userData) => {
    const { data } = await api.post(
        "accounts/register/",
        userData
    );

    return data;
};