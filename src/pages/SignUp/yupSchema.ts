import * as yup from 'yup';

import { stringRequired } from 'utils/formUtils';

export const schema = yup.object().shape({
	name: stringRequired,
	email: stringRequired,
	username: stringRequired,
	password: stringRequired
});

export const defaultValues = {
	name: '',
	email: '',
	username: '',
	password: ''
};
