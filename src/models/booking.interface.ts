import { IPlace } from './place.interface';

export interface IBooking {
	_id: string;
	place: IPlace | string;
	checkIn: string;
	checkOut: string;
	guests: string;
	name: string;
	price: number;
	email: string;
	phone: string;
	userId: string;
}
