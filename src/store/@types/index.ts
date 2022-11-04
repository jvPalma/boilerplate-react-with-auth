import { UserState } from './user';

export interface IDispatchType {
	type: string;
	payload?: unknown;
}

export interface StoreState {
	readonly user: UserState;
}

export interface Match<P> {
	params: P;
	isExact: boolean;
	path: string;
	url: string;
}
