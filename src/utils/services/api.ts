import axios, { AxiosError } from 'axios';

import { envConfig } from '../../config/config';

export interface ApiError {
	statusCode: number;
	message: string;
	data: unknown;
}
// import axios, { AxiosError } from 'axios';
// import Cookies from 'js-cookie';
// import { AuthTokenError } from './errors/AuthTokenError';

// type FailedRequestQueue = {
// 	onSuccess(token: string): void;
// 	onFailure(err: AxiosError): void;
// };

// type ISession = {
// 	access_token: string;
// 	expires_in: number;
// 	refresh_token: string;
// 	refresh_expires_in: number;
// };

const api = axios.create({
	baseURL: envConfig.REACT_APP_BACKEND_URL
});

// const TOKEN_NAME = 'hmc.token';
// const TOKEN_REFRESH_NAME = 'hmc.refresh_token';

// let isRefreshing = false;
// let failedRequestQueue: FailedRequestQueue[] = [];

// api.interceptors.request.use(async config => {
// 	const token = Cookies.get(TOKEN_NAME);

// 	if (token && config.headers) {
// 		config.headers.Authorization = `Bearer ${token}`;
// 	}

// 	return config;
// });

api.interceptors.response.use(
	response => response,
	(error: AxiosError) => {
		if (error.response?.data) {
			if (error.response?.data.statusCode && error.response?.data.message) {
				return Promise.reject(error.response?.data);
			}
		}
		return Promise.reject(error.response);
	}
);

export default api;
