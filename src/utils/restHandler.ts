/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { AxiosRequestConfig, AxiosResponse } from 'axios';

import { GET, POST, PUT, DELETE } from './requestTypes';
import axios from './services/api';

/** Axios request helper
 *
 * handles the GET POST PUT DELETE EXPORT methods
 * already with toast notification seamlessly with the API response
 * and with java error messages
 */
const restCall = async <T = never, R = AxiosResponse<T>>(
	type: number,
	path: string,
	reqPayload: any = undefined,
	config: AxiosRequestConfig<T> | undefined = undefined,
	getOriginalResponse = false
): Promise<R> => {
	let data = null;

	const success = (response: AxiosResponse<T>) => {
		data = response;
		if (getOriginalResponse) {
			data = response;
		}
	};
	const error = (err: any) => {
		throw err;
	};

	const REQUESTS = {
		[`${GET}`]: async () => axios.get<T>(`${path}`, reqPayload).then(success).catch(error),
		[`${PUT}`]: async () => axios.put<T>(`${path}`, reqPayload, config).then(success).catch(error),
		[`${POST}`]: async () => axios.post<T>(`${path}`, reqPayload, config).then(success).catch(error),
		[`${DELETE}`]: async () => axios.delete<T>(`${path}`, { data: { reqPayload } }).then(success).catch(error)
	};

	await REQUESTS[type]();

	if (!data) {
		throw new Error('Api internal Error');
	}

	return data;
};

export { restCall };
