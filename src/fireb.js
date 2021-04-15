  
import firebase from "firebase/app"
import "firebase/auth"

const app = firebase.initializeApp({
    apiKey: "AIzaSyD5kej3qZBPVLlF8S_wSnCuRPzDVySpEsY",
    authDomain: "travmedia-site.firebaseapp.com",
    projectId: "travmedia-site",
    storageBucket: "travmedia-site.appspot.com",
    messagingSenderId: "471023471836",
    appId: "1:471023471836:web:4e40b315c31485f2617819",
    measurementId: "G-X6R951SRDT"
});

export const auth = app.auth()
export default app
