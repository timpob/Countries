import React from 'react';

const Country = (props) => {

    let onCountryClick = (e) =>{
        props.setCountryDetails(e.target.textContent);
    }

    return (
        <div className={`country-item ${props.isActive ? 'active' : ''}`} onClick={onCountryClick}>
            {props.name}
        </div>
    );
};

export default Country;