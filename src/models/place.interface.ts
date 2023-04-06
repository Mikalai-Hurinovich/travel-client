import { IPhoto } from './photo.interface';

export interface IPlace {
	_id: string;
	title: string;
	owner: string;
	address: string;
	photos: IPhoto[];
	description: string;
	checkIn: string;
	price: number;
	checkOut: string;
	features: string[];
	maxGuests: string;
}
