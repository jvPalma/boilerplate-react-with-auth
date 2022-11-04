import { ApiError } from 'utils/services/api';

export enum UserActions {
	SET_LOADING = '@@jobOffer/SET_LOADING',
	SET_ERROR = '@@jobOffer/SET_ERROR'
}

export type UserState = {
	readonly loading: boolean;
	readonly error: ApiError | null;
};
