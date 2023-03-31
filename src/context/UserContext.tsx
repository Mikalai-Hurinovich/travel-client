import React, { createContext, DetailedHTMLProps, HTMLAttributes } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';

export const UserContext = createContext({});

export interface UserContextProvider extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
}

const UserContextProvider: React.FC<UserContextProvider> = ({children}) => {
	const [user] = useLocalStorage('user', null)
	return (
		<UserContext.Provider value={user}>
			{children}
		</UserContext.Provider>
	);
};

export default UserContextProvider;
