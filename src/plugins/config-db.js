import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
const firebaseApp = initializeApp({
  apiKey: "AIzaSyASswt6Bg-AgWG0fd7NYEN0mmOw8yE4z1k",
  authDomain: "final-project-75080.firebaseapp.com",
  databaseURL:
    "https://final-project-75080-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "final-project-75080",
  storageBucket: "final-project-75080.appspot.com",
  messagingSenderId: "632165070012",
  appId: "1:632165070012:web:b7270523d4343e3a294cb9",
  measurementId: "G-VKDPNKQB6C",
});

const db = getFirestore(firebaseApp);
const auth = getAuth(firebaseApp);
export { db, auth };
