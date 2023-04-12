import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import { IUser } from '../models/user.interface';
import SearchForm from './SearchForm';
import ThemeToggle from './ThemeToggle';
import Modal from './shared/Modal';
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
					<span onClick={() => setIsOpen()}>
						<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
								 stroke="currentColor"
								 className="w-6 h-6">
							<path strokeLinecap="round" strokeLinejoin="round"
										d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"/>
						</svg>
					</span>
					<Modal
						title="Error"
						isOpenProp={isOpen}
					>
					</Modal>
				</div>
			</header>
		</>
	);
};

export default Header;
