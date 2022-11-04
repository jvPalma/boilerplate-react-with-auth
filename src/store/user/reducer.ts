import { createReducer } from 'typesafe-actions';
import { UserActions as Actions, UserState } from 'store/@types/user';

const INITIAL_STATE: UserState = {
	loading: false,
	error: null
};

const userReducer = createReducer(INITIAL_STATE, {
	[Actions.SET_LOADING]: state => ({ ...state, loading: true }),
	[Actions.SET_ERROR]: (state, { payload }) => ({ ...state, loading: false, error: payload })
});

export default userReducer;
