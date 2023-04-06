import React, { useEffect, useState } from 'react';
import MainLayout from '../layouts/MainLayout';
import { IPlace } from '../models/place.interface';
import Place from './Place';
import Loader from '../components/Loader';
import { useNavigate } from 'react-router-dom';
import PlaceService from '../services/place.service';

const Home: React.FC = (): JSX.Element => {
	const [allPlaces, setAllPlaces] = useState<IPlace[]>([]);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const navigate = useNavigate();
	
	useEffect(() => {
		setIsLoading(true);
		PlaceService.getAllPlaces()
			.then(data => setAllPlaces(data))
			.finally(() => setIsLoading(false))
	}, [])

	if (isLoading) {
		return <Loader centered/>
	}

	return (
		<MainLayout title="Home">
			<div
				className="mt-4 grid grid-cols-1 gap-4 xs:grid-cols-2 sm:grid-cols-3 lg:grid-cols-4">
				{!!allPlaces.length && allPlaces.map(place =>
					<div key={place._id} onClick={() => navigate(`/place/${place._id}`)}>
						<Place place={place}/>
					</div>
				)}
			</div>
		</MainLayout>
	);
};

export default Home;
