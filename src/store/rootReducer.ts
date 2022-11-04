import { combineReducers, Reducer } from 'redux';

import userReducer from './user/reducer';

const createRootReducer = (): Reducer =>
	combineReducers({
		// APP Reducers
		user: userReducer
	});

export default createRootReducer;
