/* eslint-disable */
// @ts-nocheck
import React from 'react';
import AutoNumeric from 'autonumeric';
import { TextField, InputAdornment } from '@mui/material';

import { styled } from '@mui/material/styles';

const CssTextField = styled(TextField)({
	'& label.Mui-focused': {
		color: '#A6B7E9'
	},
	'& .MuiInput-underline:after': {
		borderBottomColor: '#97a0ba'
	},
	'& .MuiOutlinedInput-root': {
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

class CurrencyTextField extends React.Component<any, any> {
	constructor(props) {
		super(props);
		this.getValue = this.getValue.bind(this);
		this.callEventHandler = this.callEventHandler.bind(this);
	}

	componentDidMount() {
		const { currencySymbol, ...others } = this.props;
		this.autonumeric = new AutoNumeric(this.input, this.props.value, {
			...this.props.preDefined,
			...others,
			onChange: undefined,
			onFocus: undefined,
			onBlur: undefined,
			onKeyPress: undefined,
			onKeyUp: undefined,
			onKeyDown: undefined,
			watchExternalChanges: false
		});
	}
	componentWillUnmount() {
		this.autonumeric.remove();
	}

	componentWillReceiveProps(newProps) {
		const isValueChanged = this.props.value !== newProps.value && this.getValue() !== newProps.value;

		if (isValueChanged) {
			this.autonumeric.set(newProps.value);
		}
	}

	getValue() {
		if (!this.autonumeric) return;
		const valueMapper = {
			string: numeric => numeric.getNumericString(),
			number: numeric => numeric.getNumber()
		};
		return valueMapper[this.props.outputFormat](this.autonumeric);
	}
	callEventHandler(event, eventName) {
		if (!this.props[eventName]) return;
		this.props[eventName](event, this.getValue());
	}
	render() {
		const { currencySymbol, inputProps, InputProps, ...others } = this.props;
		const otherProps = {};
		[
			'id',
			'label',
			'className',
			'autoFocus',
			'variant',
			'style',
			'error',
			'disabled',
			'type',
			'name',
			'defaultValue',
			'tabIndex',
			'fullWidth',
			'minRows',
			'maxRows',
			'select',
			'required',
			'helperText',
			'unselectable',
			'margin',
			'SelectProps',
			'multiline',
			'size',
			'FormHelperTextProps',
			'placeholder'
		].forEach(prop => (otherProps[prop] = this.props[prop]));

		return (
			<CssTextField
				inputRef={ref => (this.input = ref)}
				onChange={e => this.callEventHandler(e, 'onChange')}
				onFocus={e => this.callEventHandler(e, 'onFocus')}
				onBlur={e => this.callEventHandler(e, 'onBlur')}
				onKeyPress={e => this.callEventHandler(e, 'onKeyPress')}
				onKeyUp={e => this.callEventHandler(e, 'onKeyUp')}
				onKeyDown={e => this.callEventHandler(e, 'onKeyDown')}
				InputProps={{
					startAdornment: <InputAdornment position="start">{currencySymbol}</InputAdornment>,
					...InputProps
				}}
				inputProps={{
					className: 'teste',
					...inputProps
				}}
				{...otherProps}
			/>
		);
	}
}

export { CurrencyTextField };
