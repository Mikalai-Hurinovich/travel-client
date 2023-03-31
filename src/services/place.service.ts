import { IPlace } from '../models/place.interface';
import axios, { AxiosResponse } from 'axios';


async function getPlaceById (placeId: string): Promise<IPlace> {
	const res = await axios.get(`/places/${placeId}`);
	return res.data;
}

async function createPlace (data: Partial<IPlace>): Promise<AxiosResponse> {
	return await axios.post('/places', data)
}

async function getUserPlaces (): Promise<IPlace[]> {
	const res = await axios.get('/places/user-places')
	return res.data;
}

async function updatePlace (placeId: string, data: Partial<IPlace>): Promise<AxiosResponse> {
	return await axios.patch(`/places/${placeId}`, data);
}

async function getAllPlaces (): Promise<IPlace[]> {
	const res = await axios.get('/places')
	return res.data;
}

async function deleteAllPlaces (): Promise<AxiosResponse> {
	return await axios.delete('/places/all')
}

const PlaceService = {getUserPlaces, getAllPlaces, getPlaceById, updatePlace, createPlace, deleteAllPlaces};
export default PlaceService;
