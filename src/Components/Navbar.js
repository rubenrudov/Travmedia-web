import React from 'react';
import '../Styles/navbar.css'
import { Link } from "react-router-dom"

export default function Navbar() {

    const MenuItems = [
        {
            title: 'Home',
            url: '/',
        },
        {
            title: 'Planner',
            url: '/planner',
        },
        {
            title: 'Flights',
            url: '/flights',
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
            <h1 className="title"><a href="/">Travmedia</a></h1>
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
            </ul>
        </nav>
    );
}