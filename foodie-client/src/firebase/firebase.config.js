// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_APIKEY,
  authDomain: import.meta.env.VITE_AUTHDOMAIN,
  projectId: import.meta.env.VITE_PROJECTID,
  storageBucket: import.meta.env.VITE_STORAGEBUCKET,
  messagingSenderId: import.meta.env.VITE_MESSAGINGSENDERID,
  appId: import.meta.env.VITE_APPID,
};

// const firebaseConfig = {
//   apiKey: "AIzaSyC8ienAzNABdEVzqffUQHSZGlJvqSavy9c",
//   authDomain: "foodi-website-1ea9d.firebaseapp.com",
//   projectId: "foodi-website-1ea9d",
//   storageBucket: "foodi-website-1ea9d.appspot.com",
//   messagingSenderId: "987920179190",
//   appId: "1:987920179190:web:1da773126eb2938af0b1d7",
// };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app;
