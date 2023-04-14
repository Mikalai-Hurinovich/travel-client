import { IPlace } from '../models/place.interface';
import axios, { AxiosResponse } from 'axios';


async function getPlaceById (placeId: string): Promise<IPlace> {
	const res = await axios.get(`/places/${placeId}`);
	return res.data;
}

async function searchPlaces (searchTerm: string, searchLimit: number = 10, searchFeatures: string[]): Promise<IPlace[]> {
	const res = await axios.post(`/places/search`, {
		search: searchTerm,
		limit: searchLimit,
		features: searchFeatures,
	});
	return res.data;
}

async function createPlace (data: Partial<IPlace>): Promise<AxiosResponse> {
	return await axios.post('/places', data)
}

async function getUserPlaces (id: string): Promise<IPlace[]> {
	const res = await axios.get(`/places/user-places/${id}`)
	return res.data;
}

async function updatePlace (placeId: string, data: Partial<IPlace>): Promise<AxiosResponse> {
	return await axios.patch(`/places/${placeId}`, data);
}

async function getAllPlaces (): Promise<IPlace[]> {
	const res = await axios.get('/places')
	return res.data;
}

async function deletePlaceById (id: string): Promise<AxiosResponse> {
	return await axios.delete(`/places/${id}`)
}

async function deleteAllPlaces (): Promise<AxiosResponse> {
	return await axios.delete('/places/all')
}

const PlaceService = {
	searchPlaces,
	getUserPlaces,
	getAllPlaces,
	getPlaceById,
	updatePlace,
	createPlace,
	deletePlaceById,
	deleteAllPlaces
};
export default PlaceService;
