import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAqzZYOIX3D7LQcB2mDdC_UGSqF-WJqqTw",
  authDomain: "burgersite-677fd.firebaseapp.com",
  projectId: "burgersite-677fd",
  storageBucket: "burgersite-677fd.appspot.com", // Fixed typo
  messagingSenderId: "12142398667",
  appId: "1:12142398667:web:759d687732fb730341df4e",
  measurementId: "G-9V6JZWPXFC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app); // Export auth for use in authentication
export default app;
