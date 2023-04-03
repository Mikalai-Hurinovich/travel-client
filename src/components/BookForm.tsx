import React, { useContext, useEffect, useState } from 'react';
import { IPlace } from '../models/place.interface';
import BookingService from '../services/booking.service';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import { IUser } from '../models/user.interface';
import { calculateDaysDifference } from '../utils/calculateDaysDifference';

interface BookFormProps {
	place: IPlace;
}

const BookForm: React.FC<BookFormProps> = ({place}): JSX.Element => {
	const user = useContext(UserContext) as IUser;
	const [state, setState] = useState({
		checkIn: '',
		checkOut: '',
		guests: '',
		name: '',
		email: '',
		price: 0,
		phone: '',
	});
	const navigate = useNavigate();
	let finalPrice: number = 0;
	useEffect(() => {
		if (user) {
			setState(state => ({
				...state,
				name: user.name,
				email: user.email
			}))
		}
	}, [user])
	const handleFormFieldChange = React.useCallback((event: React.ChangeEvent<any>) => {
		const {name, value} = event.target;
		setState((prevState) => ({
			...prevState,
			[name]: value
		}));
	}, []);

	function calculateFinalPrice () {
		if (state.checkIn && state.checkOut) {
			if (state.checkOut <= state.checkIn) return 'Error! Wrong Dates!';
			if ((new Date(state.checkIn)) < new Date()) return 'Can\'t use past date!';
			const nights = calculateDaysDifference(new Date(state.checkOut), new Date(state.checkIn));
			const price = +place?.price;
			finalPrice = nights * price;
			return `Total: $${price} x ${nights} night(s) = $${finalPrice}`
		}
	}

	async function handleSubmitBooking () {
		await BookingService.createBooking({
			...state,
			place: place._id as any,
			price: finalPrice,
			userId: user?._id
		})
			.then(() => {
				alert('Your booking has been successfully saved!');
				navigate('/user/bookings');
			})
			.catch(({res}) => {
				alert(res.data.message[0])
			})
	}

	return (
		<div className="border border-gray-200 bg-white  my-2 rounded-2xl flex flex-col items-center">
			<h2 className="font-bold text-lg mt-4">Price: ${place.price} / night</h2>
			{state.checkIn && state.checkOut && <>
          <div className="flex flex-col border py-2 mt-2 px-4 rounded-xl w-9/12">
              <label htmlFor="name">You name:</label>
              <input type="text" id="name" value={state.name} onChange={handleFormFieldChange} name="name"/>
          </div>
          <div className="flex flex-col border py-2 mt-2 px-4 rounded-xl w-9/12">
              <label htmlFor="email">You email:</label>
              <input type="email" id="email" value={state.email} onChange={handleFormFieldChange} name="email"/>
          </div>
          <div className="flex flex-col border py-2 mt-2 px-4 rounded-xl w-9/12">
              <label htmlFor="phone">You phone:</label>
              <input type="tel" id="phone" value={state.phone} onChange={handleFormFieldChange} name="phone"/>
          </div>
          <div className="flex flex-col border py-2 mt-2 px-4 rounded-xl w-9/12">
              <label htmlFor="guests">Number of guests:</label>
              <input type="number" min="1" id="guests" value={state.guests} onChange={handleFormFieldChange}
                     name="guests"/>
          </div>
      </>}
			<div className="flex flex-col border py-2 mt-2 px-4 rounded-xl w-9/12">
				<label htmlFor="checkIn">Check-In:</label>
				<input type="date" id="checkIn" value={state.checkIn} onChange={handleFormFieldChange} name="checkIn"/>
			</div>
			<div className="flex flex-col border py-2 mt-2 px-4 rounded-xl w-9/12">
				<label htmlFor="checkOut">Check-Out:</label>
				<input type="date" id="checkOut" value={state.checkOut} onChange={handleFormFieldChange} name="checkOut"/>
			</div>
			<div>{calculateFinalPrice()}</div>
			<button onClick={handleSubmitBooking} className="contained w-1/2 mt-2 mb-4" disabled={!finalPrice}>Book
			</button>
		</div>
	);
};

export default BookForm;
