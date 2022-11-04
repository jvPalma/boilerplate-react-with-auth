import React, { FC } from 'react';
// * 3rd party libs
import { useNavigate } from 'react-router-dom';

import { Typography, Button } from '@mui/material';
import useAuth from 'hooks/useAuth';
import { removeLSField } from 'utils/cookies';

// * ASSETS

// * COMPONENTS
// import Page from 'components/Page';

// * TYPES

// * LOCAL IMPORTS
// import { useStyles } from './styles';

const Home: FC = () => {
	// eslint-disable-next-line no-unused-vars
	const navigate = useNavigate();
	const { setAuth } = useAuth();

	// useEffect(() => {
	// 	analytics('TermsScreen');
	// }, []);

	return (
		<>
			<div style={{ padding: '70px 50px 0' }}>
				<Typography>Home Page</Typography>
			</div>
			<div style={{ padding: '50px', display: 'flex', gap: '30px' }}>
				<Button
					variant="outlined"
					onClick={() => {
						removeLSField('token');
						setAuth(null);
						navigate('/');
					}}>
					Logout
				</Button>
			</div>
		</>
	);
};

export default Home;
