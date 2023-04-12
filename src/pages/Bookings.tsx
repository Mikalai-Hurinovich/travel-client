import React, { useContext, useEffect, useState } from 'react';
import { IBooking } from '../models/booking.interface';
import BookingService from '../services/booking.service';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import { IUser } from '../models/user.interface';
import Loader from '../components/Loader';
import Booking from '../components/Booking';

const Bookings: React.FC = (): JSX.Element => {
	const {_id: userId} = useContext(UserContext) as IUser;
	const [bookings, setBookings] = useState<IBooking[]>([]);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const navigate = useNavigate();
	useEffect(() => {
		fetchUserBookings(userId)
	}, [])

	function fetchUserBookings (id: string) {
		setIsLoading(true);
		BookingService.findAllUserBookings(id)
			.then((data) => {
				setBookings(data.reverse())
			})
			.catch(e => console.log(e.message))
			.finally(() => setIsLoading(false))
	}

	function handleDeleteAllBookings () {
		BookingService.deleteAllBookings()
			.then(data => alert(data.message))
			.catch(err => alert(err.message));
		setBookings([])
	}

	function handleDeleteBooking (id: string) {
		BookingService.deleteBookingById(id)
			.then(data => alert(data.message))
			.catch(err => alert(err.message))
			.finally(() => fetchUserBookings(id))
	}

	function handleNavigateHome () {
		navigate('/');
	}

	if (isLoading) {
		return <div className="h-80">
			<Loader className="h-full"/>
		</div>;
	}

	return (
		<>
			<div className="mt-5">
				{(!!bookings.length && !isLoading) && bookings.map(booking =>
					<Booking key={booking._id} booking={booking} deleteBooking={handleDeleteBooking}/>)}
				{!!bookings.length && <div className="mt-4 flex justify-center">
            <button className="contained" onClick={() => handleDeleteAllBookings()}>
                Delete all bookings
            </button>
        </div>}
				{(!bookings.length && !isLoading) && <div className="flex flex-col gap-5 h-80">
            <h2 className="text-2xl">No trips booked...yet!</h2>
            <h3 className="text-lg">Time to dust off your bags and start planning your next adventure</h3>
            <button className="self-start" onClick={() => handleNavigateHome()}>Start Searching</button>
        </div>}
			</div>
		</>
	);
};

export default Bookings;
