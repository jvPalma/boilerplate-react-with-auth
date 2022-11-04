/* eslint-disable indent */
import { Dispatch } from 'redux';
// import {} from 'api/user';
// import {} from 'store/@types/user';

import { setError } from './actions';
// import { performanceAnalytics } from '..';

// export const getAllJobs =
//     () =>
//     async (dispatch: Dispatch): Promise<void> => {
//         const startPerform = performance.now();
//         try {
//             dispatch(setLoading());
//             // api request
//             const { data } = await sendGetUserInfo();

//             performanceAnalytics(startPerform, '/jobOffer');
//             dispatch(setAllJobs(data, page));
//         } catch (error) {
//             performanceAnalytics(startPerform, '/jobOffer', true);
//             dispatch(setError(error));
//         }
//     };

export const clearError =
	() =>
	async (dispatch: Dispatch): Promise<void> => {
		dispatch(setError(null));
	};
