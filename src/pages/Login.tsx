import React, { FormEvent, useState } from 'react';
import MainLayout from '../layouts/MainLayout';
import { Link, useNavigate } from 'react-router-dom';
import AuthService from '../services/auth.service';
import { IDecodedJwt } from '../models/decoded-jwt.interface';
import jwt_decode from 'jwt-decode';
import useLocalStorage from '../hooks/useLocalStorage';

const Login: React.FC = (): JSX.Element => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [jwt, setJwt] = useLocalStorage('jwt', null);
	const [user, setUser] = useLocalStorage('user', null);
	const navigate = useNavigate();

	async function handleFormSubmit (e: FormEvent<HTMLFormElement>) {
		e.preventDefault();
		AuthService
			.login({
				email,
				password
			})
			.then((data) => {
				if (data) {
					setJwt(data);
					const decodedJwt: IDecodedJwt = jwt_decode(data.token);
					setUser(decodedJwt.user);
				}
				navigate('/');
				navigate(0);
			})
			.catch(({response}) => alert(response.data.message));
	}

	return (
		<MainLayout title="Login" className="flex">
			<div className="grow flex flex-col items-center justify-center  mb-32">
				<h1 className="text-3xl text-center text-primary">Login</h1>
				<form className="mt-2 max-w-xs" onSubmit={e => handleFormSubmit(e)}>
					<input type="email" placeholder="Your Email" value={email}
								 onChange={(e) => setEmail(e.target.value)}/>
					<input type="password" placeholder="Your Password" value={password}
								 onChange={(e) => setPassword(e.target.value)}/>
					<div className="text-right text-gray-500 mr-2">Don't have an account?
						<Link className="text-primary" to="/register"> Register</Link>
					</div>
					<button className="min-w-full contained mt-2">Login</button>
				</form>
			</div>
		</MainLayout>
	);
};

export default Login;
