import { useState } from 'react';

export const useModal = (defaultOpen = false) => {
	const [open, setOpen] = useState(defaultOpen);
	const [data, setData] = useState<{ title: string, children: any }>({title: '', children: ''})

	const toggleOpen = (value?: boolean) => {
		setOpen(value ? value : isOpen => !isOpen);
	};

	return {open, toggleOpen, data, setData};
};
