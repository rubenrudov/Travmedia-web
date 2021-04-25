//Fear
import React, { useState, useEffect } from 'react'
import { useAuth } from "../contexts/AuthContext";
import { makeStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import app from '../fireb'
import { blue } from '@material-ui/core/colors';

const useStyles = makeStyles({
    avatar: {
        backgroundColor: blue[100],
        color: blue[600],
    },
});


export default function (props) {
    const classes = useStyles();
    const [comments, setComments] = useState([{}]);
    const { onClose, post, open } = props;

    //Copied code from ruby
    //ok

    const handleClose = () => {
        onClose();
    };

    // Hooks
    const { currentUser, logout } = useAuth();
    // For uploading
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

    // "Function" const
    const handleOnChangeContent = (e) => {
        setContent(e.target.value);
    }

    const createComment = () => {
        console.log(post)
        const commentsRef = app.database().ref(`posts/${post.ref}/comments`);
        var today = new Date();
        var date = today.getDate() + '/' + (today.getMonth() + 1) + '/' + today.getFullYear();

        const plan = {
            publisher: getUname(currentUser.email).replace(".", ""),
            content: content,
            date: date
        };
        // Pushing the JSON into the plans reference 
        commentsRef.push(plan)
        setContent("");
        setDate("");
    }

    useEffect(() => {
        console.log(post)
        const commentRef = app.database().ref(`posts/${post.ref}/comments`);
        commentRef.on('value', (snapshot) => {
            const comments = snapshot.val();
            // things are about to really messy
            const commentsList = [];
            for (let child in comments) {
                commentsList.push(comments[child]);
            }
            console.log(commentsList)
            setComments(commentsList);
        });
    }, []);
    // helpers

    return (
        <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={open}>
            <div className="original-post">
                <h3><u>Title</u>: {post.post.title}</h3>
                <h4><u>By</u>: {post.post.publisher}</h4>
                <p><u>Content:</u> {post.post.content}</p>
            </div>
            <div className="feed">
                {
                    comments.map((comment, index) => {
                        return (
                            <div className="comment" key={index}>
                                <h4><u>By</u>: {comment.publisher}</h4>
                                <p><u>Content:</u> {comment.content}</p>
                                <br />
                            </div>
                        )
                    })
                }
            </div>
            <br />
            <center>
                <div>
                    <center><h2><u>Create new comment</u></h2></center>
                    <label>Some content for the comment</label>
                    <textarea className="input" onChange={handleOnChangeContent} value={content} />
                    <br />
                    <button className="submit-button" onClick={createComment}>Upload Comment</button>
                </div>
            </center>
            <br />
        </Dialog>
    );

}