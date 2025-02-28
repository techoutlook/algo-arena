import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyByGaIQUI0PskrMs32RokqBaU6P3utZZJk",
  authDomain: "algo-arena-50b4f.firebaseapp.com",
  projectId: "algo-arena-50b4f",
  storageBucket: "algo-arena-50b4f.firebasestorage.app",
  messagingSenderId: "46784098077",
  appId: "1:46784098077:web:8c482ff1260c4ddaa1bbf4",
  measurementId: "G-F25G3J45DD",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);

export { analytics, db };
