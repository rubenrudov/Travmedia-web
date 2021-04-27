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
    // For uploading
    const [title, setTitle] = useState(post.post.title);
    const [content, setContent] = useState(post.post.content);

    // "Function" const
    const handleOnChangeContent = (e) => {
        setContent(e.target.value);
    }

    const handleOnChangeTitle = (e) => {
        setTitle(e.target.value);
    }

    const editPost = () => {
        console.log(post)
        const postRef = app.database().ref(`posts/${post.ref}`);
        const plan = {
            comments: (post.post.hasOwnProperty('comments')) ? post.post.comments : [],
            publisher: post.post.publisher,
            title: title,
            content: content,
            date: post.post.date
        };
        // Pushing the JSON into the plans reference 
        postRef.set(plan)
        setContent("");
        onClose();
    }
    // helpers

    return (
        <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={open} className="edit-dialog">
            <div className="edit-post">
                <label>Post title</label>
                <input className="input" onChange={handleOnChangeTitle} value={title} />
                <br />
                <label>Some content for the post</label>
                <textarea className="input" onChange={handleOnChangeContent} value={content} />
                <br />
                <button className="submit-button" onClick={editPost}>Edit post</button>
            </div>
            <br />
        </Dialog>
    );

}