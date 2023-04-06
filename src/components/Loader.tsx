import React, { DetailedHTMLProps, HTMLAttributes } from 'react';
import cn from 'classnames';

interface LoaderProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
	centered?: boolean;
}

const Loader: React.FC<LoaderProps> = ({centered, className = true}): JSX.Element => {
	return (
		<div className={cn('flex items-center justify-center space-x-2', className, {
			'h-screen': centered,
		})}>
			<div
				className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] text-primary motion-reduce:animate-[spin_1.5s_linear_infinite]"
				role="status">
    <span
			className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]"
		>Loading...</span
		>
			</div>
		</div>
	);
};

export default Loader;
