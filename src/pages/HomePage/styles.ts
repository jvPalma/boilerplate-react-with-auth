import { CustomReactTheme } from '@mui/material';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme: CustomReactTheme) => ({
	//* TABLET - landScape
	[theme.breakpoints.down('lg')]: {},
	//* TABLET - portrait
	[theme.breakpoints.down('md')]: {},
	//* MOBILE
	[theme.breakpoints.down('sm')]: {}
}));

export { useStyles };
