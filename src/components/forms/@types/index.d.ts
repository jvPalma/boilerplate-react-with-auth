/* eslint-disable @typescript-eslint/no-explicit-any */
import { ReactNode } from 'react';
import { Control, FieldErrors } from 'react-hook-form';

export interface ErrorType {
	type: string;
	message: string;
}
/**
 * react-hook-form errors type
 */
export interface FormErrors {
	[key: string]: ErrorType;
}

/**
 * react-hook-form - Controller component name type required
 */
export type TName = `${string}` | `${string}.${string}` | `${string}.${number}`;

/**
 * Select options interface
 */
export interface ISelectRadioOptions {
	id: string;
	label: string;
}

/**
 * TODO: add description to field
 */
export interface FormLibFields {
	errors: FieldErrors<any>;
	control: Control<any>;
}

/**
 * TODO: add description to field
 */
export interface DefaultInputFields {
	name: string;
	label: string | ReactNode | number;
	defaultValue?: string;
	value?: string | number;
	helperText?: string | ReactNode | number;
}

/**
 * TODO: add description to field
 */
export interface ExtendedInputFields extends FormLibFields, DefaultInputFields {
	required: boolean;
	lPrev?: string | ReactNode | number;
	lEnd?: string | ReactNode | number;
	onChange: (label: string) => string;
}
