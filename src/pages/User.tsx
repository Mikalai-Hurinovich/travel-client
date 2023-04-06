import React, { useContext } from 'react';
import MainLayout from '../layouts/MainLayout';
import { useNavigate, useParams } from 'react-router-dom';
import cn from 'classnames';
import { UserContext } from '../context/UserContext';
import { IUser } from '../models/user.interface';
import { useLogout } from '../hooks/useLogout';
import Bookings from './Bookings';
import Places from './Places';

const User: React.FC = (): JSX.Element => {
	const user = useContext(UserContext) as IUser;
	const navigate = useNavigate();
	const {logout} = useLogout();
	const {subpage} = useParams();

	function handleNavigate (route: string): void {
		navigate(route);
	}

	function handleLogoutClick (): void {
		logout();
	}

	return (
		<MainLayout>
			<div className="flex justify-center mt-3 gap-x-9 flex gap-2">
				<button className={cn('py-2 px-4 flex gap-2', {'contained': !subpage})} onClick={() => handleNavigate('/user')}>
					<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
							 stroke="currentColor" className="w-6 h-6">
						<path strokeLinecap="round" strokeLinejoin="round"
									d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"/>
					</svg>
					My Profile
				</button>
				<button className={cn('py-2 px-4 flex gap-2', {'contained': subpage === 'bookings'})}
								onClick={() => handleNavigate('/user/bookings')}>
					<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
							 stroke="currentColor" className="w-6 h-6">
						<path strokeLinecap="round" strokeLinejoin="round"
									d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5"/>
					</svg>
					My Bookings
				</button>
				<button className={cn('py-2 px-4 flex gap-2', {'contained': subpage === 'places'})}
								onClick={() => handleNavigate('/user/places')}>
					<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
							 stroke="currentColor" className="w-6 h-6">
						<path strokeLinecap="round" strokeLinejoin="round"
									d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"/>
					</svg>
					My Places
				</button>
			</div>
			{!subpage && <div className="text-center max-w-lg mx-auto mt-10">
          Logged in as <strong>{user.name}</strong> with <strong>{user.email}</strong>
          <button className="w-full mt-4 contained" onClick={handleLogoutClick}>Logout</button>
      </div>}
			{subpage === 'bookings' && <Bookings/>}
			{subpage === 'places' && <Places/>}
		</MainLayout>
	);
};

export default User;
