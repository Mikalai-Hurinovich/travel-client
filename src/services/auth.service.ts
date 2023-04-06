import axios, { AxiosResponse } from 'axios';
import { ILoginUser } from '../models/login-user.interface';
import { IUser } from '../models/user.interface';

async function register (newUser: any): Promise<AxiosResponse> {
	return await axios.post(`${process.env.REACT_APP_BASE_API}/register`, newUser);
}

async function login (user: ILoginUser): Promise<{ token: string, user: IUser } | null> {
	const res = await axios.post(`${process.env.REACT_APP_BASE_API}/login`, user);
	return res.data;
}

async function verifyJwt (jwt: string): Promise<{ exp: number }> {
	const res = await axios.post(`${process.env.REACT_APP_BASE_API}/verify-jwt`, jwt);
	return res.data;
}

const AuthService = {register, login, verifyJwt}
export default AuthService;
