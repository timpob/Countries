import React, { useEffect } from 'react';
import mapIcon from "../../imgs/maps-icon-16.png";
import {getRandomCountryTC, setRandomCountryDetailsAC} from '../../Redux/Reducer';
import { useDispatch, useSelector } from 'react-redux';
import './RandomCountry.css';
import Spinner from "../Spinner/Spinner";

const RandomCountry = () => {
    const dispatch = useDispatch();
    const randomCountryDetails = useSelector((state) => state.randomCountryDetails);
    const loadingRandomCountry = useSelector((state) => state.loadingRandomCountry);

    useEffect(() => {
        const interval = setInterval(() => {
            dispatch(setRandomCountryDetailsAC());
        }, 3000);

        return () => clearInterval(interval);
    }, []);

    const spinner = loadingRandomCountry ? <Spinner/> : null;
    const content = !loadingRandomCountry ? <RandomCountryView details={randomCountryDetails}/> : null;



    return (
        <div className='random'>
            {spinner}
            {content}
        </div>
    );
};



const RandomCountryView = ({details}) => {
    return (
        <>
            <div className="country-content">
                <div className="country-flag">
                    <img src={details.flagLink} alt="flag"/>
                    {details.crestLink ?
                        <img
                            src={details.crestLink}
                            alt="coat of arms"
                            className="coat-of-arms"
                        />
                        : null
                    }
                </div>
                <div className="country-info">
                    <div className="info-item">
                        <span className="label">Страна:</span>
                        <span>{details.country}</span>
                    </div>
                    <div className="info-item">
                        <span className="label">Население:</span>
                        <span>{details.population?.toLocaleString()} чел.</span>
                    </div>
                    <div className="info-item">
                        <span className="label">Площадь:</span>
                        <span>{details.area?.toLocaleString()} км²</span>
                    </div>
                    <div className="info-item">
                        <span className="label">Столица:</span>
                        <span>{details.capital}</span>
                    </div>
                    <a href={details.mapLink} target="_blank" className="map-link">
                        <img src={mapIcon} alt="mapLink"/>
                        <span>Открыть на карте</span>
                    </a>
                </div>
            </div>
        </>
    );
};


export default RandomCountry;