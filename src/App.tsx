import React, { useEffect } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import UserContextProvider from './context/UserContext';
import AuthService from './services/auth.service';
import User from './pages/User';
import { useLogout } from './hooks/useLogout';
import NotFound from './pages/NotFound';
import PlaceDetails from './pages/PlaceDetails';
import useLocalStorage from './hooks/useLocalStorage';
import UserPlace from './pages/UserPlace';
import ThemeContextProvider from './context/ThemeContext';
import { setBaseUrl, setDefaultToken } from './config/axios';

setBaseUrl();

function App () {
	const {logout} = useLogout();
	const [jwt] = useLocalStorage('jwt', null)
	const [storedUser] = useLocalStorage('user', null)
	const [jwtExpiration, setJwtExpiration] = useLocalStorage('jwtExpiration', null)

	if (jwt && storedUser) {
		setDefaultToken(jwt.token);
	}

	useEffect(() => {
		if (jwtExpiration) {
			if (Date.now() > jwtExpiration) {
				logout();
			}
		} else {
			if (jwt) {
				AuthService
					.verifyJwt(jwt)
					.then(data => {
						if (data) {
							const jwtExpirationMs = data.exp * 1000;
							setJwtExpiration(jwtExpirationMs);
						}
					})
					.catch(() => {
						logout();
					})
			}
		}
	}, [])

	return (
		<UserContextProvider>
			<ThemeContextProvider>
				{jwt
					? <Routes>
						<Route index path="/" element={<Home/>}></Route>
						<Route path="/login" element={<Home/>}></Route>
						<Route path="/user/:subpage?" element={<User/>}></Route>
						<Route path="/user/places/create" element={<UserPlace/>}></Route>
						<Route path="/user/places/:id" element={<UserPlace/>}></Route>
						<Route path="/places/:id" element={<PlaceDetails/>}></Route>
						<Route path="/place/:id" element={<PlaceDetails/>}></Route>
						<Route path="/register" element={<Home/>}></Route>
						<Route path="/404" element={<NotFound/>}></Route>
						<Route path="*" element={<Navigate to={'/404'}/>}></Route>
					</Routes>
					: <Routes>
						<Route path="/register" element={<Register/>}></Route>
						<Route path="*" element={<Login/>}></Route>
					</Routes>}
			</ThemeContextProvider>
		</UserContextProvider>
	);
}

export default App;
