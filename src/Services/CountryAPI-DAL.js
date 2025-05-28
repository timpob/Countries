// https://restcountries.com/

import axios from "axios";
import Country from "../Components/Countries/Country/Country";

 export default class CountryAPIDAL {

    _baseUrl ='https://restcountries.com/v3.1';
    async getCountriesByRegion(region) {

        const response = await axios.get(`${this._baseUrl}/region/${region}`);
        return response;
    }

     async getCapitalByCountry(country) {

         const response = await axios.get(`${this._baseUrl}/name/${country}?fields=capital`);
         return response;
     }

     async getCountryByName(name) {

             const response = await axios.get(`${this._baseUrl}/name/${name}`);
             return response.data[0];


     }


}