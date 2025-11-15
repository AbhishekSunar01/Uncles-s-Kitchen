// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDqIvQw_q4chDwbzvvRXdEVL0AWdpX8KGc",
  authDomain: "cloud-kitchen-c652d.firebaseapp.com",
  projectId: "cloud-kitchen-c652d",
  storageBucket: "cloud-kitchen-c652d.appspot.com",
  messagingSenderId: "461153287784",
  appId: "1:461153287784:web:17632770b844a76e6d45dd",
  measurementId: "G-KYEKP89YP5",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);

export { db, storage };
