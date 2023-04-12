import React from 'react';
import MainLayout from '../layouts/MainLayout';
import { Link, useNavigate } from 'react-router-dom';
import AuthService from '../services/auth.service';
import { useForm } from 'react-hook-form';
import ErrorMessage from '../components/ErrorMessage';
import Input from '../components/shared/Input';
import { useModal } from '../hooks/useModal';
import Modal from '../components/shared/Modal';

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
	const {open, toggleOpen, data, setData} = useModal();

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
			.catch(({response}) => {
				toggleOpen(true);
				setData({title: 'Error!', children: response.data.message})
			})
	}

	function arePasswordsValid (): boolean {
		return !!((errors.confirmPassword || errors.password) && dirtyFields.confirmPassword) && (getValues().password !== getValues().confirmPassword)
	}

	return (
		<MainLayout title="Login" className="flex">
			<div className="grow flex flex-col items-center justify-center  mb-32">
				<h1 className="text-3xl text-center text-primary">Register Form</h1>
				<form className="mt-2 max-w-xs w-2/3">
					<Input type="text"
								 register={register('name', {required: true})}
								 id="name"
								 name="name"
								 placeholder="Your Name"
								 onBlur={() => trigger('name')}
					/>
					{errors.name && errors.name.type === 'required' && (
						<ErrorMessage text="Name is required"/>
					)}
					<Input type="email"
								 register={register('email', {required: true, pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i})}
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
					<Input type="password"
								 register={register('password', {
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
					<Input type="password"
								 register={register('confirmPassword', {
									 required: true,
									 validate: (value) => value === watch('password')
								 })}
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
					<button onClick={e => handleFormSubmit(e)} className="w-full contained mt-2"
									disabled={!isValid}>
						Register
					</button>
				</form>
			</div>
			<Modal
				title={data?.title}
				isOpenProp={open}
				onClose={toggleOpen}
				onOk={toggleOpen}
			>
				{data?.children}
			</Modal>
		</MainLayout>
	);
};

export default Register;
