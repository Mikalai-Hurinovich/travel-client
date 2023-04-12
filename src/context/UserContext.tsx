import React, { createContext, DetailedHTMLProps, HTMLAttributes } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';

export const UserContext = createContext({});

export interface IUserContextProvider extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
}

const UserContextProvider: React.FC<IUserContextProvider> = ({children}) => {
	const [user] = useLocalStorage('user', null)
	return (
		<UserContext.Provider value={user}>
			{children}
		</UserContext.Provider>
	);
};

export default UserContextProvider;
