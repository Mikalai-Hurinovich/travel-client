import React, { useEffect, useState } from 'react';
import MainLayout from '../layouts/MainLayout';
import { useParams } from 'react-router-dom';
import { IPlace } from '../models/place.interface';
import Loader from '../components/Loader';
import Features from '../components/Features';
import BookForm from '../components/BookForm';
import PlaceService from '../services/place.service';

const PlaceDetails = () => {
	const {id} = useParams();
	const [place, setPlace] = useState<IPlace>({} as IPlace);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [isModalShow, setModalShow] = useState<boolean>(false);

	useEffect(() => {
		if (!id) {
			return;
		}
		setIsLoading(true);

		PlaceService.getPlaceById(id)
			.then((data) => setPlace(data))
			.catch(err => console.warn(err.message))
			.finally(() => setIsLoading(false));
	}, [id]);

	if (isLoading) {
		return <Loader centered/>
	}

	if (isModalShow) {
		return <div className="absolute inset-0 bg-black min-h-max">
			<button className="contained fixed top-6 right-9 mt-5 flex items-center justify-between"
							onClick={() => setModalShow(false)}>
				Close
				<span className="ml-2">
                    <svg fill="none" viewBox="0 -2 24 24" height="1em" width="1em">
                        <path
													fill="currentColor"
													d="M6.225 4.811a1 1 0 00-1.414 1.414L10.586 12 4.81 17.775a1 1 0 101.414 1.414L12 13.414l5.775 5.775a1 1 0 001.414-1.414L13.414 12l5.775-5.775a1 1 0 00-1.414-1.414L12 10.586 6.225 4.81z"
												/>
                    </svg>
                </span>
			</button>
			<div className="p-8 grid gap-4">
				{place?.photos?.length > 0 && place?.photos.map((photo) =>
					<div className="flex justify-center" key={photo.id}>
						<img
							className="object-cover w-full sm:w-8/12 h-full"
							src={photo.path} alt="placePhoto"/>
					</div>
				)}
			</div>
		</div>
	}


	return (
		<MainLayout className="bg-blue-50 flex flex-col items-center">
			<div className="mt-8 w-2/3">
				<h1 className="text-3xl">{place.title}</h1>
				<div className="text-primary">
					<a target="_blank" href={`https://maps.google.com/?q=${place.address}`}
						 className="font-semibold underline flex items-center" rel="noreferrer">
						{place.address}
						<span className="ml-2">
						<svg
							viewBox="0 0 24 24"
							fill="currentColor"
							height="1.4em"
							width="1.4em"
						>
						<path
							d="M12 2C7.589 2 4 5.589 4 9.995 3.971 16.44 11.696 21.784 12 22c0 0 8.029-5.56 8-12 0-4.411-3.589-8-8-8zm0 12c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4z"/>
					</svg>
					</span>
					</a>
				</div>
				<div className="flex gap-2 mt-2 relative">
					{place.photos?.length > 0 &&
              <div className="w-2/3">
                  <img onClick={() => setModalShow(true)}
                       className="cursor-pointer rounded-l-2xl object-cover align-bottom h-full w-full"
                       src={place.photos[0].path} alt="placePhoto"/>
              </div>}
					{place.photos?.length > 2 &&
              <div className="flex flex-col gap-2 w-1/3">
                  <img onClick={() => setModalShow(true)} key={place.photos[1].id}
                       className="cursor-pointer object-cover align-bottom h-full w-full rounded-tr-2xl"
                       src={place.photos[1].path}
                       alt="placePhoto"/>
                  <img onClick={() => setModalShow(true)} key={place.photos[2].id}
                       className="cursor-pointer object-cover align-bottom h-full w-full rounded-br-2xl"
                       src={place.photos[2].path}
                       alt="placePhoto"/>
              </div>
					}
					<button className="contained absolute bottom-4 right-4 flex items-center"
									onClick={() => setModalShow(true)}>
					<span className="mr-2">
						<svg
							fill="none"
							stroke="currentColor"
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth={2}

							height="1.3em"
							width="1.3em"
						>
							<path stroke="none" d="M0 0h24v24H0z"/>
							<path d="M15 8h.01"/>
							<path d="M7 4 H17 A3 3 0 0 1 20 7 V17 A3 3 0 0 1 17 20 H7 A3 3 0 0 1 4 17 V7 A3 3 0 0 1 7 4 z"/>
							<path d="M4 15l4-4a3 5 0 013 0l5 5"/>
							<path d="M14 14l1-1a3 5 0 013 0l2 2"/>
						</svg>
					</span>
						Show All Photos
					</button>
				</div>
			</div>
			<div className="w-2/3"><h2 className="font-bold text-lg mt-2">Features</h2>
				<Features selectedFeatures={place.features} readonly/>
				<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
					<div className="flex flex-col">
						<h2 className="font-bold text-lg mt-2">Description</h2>
						<p>{place.description}</p>
						<h2 className="font-bold text-lg mt-2">What this place offers</h2>
						<div><strong>Check-In:</strong> {place.checkIn}</div>
						<div><strong>Check-Out:</strong> {place.checkOut}</div>
						<div><strong>Max Guests:</strong> {place.maxGuests}</div>
					</div>
					<BookForm place={place}/>
				</div>
			</div>
		</MainLayout>
	);
};

export default PlaceDetails;
