import Cookies from 'js-cookie';

export const getCookie = (key: string): string | undefined => Cookies.get(key);

const inTwoHours = new Date(new Date().getTime() + 120 * 60 * 1000);
export const setCookie = (key: string, value: string): string | undefined =>
	Cookies.set(key, value, {
		expires: inTwoHours
	});

export const removeCookie = (key: string): void => Cookies.remove(key);

export const getLSField = (key: string): string | null => localStorage.getItem(key);

export const setLSField = (key: string, value: string): void => localStorage.setItem(key, value);

export const removeLSField = (key: string): void => localStorage.removeItem(key);
