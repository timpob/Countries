import React, { useState } from 'react';
import {setRegionAC} from "../../Redux/Reducer";
import {connect} from "react-redux";
import {NavLink} from "react-router-dom";
import './Header.css';
import Europe from '../../imgs/regions/Europe.png';
import Africa from '../../imgs/regions/Africa.png';
import Asia from '../../imgs/regions/Asia.png';
import Americas from '../../imgs/regions/America.png';
import Oceania from '../../imgs/regions/Oceania.png';
import Author from '../../imgs/regions/Author.png';

export const HeaderContext = React.createContext();

const Header = (props) => {


    let onRegionClick = (e, region) => {
        props.setRegion(region);
    }

    return (
        <div className='header'>
            <div className={props.region === 'Europe' ? 'active' : ''} onClick={(e) => onRegionClick(e, 'Europe')}>
                <img src={Europe} alt="Europe" />
                <NavLink to={`/country-info`}>Europe</NavLink>
            </div>
            <div className={props.region === 'Asia' ? 'active' : ''} onClick={(e) => onRegionClick(e, 'Asia')}>
                <img src={Asia} alt="Asia" />
                <NavLink to={`/country-info`}>Asia</NavLink>
            </div>
            <div className={props.region === 'Africa' ? 'active' : ''} onClick={(e) => onRegionClick(e, 'Africa')}>
                <img src={Africa} alt="Africa" />
                <NavLink to={`/country-info`}>Africa</NavLink>
            </div>
            <div className={props.region === 'Americas' ? 'active' : ''}
                 onClick={(e) => onRegionClick(e, 'Americas')}>
                <img src={Americas} alt="Americas" />
                <NavLink to={`/country-info`}>Americas</NavLink>
            </div>
            <div className={props.region === 'Oceania' ? 'active' : ''}
                 onClick={(e) => onRegionClick(e, 'Oceania')}>
                <img src={Oceania} alt="Oceania" />
                <NavLink to={`/country-info`}>Oceania</NavLink>
            </div>

            <div><img src={Author} alt="Author"/><NavLink to={`/author`}>About me</NavLink></div>
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