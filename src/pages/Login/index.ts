import { redirect } from 'react-router-dom';
import { getLSField } from 'utils/cookies';
import Login from './Login';

export default Login;

export async function loader() {
	const userToken = getLSField('token');
	if (userToken) {
		return redirect('/home');
	}
	return null;
}
