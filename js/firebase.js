// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-analytics.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-firestore.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-auth.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDpCZszY7HrKM1zjn9J0WbYmcrgSZeHud4",
    authDomain: "pivot-app-c1cc8.firebaseapp.com",
    projectId: "pivot-app-c1cc8",
    storageBucket: "pivot-app-c1cc8.appspot.com",
    messagingSenderId: "144681811590",
    appId: "1:144681811590:web:a826a6655e457f78325b07",
    measurementId: "G-VJ237R9H24"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore();

console.log("Firebase Initalised")