import './App.css';
import Header from "./Components/Header/Header";
import Countries from "./Components/Countries/Countries";
import {getCountriesByRegionTC, setCountriesAC} from "./Redux/Reducer";
import {connect} from "react-redux";
import React, {useEffect, useState} from "react";
import CountryInfo from "./Components/CountryInfo/CountryInfo";
import {Routes, Route, BrowserRouter, Navigate} from 'react-router-dom';
import AuthorInfo from "./AuthorInfo/AuthorInfo";
import RandomCountry from "./Components/RandomCountry/RandomCountry";

export const ThemeContext = React.createContext();

function App(props) {

    useEffect(() => {

        props.getCountriesByRegion(props.region);

    }, [])

    useEffect(() => {

        props.getCountriesByRegion(props.region);

    }, [props.region])


    return (
        <div className="application">
            <BrowserRouter>
                <Header/>
                <RandomCountry population={props.countryDetails.population}
                                                                      area={props.countryDetails.area}
                                                                      capital={props.countryDetails.capital}
                                                                      flagLink={props.countryDetails.flagLink}
                                                                      crestLink={props.countryDetails.crestLink}
                                                                      mapLink={props.countryDetails.mapLink}/>
                <Countries/>
                <Routes>
                    <Route path="/" element={<Navigate to="/country-info" replace />} />
                    <Route path='/country-info' element={<CountryInfo population={props.countryDetails.population}
                                                                      area={props.countryDetails.area}
                                                                      capital={props.countryDetails.capital}
                                                                      flagLink={props.countryDetails.flagLink}
                                                                      crestLink={props.countryDetails.crestLink}
                                                                      mapLink={props.countryDetails.mapLink}/>}/>
                    <Route path='/author' element={<AuthorInfo/>}/>
                </Routes>
            </BrowserRouter>
        </div>

    );
}

const mapStateToProps = (state) => {
    return {
        region: state.region,
        countryDetails: state.selectedCountryDetails,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getCountriesByRegion: (region)=>{
            dispatch(getCountriesByRegionTC(region))
        }


    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
