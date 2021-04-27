import React, { useState, useEffect } from 'react'
import Navbar from './Navbar'
import { useAuth } from "../contexts/AuthContext";
import { Link, useHistory } from "react-router-dom";
import app from '../fireb'
import CommentsDialog from './CommentsDialog';
import { faComment, faTrash, faEdit } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import EditDialog from './EditDialog';

export default function () {

    // Hooks
    const { currentUser, logout } = useAuth();
    // For uploading
    const [openComments, setOpenComments] = useState(false)
    const [openEdit, setOpenEdit] = useState(false)
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
    const [posts, setPosts] = useState([{ ref: "", post: {
        title: "",
        content: "",
        comments: [{}],
        publisher: "",
        date: ""
    } }]);

    // "Function" constants
    const handleOnChangeTitle = (e) => {
        setTitle(e.target.value);
    }

    const handleOnChangeContent = (e) => {
        setContent(e.target.value);
    }

    const handleCommentsOpen = (pair) => {
        setDialog(pair);
        setOpenComments(true);
    };

    const handleCloseComments = () => {
        setOpenComments(false);
    };

    const handleEditOpen = (pair) => {
        setDialog(pair);
        setOpenEdit(true);
    };

    const handleCloseEdit = () => {
        setOpenEdit(false);
    };

    const handleCommentsDisplay = () => {
        if(openComments){
            return(<CommentsDialog post={dialogPost} open={openComments} onClose={handleCloseComments} />)
        }
    }

    const handleEditDisply = () => {
        if(openEdit){
            return(<EditDialog post={dialogPost} open={openEdit} onClose={handleCloseEdit} />)
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

    function deletePost(pair) {
        let ref = pair.ref;
        app.database().ref(`posts/${ref}`).remove();
    }

    function getNumComments(post) {
        let len = 0;
        const planRef = app.database().ref(`posts/${post}/comments`);
        planRef.on('value', (snapshot) => {
            const plans = snapshot.val();
            // things are about to really messy
            for (let child in plans) {
                len++;
            }
        });
        return len;
    }

    return (
        <div>
            <Navbar />
            <h2>Welcome to posts page</h2>
            <div className="feed">
                {
                    posts.map((pair, index) => {
                        return (
                            <div className="post" key={index}>
                                <div className="comments" style={{ position: "sticky", bottom: "0" }}>
                                    <p>Comments amount: {getNumComments(pair.ref)}</p>
                                    <button className="comments-button" onClick={() => handleCommentsOpen(pair)}>
                                        <FontAwesomeIcon className="comment-icon" icon={faComment}/>
                                    </button>
                                    {
                                    pair.post.publisher === getUname(currentUser.email).replace(".", "") ? 
                                        <>
                                            <button className="comments-button" onClick={() => deletePost(pair)}>
                                                <FontAwesomeIcon className="comment-icon" icon={faTrash}/>
                                            </button>
                                            <button className="comments-button" onClick={() => handleEditOpen(pair)}>
                                                <FontAwesomeIcon className="comment-icon" icon={faEdit}/>
                                            </button>
                                        </>
                                        :
                                        null
                                    }
                                </div>
                                <h3><u>Title</u>: {pair.post.title}</h3>
                                <h4><u>By</u>: {pair.post.publisher}</h4>
                                <p><u>Content:</u> {pair.post.content}</p>
                                <br/>
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
                handleCommentsDisplay()
            }
            {
                handleEditDisply()
            }
            
        </div>
    );
}