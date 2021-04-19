import React, { useState, useEffect } from "react";
import { Card, Button, Alert } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";
import { Link, useHistory } from "react-router-dom";
import Navbar from './Navbar';
import '../Styles/private.css';
import flight_illustration from '../Assets/flight_illustration.jpg'
import planning_illustration from '../Assets/planning_illustration.jpg'
import rest_illustration from '../Assets/rest_illustration.jpg'

// FIXME: responsive CSS

export default function Dashboard() {
  // Hooks
  const [error, setError] = useState("")
  const { currentUser, logout } = useAuth()
  const history = useHistory();
  const [destination, setDestination] = useState("");
  const [hotels, setHotels] = useState([]);


  // useEffect(() => {
  //   var destination = "Tel Aviv";
  // }, []);

  // Logout function -> could be used in any private route but actually used only in the homepage
  async function handleLogout() {
    setError("")

    try {
      await logout()
      history.push("/login")
    } catch {
      setError("Failed to log out")
    }
  }

  // Function for getting the "name" part from an email
  // Example: ruby.rudov from ruby.rudov@gmail.com
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

  // Searvices JSONArray, for reducing HTML code in the JS file
  const Services = [
    {
      name: "Plan your trip",
      desc: "In the planner section you can write down your routes and whole the locations that you're supposed to visit during your trip, save it for yourself and you also will be able to share your plan with friends.",
      img: planning_illustration,
      route: "/planner"
    },
    {
      name: "Search flights",
      desc: "In this page we'll help you find the best flight for your causes, we ask you for dates, destination & budjet and then we'll show you the best flights we could find for you and links for the tickets",
      img: flight_illustration,
      route: "/flights"
    },
    {
      name: "Search attractions & restaurants",
      desc: "In this page you'll be able to view attractions & restaurants by the parameters you'd like to view, we ask you for destination & dates of visit and then we'll let you know what are the best places to visit in the destinition in the dates you've given us.",
      img: rest_illustration,
      route: "/"
    },
  ]

  // const onDestinationChange = async (e) => {
  //   const destination = e.target.value;
  //   const url = destination === "" ? "https://hotels4.p.rapidapi.com/locations/search?query=tel%20aviv&locale=en_US" : `https://hotels4.p.rapidapi.com/locations/search?query=${destination}&locale=en_US`
  //   await fetch(url, {
  //     "method": "GET",
  //     "headers": {
  //       "x-rapidapi-key": "1aef007bdcmshc0731e404515fc0p1133fbjsndcab84fe524b",
  //       "x-rapidapi-host": "hotels4.p.rapidapi.com"
  //     }
  //   }).then((response) => response.json())
  //   .then((data) => {
  //     console.log(data);
  //     setHotels(data);
  //   });
  // };

  // Component return
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
                          <img class="service-illustration" alt="" src={item.img}/>
                          <br/>
                          <br/>
                          <a
                             className={item.route === "/" ? "text" : "link"} 
                             href={item.route === "/" ? null : item.route}>
                               {item.route === "/" ? "Scroll down for more info" : `To ${item.name.toLowerCase()} page`}
                          </a>
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
          <p>Gallery section</p>
      </div>
    </div>
  )
}