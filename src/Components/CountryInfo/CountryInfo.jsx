import React from 'react';
import mapIcon from '../../imgs/maps-icon-16.png';
import './CountryInfo.css';
import Spinner from "../Spinner/Spinner";
import { useSelector} from "react-redux";
import ErrorIndicator from "../ErrorIndicator/ErrorIndicator";


const CountryInfo = (props) => {

    const loading = useSelector((state) => state.loadingCountryDetails);
    const error = useSelector((state)=> state.errorCountryDetails);

    const error_indicator =   error ? <ErrorIndicator/>: null;
    const spinner = loading && !error ? <Spinner/> : null;
    const content = !loading && !error? <CountryInfoView {...props} /> : null;



    return (
        <div className='info'>
            {spinner}
            {content}
            {error_indicator}
        </div>
    );
};


const CountryInfoView = (props) => {
    return (
        <>
            <div className="country-content">
                <div className="country-flag">
                    <img src={props.flagLink} alt="flag"/>
                    {props.crestLink ? <img src={props.crestLink} alt="coat of arms" className="coat-of-arms"/> : null}
                </div>
                <div className="country-info">
                    <div className="info-item">
                        <span className="label">Население:</span>
                        <span className="value">{props.population?.toLocaleString()} чел.</span>
                    </div>
                    <div className="info-item">
                        <span className="label">Площадь:</span>
                        <span className="value">{props.area?.toLocaleString()} км²</span>
                    </div>
                    <div className="info-item">
                        <span className="label">Столица:</span>
                        <span className="value">{props.capital}</span>
                    </div>
                    <a href={props.mapLink} target="_blank" className="map-link">
                        <img src={mapIcon} alt="mapLink"/>
                        <span>Открыть на карте</span>
                    </a>
                </div>
            </div>

        </>
    );
};


export default CountryInfo;