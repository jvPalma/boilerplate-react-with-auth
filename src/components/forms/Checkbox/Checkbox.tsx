//* EXTERNAL LIBS
import React, { useState } from 'react';
import { Controller } from 'react-hook-form';

//* EXTERNAL LIBS --> MUI
import { Checkbox as MuiCheckbox, FormControlLabel, FormHelperText } from '@mui/material';

//* LOCAL COMPONENT IMPORTS
// import { ReactComponent as CBoxOff } from 'assets/imgs/check_off.svg';
// import { ReactComponent as CBoxOn } from 'assets/imgs/check_on.svg';
import { useStyles } from './styles';
import { ExtendedInputFields, TName } from '../@types';

//* COMPONENT INTERFACES
export interface ICheckbox extends Omit<ExtendedInputFields, 'additionalOnChange' | 'value' | 'required' | 'onChange'> {
	/**
	 * The color of the checkbox
	 */
	color?: 'default' | 'error' | 'primary' | 'secondary' | 'info' | 'success' | 'warning' | undefined;
	/**
	 * The value of the checkbox
	 */
	value?: boolean;
	/**
	 * Whether the checkbox is disabled or not
	 */
	disabled?: boolean;
	classes?: { [x: string]: unknown };
	/**
	 * Additional to be performed whenever the checkbox's value changes
	 */
	additionalOnChange?: (checked: boolean) => void;
	/**
	 * TODO: add description to field
	 */
	[x: string]: string | number | React.ReactNode | unknown;
}

//* COMPONENT DEFAULT PROPS
const defaultProps = {
	// react-hook-form
	control: undefined,
	errors: undefined,

	classes: {},
	// field display fields
	label: undefined,
	name: undefined,
	value: false,
	defaultValue: false,
	helperText: undefined,
	lPrev: null,
	lEnd: null,

	// handlers
	additionalOnChange: undefined,

	// component specific
	color: 'primary'
};

//* COMPONENT
const Checkbox = ({
	name,
	label,
	value,
	classes,
	color,
	control,
	disabled,
	defaultValue,
	helperText,
	additionalOnChange
}: ICheckbox) => {
	const styles = useStyles();
	const [checked, setChecked] = useState<boolean>(value || false);

	const customClasses = { ...styles, ...classes };

	return (
		<>
			{control && (
				<Controller
					name={name as TName}
					// type="checkbox"
					// valueName="checked"
					control={control}
					render={({ field }) => (
						<FormControlLabel
							label={(label as string) || ''}
							disabled={disabled}
							classes={{
								root: customClasses.customCheckboxRoot,
								label: customClasses.customCheckboxLabel
							}}
							control={
								<MuiCheckbox
									// icon={<CBoxOff />}
									// checkedIcon={<CBoxOn />}
									color={color}
									onChange={() => {
										field.onChange(!field.value);
										additionalOnChange && additionalOnChange(!field.value);
									}}
									value={(field.value !== null ? field.value : defaultValue) || false}
									checked={(field.value !== null ? field.value : defaultValue) || false}
								/>
							}
						/>
					)}
				/>
			)}
			{!control && (
				<FormControlLabel
					label={(label as string) || ''}
					disabled={disabled}
					classes={{
						root: customClasses.customCheckboxRoot,
						label: customClasses.customCheckboxLabel
					}}
					control={
						<MuiCheckbox
							// icon={<CBoxOff />}
							// checkedIcon={<CBoxOn />}
							color={color}
							onChange={() => {
								setChecked(!checked);
								additionalOnChange && additionalOnChange(!checked);
							}}
							value={checked}
							checked={checked}
						/>
					}
				/>
			)}
			{helperText && <FormHelperText className={customClasses.helperText}>{helperText}</FormHelperText>}
		</>
	);
};

Checkbox.defaultProps = { ...defaultProps };

export { Checkbox };
