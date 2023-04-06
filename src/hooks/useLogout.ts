import { useNavigate } from 'react-router-dom';

export const useLogout = () => {
	const navigate = useNavigate();
	const logout = () => {
		localStorage.removeItem('user');
		localStorage.removeItem('jwt');
		localStorage.removeItem('jwtExpiration');
		navigate('/login');
		navigate(0);
	}
	return {logout}
}
