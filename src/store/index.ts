import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { analytics } from 'utils/services/firebase';
// Redux Devtools. Use the `composeWithDevTools()` directive so we can pass the middleware along with it
import { composeWithDevTools } from 'redux-devtools-extension';
import createRootReducer from './rootReducer';

// Create the composing function for middlewares
const composeEnhancers = composeWithDevTools({});

// Rehydrate state on app start
// const initialState = window.INITIAL_REDUX_STATE;

// configure middlewares
const middlewares = [thunk];

export const performanceAnalytics = (startPerform: number, action: string, error = false) => {
	const duration = Math.floor(performance.now() - startPerform);
	analytics('trigger_loading', { time: duration, action, error });
};

// Create store with the combined reducers, and the initial Redux state.
export const store = createStore(
	createRootReducer(),
	// initialState,
	composeEnhancers(applyMiddleware(...middlewares))
);
