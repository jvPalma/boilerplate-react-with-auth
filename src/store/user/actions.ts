import { action } from 'typesafe-actions';
import { IDispatchType } from 'store/@types';
import { UserActions as Actions } from 'store/@types/user';

export const setLoading = (): IDispatchType => action(Actions.SET_LOADING);

export const setError = (payload: unknown | null): IDispatchType => action(Actions.SET_ERROR, payload);
