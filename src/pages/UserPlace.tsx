import React, { FormEvent, MouseEvent, useContext, useEffect, useState } from 'react';
import Input from '../components/Input';
import FileUpload from '../components/FileUpload';
import Features from '../components/Features';
import { IPhoto } from '../models/photo.interface';
import { useNavigate, useParams } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import { IPlace } from '../models/place.interface';
import { IUser } from '../models/user.interface';
import Loader from '../components/Loader';
import cn from 'classnames';
import PlaceService from '../services/place.service';
import userService from '../services/place.service';
import MainLayout from '../layouts/MainLayout';

const UserPlace = () => {
	const navigate = useNavigate();
	const {id: placeId} = useParams();
	const {_id: userId} = useContext(UserContext) as IUser;
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [photos, setPhotos] = useState<IPhoto[]>([]);
	const [features, setFeatures] = useState<string[]>([]);
	const [formState, setFormState] = useState({
		title: '',
		address: '',
		description: '',
		price: 0,
		checkIn: '',
		checkOut: '',
		maxGuests: '4',
	});
	useEffect(() => {
		if (!placeId) {
			return;
		}
		setIsLoading(true);
		PlaceService.getPlaceById(placeId)
			.then(data => {
				const {
					title,
					address,
					photos,
					description,
					features,
					price,
					checkIn,
					checkOut,
					maxGuests
				} = data;
				setFormState(prevState => ({...prevState, title, price, address, description, checkIn, checkOut, maxGuests}))
				setPhotos(photos);
				setFeatures(features);
			})
			.catch(e => console.warn(e.message))
			.finally(() => setIsLoading(false))
	}, [])

	const handleFormFieldChange = React.useCallback((event: React.ChangeEvent<any>) => {
		const {name, value} = event.target;
		setFormState((prevState) => ({
			...prevState,
			[name]: value
		}));
	}, []);

	function handlePhotoDelete (id: string, e: MouseEvent<HTMLSpanElement>) {
		e.stopPropagation()
		setPhotos((photos) => photos.filter(photo => photo.id !== id));
	}

	const getDescription = (description: string): JSX.Element => {
		return <p className="text-gray-500 text-sm">{description}</p>
	}
	const getTitle = (title: string): JSX.Element => {
		return <h2 className="text-xl text-primary">{title}</h2>
	}

	const getInputDescription = (title: string, description: string): JSX.Element => {
		return <div className="my-2">
			{getTitle(title)}
			{getDescription(description)}
		</div>
	}

	const handleSubmitForm = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (photos.length >= 10) {
			return alert('Max 10 photos available!')
		}
		const data: Partial<IPlace> = {
			photos: photos,
			features: features.map(feature => feature),
			title: formState.title,
			address: formState.address,
			price: formState.price,
			description: formState.description,
			checkIn: formState.checkIn,
			checkOut: formState.checkOut,
			maxGuests: formState.maxGuests,
			owner: userId,
		}
		const placePromise = new Promise((res, rej) => {
			setIsLoading(true);
			if (placeId) {
				userService.updatePlace(placeId, data).then(res).catch(rej);
			} else {
				PlaceService.createPlace(data).then(res).catch(rej)
			}
		});
		placePromise
			.then(() => navigate('/user/places'))
			.catch(() => alert('Something went wrong!'))
			.finally(() => setIsLoading(false));
	}

	function handleActivePhotoChange (id: string) {
		setPhotos(photos.map(photo => photo.id === id ? {...photo, main: true} : {...photo, main: false}))
	}

	if (isLoading) {
		return <Loader centered/>
	}

	return (
		<MainLayout>
			<form className="max-w-3xl mx-auto mt-10" onSubmit={(e) => handleSubmitForm(e)}>
				<h1 className="text-2xl mb-2 text-primary">{placeId ? 'Update Place' : 'Create New Place'}</h1>
				<Input description="Your place name" header="Place Title" placeholder="Title" name="title"
							 value={formState.title}
							 onChange={e => handleFormFieldChange(e)}/>
				<Input description="Your place address (city, street, etc.)" header="Place Address" name="address"
							 placeholder="Address"
							 value={formState.address} onChange={handleFormFieldChange}/>
				<div className="flex items-center justify-between">{getInputDescription('Photos',
					'Upload best photos of your place (max 10)')}
					<FileUpload setFile={setPhotos} accept="image/*">
						<button type="button" className="contained flex gap-2">
							<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
									 stroke="currentColor"
									 className="w-6 h-6">
								<path strokeLinecap="round" strokeLinejoin="round"
											d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"/>
							</svg>
							Add Photos
						</button>
					</FileUpload>
				</div>
				<div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 gap-2">
					{!!photos.length && photos.map(p => (
						<div key={p.id} onClick={() => handleActivePhotoChange(p.id)}
								 className={cn('flex-col mb-2 cursor-pointer relative', {
									 activePhoto: p.main
								 })}>
										<span className="absolute -top-1 -right-1 z-10 bg-white rounded-full text-primary"
													onClick={(e) => handlePhotoDelete(p.id, e)}>
											<svg fill="none" viewBox="0 0 15 15" height="1.5em" width="1.5em">
												<path
													fill="currentColor"
													fillRule="evenodd"
													d="M.877 7.5a6.623 6.623 0 1113.246 0 6.623 6.623 0 01-13.246 0zM7.5 1.827a5.673 5.673 0 100 11.346 5.673 5.673 0 000-11.346zm2.354 3.32a.5.5 0 010 .707L8.207 7.5l1.647 1.646a.5.5 0 01-.708.708L7.5 8.207 5.854 9.854a.5.5 0 01-.708-.708L6.793 7.5 5.146 5.854a.5.5 0 01.708-.708L7.5 6.793l1.646-1.647a.5.5 0 01.708 0z"
													clipRule="evenodd"
												/>
											</svg>
										</span>
							<span className="relative">
							<img className={'w-full h-40 rounded-2xl'} key={p.id}
									 src={`${process.env.REACT_APP_BASE_API}/${p.path}`}
									 alt="Thumb"/>
								{p.main && <span className="absolute top-1 left-1 bg-primary bg-opacity-50 text-white rounded-full p-1"><svg
                    fill="currentColor"
                    viewBox="0 0 16 16"
                    height="1.5em"
                    width="1.5em">
      <path
          d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 00-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767l-3.686 1.894.694-3.957a.565.565 0 00-.163-.505L1.71 6.745l4.052-.576a.525.525 0 00.393-.288L8 2.223l1.847 3.658a.525.525 0 00.393.288l4.052.575-2.906 2.77a.565.565 0 00-.163.506l.694 3.957-3.686-1.894a.503.503 0 00-.461 0z"/>
    					</svg>
							 </span>}
						</span>
						</div>
					))}
				</div>
				{getInputDescription('Description',
					'Add some details about your place')}
				<textarea name="description" value={formState.description} placeholder="Description" rows={5}
									onChange={handleFormFieldChange}/>
				{getInputDescription('Features',
					'Choose some features from the list below')}
				<Features onChange={setFeatures} selectedFeatures={features}/>
				<div>
					{getInputDescription('Price',
						'Here you can add a price per night in your place')}
					<input type="number" name="price" placeholder="Price" onChange={handleFormFieldChange}
								 value={formState.price}/>
				</div>
				<div>
					{getInputDescription('Timing & synchronization',
						'Set check-in and check-out time, maximum number of guests')}
					<div className="grid grid-cols-1  sm:grid-cols-3 gap-2">
						<input type="number" name="checkIn" placeholder="Check In Time" onChange={handleFormFieldChange}
									 value={formState.checkIn}/>
						<input type="number" name="checkOut" placeholder="Check Out Time" onChange={handleFormFieldChange}
									 value={formState.checkOut}/>
						<input type="number" name="maxGuests" placeholder="Max Guests" value={formState.maxGuests}
									 onChange={handleFormFieldChange}/>
					</div>
				</div>
				<button className="contained w-full my-3">Submit</button>
			</form>
		</MainLayout>

	);
};

export default UserPlace;
