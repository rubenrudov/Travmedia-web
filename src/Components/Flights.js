import React, { useState, useEffect } from 'react';
import Navbar from './Navbar'
import axios from "axios";

export default function Flights() {
    const [flights, setFlights] = useState(["Null"]);

    useEffect(() => {
        fetch("https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/autosuggest/v1.0/UK/GBP/en-GB/?query=Stockholm", {
            "method": "GET",
            "headers": {
                "x-rapidapi-key": "1aef007bdcmshc0731e404515fc0p1133fbjsndcab84fe524b",
                "x-rapidapi-host": "skyscanner-skyscanner-flight-search-v1.p.rapidapi.com"
            }
        }).then((response) => response.json())
        .then((data) => {
            console.log(data.Places[0]);
            setFlights(data.Places[0]);
        })
        .catch(err => {
            console.error(err);
        });
    }, []);

    return (
        <div>
            <Navbar/>
            <h1>Flights page</h1>
            <p>{flights.PlaceId}</p>
        </div>
    );
}