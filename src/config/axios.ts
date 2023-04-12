import axios from 'axios';

export const setBaseUrl = () => {
	axios.defaults.baseURL = process.env.REACT_APP_BASE_API;
};

export const setDefaultToken = (token: string) => {
	axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
};

