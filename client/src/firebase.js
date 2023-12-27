// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "real-estate-app-dc9c0.firebaseapp.com",
  projectId: "real-estate-app-dc9c0",
  storageBucket: "real-estate-app-dc9c0.appspot.com",
  messagingSenderId: "55778020871",
  appId: "1:55778020871:web:c9539e0c18c4a151ca64a2",
  measurementId: "G-Q430ENBXYC" 
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
