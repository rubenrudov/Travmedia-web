import React from 'react';
import '../Styles/navbar.css'
import website_logo from '../Assets/website_logo.jpeg'

export default function Navbar({ logout }) {

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
        // {
        //     title: 'About',
        //     url: '/about',
        // },
        // {
        //     title: 'Forum',
        //     url: '/forums',
        // },
        {
            title: 'Profile',
            url: '/update-profile',
        }
    ];

    return (
        <nav>
            <a href="/"><img className="logo" src={website_logo} alt="logo"/></a>
            <div className="icon">

            </div>
            <ul>
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