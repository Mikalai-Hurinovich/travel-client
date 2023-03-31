import React, { useEffect, useState } from 'react';
import { IBooking } from '../models/booking.interface';
import BookingService from '../services/booking.service';
import { Link, useNavigate } from 'react-router-dom';
import { calculateDaysDifference } from '../utils/calculateDaysDifference';

const Bookings = () => {
	const [bookings, setBookings] = useState<IBooking[]>([]);
	const navigate = useNavigate();
	useEffect(() => {
		BookingService.findAllUserBookings()
			.then((data) => {
				setBookings(data)
			})
			.catch(e => console.log(e.message))
	}, [])

	function handleDeleteAllBookings () {
		BookingService.deleteAllBookings()
			.then(data => alert(data.message))
			.catch(err => alert(err.message));
		setBookings([])
	}

	function handleNavigateHome () {
		navigate('/');
	}

	return (
		<>
			<div className="mt-5">
				{!!bookings.length && bookings.map(booking =>
					<div key={booking._id} className="flex mb-4 flex-wrap gap-4 rounded-2xl border border-primary">
						{typeof booking?.place !== 'string' &&
                <>
                    <img className="rounded-t-2xl md:w-80 md:rounded-l-2xl md:rounded-tr-none"
                         src={process.env.REACT_APP_BASE_API + '/' + booking?.place?.photos[0].path}
                         alt="placePhoto"/>
                    <div className="ml-3 p-2 grid gap-y-2">
                        <Link to={`/place/${booking?.place?._id}`}><h2
                            className="py-2 text-2xl underline text-primary">{booking?.place?.title}</h2></Link>
                        <div className="flex gap-2">
                            <span className="text-primary">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                     strokeWidth={1.5}
                                     stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round"
                                          d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z"/>
                                </svg>
                            </span>
													{booking.checkIn} - {booking.checkOut}</div>
                        <div className="flex gap-2">
                            <span className="text-primary">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                     strokeWidth={1.5}
                                     stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round"
                                          d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                                </svg>
                            </span>
                            ${booking.price}</div>
                        <div className="flex gap-2">
                            <span className="text-primary">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                     strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round"
                                          d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z"/>
                                </svg>
                            </span>
													{calculateDaysDifference(new Date(booking.checkOut), new Date(booking.checkIn))} nights
                        </div>
                        <div className="flex gap-2">
                            <span className="text-primary">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                     strokeWidth={1.5}
                                     stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round"
                                          d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"/>
                                </svg>
                            </span>
													{booking.guests} guests
                        </div>
                    </div>
                </>
						}
					</div>)}
				{!!bookings.length && <div className="mt-4 flex justify-center">
            <button className="contained" onClick={() => handleDeleteAllBookings()}>
                Delete all bookings
            </button>
        </div>}
				{!bookings.length && <div className="flex flex-col gap-5 h-80">
            <h2 className="text-2xl">No trips booked...yet!</h2>
            <h3 className="text-lg">Time to dust off your bags and start planning your next adventure</h3>
            <button className="self-start" onClick={() => handleNavigateHome()}>Start Searching</button>
        </div>}
			</div>
		</>
	);
};

export default Bookings;
