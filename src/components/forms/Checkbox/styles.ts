import { makeStyles } from '@mui/styles';

const useStyles = makeStyles(() => ({
	customCheckboxLabel: {
		color: '#403F41',
		fontSize: '12px',
		textAlign: 'justify'
	},
	customCheckboxRoot: {
		minWidth: '15rem'
	},
	helperText: {
		marginTop: '-5px',
		marginLeft: '13px'
	}
}));

export { useStyles };
