import * as yup from 'yup';

import { stringRequired } from 'utils/formUtils';

export const schema = yup.object().shape({
	username: stringRequired,
	password: stringRequired
});

export const defaultValues = {
	username: '',
	password: ''
};
