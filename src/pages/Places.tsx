import React, { MouseEvent, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { IPlace } from '../models/place.interface';
import cn from 'classnames';
import Loader from '../components/Loader';
import Place from './Place';
import PlaceService from '../services/place.service';
import { UserContext } from '../context/UserContext';
import { IUser } from '../models/user.interface';

const Places: React.FC = (): JSX.Element => {
	const navigate = useNavigate();
	const user = useContext(UserContext) as IUser;
	const [isLoading, setIsLoading] = useState<boolean>(false);

	useEffect(() => {
		fetchPlaces();
	}, [])

	function fetchPlaces () {
		setIsLoading(true);
		PlaceService.getUserPlaces(user._id)
			.then((places) => setPlaces(places))
			.catch(err => console.log(err.message))
			.finally(() => setIsLoading(false))
	}

	const [places, setPlaces] = useState<IPlace[]>([])

	function handleAddNewPlaceClick () {
		navigate('/user/places/create')
	}

	if (isLoading) {
		return <div className="h-80">
			<Loader className="h-full"/>
		</div>;
	}

	function handlePlaceClick (id: string) {
		navigate(`/user/places/${id}`)
	}

	function handleRemoveAllClick () {
		setIsLoading(true);
		PlaceService.deleteAllPlaces()
			.finally(() => {
				setIsLoading(false);
				fetchPlaces();
			});
	}

	function handleDeletePlace (id: string, e: MouseEvent<HTMLDivElement>) {
		setIsLoading(true);
		e.stopPropagation();
		return PlaceService.deletePlaceById(id)
			.finally(() => {
				setIsLoading(false);
				fetchPlaces();
			});
	}

	return (
		<>
			<div className="flex justify-center mt-10">
				<div className="flex-col flex items-center justify-center">
					<div className="w-3/4 flex flex-col items-center">
						<button className="contained flex gap-2" onClick={() => handleAddNewPlaceClick()}>
							<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
									 stroke="currentColor"
									 className="w-6 h-6">
								<path strokeLinecap="round" strokeLinejoin="round"
											d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"/>
							</svg>
							Add New Place
						</button>
						<div className={cn({'mt-4 grid grid-cols-1 gap-4 md:grid-cols-3': !!places?.length})}>
							{!!places?.length
								? places.map((place) => (
									<div key={place._id} onClick={() => handlePlaceClick(place._id)}>
										<Place place={place} canDelete deletePlace={handleDeletePlace}/>
									</div>
								))
								: <>
									<h2 className="text-2xl text-primary mt-4">Nothing Here... Start by adding a new place!</h2>
									<span className="text-black">
										<img src="/nothing_here.svg" alt="nothing_here" className="dark"/>
									</span>
								</>}
						</div>
						{!!places?.length &&
                <button onClick={handleRemoveAllClick} className="contained mt-3">Remove All Places</button>}
					</div>
				</div>
			</div>
		</>
	);
};

export default Places;
