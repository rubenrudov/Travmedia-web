import React, { useState, useEffect } from 'react'
import Navbar from './Navbar'
import { useAuth } from "../contexts/AuthContext";
import { Link, useHistory } from "react-router-dom";
import app from '../fireb'
import CommentsDialog from './CommentsDialog';

export default function () {

    // Hooks
    const { currentUser, logout } = useAuth();
    // For uploading
    const [open, setOpen] = useState(false)
    const [dialogPost, setDialog] = useState({})
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [date, setDate] = useState("date");

    // Function for getting the "name" part from an email
    // Example: ruby.rudov from ruby.rudov@gmail.com
    function getUname(email) {
        var username = "";
        for (var i = 1; i < email.length; i++) {
            if (email[i] != "@") {
                username += email[i - 1]
            } else {
                username += email[i - 1]
                break;
            }
        }
        return username;
    }

    // For getting posts
    const [posts, setPosts] = useState([{ ref: "", post: {} }]);

    // "Function" constants
    const handleOnChangeTitle = (e) => {
        setTitle(e.target.value);
    }

    const handleOnChangeContent = (e) => {
        setContent(e.target.value);
    }

    const handleOpen = (pair) => {
        setDialog(pair);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleDialogDisplay = () => {
        if(open){
            return(<CommentsDialog post={dialogPost} open={open} onClose={handleClose} />)
        }
    }

    const createPost = () => {
        const planRef = app.database().ref("posts");
        var today = new Date();
        var date = today.getDate() + '/' + (today.getMonth() + 1) + '/' + today.getFullYear();

        const plan = {
            publisher: getUname(currentUser.email).replace(".", ""),
            title: title,
            content: content,
            date: date
        };
        // Pushing the JSON into the plans reference 
        planRef.push(plan)
        setTitle("");
        setContent("");
        setDate("");
    }

    useEffect(() => {
        const planRef = app.database().ref("posts");
        planRef.on('value', (snapshot) => {
            const plans = snapshot.val();
            // things are about to really messy
            const destinationsList = [];
            for (let child in plans) {
                destinationsList.push({ ref: child, post: plans[child] });
            }
            setPosts(destinationsList);
        });
    }, []);
    // helpers

    return (
        <div>
            <Navbar />
            <h2>Welcome to posts page</h2>
            <div className="feed">
                <div className="filtering-bar">

                </div>
                {
                    posts.map((pair, index) => {
                        return (
                            <div className="post" key={index}>
                                <div className="comments" style={{ position: "sticky", bottom: "0" }}>
                                    <button className="comments-button" onClick={() => handleOpen(pair)}>Comments</button>
                                </div>
                                <h3><u>Title</u>: {pair.post.title}</h3>
                                <h4><u>By</u>: {pair.post.publisher}</h4>
                                <p><u>Content:</u> {pair.post.content}</p>
                            </div>
                        )
                    })
                }
            </div>
            <br />
            <center>
                <div className="add-plan">
                    <center><h2><u>Create new post</u></h2></center>
                    <label>Post title</label>
                    <input className="input" onChange={handleOnChangeTitle} value={title} />
                    <br />
                    <label>Some content for the post</label>
                    <textarea className="input" onChange={handleOnChangeContent} value={content} />
                    <br />
                    <button className="submit-button" onClick={createPost}>Upload post</button>
                </div>
            </center>
            <br />
            {
                handleDialogDisplay()
            }
            
        </div>
    );
}