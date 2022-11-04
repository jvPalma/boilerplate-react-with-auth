import { Theme, ThemeOptions } from '@mui/material/styles';

export type StaticImageData = {
	src: string;
	height: number;
	width: number;
	placeholder?: string;
};

declare module '@mui/material/styles' {
	interface CustomTheme extends Theme {
		accentColor: string;
	}
	// allow configuration using `createTheme`
	interface CustomThemeOptions extends ThemeOptions {
		accentColor?: string;
	}

	export interface CustomReactTheme extends Theme {
		accentColor: string;
	}
	export function createTheme(options?: CustomThemeOptions): CustomTheme;
}

export declare interface Window {
	INITIAL_REDUX_STATE: unknown;
	__REDUX_DEVTOOLS_EXTENSION__: unknown;
	__REDUX_DEVTOOLS_EXTENSION_COMPOSE__: unknown;
}

declare module 'jsonwebtoken';
