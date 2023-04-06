import React, { DetailedHTMLProps, HTMLAttributes } from 'react';

interface IInput extends DetailedHTMLProps<HTMLAttributes<HTMLInputElement>, HTMLInputElement> {
	description: string;
	header: string;
	containerStyle?: string;
	name: string;
	errors?: string[];
	type?: string;
	required?: boolean;
	value: string;
}

const Input: React.FC<IInput> = (
	{
		description,
		header,
		placeholder,
		className,
		containerStyle,
		errors,

		name,
		onChange,
		required = false,
		type = 'text',
		value,
	}): JSX.Element => {
	return (
		<>
			{header && <h2 className="text-xl text-primary">{header}</h2>}
			{description && <p className="text-gray-500 text-sm">{description}</p>}
			<input type={type} placeholder={placeholder} name={name} onChange={onChange} value={value} required={required}/>
		</>
	);
};

export default Input;
