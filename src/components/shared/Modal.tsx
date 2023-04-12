import React, { DetailedHTMLProps, HTMLAttributes, ReactNode, useContext, useEffect, useState } from 'react';
import { ThemeContext } from '../../context/ThemeContext';
import cn from 'classnames';

interface ModalProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
	title?: string;
	children?: ReactNode
	isOpenProp?: boolean | undefined;
	onClose?: () => void;
	onOk?: () => void;
	okButtonName?: string;
	cancelButtonName?: string;
}

function Modal (
	{
		title,
		children,
		isOpenProp = false,
		okButtonName = 'Ok',
		cancelButtonName = 'Cancel',
		onClose,
		onOk
	}: ModalProps) {
	const [isOpen, setIsOpen] = useState<boolean>(isOpenProp);
	const theme = useContext(ThemeContext);
	const handleClose = () => {
		setIsOpen(false);
		onClose && onClose();
	};
	useEffect(() => {
		setIsOpen(isOpenProp);
	}, [isOpenProp]);

	function handleOkClick () {
		setIsOpen(false);
		onOk && onOk();
	}

	return (
		<>
			{isOpen && (
				<div className="fixed z-10 inset-0 overflow-y-auto cursor-auto bg-primary bg-opacity-30"
						 onClick={handleClose}>
					<div className="flex items-center justify-center min-h-screen">
						<div className={cn(`p-5 rounded-lg w-1/3 relative border shadow-lg`, {
							'bg-active border-active text-white': theme === 'dark',
							'bg-white text-primary': theme === 'light',
						})} onClick={e => e.stopPropagation()}>
							<div className="p-4">
								{title && <h2 className="text-xl font-medium mb-4">{title}</h2>}
								{children && children}
							</div>
							<div className="absolute top-3 right-3 z-10 rounded-full cursor-pointer"
									 onClick={handleClose}>
								<svg fill="none" viewBox="0 0 15 15" height="1.5em" width="1.5em">
									<path
										fill="currentColor"
										fillRule="evenodd"
										d="M.877 7.5a6.623 6.623 0 1113.246 0 6.623 6.623 0 01-13.246 0zM7.5 1.827a5.673 5.673 0 100 11.346 5.673 5.673 0 000-11.346zm2.354 3.32a.5.5 0 010 .707L8.207 7.5l1.647 1.646a.5.5 0 01-.708.708L7.5 8.207 5.854 9.854a.5.5 0 01-.708-.708L6.793 7.5 5.146 5.854a.5.5 0 01.708-.708L7.5 6.793l1.646-1.647a.5.5 0 01.708 0z"
										clipRule="evenodd"
									/>
								</svg>
							</div>
							<div className="flex justify-center gap-3 mb-5">
								<button onClick={handleClose}>{cancelButtonName}</button>
								<button className="contained" onClick={handleOkClick}>{okButtonName}</button>
							</div>
						</div>
					</div>
				</div>
			)}
		</>
	);
}

export default Modal;
