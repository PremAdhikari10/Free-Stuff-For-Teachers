// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getAuth } from 'firebase/auth';


// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC6cpDWkYMj8woa7zQ7FlNHmalB-ivFb_I",
  authDomain: "free-stuff-for-teachers.firebaseapp.com",
  projectId: "free-stuff-for-teachers",
  storageBucket: "free-stuff-for-teachers.appspot.com",
  messagingSenderId: "836599456146",
  appId: "1:836599456146:web:3ab5cc0814f745aa44a14b",
  measurementId: "G-TJFTYV99Y5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);

export { app, analytics, auth };
export default app;
