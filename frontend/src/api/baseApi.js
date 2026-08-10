import { fetchBaseQuery } from '@reduxjs/toolkit/query/react';


const rawBaseQuery = fetchBaseQuery({
	baseUrl: import.meta.env.VITE_API_URL,

	prepareHeaders: headers => {
		const token = localStorage.getItem('accessToken');

		if (token) {
			headers.set('Authorization', `Bearer ${token}`);
		}

		return headers;
	}
});

const baseQueryWithReauth = async (args, api, extraOptions) => {
	let result = await rawBaseQuery(args, api, extraOptions);

	// Access token expired
	if (result.error?.status === 401) {
		const refreshToken = localStorage.getItem('refreshToken');

		if (refreshToken) {
			const refreshResult = await rawBaseQuery(
				{
					url: 'accounts/refresh/',
					method: 'POST',
					body: {
						refresh: refreshToken
					}
				},
				api,
				extraOptions
			);

			if (refreshResult.data) {
				const newAccessToken = refreshResult.data.access;

				localStorage.setItem('accessToken', newAccessToken);

				// Retry original request
				result = await rawBaseQuery(args, api, extraOptions);
			} else {
				localStorage.removeItem('accessToken');

				localStorage.removeItem('refreshToken');
			}
		}
	}

	// Centralized error logging
	if (result.error) {
		const status = result.error.status;

		switch (status) {
			case 400:
				console.error('Bad request:', result.error.data);
				break;

			case 403:
				console.error('Permission denied.');
				break;

			case 404:
				console.error('Resource not found.');
				break;

			case 500:
				console.error('Server error.');
				break;

			case 'FETCH_ERROR':
				console.error('Unable to connect to the server.');
				break;

			default:
				console.error('API error:', result.error);
		}
	}

	return result;
};

export default baseQueryWithReauth;
