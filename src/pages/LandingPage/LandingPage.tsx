import React, { FC } from 'react';
// * 3rd party libs
import { useNavigate } from 'react-router-dom';

// * MUI
import { Button, Typography } from '@mui/material';

// * ASSETS

// * COMPONENTS
// import Page from 'components/Page';

// * TYPES

// * LOCAL IMPORTS
// import { useStyles } from './styles';

const LandingPage: FC = () => {
	// eslint-disable-next-line no-unused-vars
	const navigate = useNavigate();

	// useEffect(() => {
	// 	analytics('TermsScreen');
	// }, []);

	return (
		<>
			<div style={{ padding: '70px 50px 0' }}>
				<Typography>LandingPage Page</Typography>
			</div>
			<div style={{ padding: '50px', display: 'flex', gap: '30px' }}>
				<Button variant="outlined" onClick={() => navigate('/login')}>
					Login
				</Button>
				<Button variant="outlined" onClick={() => navigate('/signup')}>
					Sign UP
				</Button>
			</div>
		</>
	);
};

export default LandingPage;
