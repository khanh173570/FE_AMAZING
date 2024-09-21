// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { GoogleAuthProvider } from "firebase/auth";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyADBHK483KeWKt55SRJQmFS6HZ27vc87m4",
  authDomain: "fe-amazing.firebaseapp.com",
  projectId: "fe-amazing",
  storageBucket: "fe-amazing.appspot.com",
  messagingSenderId: "118488776880",
  appId: "1:118488776880:web:4023769a738b90d415fb75",
  measurementId: "G-3D0JP99BJ0",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
const googleProvider = new GoogleAuthProvider();
const auth = getAuth();

export { storage, googleProvider, auth };
