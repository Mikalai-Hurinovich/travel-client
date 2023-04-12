import React from 'react';
import { UseFormRegisterReturn } from 'react-hook-form/dist/types/form';

interface IInput extends React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
	description?: string;
	header?: string;
	containerStyles?: string;
	errors?: string[];
	register: UseFormRegisterReturn<string>;
	name: string,
}

const Input: React.FC<IInput> = (
	{
		description,
		header,
		className,
		containerStyles,
		placeholder,
		register,
		id,
		name,
		type,
		onBlur,
		...props
	}): JSX.Element => {
	return (
		<div className={containerStyles}>
			{header && <h2 className="text-xl text-primary">{header}</h2>}
			{description && <p className="text-gray-500 text-sm">{description}</p>}
			<input {...register}
						 {...props}
						 type={type}
						 className={className}
						 id={id}
						 name={name}
						 placeholder={placeholder}
						 onBlur={onBlur}
			/>
		</div>
	);
};

export default Input;
