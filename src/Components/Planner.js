import React, { useState } from 'react';
import Navbar from './Navbar'
import { useAuth } from "../contexts/AuthContext";
import { Link, useHistory } from "react-router-dom";
import app from '../fireb'

export default function Planner() {

    // Hooks
    const { currentUser, logout } = useAuth()
    const history = useHistory();
    const [plan, setPlan] = useState([{}]);
    const [title, setTitle] = useState();
    const [desc, setDesc] = useState("");
    const [content, setContent] = useState("");

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

    const handleOnChangeTitle = (e) => {
        setTitle(e.target.value);
    }

    const handleOnChangeDesc = (e) => {
        setDesc(e.target.value);
    }

    const handleOnChangeContent = (e) => {
        setContent(e.target.value);
    }

    const createPlan = () => {
        const planRef = app.database().ref(`${getUname(currentUser.email).replace(".", "")}/plans`);
        var today = new Date();
        var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
        const plan = {
            title: title,
            desc: desc,
            content: content,
            date: date
        };

        // Pushing the JSON into the plans reference 
        planRef.push(plan)
        setTitle("");
        setDesc("");
        setContent("");
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
                <h3>Trip details: {}</h3>
            </div>
            <div className="plan">
                {
                  plan.map((item, index) => {
                      return (
                          <div>
                              <h3>{item.title}</h3>
                              <p>{item.desc}</p>
                          </div>
                      )
                  })
                }
            </div>
            <div className="add-plan">
                <input onChange={handleOnChangeTitle} value={title}/>
                <input onChange={handleOnChangeDesc} value={desc}/>
                <input onChange={handleOnChangeContent} value={content}/>
                <button onClick={createPlan}>Save plan</button>
            </div>
        </div>
    );
}