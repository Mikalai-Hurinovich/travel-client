import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import { IUser } from '../models/user.interface';
import SearchForm from './SearchForm';
import ThemeToggle from './ThemeToggle';
import { useModal } from '../hooks/useModal';

const Header: React.FC = (): JSX.Element => {
	const user = useContext(UserContext) as IUser;
	const {open: isOpen, toggleOpen: setIsOpen} = useModal();
	return (
		<>
			<header className="flex justify-between align-middle p-4">
				<Link to="/" className="flex items-center logoContainer">
					<span className="ml-2 underline">YTravel</span>
				</Link>
				{user && <SearchForm/>}
				<div
					className="flex rounded-full items-center  py-2 gap-2.5 px-4 cursor-pointer">
					<ThemeToggle/>
					{user && <Link to="/user">{user.name}</Link>}
				</div>
			</header>
		</>
	);
};

export default Header;
