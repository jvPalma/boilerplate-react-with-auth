import React from 'react';
import { useRouteError } from 'react-router-dom';

const ErrorPage = () => {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const error: any = useRouteError();

	return (
		<main id="error-content">
			<h1>An error occurred!</h1>
			<p>{error.statusText}</p>
		</main>
	);
};

export default ErrorPage;
