import { makeStyles } from '@mui/styles';

const useStyles = makeStyles(() => ({
	w100: {
		width: '100%'
	},
	noBorder: {
		'& div': {
			// border on hover
			'&:hover': {
				'&:before': {
					border: 'none !important'
				}
			},
			// normal border
			'&:before': {
				border: 'none !important'
			},
			'& > input': {
				marginLeft: '-7px',
				fontSize: '14px',
				fontWeight: 600
			}
		}
	}
}));

export { useStyles };
