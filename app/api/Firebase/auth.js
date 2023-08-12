// Import the functions you need from the SDKs you need
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import { initializeApp } from "firebase/app";


// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDxozuxoYPDow2BhLp-R6xdhDknmLVs1vc",
  authDomain: "stocks-47d3b.firebaseapp.com",
  projectId: "stocks-47d3b",
  storageBucket: "stocks-47d3b.appspot.com",
  messagingSenderId: "885718728016",
  appId: "1:885718728016:web:746a7ec8c11710978a0055",
  measurementId: "G-0WST87ZFFG"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
  
export const auth = firebase.auth();
export const firestore = firebase.firestore();
export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  // Get a reference to the user's document in the 'users' collection
  const userRef = firestore.doc(`stocks/${userAuth.uid}`);

  // Check if the user document already exists in the database
  const snapshot = await userRef.get();

  if (!snapshot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      // Create the user document with the provided data
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      });
    } catch (error) {
      console.error('Error creating user:', error);
    }
  }

  return userRef;
};








