import CountryAPIDAL from "../Services/CountryAPI-DAL";


const SET_COUNTRIES = 'SET_COUNTRIES';
const SET_REGION = 'SET_REGION';
const SET_COUNTRY_DETAILS = 'SET_COUNTRY_DETAILS';
const SET_RANDOM_COUNTRY_DETAILS = 'SET_RANDOM_COUNTRY_DETAILS';

const SET_CAPITAL = "SET_CAPITAL";
const ON_LOADING = 'ON_LOADING';
const OFF_LOADING = 'OFF_LOADING';
const LOADING_COUNTRY_DETAILS_ON = 'LOADING_COUNTRY_DETAILS_ON';
const LOADING_COUNTRY_DETAILS_OFF = 'LOADING_COUNTRY_DETAILS_OFF';
const LOADING_COUNTRIES_ON = 'LOADING_COUNTRIES_ON';
const LOADING_COUNTRIES_OFF = 'LOADING_COUNTRIES_OFF';
const ERROR_COUNTRY_DETAILS_ON = 'ERROR_COUNTRY_ON';
const ERROR_COUNTRY_DETAILS_OFF = 'ERROR_COUNTRY_OFF';


let initialState = {
    countries:[],
    region:'Europe',
    selectedCountryDetails:{
        country: null,
        population: null,
        area: null,
        capital: null,
        flagLink:null,
        crestLink:null,
        mapLink:null,
    },
    randomCountryDetails: {
        country: null,
        population: null,
        area: null,
        capital: null,
        flagLink:null,
        crestLink:null,
        mapLink:null,
    },
    loadingCountryDetails: false,
    errorCountryDetails: false,
    loadingCountries: false,
};

const makeCountryObject = (countryInServerFormat)=>{
    const countryForUseInMyApp= {
        country: countryInServerFormat.name.common,
        population: countryInServerFormat.population ,
        area: countryInServerFormat.area,
        capital: countryInServerFormat.capital?.[0] || 'Unknown',
        flagLink: countryInServerFormat.flags.png,
        crestLink: countryInServerFormat.coatOfArms.png ,
        mapLink: countryInServerFormat.maps.googleMaps ,
    }
    return countryForUseInMyApp;
}

let Reducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_COUNTRIES: {
            const sortedCountriesArray = [...action.arrCountries].sort((a, b) =>
                a.name.common.localeCompare(b.name.common)
            );

            return {
                ...state,
                countries: sortedCountriesArray,
                selectedCountryDetails: {
                    population: sortedCountriesArray[0].population,
                    area: sortedCountriesArray[0].area,
                    capital: sortedCountriesArray[0].capital[0],
                    flagLink: sortedCountriesArray[0].flags.png,
                    crestLink: sortedCountriesArray[0].coatOfArms.png,
                    mapLink: sortedCountriesArray[0].maps.googleMaps,
                }
            };
        }

        case SET_REGION:
            return {
                ...state,
                region: action.region
            };

        case SET_CAPITAL:
            return {
                ...state,
                capitalDelete: action.name
            };

        case SET_COUNTRY_DETAILS:
            return {
                ...state,
                selectedCountryDetails: makeCountryObject(action.country)
            };

        case SET_RANDOM_COUNTRY_DETAILS: {
            let index = Math.floor(Math.random() * state.countries.length);
            return {
                ...state,
                randomCountryDetails: makeCountryObject(state.countries[index])
            };
        }

        case LOADING_COUNTRIES_ON:
            return {
                ...state,
                loadingCountries: true,
            };

        case LOADING_COUNTRIES_OFF:
            return {
                ...state,
                loadingCountries: false,
            };

        case LOADING_COUNTRY_DETAILS_ON:
            return {
                ...state,
                loadingCountryDetails: true,
            };

        case LOADING_COUNTRY_DETAILS_OFF:
            return {
                ...state,
                loadingCountryDetails: false,
            };

        case ERROR_COUNTRY_DETAILS_ON:
            return {
                ...state,
                errorCountryDetails: true,
            };

        case ERROR_COUNTRY_DETAILS_OFF:
            return {
                ...state,
                errorCountryDetails: false,
            };

        case ON_LOADING:
            return {
                ...state,
                loading: true
            };

        case OFF_LOADING:
            return {
                ...state,
                loading: false
            };

        default:
            return state;
    }
};

export const setCountriesAC = (arrCountries) =>{
    return {type: SET_COUNTRIES, arrCountries:arrCountries}
}

export const setRegionAC = (region) =>{
    return {type: SET_REGION, region:region}
}

export const setCountryDetailsAC = (country) =>{
    return {type: SET_COUNTRY_DETAILS, country: country }
}

export const setRandomCountryDetailsAC = () =>{
    return {type: SET_RANDOM_COUNTRY_DETAILS }
}

export const setOnLoadingAC = () =>{
    return {type: ON_LOADING}

}

export const setOffLoadingAC = (name) =>{
    return {type: OFF_LOADING}
}

export const setOnLoadingCountriesAC = (name) =>{
    return {type: LOADING_COUNTRIES_ON}
}

export const setOffLoadingCountriesAC = (name) =>{
    return {type: LOADING_COUNTRIES_OFF}
}


export const setCapitalAC = (name) =>{
    return {type: SET_CAPITAL, name:name }
}


export const loadingCountryDetailsOnAC = () =>{
    return {
        type: LOADING_COUNTRY_DETAILS_ON
    }
}

export const loadingCountryDetailsOffAC = () =>{
    return {
        type: LOADING_COUNTRY_DETAILS_OFF
    }
}

export const errorCountryDetailsOffAC = () =>{
    return {
        type: ERROR_COUNTRY_DETAILS_OFF
    }
}

export const errorCountryDetailsOnAC = () =>{
    return {
        type: ERROR_COUNTRY_DETAILS_ON
    }
}

export const getCountriesByRegionTC = (name) => {
    return (dispatch)=>{
        const api = new CountryAPIDAL();
        dispatch(setOnLoadingCountriesAC())
        api.getCountriesByRegion(name)
            .then((res) => {
                dispatch(setCountriesAC(res.data));
                dispatch(setRandomCountryDetailsAC())
                dispatch(setOffLoadingCountriesAC())
            })
    }
}
export const getCapitalByCountryTC = (country) =>{
    return (dispatch) => {
        dispatch(setOnLoadingAC());
        const apiInstance = new CountryAPIDAL();
        apiInstance.getCapitalByCountry(country)
            .then((response) => {
                dispatch(setCapitalAC(response.data[0].capital[0]));
                dispatch(setOffLoadingAC());
            })

    }}

export const getCountryByNameTC = (name) =>{
    return (dispatch) => {

        const apiInstance = new CountryAPIDAL();
        dispatch(loadingCountryDetailsOnAC());
        dispatch(errorCountryDetailsOffAC());
        apiInstance.getCountryByName(name)
            .then((response) => { // country object in response
                dispatch(setCountryDetailsAC(response));
                dispatch(loadingCountryDetailsOffAC());
            })
            .catch(()=>{dispatch(errorCountryDetailsOnAC())})

    }}



export default Reducer;

