import React from 'react';
import Navbar from './Navbar'
import '../Styles/private.css';
import { GitHub } from 'react-profiles'

export default function About() {
    return (
        <div className="about-page">
            <Navbar/>
            <h2>About page</h2>
            <br/>
            <div className="info-container">
                Travmedia is an open-source project built by our contributors in GitHub. <br/>
                Our idea is to comine all the platforms that benefit travelers into a single platform by a smart web application. <br/>
                The project was started by our leader, Ruben Rudov as a school graduation project and now being developed by our team.
            </div>

            <center>
                <h2><u>Our team</u></h2>
                <div className="our-team">
                    <br/>
                </div>
            </center>
            
        </div>
    );
}