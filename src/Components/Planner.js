import React from 'react';
import Navbar from './Navbar'
import { useAuth } from "../contexts/AuthContext";
import { Link, useHistory } from "react-router-dom";
import { getDatabase, ref, onValue} from "firebase/database";
import app from '../fireb'

export default function Planner() {

    // Hooks
    const { currentUser, logout } = useAuth()
    const history = useHistory();
    const database = getDatabase();


    var starCountRef = app.database().ref('trips/user1');
        starCountRef.on('value', (snapshot) => {
        const data = snapshot.val();
        updateStarCount(postElement, data);
    });

    // Function for getting the "name" part from an email
    // Example: ruby.rudov from ruby.rudov@gmail.com
    function getUname(email) {
        var username = "";
        for(var i = 1; i < email.length; i++) {
            if (email[i] != "@") {
                username += email[i - 1]
            } else {
                username += email[i - 1]
                break;
            }
        }
        return username;
    }

    function getData() {
        return (
            "Data from firebase"
        );
    }

    return (
        <div>
            <Navbar/>
            <h2>Your next trip plan by: <span
                    style={{color: 'var(--eden)', textDecoration: "underline"}}>{getUname(currentUser.email)}
                 </span>
            </h2>
            <br/>
            <div className="trip-details">
                <h3>Trip details: {getData()}</h3>
            </div>
            <div className="plan">
                {
                  /*
                     
                  */
                }
            </div>
        </div>
    );
}