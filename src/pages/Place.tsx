import React, { DetailedHTMLProps, HTMLAttributes } from 'react';
import { IPlace } from '../models/place.interface';

interface IPlaceProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
	place: IPlace
}

const Place: React.FC<IPlaceProps> = ({place, ...props}) => {
	return (
		<div className="cursor-pointer gap-1 flex flex-col">
			<img className="rounded-2xl"
					 src={`${process.env.REACT_APP_BASE_API}/${place?.photos.find(p => p.main)?.path || place?.photos[0].path}`}
					 alt="placePhoto"/>
			<div className="text-md truncate text-l h-min"><strong>{place?.address}</strong></div>
			<div className="text-md truncate text-l text-gray-500">{place?.title}</div>
			<div className="text-md truncate text-l h-min"><strong>${place?.price}</strong> per night</div>
		</div>
	);
};

export default Place;
