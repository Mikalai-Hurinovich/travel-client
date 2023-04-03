import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import { IUser } from '../models/user.interface';
import SearchForm from './SearchForm';

const Header: React.FC = (): JSX.Element => {
	const user = useContext(UserContext) as IUser;
	return (
		<>
			<header className="flex justify-between align-middle p-4">
				<a href="/" className="flex items-center logoContainer">
					<img className="logo" src="/logo.svg" alt="logo"/>
					<span className="ml-2">YTravel</span>
				</a>
				<SearchForm/>
				<Link to={user ? '/user' : '/login'}
							className="flex rounded-full items-center border border-gray-400 py-2  gap-2.5 px-4 shadow-md shadow-gray-100">
					<div className="bg-primary flex rounded-full text-white p-2">
						<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
								 stroke="currentColor"
								 className="w-6 h-6">
							<path strokeLinecap="round" strokeLinejoin="round"
										d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"/>
						</svg>
					</div>
					{user && <span>{user.name}</span>}
					<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
							 stroke="currentColor"
							 className="w-6 h-6">
						<path strokeLinecap="round" strokeLinejoin="round"
									d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"/>
					</svg>
				</Link>
			</header>

		</>
	);
};

export default Header;
