import React, { useEffect } from 'react';
import useAuth from 'hooks/useAuth';
import { Outlet } from 'react-router-dom';
import { getLSField } from 'utils/cookies';

const RootLayout = () => {
	const { auth, setAuth } = useAuth();

	useEffect(() => {
		const userToken = getLSField('token');
		if (Object.keys(auth).length === 0 && userToken) {
			setAuth({ user: userToken });
		}
	}, []);

	return (
		<main>
			<Outlet />
		</main>
	);
};

export default RootLayout;
