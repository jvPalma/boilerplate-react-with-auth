/* eslint-disable no-unused-vars */
// Import the functions you need from the SDKs you need
import { AnalyticsCallOptions, getAnalytics, logEvent } from 'firebase/analytics';
import { initializeApp } from 'firebase/app';

import { envConfig } from '../../config/config';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
	apiKey: envConfig.REACT_APP_APIKEY,
	authDomain: envConfig.REACT_APP_AUTHDOMAIN,
	projectId: envConfig.REACT_APP_PROJECTID,
	storageBucket: envConfig.REACT_APP_STORAGEBUCKET,
	messagingSenderId: envConfig.REACT_APP_MSGSENDER,
	appId: envConfig.REACT_APP_APPID,
	measurementId: envConfig.REACT_APP_MEASUREMENTID
};

// Initialize Firebase
const app = envConfig.REACT_APP_APIKEY && initializeApp(firebaseConfig);
const analyticsProp = app && getAnalytics(app);

export const analytics = (
	id: string,
	eventParams?:
		| {
				[key: string]: unknown;
		  }
		| undefined,
	options?: AnalyticsCallOptions | undefined
) => analyticsProp && logEvent(analyticsProp, id, eventParams, options);
