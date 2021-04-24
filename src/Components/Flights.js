import React, { useState, useEffect } from 'react';
import Navbar from './Navbar'
import '../Styles/private.css';
import { Button } from 'react-bootstrap';

import { withStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';

// Warning
const styles = (theme) => ({
    root: {
      margin: 0,
    },
    closeButton: {
      position: 'relative',
      color: "white",
      background: "var(--eden)"
    },
  });
  
  const DialogTitle = withStyles(styles)((props) => {
    const { children, classes, onClose, ...other } = props;
    return (
      <MuiDialogTitle disableTypography className={classes.root} {...other}>
          {onClose ? (
          <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
            <CloseIcon />
          </IconButton>
        ) : null}
        <br/><br/>
        <Typography variant="h6">{children}</Typography>
      </MuiDialogTitle>
    );
  });
  
  const DialogContent = withStyles((theme) => ({
    root: {
      color: "var(--eden)"
    },
  }))(MuiDialogContent);
  
  const DialogActions = withStyles((theme) => ({
    root: {
      margin: 0,
      color: "var(--eden)",
    },
  }))(MuiDialogActions);

export default function Flights() {
    const [flights, setFlights] = useState(["Null"]);
    const [countries, setCountries] = useState([]);
    const [from, setFrom] = useState("");
    const [to, setTo] = useState("");

    const [open, setOpen] = React.useState(true);
  
    const handleClickOpen = () => {
      setOpen(true);
    };
    const handleClose = () => {
      setOpen(false);
    };

    useEffect(() => {
        fetch("https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/autosuggest/v1.0/UK/USD/en-GB/?query=Stockholm", {
            "method": "GET",
            "headers": {
                "x-rapidapi-key": "1aef007bdcmshc0731e404515fc0p1133fbjsndcab84fe524b",
                "x-rapidapi-host": "skyscanner-skyscanner-flight-search-v1.p.rapidapi.com"
            }
        }).then((response) => response.json())
        .then((data) => {
            console.log(data.Places);
            setFlights(data.Places[0]);
        })
        .catch(err => {
            console.error(err);
        });
    }, []);

    useEffect(() => {
        var url;
        if (from === "" || to === "") {
            url = "";
        } else {
            url = "";
        }
    }, []);

    useEffect(() => {
        fetch("https://restcountries.eu/rest/v2/all")
        .then((response) => response.json() )
        .then((data) => {
            console.log(data)
            setCountries(data);
        })    
    }, []);

    return (
        <div className="flights-page">
            <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
                <DialogContent dividers  style={{background: "var(--glacier)"}} >
                    <DialogTitle style={{color: "var(--eden)"}} onClose={handleClose}>
                    Warning !
                    </DialogTitle>
                    <Typography style={{color: "var(--eden)"}} gutterBottom>
                        This section isn't functional for now, check later for updates
                    </Typography>
                </DialogContent>
            </Dialog>
            <Navbar/>
            <h2>Flights page</h2>
            <center className="flights">
                <div className="search-box">
                    <select name="Departure">
                        <option value="Departure">Departure</option>
                        {
                            countries.map((item, index) => {
                                return (
                                    <option value={index}>
                                        {item.capital}, {item.name}
                                    </option>
                                )
                            })
                        }
                    </select>
                    
                    <select name="Destination">
                        <option value="Destination">Destination</option>
                        {
                            countries.map((item, index) => {
                                return (
                                    <option value={index}>
                                        {item.capital}, {item.name}
                                    </option>
                                )
                            })
                        }
                    </select>
                    
                    <select name="Price-range">
                        <option value="Price range">Price range</option>
                    </select>

                    <Button className="submit-button">
                        submit
                    </Button>
                </div>
                <div className="results">
                    <h3 style={{textAlign: "start"}}><u>Results: </u></h3>
                    <br/>
                </div>
            </center>
        </div>
    );
}