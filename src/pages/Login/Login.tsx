import React, { FC } from 'react';
// * 3rd party libs
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';

import { Button, Grid, Paper } from '@mui/material';

// * ASSETS

// * COMPONENTS
import Input from 'components/forms/Input';
import useAuth from 'hooks/useAuth';

// * LOCAL IMPORTS
// import { useStyles } from './styles';
// import Page from 'components/Page';
import { schema, defaultValues } from './yupSchema';

// * TYPES
interface LoginPost {
	username: string;
	password: string;
}

const Login: FC = () => {
	// const classes = useStyles();
	const navigate = useNavigate();
	const { setAuth } = useAuth();

	const {
		handleSubmit,
		control,
		formState: { errors }
	} = useForm<LoginPost>({
		mode: 'onTouched',
		resolver: yupResolver(schema),
		reValidateMode: 'onChange',
		defaultValues,
		shouldUnregister: false
	});

	const onSubmit = (loginPayload: LoginPost) => {
		const authPayload = { user: loginPayload.username };
		localStorage.setItem('token', JSON.stringify(authPayload));
		setAuth(authPayload);
		navigate('/home');
	};

	return (
		<div style={{ padding: 30 }}>
			<Paper>
				<form
					id="new-job"
					onSubmit={e => {
						e.preventDefault();
						return handleSubmit(data => onSubmit(data))(e);
					}}>
					<Grid
						container
						spacing={3}
						direction="row"
						justifyContent="center"
						alignItems="center"
						style={{ minWidth: '500px', padding: '30px 30%' }}>
						<Grid item xs={12}>
							<Input
								required
								name="username"
								label="Username"
								placeholder="Email or username"
								control={control}
								errors={errors}
							/>
						</Grid>
						<Grid item xs={12}>
							<Input
								required
								name="password"
								type="password"
								label="Password"
								placeholder="Password"
								control={control}
								errors={errors}
							/>
						</Grid>

						<Grid item xs={6}>
							<Button variant="outlined" fullWidth type="submit">
								Login
							</Button>
						</Grid>
						<Grid item xs={6}>
							<Button variant="outlined" fullWidth onClick={() => navigate('/signup')}>
								Sign UP
							</Button>
						</Grid>
					</Grid>
				</form>
			</Paper>
		</div>
	);
};

export default Login;
