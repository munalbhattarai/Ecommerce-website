

export const loginUser = async (credentials)=>{
    const response = await api.post(
        "accounts/login",
        credentials
    );
    return response.data;

    }