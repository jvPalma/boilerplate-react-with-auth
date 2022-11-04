import React from 'react';
import { ToastContainer } from 'react-toastify';
import { Grid, Typography, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useStyles } from './styles';

export interface IPage {
	title1?: string;
	title2?: string;
}

const Page: React.FC<IPage> = ({ title1, title2, children }) => {
	const classes = useStyles();

	const theme = useTheme();
	const isTablet = useMediaQuery(theme.breakpoints.down('md'));
	const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

	return (
		<div className={classes.root}>
			<Grid container className={classes.rootContainer}>
				<Grid className={classes.logo} item xs={12}>
					{/* <Logo /> */}
				</Grid>
				<Grid className={classes.titleContainer} item xs={12}>
					{title1 && (
						<Typography style={{ color: '#403F41' }} className={classes.title}>
							{title1}
						</Typography>
					)}
					{title2 && (
						<Typography style={{ color: '#403F41' }} className={classes.titleBold}>
							{title2}
						</Typography>
					)}
				</Grid>

				<ToastContainer
					style={{
						width: (isTablet && (isMobile ? '100%' : '450px')) || '580px',
						height: '90px',
						minHeight: '150px'
					}}
				/>
				{children}
			</Grid>
		</div>
	);
};

Page.defaultProps = {
	title1: undefined,
	title2: undefined
};

export { Page };
