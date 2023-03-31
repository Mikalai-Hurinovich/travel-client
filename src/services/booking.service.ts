import axios from 'axios';
import { IBooking } from '../models/booking.interface';


async function findAllUserBookings (): Promise<IBooking[]> {
	const res = await axios.get(`/user-bookings`);
	return res.data;
}

async function createBooking (data: Partial<IBooking>): Promise<any> {
	return await axios.post(`/bookings`, data);
}

async function getBookingById (id: string): Promise<IBooking> {
	const res = await axios.get(`/bookings/${id}`);
	return res.data;
}

async function deleteAllBookings (): Promise<{ message: string }> {
	const res = await axios.delete(`/bookings/all`);
	return res.data;
}

const BookingService = {findAllUserBookings, createBooking, getBookingById, deleteAllBookings}
export default BookingService;
