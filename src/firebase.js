// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore";
import { getAuth} from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCQG0AsZzgSnkUbzmDE53nNyayTBlUTEnc",
  authDomain: "teachers-aid-ec75a.firebaseapp.com",
  projectId: "teachers-aid-ec75a",
  storageBucket: "teachers-aid-ec75a.appspot.com",
  messagingSenderId: "707247762573",
  appId: "1:707247762573:web:a4e136291ff02135eac6c4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);