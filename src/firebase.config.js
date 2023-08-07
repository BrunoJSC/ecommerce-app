// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBCn6jJQmE-y7ajpzq9IS60rbUtjzwGWyk",
  authDomain: "multimart-9e27a.firebaseapp.com",
  projectId: "multimart-9e27a",
  storageBucket: "multimart-9e27a.appspot.com",
  messagingSenderId: "170379637188",
  appId: "1:170379637188:web:8fd5527d38ed438a11b491",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;
