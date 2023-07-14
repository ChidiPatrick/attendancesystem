// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDsDLd94I9o72t0b8YWa84DpZNWUdCRfQo",
  authDomain: "attendancesytem-a7992.firebaseapp.com",
  projectId: "attendancesytem-a7992",
  storageBucket: "attendancesytem-a7992.appspot.com",
  messagingSenderId: "59931528945",
  appId: "1:59931528945:web:c008682dc2f15acdd3a350",
  measurementId: "G-HXPMJ0C2JL",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore(app);
export const auth = getAuth(app);
