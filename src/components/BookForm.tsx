import React, { ReactNode, useContext, useEffect } from 'react';
import { IPlace } from '../models/place.interface';
import BookingService from '../services/booking.service';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import { IUser } from '../models/user.interface';
import { calculateDaysDifference } from '../utils/calculateDaysDifference';
import Input from './shared/Input';
import { useForm } from 'react-hook-form';
import ErrorMessage from './ErrorMessage';

interface BookFormProps {
	place: IPlace;
}

interface FormInputsTypes {
	checkIn: string,
	checkOut: string,
	guests: string,
	name: string,
	email: string,
	price: number,
	phone: string,
}

const BookForm: React.FC<BookFormProps> = ({place}): JSX.Element => {
	const user = useContext(UserContext) as IUser;
	const navigate = useNavigate();

	const {
		register,
		getValues,
		setValue,
		formState: {errors, isValid},
		trigger
	} = useForm<FormInputsTypes>({
		mode: 'all',
		defaultValues: {
			checkIn: '',
			checkOut: '',
			guests: '',
			name: '',
			email: '',
			price: 0,
			phone: '',
		}
	});
	let finalPrice: number = 0;
	useEffect(() => {
		if (user) {
			setValue('name', user.name);
			setValue('email', user.email);
		}
	}, [user])
	const handleFormFieldChange = React.useCallback((event: React.ChangeEvent<any>) => {
		const {name, value} = event.target;
		setValue(name, value);
		return trigger(name);
	}, []);

	function calculateFinalPrice (): ReactNode {
		const {checkIn, checkOut} = getValues();
		if (checkIn && checkOut) {
			if (checkOut <= checkIn) return <ErrorMessage text="Error! Wrong Dates!"/>;
			if ((new Date(checkIn)) < new Date()) return <ErrorMessage text="Can't use past date!"/>
			const nights = calculateDaysDifference(new Date(checkOut), new Date(checkIn));
			const price = +place?.price;
			finalPrice = nights * price;
			return <div className="my-1.5">{`Total: $${price} x ${nights} night(s) = $${finalPrice}`}</div>
		}
	}

	async function handleSubmitBooking (): Promise<void> {
		await BookingService.createBooking({
			...getValues(),
			place: place._id as any,
			price: finalPrice,
			userId: user?._id
		})
			.then(() => {
				alert('Your booking has been successfully saved!');
				navigate('/user/bookings');
			})
			.catch(({response}) => {
				alert(response.data.message[0])
			})
	}

	return (
		<div className="border border-gray-200 my-2 rounded-2xl flex flex-col items-center">
			<h2 className="font-bold text-lg mt-4">Price: ${place.price} / night</h2>
			{getValues('checkIn') && getValues('checkOut') && <>
          <div className="flex flex-col border py-2 mt-2 px-4 rounded-xl w-9/12">
              <Input header="Your name"
                     className="w-full my-2 p-2 border rounded-2xl"
                     onChange={handleFormFieldChange}
                     placeholder="Name"
                     register={register('name', {required: true})}
                     id="name"
                     name="name"/>
						{errors.name && errors.name.type === 'required' && (
							<ErrorMessage text="Name is required"/>
						)}
          </div>
          <div className="flex flex-col border py-2 mt-2 px-4 rounded-xl w-9/12">
              <Input header="Your email"
                     className="w-full my-2 p-2 border rounded-2xl"
                     onChange={handleFormFieldChange}
                     placeholder="Email"
                     register={register('email', {required: true, pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i})}
                     id="email"
                     name="email"/>
						{errors.email && errors.email.type === 'required' && (
							<ErrorMessage text="Email is required"/>
						)}
						{errors.email && errors.email.type === 'pattern' && (
							<ErrorMessage text="Invalid email format"/>
						)}
          </div>
          <div className="flex flex-col border py-2 mt-2 px-4 rounded-xl w-9/12">
              <Input header="Your phone"
                     type="tel"
                     className="w-full my-2 p-2 border rounded-2xl"
                     onChange={handleFormFieldChange}
                     placeholder="Phone"
                     register={register('phone', {
											 required: true,
											 pattern: /(\+\d{1,3}\s?)?((\(\d{3}\)\s?)|(\d{3})(\s|-?))(\d{3}(\s|-?))(\d{4})(\s?(([E|e]xt[:|.|]?)|x|X)(\s?\d+))?/
										 })}
                     id="phone"
                     name="phone"/>
						{errors.phone && errors.phone.type === 'required' && (
							<ErrorMessage text="Phone is required"/>
						)}
						{errors.phone && errors.phone.type === 'pattern' && (
							<ErrorMessage text="Invalid phone format"/>
						)}
          </div>
          <div className="flex flex-col border py-2 mt-2 px-4 rounded-xl w-9/12">
              <Input header="Guests number"
                     type="number"
                     className="w-full my-2 p-2 border rounded-2xl"
                     onChange={handleFormFieldChange}
                     placeholder="Guests number"
                     register={register('guests', {required: true, min: 1, max: place?.maxGuests})}
                     min={1}
                     max={place?.maxGuests}
                     id="guests"
                     name="guests"/>
						{errors.guests && errors.guests.type === 'required' && (
							<ErrorMessage text="Guests number is required"/>
						)}
						{errors.guests && errors.guests.type === 'max' && (
							<ErrorMessage text={`Max Guests number is ${place?.maxGuests}`}/>
						)}
						{errors.guests && errors.guests.type === 'min' && (
							<ErrorMessage text={`Min Guests number is 1`}/>
						)}
          </div>
      </>}
			<div className="flex flex-col border py-2 mt-2 px-4 rounded-xl w-9/12">
				<Input header="Check In"
							 type="date"
							 className="w-full my-2 p-2 border rounded-2xl"
							 onChange={handleFormFieldChange}
							 register={register('checkIn', {required: true})}
							 id="checkIn"
							 name="checkIn"
							 onBlur={() => trigger('checkIn')}/>
			</div>
			<div className="flex flex-col border py-2 mt-2 px-4 rounded-xl w-9/12">
				<Input header="Check Out"
							 type="date"
							 className="w-full my-2 p-2 border rounded-2xl"
							 onChange={handleFormFieldChange}
							 register={register('checkOut', {required: true})}
							 id="checkOut"
							 name="checkOut"
							 onBlur={() => trigger('checkOut')}/>
			</div>
			<div>{calculateFinalPrice()}</div>
			<button onClick={handleSubmitBooking} className="contained w-1/2 mt-2 mb-4"
							disabled={!finalPrice || !isValid}>Book
			</button>
		</div>
	);
};

export default BookForm;
