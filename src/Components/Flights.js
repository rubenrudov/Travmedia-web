import React, { useState, useEffect } from 'react';
import Navbar from './Navbar'
import '../Styles/private.css';
import { Button } from 'react-bootstrap';

/* TODO:
    1) Add 4 boxes (1 date picker, 3 dropdowns): From, To, Date picker and Price range radio button.
    2) Implement searching via skyscanner api.
    3) Design the countries dropdown with domw flasgs (see the corona webapp)
*/


export default function Flights() {
    const [flights, setFlights] = useState(["Null"]);
    const [countries, setCountries] = useState([]);
    const [from, setFrom] = useState("");
    const [to, setTo] = useState("");

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
        var url;
        if (from === "" || to === "") {
            url = "";
        } else {
            url = "";
        }
    }, []);

    useEffect(() => {
        fetch("https://restcountries.eu/rest/v2/all")
        .then((response) => response.json() )
        .then((data) => {
            console.log(data)
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
                    <select name="Departure">
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
                    
                    <select name="Destination">
                        <option value="Destination">Destination</option>
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
                    
                    <select name="Price-range">
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