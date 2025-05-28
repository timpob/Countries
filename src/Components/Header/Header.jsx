import React, { useState } from 'react';
import {setRegionAC} from "../../Redux/Reducer";
import {connect} from "react-redux";
import {NavLink} from "react-router-dom";
import './Header.css';

export const HeaderContext = React.createContext();

const Header = (props) => {


    let onRegionClick = (e, region) => {
        props.setRegion(region);
    }

    return (
        <div className='header'>

                <div className={props.region === 'Europe' ? 'active' : ''} onClick={(e) => onRegionClick(e, 'Europe')}>
                    <NavLink to={`/country-info`}>Europe</NavLink>
                </div>
                <div className={props.region === 'Asia' ? 'active' : ''} onClick={(e) => onRegionClick(e, 'Asia')}>
                    <NavLink to={`/country-info`}>Asia</NavLink>
                </div>
                <div className={props.region === 'Africa' ? 'active' : ''} onClick={(e) => onRegionClick(e, 'Africa')}>
                    <NavLink to={`/country-info`}>Africa</NavLink>
                </div>
                <div className={props.region === 'Americas' ? 'active' : ''}
                     onClick={(e) => onRegionClick(e, 'Americas')}>
                    <NavLink to={`/country-info`}>Americas</NavLink>
                </div>
                <div className={props.region === 'Oceania' ? 'active' : ''}
                     onClick={(e) => onRegionClick(e, 'Oceania')}>
                    <NavLink to={`/country-info`}>Oceania</NavLink>
                </div>

            <div><NavLink to={`/author`}>About author</NavLink></div>
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        capital: state.capitalDelete,
        region: state.region,
    }
}


const mapDispatchToProps = (dispatch) => {
    return {
        setRegion: (region) => {
            dispatch(setRegionAC(region))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);