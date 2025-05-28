import React from 'react';
import {connect} from "react-redux";
import {getCountryByNameTC, setCountryDetailsAC} from "../../Redux/Reducer";
import Country from "./Country/Country";
import './Countries.css';
import Spinner from "../Spinner/Spinner";

const Countries = (props) => {


    let content = props.countries.map((el) => (
        <Country
            key={el.name.common}
            name={el.name.common}
            setCountryDetails={props.setCountryDetails}
            isActive={props.selectedCountryDetails.capital === el.capital?.[0]}
        />
    ));

    if(props.loadingCountries)
        content = <Spinner/>

    return (
        <div className='countries'>
            {content}
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        countries: state.countries,
        loadingCountries: state.loadingCountries,
        selectedCountryDetails: state.selectedCountryDetails
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        setCountryDetails: (name) => {
               dispatch(getCountryByNameTC(name));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Countries);


