/* eslint-disable func-names */
import * as yup from 'yup';
import moment, { Moment } from 'moment';

export const regex = {
	url: /((https?):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/,
	nif: /^[0-9]{9}$/,
	email: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
};

export const removeTimezone = (date: Date | Moment | string): Moment | Date | string =>
	typeof date === 'string' ? date.split('+')[0] : date;

export const parseDateToShow = (date: Moment | string, hours = false): string =>
	moment(removeTimezone(date)).format(hours ? 'DD/MM/YYYY HH:mm:ss' : 'DD/MM/YYYY');

export const parseDateToManage = (date: Date | Moment | string, clearHour = false): string =>
	clearHour
		? `${moment(removeTimezone(date)).format('YYYY/MM/DD')} 00:00:00`
		: moment(removeTimezone(date)).format('YYYY/MM/DD HH:mm:ss');

const requiredMessage = 'This field is required';

const parseDateString = (
	value: string | Moment,
	originalValue: Moment | string
): Date | string | Moment | boolean | null => {
	if (!originalValue) return null;

	let payload = null;
	payload = originalValue;

	if (typeof originalValue === 'object') payload = new Date(parseDateToManage(originalValue));

	if (typeof originalValue === 'string') {
		if (originalValue.trim() === '' || originalValue.trim().toLowerCase() === 'invalid date') {
			payload = false;
		} else {
			payload = value;
		}
	}

	return payload;
};

export const arrayNotEmpty = yup.array().min(1, requiredMessage);

export const dateDefault = yup
	.date()
	.default(undefined)
	.nullable()
	.transform(parseDateString)
	.typeError('Must be a valid Date');

export const dateRequired = dateDefault.required(requiredMessage);

export const string = yup
	.string()
	.nullable()
	.max(250, 'This field exceeds the maximum limit (250)')
	.transform((value: string, originalValue: string) =>
		originalValue && originalValue.trim && originalValue.trim() === '' ? null : value
	);
export const stringLong = yup
	.string()
	.nullable()
	.max(65535, 'This field exceeds the maximum limit (65535)')
	.transform((value: string, originalValue: string) =>
		originalValue && originalValue.trim && originalValue.trim() === '' ? null : value
	);
export const stringUnlimited = yup
	.string()
	.nullable()
	.transform((value, originalValue) =>
		originalValue && originalValue.trim && originalValue.trim() === '' ? null : value
	);

export const stringRequired = string.required(requiredMessage);
export const stringLongRequired = stringLong.required(requiredMessage);
export const stringUnlimitedRequired = stringUnlimited.required(requiredMessage);

export const boolean = yup.bool().typeError('Must be true or false value');
export const booleanRequired = yup.bool().required();

export const number = yup
	.number()
	.typeError('Must be a valid Number')
	.transform((value, originalValue) =>
		originalValue && originalValue.trim && originalValue.trim() === '' ? null : value
	)
	.nullable();
export const numberRequired = number.required(requiredMessage);

export const numberPositive = number.test(
	'bigger-than-zero',
	'This field is required',
	(data: number | null | undefined): boolean =>
		// return true -> the error will NOT show
		// return false -> the error will show
		data ? data > 0 : false
);
export const numberZeroOrPositive = number.test(
	'bigger-than-or-zero',
	'This field is required',
	(data: number | null | undefined): boolean =>
		// return true -> the error will NOT show
		// return false -> the error will show
		data ? data >= 0 : false
);
export const numberPositiveRequired = numberPositive.required(requiredMessage);
export const numberZeroOrPositiveRequired = numberZeroOrPositive.required(requiredMessage);
