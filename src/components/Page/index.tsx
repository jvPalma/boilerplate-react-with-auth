import React from 'react';
import { ToastContent, ToastOptions } from 'react-toastify';

/* eslint-disable no-restricted-exports */

export { Page as default } from './Page';

export const notifications: {
	genericError: ToastContent;
	success: ToastOptions;
	error: ToastOptions;
} = {
	success: {
		position: 'top-center',
		autoClose: 7000,
		hideProgressBar: true,
		closeOnClick: true,
		pauseOnHover: true,
		draggable: true,
		progress: undefined
	},
	error: {
		position: 'top-center',
		hideProgressBar: true,
		closeOnClick: true,
		pauseOnHover: true,
		draggable: true,
		progress: undefined
	},
	genericError: (
		<>
			<h3 style={{ fontSize: '16px', fontWeight: 600, margin: '10px 0 0 0' }}>We’re having some issues</h3>
			<p style={{ fontSize: '16px', fontWeight: 400, margin: '5px 0 10px 0' }}>
				Something went wrong. Please try again.
			</p>
		</>
	)
};
