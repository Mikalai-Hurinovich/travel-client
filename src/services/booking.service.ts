import axios from 'axios';
import { IBooking } from '../models/booking.interface';


async function findAllUserBookings (id: string): Promise<IBooking[]> {
	const res = await axios.get(`/user-bookings/${id}`);
	return res.data;
}

async function createBooking (data: Partial<IBooking>): Promise<any> {
	return await axios.post(`/bookings`, data);
}

async function getBookingById (id: string): Promise<IBooking> {
	const res = await axios.get(`/bookings/${id}`);
	return res.data;
}

async function deleteBookingById (id: string): Promise<{ message: string }> {
	const res = await axios.delete(`/bookings/${id}`);
	return res.data;
}

async function deleteAllBookings (): Promise<{ message: string }> {
	const res = await axios.delete(`/bookings/all`);
	return res.data;
}

const BookingService = {findAllUserBookings, createBooking, getBookingById, deleteBookingById, deleteAllBookings}
export default BookingService;
