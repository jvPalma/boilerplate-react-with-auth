import React from 'react';
import { createBrowserRouter, Route, createRoutesFromElements, redirect, RouterProvider } from 'react-router-dom';

/* SYSTEM */
import RootLayout from 'components/RootLayout';
import ErrorPage from 'components/ErrorPage';

/* PAGES */
import LandingPage from 'pages/LandingPage';
import Login, { loader as loginLoader } from 'pages/Login';
import SignUp from 'pages/SignUp';
import HomePage from 'pages/HomePage';
// import { getLSField } from 'utils/cookies';
import RequireAuth from './RequireAuth';

async function landingPageLoader() {
	return redirect('/');
}

const router = createBrowserRouter(
	createRoutesFromElements(
		<Route path="/" element={<RootLayout />} errorElement={<ErrorPage />}>
			<Route index element={<LandingPage />} />
			<Route path="/login" element={<Login />} loader={loginLoader} />
			<Route path="/signup" element={<SignUp />} loader={loginLoader} />
			{/* User logged validation */}
			<Route element={<RequireAuth />}>
				<Route path="/home" element={<HomePage />} />
			</Route>
			<Route path="/*" loader={landingPageLoader} />
		</Route>
	)
);

const Routes: React.FunctionComponent = () => <RouterProvider router={router} />;

export default Routes;
