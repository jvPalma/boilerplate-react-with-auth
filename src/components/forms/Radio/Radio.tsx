//* EXTERNAL LIBS
import React from 'react';
import { Controller } from 'react-hook-form';

//* EXTERNAL LIBS --> MUI
import { FormControl, FormControlLabel, Radio as MuiRadio, FormHelperText, RadioGroup } from '@mui/material';

//* LOCAL COMPONENT IMPORTS
import { useStyles } from './styles';
import { ExtendedInputFields, ISelectRadioOptions, TName } from '../@types';
import { parseErrorMessage, parseIfError } from '../utils/formHelpers';
import InputLabel from '../InputLabel';

//* COMPONENT INTERFACES
export interface IRadio extends Omit<ExtendedInputFields, 'additionalOnChange' | 'value' | 'onChange'> {
	/**
	 * Color of the radio button group
	 */
	color?: 'default' | 'error' | 'primary' | 'secondary' | 'info' | 'success' | 'warning' | undefined;
	/**
	 * Value of the radio button group
	 */
	value?: string;
	/**
	 * Whether the radio button group is disabled or not
	 */
	disabled?: boolean;
	/**
	 * Additional to be performed whenever the checkbox's value changes
	 */
	additionalOnChange?: (checked: string) => void;
	/**
	 * The list of options of the radio button group
	 */
	options: ISelectRadioOptions[];
}

//* COMPONENT DEFAULT PROPS
const defaultProps = {
	// react-hook-form
	control: undefined,
	errors: undefined,

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
	required: false,
	color: 'primary',
	options: []
};

//* COMPONENT
const Radio = ({
	control,
	errors,
	name,
	label,
	lPrev,
	lEnd,
	options,
	color,
	required,
	defaultValue,
	helperText,
	additionalOnChange,
	...others
}: IRadio) => {
	const classes = useStyles();
	const hasError = errors && name && Object.keys(errors).length > 0 ? parseIfError(errors, name) : null;
	const errorMessage = hasError && parseErrorMessage(hasError);

	return (
		<FormControl error={Boolean(hasError)} className={classes.formControl} component="fieldset">
			<InputLabel component="legend" error={Boolean(hasError)} prev={lPrev} end={lEnd} required={required}>
				{label || ''}
			</InputLabel>
			<Controller
				name={name as TName}
				control={control}
				rules={{ required }}
				defaultValue={defaultValue}
				render={({ field }) => (
					<RadioGroup
						{...others}
						value={(field.value !== null ? `${field.value}` : `${defaultValue}`) || null}
						onChange={e => {
							field.onChange(e.target.value);
							additionalOnChange && additionalOnChange(e.target.value);
						}}>
						<>
							{options.map(e => (
								<FormControlLabel
									key={e.id}
									value={`${e.id}`}
									control={<MuiRadio color={color} />}
									label={e.label}
									style={{ color: '#000000de' }}
								/>
							))}
						</>
					</RadioGroup>
				)}
			/>
			{(hasError || helperText) && <FormHelperText>{errorMessage || helperText}</FormHelperText>}
		</FormControl>
	);
};

Radio.defaultProps = { ...defaultProps };

export { Radio };
