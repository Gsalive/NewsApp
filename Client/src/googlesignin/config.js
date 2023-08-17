// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth,GoogleAuthProvider} from "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB7c5jUm4-Al4pdNHE62p2iln6GvPhPkTw",
  authDomain: "newsapp-d4b73.firebaseapp.com",
  projectId: "newsapp-d4b73",
  storageBucket: "newsapp-d4b73.appspot.com",
  messagingSenderId: "881485237891",
  appId: "1:881485237891:web:7c58975f634bdb8e0615b6",
  measurementId: "G-GEV2HLNSM6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth=getAuth(app);
const provider= new GoogleAuthProvider();

export{auth,provider}