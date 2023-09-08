import { initializeApp } from "firebase/app";

import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getDatabase } from "firebase/database";

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
// const analytics = getAnalytics(app);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);
export const rdb = getDatabase(app);
