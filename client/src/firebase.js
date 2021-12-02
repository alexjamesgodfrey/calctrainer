import firebase from "firebase/compat/app";
import 'firebase/compat/auth';

var google = new firebase.auth.GoogleAuthProvider();

const app = firebase.initializeApp({
    apiKey: "AIzaSyBsQYuROfuGj8AqnU250eRBRzrTpL1b5rY",
    authDomain: "calctrainer-c764c.firebaseapp.com",
    projectId: "calctrainer-c764c",
    storageBucket: "calctrainer-c764c.appspot.com",
    messagingSenderId: "540963506936",
    appId: "1:540963506936:web:db042adf0e8109fabc490d"
});

export const googleProvider = google;

export const auth = app.auth();
export default app;