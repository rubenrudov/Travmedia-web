import React from 'react';
import Navbar from './Navbar'
import '../Styles/private.css';

export default function About() {

    const aboutSectionsText = [
        "lol",
        "lol"
    ];

    return (
        <div>
            <Navbar/>
            <h2>About page</h2>
            <br/>
            <div className="info-container">
                {
                    aboutSectionsText.map((item, index) => {
                        return (
                            <p key={index}>
                                {item}
                            </p>
                        )
                    })
                }
            </div>
        </div>
    );
}