  
import firebase from "firebase"
import "firebase/auth"
import "firebase/database"

const firebaseConfig = {
    apiKey: "AIzaSyD5kej3qZBPVLlF8S_wSnCuRPzDVySpEsY",
    authDomain: "travmedia-site.firebaseapp.com",
    projectId: "travmedia-site",
    storageBucket: "travmedia-site.appspot.com",
    messagingSenderId: "471023471836",
    appId: "1:471023471836:web:4e40b315c31485f2617819",
    measurementId: "G-X6R951SRDT"
};

const app = firebase.initializeApp(firebaseConfig);

export const auth = app.auth();
export const database = app.database();
export default app;
