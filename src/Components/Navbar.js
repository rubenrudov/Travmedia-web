import React, { useState } from 'react';
import '../Styles/navbar.css'
import website_logo from '../Assets/website_logo.jpeg'
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function Navbar({ logout }) {

    const [clicked, setClicked] = useState(false);

    const handleClick = () => {
        setClicked(!clicked);
    }

    const MenuItems = [
        {
            title: 'Home',
            url: '/',
        },
        {
            title: 'Planner',
            url: '/planner',
        },
        // {
        //     title: 'Flights',
        //     url: '/flights',
        // },
        {
            title: 'Forum',
            url: '/forums',
        },
        {
            title: 'About',
            url: '/about',
        },
        {
            title: 'Profile',
            url: '/update-profile',
        }
    ];

    return (
        <nav>
            <div className="logo-section">
                <a href="/"><img className="logo" src={website_logo} alt="logo"/></a>
                &nbsp;
                &nbsp;
                <h3>Travmedia</h3>
                <FontAwesomeIcon className="fa-icons-menu" icon={clicked ? faTimes : faBars} onClick={handleClick}/>
            </div>
            <br/>
            <ul className={clicked ?  "nav-menu--active" : "nav-menu"}>
                {
                    MenuItems.map((item, index) => {
                        return (
                            <li key={index}>
                                <a href={item.url}>{item.title}</a>
                            </li>
                        );
                    })
                }
                <li>{logout}</li>
            </ul>
        </nav>
    );
}