//* EXTERNAL LIBS
import React from 'react';
import { Controller } from 'react-hook-form';
import { styled } from '@mui/material/styles';

//* EXTERNAL LIBS --> MUI
import { TextField } from '@mui/material';

//* LOCAL COMPONENT IMPORTS
import { useStyles } from './styles';
import InputLabel from '../InputLabel';
import { parseErrorMessage, parseIfError } from '../utils/formHelpers';
import { ExtendedInputFields, TName } from '../@types';

export const CssTextField = styled(TextField)({
	'& label.Mui-focused': {
		color: '#A6B7E9'
	},
	'& .MuiInput-underline:after': {
		borderBottomColor: '#97a0ba'
	},
	'& .MuiOutlinedInput-root': {
		backgroundColor: 'white',
		borderRadius: '13px',
		paddingLeft: '5px',
		'& fieldset': {
			borderColor: '#A6B7E9'
		},
		'&:hover fieldset': {
			borderColor: '#a684bf'
		},
		'&.Mui-focused fieldset': {
			borderColor: '#9337D6'
		},
		'& textarea': {
			padding: '0 10px  !important'
		}
	}
});

//* COMPONENT INTERFACES
export interface IInput extends Omit<ExtendedInputFields, 'onChange' | 'label' | 'required'> {
	//* ** handlers
	/**
	 * Helper method to perform an additional action on change
	 */
	additionalOnChange?: (optionSelected: string) => void;
	/**
	 * Helper method to perform an additional change on blur
	 */
	additionalOnBlur?: (optionSelected: string) => void;

	//* ** component specific
	/**
	 * Placeholder value for the Input
	 */
	placeholder?: string;
	/**
	 * The type of the Input
	 */
	type?: string;
	label?: string;
	/**
	 * Whether the error and helper text should be displayed or not
	 */
	showErrorAndHelperText?: boolean;
	noLabel?: boolean;
	required?: boolean;
	/**
	 * Extra property required to use any other property of the native component
	 */
	[x: string]: string | number | React.ReactNode | unknown;
}

//* COMPONENT DEFAULT PROPS
const defaultProps = {
	// react-hook-form
	control: null,
	errors: null,

	// field display fields
	name: null,
	defaultValue: '',
	label: '',
	value: null,
	helperText: ' ',
	required: false,
	noLabel: false,
	lPrev: null,
	lEnd: null,

	// handlers
	additionalOnChange: undefined,
	additionalOnBlur: undefined,

	// component specific
	placeholder: '',
	type: 'text',
	showErrorAndHelperText: false
};

//* COMPONENT
const Input = ({
	name,
	label,
	placeholder,
	errors,
	control,
	required,
	additionalOnChange,
	additionalOnBlur,
	lPrev,
	noLabel,
	lEnd,
	defaultValue,
	type,
	helperText,
	showErrorAndHelperText = false,
	...others
}: IInput) => {
	const classes = useStyles();
	const hasError = errors && name && Object.keys(errors).length > 0 ? parseIfError(errors, name) : null;
	const errorMessage = hasError && parseErrorMessage(hasError);
	const setMessage = () => {
		if (showErrorAndHelperText) {
			return hasError ? (
				<>
					{errorMessage} {' - '}
					{helperText}
				</>
			) : (
				helperText
			);
		}
		return hasError ? errorMessage : helperText;
	};

	return (
		<>
			{!noLabel && (
				<InputLabel error={Boolean(hasError)} prev={lPrev} end={lEnd} required={required}>
					{label}
				</InputLabel>
			)}
			<Controller
				name={name as TName}
				control={control}
				render={({ field }) => (
					<CssTextField
						{...field}
						error={Boolean(hasError)}
						type={type}
						placeholder={placeholder || (label as string)}
						helperText={setMessage()}
						size="small"
						classes={{ root: classes.w100 }}
						variant="outlined"
						{...others}
						onChange={event => {
							field.onChange(event.target.value);
							additionalOnChange && additionalOnChange(event.target.value);
						}}
						onBlur={event => {
							additionalOnBlur && additionalOnBlur(event.target.value);
							field.onBlur();
						}}
						value={field.value || defaultValue || ''}
					/>
				)}
			/>
		</>
	);
};

Input.defaultProps = { ...defaultProps };

export { Input };
