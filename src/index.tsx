import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { StyledEngineProvider } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import { AuthProvider } from 'context/AuthProvider';

import 'react-toastify/dist/ReactToastify.css';
import 'assets/fonts/fonts.css';
import 'assets/i18n';

import Routes from './routes';
import { store } from './store';

/** ROUTING PROVIDER */
const theme = createTheme({
	typography: {
		fontFamily: [
			'Lato',
			'-apple-system',
			'BlinkMacSystemFont',
			'"Segoe UI"',
			'Roboto',
			'"Helvetica Neue"',
			'Arial',
			'sans-serif',
			'"Apple Color Emoji"',
			'"Segoe UI Emoji"',
			'"Segoe UI Symbol"'
		].join(',')
	}
});

ReactDOM.render(
	<React.StrictMode>
		<Provider store={store}>
			<ThemeProvider theme={theme}>
				<StyledEngineProvider injectFirst>
					<AuthProvider>
						<Routes />
					</AuthProvider>
				</StyledEngineProvider>
			</ThemeProvider>
		</Provider>
	</React.StrictMode>,
	document.getElementById('root')
);
