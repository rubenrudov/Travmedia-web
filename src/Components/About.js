import React from 'react';
import Navbar from './Navbar'
import '../Styles/private.css';
import { GitHub } from 'react-profiles'
import rubengit from '../Assets/rubengit.png'
import nitrogit from '../Assets/nitrogit.png'
import website_logo from '../Assets/website_logo.jpeg'
import '../Styles/ourteam.css'

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
                <div class="profiles">
                    <div class="profile">
                        <a href="https://github.com/Travmedia-il"><img src={website_logo} class="profile-img"/></a>
                        <h3 class="user-name">Travmedia</h3>
                        <h5>Team</h5>
                        <p>Travmedia is our team's name and we create digital solutions for travelers.</p>
                    </div>
                    <div class="profile">
                        <a href="https://github.com/rubenrudov"><img src={rubengit} class="profile-img"/></a>
                        <h3 class="user-name">Ruben Rudov</h3>
                        <h5>Full-stack developer</h5>
                        <p>Ruben is the organization founder, and filled the Full-stack developer role in this project and was part in building the project from zero to hero.</p>
                    </div>
                    <div class="profile">
                        <a href="https://github.com/Nitrogen777"><img src={nitrogit} class="profile-img"/></a>
                        <h3 class="user-name">Eyal Shapiro</h3>
                        <h5>Backend developer</h5>
                        <p>Eyal is our backend developer, in this site he was involved in writing the client-server operations.</p>
                    </div>
                </div>
            </center>
        </div>
    );
}