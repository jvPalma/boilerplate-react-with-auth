declare global {
	interface Window {
		__RUNTIME_CONFIG__: EnvConfig;
	}
}

interface EnvConfig {
	REACT_APP_BACKEND_URL: string;
	REACT_APP_APIKEY: string;
	REACT_APP_AUTHDOMAIN: string;
	REACT_APP_PROJECTID: string;
	REACT_APP_STORAGEBUCKET: string;
	REACT_APP_MSGSENDER: string;
	REACT_APP_APPID: string;
	REACT_APP_MEASUREMENTID: string;
}

export const envConfig: EnvConfig = {
	...process.env,
	...window.__RUNTIME_CONFIG__
};
