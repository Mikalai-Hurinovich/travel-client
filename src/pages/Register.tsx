import React from 'react';
import MainLayout from '../layouts/MainLayout';
import { Link, useNavigate } from 'react-router-dom';
import AuthService from '../services/auth.service';
import { useForm } from 'react-hook-form';
import ErrorMessage from '../components/ErrorMessage';

type FormInputsTypes = {
	name: string,
	email: string,
	password: string,
	confirmPassword: string,
};

const Register: React.FC = (): JSX.Element => {
	const navigate = useNavigate();
	const {register, getValues, watch, formState: {errors, isValid, dirtyFields}, trigger} = useForm<FormInputsTypes>({
		mode: 'onChange'
	});

	function handleFormSubmit (e: React.MouseEvent<HTMLButtonElement>) {
		e.preventDefault();
		const {name, email, password} = getValues();

		AuthService
			.register({
				name,
				email,
				password
			})
			.then(() => {
				alert('You have successfully created an account!')
				navigate('/login');
				navigate(0);
			})
			.catch(({response}) => alert(response.data.message))
	}

	function arePasswordsValid (): boolean {
		return !!((errors.confirmPassword || errors.password) && dirtyFields.confirmPassword) && (getValues().password !== getValues().confirmPassword)
	}

	return (
		<MainLayout title="Login" className="flex">
			<div className="grow flex flex-col items-center justify-center  mb-32">
				<h1 className="text-3xl text-center text-primary">Register</h1>
				<form className="mt-2 max-w-xs">
					<input type="text"
								 {...register('name', {required: true})}
								 id="name"
								 name="name"
								 placeholder="Your Name"
								 onBlur={() => trigger('name')}
					/>
					{errors.name && errors.name.type === 'required' && (
						<ErrorMessage text="Name is required"/>
					)}
					<input type="email"
								 {...register('email', {required: true, pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i})}
								 id="email"
								 name="email"
								 placeholder="Your Email"
								 onBlur={() => trigger('email')}
					/>
					{errors.email && errors.email.type === 'required' && (
						<ErrorMessage text="Email is required"/>
					)}
					{errors.email && errors.email.type === 'pattern' && (
						<ErrorMessage text="Invalid email format"/>
					)}
					<input type="password"
								 {...register('password', {
									 required: true,
									 minLength: 3,
									 validate: (value) => value === watch('confirmPassword')
								 })}
								 id="password"
								 name="password"
								 placeholder="Your Password"
								 onBlur={() => trigger('password')}
					/>
					{errors.password && errors.password.type === 'required' && (
						<ErrorMessage text="Password is required"/>
					)}
					{errors.password && errors.password.type === 'minLength' && (
						<ErrorMessage text="Password must be at least 3 characters"/>
					)}
					<input type="password"
								 {...register('confirmPassword', {required: true, validate: (value) => value === watch('password')})}
								 id="confirmPassword"
								 name="confirmPassword"
								 placeholder="Confirm Your Password"
								 onBlur={() => trigger('confirmPassword')}
					/>
					{errors.confirmPassword && errors.confirmPassword.type === 'required' && (
						<ErrorMessage text="Confirm Password is required"/>
					)}
					{arePasswordsValid() && (
						<ErrorMessage text="Passwords don't match"/>
					)}
					<div className="text-right text-gray-500 mr-2">Do you have an account?
						<Link className="text-primary" to="/login"> Login</Link>
					</div>
					<button onClick={e => handleFormSubmit(e)} className="min-w-full contained mt-2"
									disabled={!isValid}>
						Register
					</button>
				</form>
			</div>
		</MainLayout>
	);
};

export default Register;
