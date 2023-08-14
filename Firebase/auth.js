// Import the functions you need from the SDKs you need
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
export const app = initializeApp(firebaseConfig);
export const initFirebase =() => {
  return app;
}