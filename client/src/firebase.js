// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-estate-5ef74.firebaseapp.com",
  projectId: "mern-estate-5ef74",
  storageBucket: "mern-estate-5ef74.appspot.com",
  messagingSenderId: "499880747663",
  appId: "1:499880747663:web:c09ba25fd0c0175c9c86fa"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);