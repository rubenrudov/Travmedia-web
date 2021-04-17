import React, { useState } from "react";
import { Card, Button, Alert } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";
import { Link, useHistory } from "react-router-dom";
import Navbar from './Navbar';
import '../Styles/private.css';

export default function Dashboard() {
  const [error, setError] = useState("")
  const { currentUser, logout } = useAuth()
  const history = useHistory()

  async function handleLogout() {
    setError("")

    try {
      await logout()
      history.push("/login")
    } catch {
      setError("Failed to log out")
    }
  }

  function getUname(email) {
    var username = "";
    for(var i = 1; i < email.length; i++) {
      if (email[i] != "@") {
        username += email[i - 1]
      }
      else {
        username += email[i - 1]
        break;
      }
    }
    return username;
  }

  const Services = [
    {
      name: "Plan your trip",
      desc: "In the planner section you can write down your routes and whole the locations that you're supposed to visit during your trip, save it for yourself and you also will be able to share your plan with friends.",
      img: "url",
      route: "/planner"
    },
    {
      name: "Search flights",
      desc: "In this page we'll help you find the best flight for your causes, we ask you for dates, destination & budjet and then we'll show you the best flights we could find for you and links for the tickets",
      img: "url",
      route: "/flights"
    },
    {
      name: "Search attractions & restraunts",
      desc: "In this page you'll be able to view attractions & restraunts by the parameters you'd like to view, we ask you for destination & dates of visit and then we'll let you know what are the best places to visit in the destinition in the dates you've given us.",
      img: "url",
      route: "/"
    },
  ]

  return (
    <div>
      <Navbar logout={
        <Button className="logout-button"  variant="link" onClick={handleLogout}>
          Log Out
        </Button>}
      />
      <h2>Hello {getUname(currentUser.email)}, welcome back to Travmedia</h2>
      <br/>
      <div className="content">
        <div className="about">
            <h2>Our services</h2>
            <div className="services">
              {
                    Services.map((item, index) => {
                        return (
                          <>
                            <br/>
                            <div key={index} className="service">
                                <h3>{item.name}</h3>
                                <br/>
                                <p>{item.desc}</p>
                                <br/>
                                <a className={item.route === "/" ? "text" : "link"} href={item.route === "/" ? null : item.route}>{item.route === "/" ? "Scroll down for more info" : `To ${item.name.toLowerCase()} page`}</a>
                            </div>
                          </>
                        );
                    })
              }
            </div>
        </div>
      </div>
      <br/>
      <div className="gallery">
          Gallery section
      </div>
    </div>
  )
}