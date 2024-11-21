// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA4z-eEP9H1_orEwOeQ38-wV0I4lYGLisY",
  authDomain: "netflix-gpt-1e026.firebaseapp.com",
  projectId: "netflix-gpt-1e026",
  storageBucket: "netflix-gpt-1e026.appspot.com",
  messagingSenderId: "38302545694",
  appId: "1:38302545694:web:cf364ddc729156e2627b0f",
  measurementId: "G-WECQVQD28M"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export  const auth = getAuth();