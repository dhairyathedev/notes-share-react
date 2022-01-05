import firebase from "firebase/compat/app"
import "firebase/compat/firestore"

const firebaseConfig = {
    apiKey: "AIzaSyAEbnB6dJHPCChet_zb1JJ8aomfG8HIwUY",
    authDomain: "notice-583f1.firebaseapp.com",
    projectId: "notice-583f1",
    storageBucket: "notice-583f1.appspot.com",
    messagingSenderId: "236700266640",
    appId: "1:236700266640:web:82d416d09f6f8a95922815"
  };


const app = firebase.initializeApp(firebaseConfig);

const db = app.firestore();


export default db