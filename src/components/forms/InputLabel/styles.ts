import { makeStyles } from '@mui/styles';

const useStyles = makeStyles(() => ({
	root: {
		'& > * + *': {
			marginLeft: 14
		},
		display: 'flex',
		alignItems: 'baseline'
	},
	customLabel: {
		paddingBottom: 7,
		paddingLeft: 20,
		color: '#141414',
		fontFamily: 'Lato Bold',
		textAlign: 'justify',
		whiteSpace: 'pre-line',
		fontSize: '18px',
		lineHeight: 1
	},
	hideLabel: {
		color: 'transparent !important' // this important is required to override the lib color when on error
	},
	asterisk: {
		fontSize: '18px'
	},
	hiddenAsterisk: {
		fontSize: '18px',
		color: 'transparent !important' // this important is required to override the lib color when on error
	}
}));

export { useStyles };
