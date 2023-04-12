import React, { ChangeEvent, useContext, useEffect, useState } from 'react';
import { IPlace } from '../models/place.interface';
import { useNavigate } from 'react-router-dom';
import PlaceService from '../services/place.service';
import useDebounce from '../hooks/useDebounce';
import Input from './shared/Input';
import { useForm } from 'react-hook-form';
import { ThemeContext } from '../context/ThemeContext';

const SearchForm: React.FC = (): JSX.Element => {
	const [isInputExpanded, setIsInputExpanded] = useState<boolean>(false);
	const [searchResults, setSearchResults] = useState<IPlace[] | null>(null);
	const navigate = useNavigate();
	const theme = useContext(ThemeContext);
	const {register, setValue, watch} = useForm();
	const watchedSearchTerm = watch('searchTerm');
	const debouncedSearchTerm = useDebounce(watchedSearchTerm, 500);
	useEffect(() => {
		if (debouncedSearchTerm) {
			search(debouncedSearchTerm);
		}
	}, [debouncedSearchTerm]);
	const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
		setValue('searchTerm', event.target.value);
	};

	function search (searchTerm: string) {
		PlaceService.searchPlaces(searchTerm, 5)
			.then(data => setSearchResults(data));
	}

	function handlePlaceClick (id: string): void {
		navigate(`/places/${id}`);
	}

	function onInputToggle () {
		setIsInputExpanded(value => !value);
		setValue('searchTerm', '');
	}

	return (
		<>
			{isInputExpanded ?
				<div
					className="flex rounded-full md:w-3/12 6/12 items-center gap-2.5">
					<div className="relative w-full">
						<Input type="text"
									 register={register('searchTerm')}
									 id="searchTerm"
									 placeholder="Search places..."
									 onChange={handleSearch}
									 name="searchTerm"/>
						<span className="text-primary absolute top-4 right-3 cursor-pointer" onClick={onInputToggle}>
						<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
								 stroke="currentColor"
								 className="w-6 h-6">
									<path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/>
						</svg>
					</span>
						{debouncedSearchTerm && !!searchResults?.length &&
                <div
                    className={`w-1/3 z-50 w-full absolute border l-50 t-50 rounded-2xl p-3 ${theme}`}>
									{searchResults.map(place =>
										<div key={place._id} onClick={() => handlePlaceClick(place._id)}
												 className="border-b-2 py-2 first:pt-0 last:border-none last:pb-0 cursor-pointer">
											{place.title}
											<div className="text-gray-400">{place.address}</div>
										</div>
									)}
                </div>}
						{debouncedSearchTerm && searchResults?.length === 0 &&
                <div
                    className="w-1/3 z-50 w-full absolute border l-50 t-50 rounded-2xl p-3">
                    Nothing found...
                </div>
						}
					</div>
				</div>
				:
				<div className="flex items-center my-2 pt-0.5 justify-center">
					<button className="flex gap-2 items-center justify-center cursor-pointer bg-primary text-white py-1.5 px-4"
									onClick={onInputToggle}>
						Search Places
						<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
								 stroke="currentColor" className="w-6 h-6">
							<path strokeLinecap="round" strokeLinejoin="round"
										d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"/>
						</svg>
					</button>
				</div>
			}
		</>
	);
};

export default SearchForm;
