// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCOYngn_niDBLq48bJ8GrLCrXAB5rqiqyk",
  authDomain: "vite-test-3ae2c.firebaseapp.com",
  projectId: "vite-test-3ae2c",
  storageBucket: "vite-test-3ae2c.firebasestorage.app",
  messagingSenderId: "851395576158",
  appId: "1:851395576158:web:ca76896dffa02cca584fcf",
  measurementId: "G-80DQY8R7V8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const store = getFirestore(app);

export {auth, store}