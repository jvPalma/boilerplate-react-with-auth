/* eslint-disable @typescript-eslint/ban-ts-comment */
//* EXTERNAL LIBS
import React, { ChangeEvent, useMemo } from 'react';
import clsx from 'clsx';
import { Controller, ControllerRenderProps } from 'react-hook-form';
import AutoNumeric from 'autonumeric';

//* EXTERNAL LIBS --> MUI

//* LOCAL COMPONENT IMPORTS
import { useStyles } from './styles';
import InputLabel from '../InputLabel';
import { ExtendedInputFields, TName } from '../@types';
import { parseErrorMessage, parseIfError } from '../utils/formHelpers';
import { CurrencyTextField } from './CurrencyTextField';

//* COMPONENT INTERFACES
export interface INumeric extends Omit<ExtendedInputFields, 'name' | 'onChange'> {
	name?: string;

	/**
	 * Helper method that happens when the value changes
	 */
	additionalOnChange?: (newValue: string) => void;

	/**
	 * Helper method that happens when the component loses focus
	 */
	additionalOnBlur?: (newValue: string) => void;

	className?: string;
	type?: 'text' | 'tel' | 'hidden';
	percentage?: boolean;
	decimalPlaces?: number;
	money?: boolean;
	currencySymbol?: string;
	placeholder?: string;
	readOnly?: boolean;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	[x: string]: any;
}

//* COMPONENT DEFAULT PROPS
const defaultProps = {
	// react-hook-form
	control: null,
	errors: null,

	// field display fields
	name: null,
	defaultValue: '',
	label: null,
	placeholder: null,
	value: null,
	helperText: ' ',
	required: false,
	lPrev: null,
	lEnd: null,
	decimalPlaces: 2,
	// handlers
	onChange: (payload: string) => payload,
	additionalOnChange: undefined,
	additionalOnBlur: undefined,

	// component specific
	className: '',
	type: 'text',
	percentage: false,
	money: false,
	currencySymbol: '',
	readOnly: false
};
const predefinedOptions = AutoNumeric.getPredefinedOptions();

//* COMPONENT
const Numeric = ({
	name,
	label,
	errors,
	control,
	required,
	decimalPlaces,
	placeholder,
	value,
	onChange,
	additionalOnChange,
	additionalOnBlur,
	currencySymbol,
	percentage,
	money,
	readOnly,
	lPrev,
	lEnd,
	defaultValue,
	type,
	helperText,
	className,
	...others
}: INumeric) => {
	const classes = useStyles();
	const hasError = errors && name && Object.keys(errors).length > 0 ? parseIfError(errors, name) : null;
	const errorMessage = hasError && parseErrorMessage(hasError);
	// eslint-disable-next-line no-console
	money && percentage && console.error(name, 'is both money and percentage');

	const numberConfigs = useMemo(
		() => ({
			name,
			inputProps: {
				name,
				readOnly: Boolean(readOnly),
				disabled: Boolean(readOnly)
			},
			...(readOnly
				? {
						className: clsx(className, classes.w100, classes.noBorder)
				  }
				: {
						className: clsx(className, classes.w100)
				  }),
			variant: readOnly ? 'standard' : 'outlined',
			currencySymbol: '',
			textAlign: 'left',
			decimalCharacter: ',',
			digitGroupSeparator: '.',
			decimalPlaces: 0,
			decimalPlacesShownOnBlur: 0,
			decimalPlacesShownOnFocus: 0,
			minimumValue: '0',
			modifyValueOnWheel: false,
			outputFormat: 'number',
			// selectOnFocus: false,
			...others
		}),
		[]
	);

	const moneyConfigs = useMemo(
		() => ({
			...numberConfigs,
			decimalPlaces,
			decimalPlacesShownOnBlur: decimalPlaces,
			decimalPlacesShownOnFocus: decimalPlaces,
			preDefined: {
				// @ts-ignore
				...predefinedOptions.euroPos,
				decimalPlaces,
				...(currencySymbol && { currencySymbol })
			},
			...others
		}),
		[]
	);

	const percentageConfigs = useMemo(
		() => ({
			...numberConfigs,
			decimalPlaces,
			decimalPlacesShownOnBlur: decimalPlaces,
			decimalPlacesShownOnFocus: decimalPlaces,
			maximumValue: '100',
			minimumValue: '0',
			preDefined: {
				// @ts-ignore
				...predefinedOptions.percentageEU2dec,
				rawValueDivisor: null,
				decimalPlaces,
				...(currencySymbol && { currencySymbol })
			},
			...others
		}),
		[]
	);

	const configs = useMemo(() => {
		if (money) {
			return moneyConfigs;
		}
		if (percentage) {
			return percentageConfigs;
		}
		return numberConfigs;
	}, []);

	const handleChange = (field: ControllerRenderProps, newVal: string) => {
		field.onChange(newVal);
		additionalOnChange && additionalOnChange(newVal);
	};

	const componentProps = {
		error: Boolean(hasError),
		type,
		placeholder: placeholder || label,
		helperText: hasError ? errorMessage : helperText,
		size: 'small',
		...configs,
		value: value || (value === 0 ? 0 : false) || defaultValue || '',
		onChange: (event: ChangeEvent, newVal: string) => onChange && onChange(newVal),
		onBlur: (event: ChangeEvent, newVal: string) => {
			const num = parseFloat(newVal);
			onChange && onChange(newVal);
			additionalOnBlur && additionalOnBlur(num.toFixed(configs.decimalPlacesShownOnBlur));
		}
	};

	return (
		<>
			<InputLabel error={Boolean(hasError)} prev={lPrev} end={lEnd} required={required}>
				{label || ''}
			</InputLabel>

			{control && (
				<Controller
					name={name as TName}
					control={control}
					render={({ field }) => (
						<CurrencyTextField
							{...field}
							{...componentProps}
							value={field.value || (field.value === 0 ? '0' : false) || defaultValue || ''}
							onChange={(event: ChangeEvent, newVal: string) => {
								if (field.value === parseFloat(newVal).toFixed(2)) return;
								handleChange(field, newVal);
							}}
							onBlur={(event: ChangeEvent, newVal: string) => {
								const num = parseFloat(newVal);
								handleChange(field, num.toFixed(configs.decimalPlacesShownOnBlur));
								additionalOnBlur && additionalOnBlur(num.toFixed(configs.decimalPlacesShownOnBlur));
								// eslint-disable-next-line react/prop-types
								field.onBlur();
							}}
						/>
					)}
				/>
			)}
			{!control && <CurrencyTextField {...componentProps} />}
		</>
	);
};

Numeric.defaultProps = { ...defaultProps };

export { Numeric };
