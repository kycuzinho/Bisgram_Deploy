// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: "chatpap-8c281.firebaseapp.com",
  projectId: "chatpap-8c281",
  storageBucket: "chatpap-8c281.appspot.com",
  messagingSenderId: "552519682061",
  appId: "1:552519682061:web:bf3af7c0a0590f45c66d44"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth()
export const db = getFirestore()
export const storage = getStorage()