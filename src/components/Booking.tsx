import React, { DetailedHTMLProps, HTMLAttributes } from 'react';
import { Link } from 'react-router-dom';
import { calculateDaysDifference } from '../utils/calculateDaysDifference';
import { IBooking } from '../models/booking.interface';

interface BookingProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
	booking: IBooking,
	deleteBooking: (id: string) => void
}

const Booking: React.FC<BookingProps> = ({booking, deleteBooking}): JSX.Element => {
	return (
		<div key={booking._id} className="flex mb-4 flex-wrap gap-4 rounded-2xl border border-primary relative">
			<img className="rounded-t-2xl md:w-80 md:rounded-l-2xl md:rounded-tr-none"
					 src={booking?.place?.photos[0].path}
					 alt="placePhoto"/>
			<div className="ml-3 p-2 flex flex-col gap-1.5 ">
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
			<div className="absolute top-3 right-3 z-10 bg-white rounded-full text-primary cursor-pointer"
					 onClick={() => deleteBooking(booking._id)}>
				<svg fill="none" viewBox="0 0 15 15" height="1.5em" width="1.5em">
					<path
						fill="currentColor"
						fillRule="evenodd"
						d="M.877 7.5a6.623 6.623 0 1113.246 0 6.623 6.623 0 01-13.246 0zM7.5 1.827a5.673 5.673 0 100 11.346 5.673 5.673 0 000-11.346zm2.354 3.32a.5.5 0 010 .707L8.207 7.5l1.647 1.646a.5.5 0 01-.708.708L7.5 8.207 5.854 9.854a.5.5 0 01-.708-.708L6.793 7.5 5.146 5.854a.5.5 0 01.708-.708L7.5 6.793l1.646-1.647a.5.5 0 01.708 0z"
						clipRule="evenodd"
					/>
				</svg>
			</div>
		</div>
	);
};

export default Booking;
