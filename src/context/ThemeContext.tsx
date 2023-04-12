import React, { createContext, DetailedHTMLProps, HTMLAttributes } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';

export const ThemeContext = createContext({});

export interface ThemeContextProvider extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
}

const ThemeContextProvider: React.FC<ThemeContextProvider> = ({children}) => {
	const [theme] = useLocalStorage('theme', null)
	return (
		<ThemeContext.Provider value={theme}>
			{children}
		</ThemeContext.Provider>
	);
};

export default ThemeContextProvider;
