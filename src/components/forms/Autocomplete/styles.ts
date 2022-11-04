import { makeStyles } from '@mui/styles';

const useStyles = makeStyles(
	// (theme: XpandUiTheme)
	() => ({
		selectFormControl: {
			width: '100%'
		},
		optionsMenu: {
			maxHeight: '300px'
		},
		overrideMuiSelect: {
			height: '18px !important',
			minHeight: '18px !important'
		},
		customSelect: {
			textAlign: 'start',
			width: '100%',
			minWidth: '150px',
			borderRadius: 13,
			borderColor: '#A6B7E9',
			cursor: 'pointer',
			'& > div': {
				padding: '8px 34px 14px 19px'
			},
			'& fieldset': {
				borderColor: '#A6B7E9'
			},
			'&:hover fieldset': {
				borderColor: '#A6B7E9'
			},
			'&.Mui-focused fieldset': {
				borderColor: '#97a0ba'
			},
			'&.Mui-focused .MuiOutlinedInput-notchedOutline': {
				borderColor: '#97a0ba'
			}
		},
		customMultipleSelect: {
			width: '100%',
			cursor: 'pointer',
			'& > div': {
				minHeight: '30px !important',
				height: 'auto !important'
				// padding: '5px'
			}
		},
		defaultOption: {
			maxHeight: '32px',
			padding: '8px 16px',
			opacity: '1 !important',
			color: '#ffffff'
		},
		defaultOptionText: {
			fontSize: '14px',
			color: '#9c9b99'
		},
		chips: {
			display: 'flex',
			flexWrap: 'wrap',
			margin: '-1.5px'
		},
		chip: {
			margin: 1
		}
	})
);

export { useStyles };
