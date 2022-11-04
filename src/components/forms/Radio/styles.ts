import { makeStyles } from '@mui/styles';

const useStyles = makeStyles(() => ({
	formControl: {
		float: 'left',
		'& legend': {
			transform: 'none !important',
			top: 'auto !important',
			left: 'auto !important',
			position: 'relative !important'
		}
	}
}));

export { useStyles };
