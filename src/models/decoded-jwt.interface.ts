import { IUser } from './user.interface';

export interface IDecodedJwt {
	user: IUser;
	exp: number;
	iat: number;
}
