/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-ts-comment */
//* EXTERNAL LIBS
import React, { useState, useEffect } from 'react';
import { Controller } from 'react-hook-form';
import { styled } from '@mui/material/styles';

//* EXTERNAL LIBS --> MUI
import {
	FormControl,
	TextField,
	Autocomplete as MuiAutocomplete,
	FormHelperText,
	Checkbox,
	InputProps as MuiInputProps
} from '@mui/material';
import { ReactComponent as CBoxOff } from 'assets/imgs/cbox_off.svg';
import { ReactComponent as CBoxOn } from 'assets/imgs/cbox_on.svg';

// import Tag from 'components/Tag';

//* LOCAL COMPONENT IMPORTS
import { useStyles } from './styles';
import InputLabel from '../InputLabel';
import { ExtendedInputFields, TName, ISelectRadioOptions } from '../@types';
import { parseErrorMessage, parseIfError } from '../utils/formHelpers';

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
		paddingLeft: '15px',
		'& fieldset': {
			borderColor: '#A6B7E9'
		},
		'&:hover fieldset': {
			borderColor: '#A6B7E9'
		},
		'&.Mui-focused fieldset': {
			borderColor: '#97a0ba'
		}
	}
});

export const CSSAutocomplete = styled(MuiAutocomplete)({
	'& .MuiOutlinedInput-root': {
		padding: '1px 9px'
	}
});

//* COMPONENT INTERFACES
export interface ISelect extends Omit<ExtendedInputFields, 'name' | 'label' | 'onChange'> {
	/**
	 * Name of the select
	 */
	name?: string;
	/**
	 * Name of the select
	 */
	label?: string;
	/**
	 * Name of the select
	 */
	placeholder?: string;
	hasSelectedData?: boolean;
	noLabel?: boolean;
	InputProps?: MuiInputProps;
	/**
	 * The options to populate the select
	 */
	options: ISelectRadioOptions[];
	/**
	 * Additional action to be performed
	 */
	additionalOnChange?: (optionSelected: unknown) => void;
	additionalOnBlur?: (optionSelected: unknown) => void;
	onClose?: () => void;
	onClear?: () => void;
	[x: string]: any;
}

//* COMPONENT DEFAULT PROPS
const defaultProps = {
	// react-hook-form
	control: null,
	errors: null,

	// field display fields
	InputProps: undefined,
	onClear: undefined,
	name: null,
	hasSelectedData: false,
	noLabel: false,
	placeholder: null,
	defaultValue: [],
	label: null,
	value: [],
	helperText: ' ',
	required: false,
	lPrev: null,
	lEnd: null,

	// handlers
	onChange: (payload: ISelectRadioOptions[]) => payload,
	onClose: undefined,
	additionalOnChange: undefined,
	additionalOnBlur: undefined,

	// component specific
	multiple: false,
	options: [] as ISelectRadioOptions[]
};

//* COMPONENT
const Autocomplete = ({
	name,
	label,
	value,
	onChange,
	noLabel,
	lPrev,
	lEnd,
	required,
	onClear,
	helperText,
	hasSelectedData,
	errors,
	InputProps,
	additionalOnChange,
	additionalOnBlur,
	onClose,
	control,
	defaultValue,
	options,
	placeholder,
	...otherProps
}: ISelect) => {
	const [selectOptions, setSelectOptions] = useState<ISelectRadioOptions[]>(options);
	const classes = useStyles();
	const hasError = errors && name && Object.keys(errors).length > 0 ? parseIfError(errors, name) : null;
	const errorMessage = hasError && parseErrorMessage(hasError);

	const updateList = (selectedOptions: ISelectRadioOptions[]) => {
		if (!options) return;

		const ids = selectedOptions.map(e => e.id);

		const sortedArr = options.reduce((list, element) => {
			if (ids.includes(element.id)) {
				return [element, ...list];
			}
			return [...list, element];
		}, [] as ISelectRadioOptions[]);

		setSelectOptions(sortedArr);
	};

	useEffect(() => {
		updateList([]);
	}, [options]);

	return (
		<>
			{!noLabel && (
				<InputLabel error={Boolean(hasError)} prev={lPrev} end={lEnd} required={required}>
					{label || ''}
				</InputLabel>
			)}
			<FormControl
				error={Boolean(hasError)}
				className={classes.selectFormControl}
				style={{ minHeight: '58px' }}
				variant="outlined">
				{control ? (
					<Controller
						name={name as TName}
						control={control}
						defaultValue={defaultValue}
						render={({ field }) => (
							<CSSAutocomplete
								{...field}
								{...otherProps}
								multiple
								disableCloseOnSelect
								className={classes.customMultipleSelect}
								options={selectOptions}
								onClose={() => {
									updateList(field.value as ISelectRadioOptions[]);
									onClose && onClose();
								}}
								value={field.value || []}
								renderInput={({ ...params }) => (
									<CssTextField
										{...params}
										style={{ position: 'absolute', zIndex: 2 }}
										value={field.value || []}
										error={Boolean(hasError)}
										label={null}
										placeholder={
											field.value?.length && field.value?.length > 0 ? undefined : placeholder
										}
									/>
								)}
								// renderTags={(selectedValues: unknown[]) =>
								// 	(selectedValues as ISelectRadioOptions[]).map(item => (
								// 		<Tag key={`${item.id},${item.label}`} label={item.label} />
								// 	))
								// }
								onChange={(_, newValue, reason) => {
									field.onChange(newValue);
									additionalOnChange && additionalOnChange(newValue);
									if (reason === 'clear') {
										updateList(newValue as ISelectRadioOptions[]);
										onClear && onClear();
									}
								}}
								renderOption={(props, option, { selected }) => (
									<li {...props} style={{ display: 'flex', justifyContent: 'space-between' }}>
										{(option as ISelectRadioOptions).label}
										<Checkbox
											icon={<CBoxOff />}
											checkedIcon={<CBoxOn />}
											style={{ marginRight: 8 }}
											checked={selected}
										/>
									</li>
								)}
							/>
						)}
					/>
				) : null}
				{(hasError || helperText) && <FormHelperText>{errorMessage || helperText}</FormHelperText>}
			</FormControl>
		</>
	);
};

Autocomplete.defaultProps = { ...defaultProps };

export { Autocomplete };
