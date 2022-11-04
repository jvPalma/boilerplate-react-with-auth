//* EXTERNAL LIBS
import React from 'react';
import clsx from 'clsx';

//* EXTERNAL LIBS --> MUI
import { InputLabel as MuiInputLabel } from '@mui/material';

//* LOCAL COMPONENT IMPORTS
import { useStyles } from './styles';

//* COMPONENT INTERFACES
export interface IInputLabel {
	/**
	 * Specific css classes to be applied to the component
	 */
	className?: string;
	/**
	 * Children data to be passed onto the component
	 */
	children?: string | React.ReactNode | number;
	/**
	 * String to add something before the label
	 */
	prev?: string | React.ReactNode | number;
	/**
	 * String to add something after the label
	 */
	end?: string | React.ReactNode | number;
	/**
	 * Whether there's an error with the InputLabel or not
	 */
	error?: boolean;
	/**
	 * Whether the InputLabel is required or not
	 */
	required?: boolean;
	/**
	 *
	 */
	component?: string;
	[x: string]: string | number | React.ReactNode | unknown;
}

//* COMPONENT DEFAULT PROPS
const defaultProps = {
	className: '',
	prev: null,
	end: null,
	children: null,
	error: false,
	required: false
};

//* COMPONENT
const InputLabel = ({ children, className, prev, end, ...others }: IInputLabel) => {
	const classes = useStyles();

	const emptyLabel = !children || (typeof children === 'string' && children.trim() === '');
	return (
		<div className={classes.root}>
			{prev && prev}
			<MuiInputLabel
				classes={{ asterisk: emptyLabel ? classes.hiddenAsterisk : classes.asterisk }}
				className={clsx(classes.customLabel, className, { [classes.hideLabel]: emptyLabel })}
				{...others}>
				{children}
			</MuiInputLabel>
			{end && end}
		</div>
	);
};

InputLabel.defaultProps = { ...defaultProps };

export { InputLabel };
