import React, { MouseEvent } from 'react';
import MainLayout from '../layouts/MainLayout';
import { Link, useNavigate } from 'react-router-dom';
import AuthService from '../services/auth.service';
import { IDecodedJwt } from '../models/decoded-jwt.interface';
import jwt_decode from 'jwt-decode';
import useLocalStorage from '../hooks/useLocalStorage';
import { useForm, } from 'react-hook-form';
import ErrorMessage from '../components/ErrorMessage';

type FormInputsTypes = {
	email: string,
	password: string,
};

const Login: React.FC = (): JSX.Element => {
	const [jwt, setJwt] = useLocalStorage('jwt', null);
	const [user, setUser] = useLocalStorage('user', null);
	const navigate = useNavigate();
	const {register, getValues, formState: {errors, isValid}, trigger} = useForm<FormInputsTypes>({mode: 'onChange'});

	function handleFormSubmit (e: MouseEvent) {
		e.preventDefault();
		const {email, password} = getValues();
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
			.catch((response) => alert(response));
	}

	return (
		<MainLayout title="Login" className="flex">
			<div className="grow flex flex-col items-center justify-center  mb-32">
				<h1 className="text-3xl text-center text-primary">Login</h1>
				<form className="mt-2 max-w-xs w-2/3">
					<input type="email"
								 id="email"
								 placeholder="Your Email"
								 {...register('email', {required: true, pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i})}
								 name="email"
								 onBlur={() => trigger('email')}/>
					{errors.email && errors.email.type === 'required' && (
						<ErrorMessage text="Email is required"/>
					)}
					{errors.email && errors.email.type === 'pattern' && (
						<ErrorMessage text="Invalid email format"/>
					)}
					<input type="password"
								 id="password"
								 placeholder="Your Password"
								 {...register('password', {required: true, minLength: 3})}
								 name="password"
								 onBlur={() => trigger('password')}/>
					{errors.password && errors.password.type === 'required' && (
						<ErrorMessage text="Password is required"/>
					)}
					{errors.password && errors.password.type === 'minLength' && (
						<ErrorMessage text="Password must be minimum 3 characters"/>
					)}
					<div className="text-right text-gray-500 mr-2">Don't have an account?
						<Link className="text-primary" to="/register"> Register</Link>
					</div>
					<button className="min-w-full contained mt-2" disabled={!isValid} onClick={(e) => handleFormSubmit(e)}>Login
					</button>
				</form>
			</div>
		</MainLayout>
	);
};

export default Login;
