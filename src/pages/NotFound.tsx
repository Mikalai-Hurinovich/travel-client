import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const NotFound: React.FC = (): JSX.Element => {
	const navigate = useNavigate();
	const [loaded, setLoaded] = useState(false);

	function handleGoBackButtonClick (): void {
		navigate('/');
	}

	return (
		<div className="flex flex-col justify-center items-center">
			<div className="w-full xs:w-3/4 lg:w-1/2 mt-3 flex flex-col justify-center items-center">
				<img style={loaded ? {} : {display: 'none'}} src="/404.jpg" alt="not_found" onLoad={() => setLoaded(true)}/>
				{loaded && <>
            <h1 className="text-3xl text-primary text-center">Ooooopppsss..... Nothing here....</h1>
            <button className="contained w-1/5 mt-4" onClick={() => handleGoBackButtonClick()}>Back Home</button>
        </>}
			</div>
		</div>
	);
};

export default NotFound;
