import React, { useEffect, useState } from 'react';
import Navbar from './Navbar'
import { useAuth } from "../contexts/AuthContext";
import { Link, useHistory } from "react-router-dom";
import app from '../fireb'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default function Planner() {

    // Hooks
    const { currentUser, logout } = useAuth()
    const history = useHistory();
    const [destinations, setDestinations] = useState([{ref: "", plan: {}}]);
    const [title, setTitle] = useState("");
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
        var date = today.getDate() + '/' + (today.getMonth()+1) + '/' + today.getFullYear();
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

    
    function deletePlan(pair) {
        let ref = pair.ref;
        let username = getUname(currentUser.email).replace(".", "");
        app.database().ref(username + "/plans/" + ref).remove();
    }

    useEffect(() => {
        const planRef = app.database().ref(`${getUname(currentUser.email).replace(".", "")}/plans`);
        planRef.on('value', (snapshot) => {
            const plans = snapshot.val();
            const destinationsList = [];
            for (let child in plans) {
                destinationsList.push({ref: child, plan: plans[child]});
            }
            console.log(destinationsList)
            setDestinations(destinationsList);
        });
    }, []);

    return (
        <div className="planner-page">
            <Navbar/>
            <h2>
                Upcoming destinations for: <span
                    style={{color: 'var(--eden)', textDecoration: "underline"}}>{getUname(currentUser.email)}
                 </span>
            </h2>
            <br/>
            <div className="next-destinations">
                <h3>Destinations list:</h3>
                <br/>
                <div className="destinations">
                    {
                        destinations.map((dest, index) => {
                            return (
                                <div className="destination" key={index}>
                                    <button className="comments-button" onClick={() => deletePlan(dest)}>
                                        <FontAwesomeIcon className="comment-icon" icon={faTrash}/>
                                    </button>
                                    <h4>{dest.plan.title}</h4>
                                    <h6>{dest.plan.desc}</h6>
                                    <br/>
                                    <p>{dest.plan.content}</p>
                                    <span>Last edit: {dest.date}</span>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
            <br/>
            <br/>
            <center>
                <div className="add-plan">
                <center><h2><u>Add new destination into your list</u></h2></center>
                    <label>Destination title</label>
                    <input className="input" onChange={handleOnChangeTitle} value={title}/>
                    <br/>
                    <label>Destination description</label>
                    <input className="input" onChange={handleOnChangeDesc} value={desc}/>
                    <br/>
                    <label>Some content about the destination</label>
                    <textarea className="input" onChange={handleOnChangeContent} value={content}/>
                    <br/>
                    <button className="submit-button" onClick={createPlan}>Save plan</button>
                </div>
            </center>
        </div>
    );
}