import React, { DetailedHTMLProps, HTMLAttributes, ReactNode } from 'react';
import Header from '../components/Header';
import cn from 'classnames';

interface MainLayoutProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
	title?: string;
	description?: string;
	keywords?: string;
	children: ReactNode
}

const MainLayout: React.FC<MainLayoutProps>
	= ({
			 children,
			 className,
			 title,
			 description,
			 keywords
		 }): JSX.Element => {
	return (
		<>
			{/*<head>*/}
			{/*	<title>{title || 'Travel App'}</title>*/}
			{/*	<meta charSet="utf-8"/>*/}
			{/*	<meta name="description"*/}
			{/*				content={`Travel app. The whole world is yours when you travel!` + description}/>*/}
			{/*	<meta name="robots" content="index, follow"/>*/}
			{/*	<meta name="keywords" content={keywords || "Traveling, booking, renting"}/>*/}
			{/*	<meta name="viewport" content="width=device-width, initial-scale=1"/>*/}
			{/*</head>*/}
			<Header/>
			<div className={cn('p-4', className)}>
				{children}
			</div>
		</>
	);
};

export default MainLayout;
