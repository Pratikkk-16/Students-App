import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import './App.css';

const firebaseConfig = {
    apiKey: "AIzaSyCi09JaqKUwZuIyssyAGA0HsKlKxbLFC0Q",
    authDomain: "students-app16.firebaseapp.com",
    projectId: "students-app16",
    storageBucket: "students-app16.firebasestorage.app",
    messagingSenderId: "403474905924",
    appId: "1:403474905924:web:d29526bbe450b05467b511",
    measurementId: "G-QBTSZ1TZCS"
  };


const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);