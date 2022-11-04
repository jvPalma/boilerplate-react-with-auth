import React, { FC, useMemo, createContext, useState } from 'react';

export interface IAuth {
	user: unknown;
	roles?: string[];
}

export interface IAuthContext {
	auth: IAuth;
	setAuth: (x: IAuth | null) => void;
}

const AuthContext = createContext<IAuthContext>({} as IAuthContext);

export const AuthProvider: FC = ({ children }) => {
	const [auth, setAuth] = useState<IAuth>({} as IAuth);

	const setAuthHelper = (x: IAuth | null) => {
		if (!x) {
			setAuth({} as IAuth);
		}
		setAuth(x as IAuth);
	};
	const contextValue = useMemo<IAuthContext>(() => ({ auth, setAuth: setAuthHelper }), [auth]);

	return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
};

export default AuthContext;
