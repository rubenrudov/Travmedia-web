import React, { useState, useEffect } from 'react';
import Navbar from './Navbar'
import '../Styles/private.css';
import { Button } from 'react-bootstrap';

/* TODO:
    1) Add 4 boxes (1 date picker, 3 dropdowns): From, To, Date picker and Price range radio button.
    2) Read the countries from https://restcountries.eu/rest/v2/all.
    3) Add countries to dropdown.
    4) implement searching via skyscanner api.
*/


export default function Flights() {
    const [flights, setFlights] = useState(["Null"]);
    const [countries, setCountries] = useState([]);

    useEffect(() => {
        fetch("https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/autosuggest/v1.0/UK/USD/en-GB/?query=Stockholm", {
            "method": "GET",
            "headers": {
                "x-rapidapi-key": "1aef007bdcmshc0731e404515fc0p1133fbjsndcab84fe524b",
                "x-rapidapi-host": "skyscanner-skyscanner-flight-search-v1.p.rapidapi.com"
            }
        }).then((response) => response.json())
        .then((data) => {
            console.log(data.Places);
            setFlights(data.Places[0]);
        })
        .catch(err => {
            console.error(err);
        });
    }, []);

    useEffect(() => {
        fetch("https://restcountries.eu/rest/v2/all")
        .then((response) => response.json() )
        .then((data) => {
            console.log(data)
            for(var i=0; i < data.length; i++) {
                console.log(data[i]);
            }
            setCountries(data);
        })    
    }, []);

    return (
        <div className="flights-page">
            <Navbar/>
            <center className="flights">
                <h1>Flights page</h1>
                <h3>Results: </h3>
                <div className="search-box">
                    <select name="Departure" id="dropdown">
                        <option value="Departure">Departure</option>
                        {
                            countries.map((item, index) => {
                                return (
                                    <option value={index}>
                                        {item.capital}, {item.name}
                                    </option>
                                )
                            })
                        }
                    </select>
                    <select name="Destination" id="dropdown">
                        <option value="Destination">Destination</option>
                        {
                            countries.map((item, index) => {
                                return (
                                    <option value={index}>
                                        {item.name}
                                    </option>
                                )
                            })
                        }
                    </select>
                    <select name="Price-range" id="dropdown">
                        <option value="Price range">Price range</option>
                    </select>
                    <Button className="submit-button">
                        submit
                    </Button>
                </div>

                <div className="results">
                    <p>{flights.PlaceName}</p>
                </div>
            </center>
        </div>
    );
}