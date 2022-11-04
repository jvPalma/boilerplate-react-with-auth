/* eslint-disable @typescript-eslint/ban-ts-comment */
//* EXTERNAL LIBS
import React from 'react';
import { Controller } from 'react-hook-form';

//* EXTERNAL LIBS --> MUI
import { FormControl, Select as MuiSelect, MenuItem, FormHelperText, Chip, SelectChangeEvent } from '@mui/material';

//* LOCAL COMPONENT IMPORTS
import { useStyles } from './styles';
import InputLabel from '../InputLabel';
import { ExtendedInputFields, TName, ISelectRadioOptions } from '../@types';
import { parseErrorMessage, parseIfError } from '../utils/formHelpers';

//* COMPONENT INTERFACES
export interface ISelect extends Omit<ExtendedInputFields, 'name' | 'label' | 'onChange'> {
	/**
	 * Name of the select
	 */
	name?: string;
	/**
	 * Name of the select
	 */
	placeholder?: string;
	/**
	 * Whether the select is a multiple select or not
	 */
	multiple?: boolean;
	noLabel?: boolean;
	label?: string;
	onChange?: (label: string) => void;
	/**
	 * The options to populate the select
	 */
	options?: ISelectRadioOptions[];
	/**
	 * Additional action to be performed
	 */
	additionalOnChange?: (optionSelected: { value: string | number | unknown; name: string; label: string }) => void;
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
	noLabel: false,
	placeholder: null,
	defaultValue: '',
	label: null,
	value: null,
	helperText: ' ',
	required: false,
	lPrev: null,
	lEnd: null,

	// handlers
	onChange: (payload: string | string[]) => payload,
	additionalOnChange: undefined,

	// component specific
	multiple: false,
	options: [] as ISelectRadioOptions[]
};

//* COMPONENT
const Select = ({
	noLabel,
	name,
	label,
	value,
	onChange,
	lPrev,
	lEnd,
	required,
	helperText,
	errors,
	additionalOnChange,
	control,
	multiple,
	defaultValue,
	options,
	placeholder,
	...otherProps
}: ISelect) => {
	const classes = useStyles();
	const hasError = errors && name && Object.keys(errors).length > 0 ? parseIfError(errors, name) : null;
	const errorMessage = hasError && parseErrorMessage(hasError);

	const defaultOption = (
		<MenuItem value="" disabled className={classes.defaultOption}>
			<span className={classes.defaultOptionText}>{placeholder || 'Select element'}</span>
		</MenuItem>
	);

	const selectProps = {
		...otherProps,
		displayEmpty: true,
		className: classes.customSelect,
		classes: {
			outlined: classes.overrideMuiSelect
		},
		MenuProps: {
			classes: { paper: classes.optionsMenu }
		},
		multiple,
		...(multiple && {
			className: classes.customMultipleSelect,
			renderValue: (selected: string[]) => {
				// eslint-disable-next-line no-prototype-builtins
				const isEmpty = selected && selected.hasOwnProperty('length') && selected.length === 0;
				return isEmpty ? (
					defaultOption
				) : (
					<div className={classes.chips}>
						{selected.map((val: string) => {
							const opt = options && options.find(({ id }) => id === val);

							return opt && <Chip key={val} label={opt.label} color="primary" className={classes.chip} />;
						})}
					</div>
				);
			}
		})
	};

	const selectOptions =
		options &&
		options.map(o => (
			<MenuItem key={`${name || ''}_opt_key_${o.id}`} value={o.id}>
				{o.label}
			</MenuItem>
		));

	return (
		<>
			{!noLabel && (
				<InputLabel error={Boolean(hasError)} prev={lPrev} end={lEnd} required={required}>
					{label || ''}
				</InputLabel>
			)}
			<FormControl error={Boolean(hasError)} className={classes.selectFormControl} variant="outlined">
				{control ? (
					<Controller
						name={name as TName}
						control={control}
						defaultValue={defaultValue}
						render={({ field }) => (
							<MuiSelect
								{...field}
								{...selectProps}
								value={field.value || []}
								// eslint-disable-next-line @typescript-eslint/no-explicit-any
								onChange={(val: SelectChangeEvent<any>) => {
									field.onChange(
										(onChange && onChange(val.target.value as string)) || val.target.value
									);
									additionalOnChange &&
										additionalOnChange({
											...val.target,
											label: options?.find(e => e.id === val.target.value)?.label || ''
										});
								}}>
								{defaultOption}
								{selectOptions}
							</MuiSelect>
						)}
					/>
				) : (
					<MuiSelect
						{...selectProps}
						// @ts-ignore
						value={`${value}`}
						// @ts-ignore
						onChange={val => onChange && onChange(val.target.value)}>
						{defaultOption}
						{selectOptions}
					</MuiSelect>
				)}
				{(hasError || helperText) && <FormHelperText>{errorMessage || helperText}</FormHelperText>}
			</FormControl>
		</>
	);
};

Select.defaultProps = { ...defaultProps };

export { Select };
