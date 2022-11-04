import React, { useEffect } from 'react';
import { useLocation, Navigate, Outlet } from 'react-router-dom';
import useAuth from 'hooks/useAuth';
import { getLSField } from 'utils/cookies';
import { IAuth } from 'context/AuthProvider';

const RequireAuth = ({ allowedRoles }: { allowedRoles?: string[] }) => {
	const { auth, setAuth } = useAuth();
	const location = useLocation();

	let userToken: IAuth | string | null = getLSField('token');
	userToken = ((userToken && JSON.parse(userToken)) as IAuth) || null;

	const payload = Object.keys(auth).length === 0 ? userToken : auth;

	useEffect(() => {
		if (Object.keys(auth).length === 0 && userToken) {
			setAuth(userToken as IAuth);
		}
	}, [auth]);

	if (!payload || !payload.user) {
		return <Navigate to="/login" state={{ from: location }} replace />;
	}
	const hasRolePermission = payload?.roles?.find((role: string) => allowedRoles?.includes(role));

	if ((allowedRoles && hasRolePermission) || !allowedRoles) {
		return <Outlet />;
	}

	return <Navigate to="/" state={{ from: location }} replace />;
};

RequireAuth.defaultProps = {
	allowedRoles: undefined
};

export default RequireAuth;
