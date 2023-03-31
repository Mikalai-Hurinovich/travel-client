import { useState } from 'react';

function useLocalStorage (key: string, initialValue: string | null) {
	const [value, setValue] = useState(() => {
		const item = localStorage.getItem(key);
		return item ? JSON.parse(item) : initialValue;
	});

	const setItem = (newValue: string) => {
		setValue(newValue);
		localStorage.setItem(key, JSON.stringify(newValue));
	};

	return [value, setItem];
}

export default useLocalStorage;
