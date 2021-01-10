import firebase from "firebase/app";
import "firebase/firestore";
// firebase.initializeApp({
//     apiKey: process.env.REACT_APP_API_KEY,
//     authDomain: process.env.REACT_APP_AUTH_DOMAIN,
//     databaseURL: process.env.REACT_APP_DATABASE_URL,
//     projectId: process.env.REACT_APP_PROJECT_ID,
//     storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
//     messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID
//   });

// console.log(firebase.app().options);

import "firebase/database";
import "firebase/auth";

const config = {
  apiKey: "AIzaSyCi8CGjq1axwk2pzg5B89R7k0xgDr-tSnc",
  authDomain: "react-grid-dashboard-kwr2.firebaseapp.com",
  databaseURL: "https://react-grid-dashboard-kwr2-default-rtdb.firebaseio.com",
  projectId: "react-grid-dashboard-kwr2",
  storageBucket: "react-grid-dashboard-kwr2.appspot.com",
  messagingSenderId: "657283336543",
  appId: "1:657283336543:web:c702d78e9ade9f78ea8eea"
};

firebase.initializeApp(config);
// firebase.initializeApp();
console.log(firebase.app().options);
export const provider = new firebase.auth.GoogleAuthProvider();
export const auth = firebase.auth();

export default firebase;

export const firestore = firebase.firestore();
