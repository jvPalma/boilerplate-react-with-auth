import { CustomReactTheme } from '@mui/material';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme: CustomReactTheme) => ({
	root: {
		flexGrow: 1
	},
	//* TABLET - landScape
	[theme.breakpoints.down('lg')]: {},
	//* TABLET - portrait
	[theme.breakpoints.down('md')]: {},
	//* MOBILE
	[theme.breakpoints.down('sm')]: {}
}));

export { useStyles };
