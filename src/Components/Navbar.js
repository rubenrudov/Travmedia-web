import React from 'react';
import '../Styles/navbar.css'
import { Link } from "react-router-dom"

export default function Navbar() {

    const MenuItems = [
        {
            title: 'Home',
            url: '/',
            className: '/'
        },
        {
            title: 'Planner',
            url: '/',
            className: '/'
        },
        {
            title: 'Flights',
            url: '/',
            className: '/'
        },
        {
            title: 'About',
            url: '/about',
            className: '/'
        },
        {
            title: 'Profile',
            url: '/update-profile',
            className: '/'
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
                                <a className={item.className} href={item.url}>{item.title}</a>
                            </li>
                        );
                    })
                }
            </ul>
        </nav>
    );
}