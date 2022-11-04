import { ErrorType } from '../@types';

export const parseErrorMessage = (error: ErrorType) => {
	if (error.type === 'required') return 'This field is mandatory';

	return error.message;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const parseIfError = (errors: any, name: string) => {
	if (name.includes('.')) {
		const fieldError = name.split('.');
		const field = fieldError[0];
		const index = fieldError[1];
		const key = fieldError[2];

		if (key) {
			return errors[field] && errors[field][index] && errors[field][index][key]
				? errors[field][index][key]
				: null;
		}

		return errors[field] && errors[field][index] ? errors[field][index] : null;
	}

	return errors[name] ? errors[name] : null;
};
