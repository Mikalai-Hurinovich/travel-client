import React, { FormEvent, useState } from 'react';
import MainLayout from '../layouts/MainLayout';
import { Link, useNavigate } from 'react-router-dom';
import AuthService from '../services/auth.service';


const Register: React.FC = (): JSX.Element => {
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const navigate = useNavigate();

	async function handleFormSubmit (e: FormEvent<HTMLFormElement>) {
		e.preventDefault();
		AuthService
			.register({
				name,
				email,
				password
			})
			.then(({data}) => {
				navigate('/login');
				navigate(0);
			})
			.catch(({response}) => alert(response.data.message))
	}

	return (
		<MainLayout title="Login" className="flex">
			<div className="grow flex flex-col items-center justify-center  mb-32">
				<h1 className="text-3xl text-center text-primary">Register</h1>
				<form className="mt-2 max-w-xs" onSubmit={e => handleFormSubmit(e)}>
					<input type="text"
								 placeholder="Your Name"
								 value={name}
								 onChange={(e) => setName(e.target.value)}/>
					<input type="email"
								 placeholder="Your Email"
								 value={email}
								 onChange={(e) => setEmail(e.target.value)}/>
					<input type="password"
								 placeholder="Your Password"
								 value={password}
								 onChange={(e) => setPassword(e.target.value)}/>
					<input type="password"
								 placeholder="Confirm Your Password"
								 value={confirmPassword}
								 onChange={(e) => setConfirmPassword(e.target.value)}/>
					<div className="text-right text-gray-500 mr-2">Do you have an account?
						<Link className="text-primary" to="/login"> Login</Link>
					</div>
					<button className="min-w-full contained mt-2">Register</button>
				</form>
			</div>
		</MainLayout>
	);
};

export default Register;
