// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore/lite";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyASEVmwrhoXtIrvsAx2qJMR-UxDVH4JlB8",
  authDomain: "yo-mamma-74a8b.firebaseapp.com",
  projectId: "yo-mamma-74a8b",
  storageBucket: "yo-mamma-74a8b.appspot.com",
  messagingSenderId: "51273645008",
  appId: "1:51273645008:web:54245e3b1d7856a9e2d7d5",
  measurementId: "G-0XDMYF3XDH",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export const auth = getAuth(app);

export default db;
