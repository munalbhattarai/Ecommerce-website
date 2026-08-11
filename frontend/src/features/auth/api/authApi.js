import api from "../../../api/axios";

export const loginRequest = async (credentials) => {
    const { data } = await api.post(
        "accounts/login/",
        credentials
    );

    return data;
};

export const registerRequest = async (userData) => {
    const { password2: _password2, ...registrationData } = userData;

    const { data } = await api.post(
        "accounts/register/",
        registrationData
    );

    return data;
};

// Get currently logged-in user's profile
export const getProfileRequest = async () => {
    const { data } = await api.get(
        "accounts/profile/"
    );

    return data;
};
