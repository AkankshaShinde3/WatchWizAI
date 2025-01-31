// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC6-3wDxVt-5Vlp7ibdDXQ-bdY-dpE7lpQ",
  authDomain: "watchwizai-d9c19.firebaseapp.com",
  projectId: "watchwizai-d9c19",
  storageBucket: "watchwizai-d9c19.firebasestorage.app",
  messagingSenderId: "305363869185",
  appId: "1:305363869185:web:158e7620cfa67f06a76a00",
  measurementId: "G-MMY5C3P8JW"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth();