// Import the functions you need from the SDKs you need
import { initializeApp} from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider, FacebookAuthProvider } from 'firebase/auth'; 
import { getFirestore } from 'firebase/firestore';
import { getStorage} from 'firebase/storage'
const firebaseConfig = {
  apiKey: "AIzaSyDaf0IDcxsZE1kQc-rVSo1RfC1CMQBQhN4",
  authDomain: "social-media-app-75f48.firebaseapp.com",
  projectId: "social-media-app-75f48",
  storageBucket: "social-media-app-75f48.appspot.com",
  messagingSenderId: "753099933638",
  appId: "1:753099933638:web:12536e63816f0c3cb954c7",
  measurementId: "G-FSTFJJVZRE",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);

export const googleProvider = new GoogleAuthProvider();
export const facebookProvider = new FacebookAuthProvider();
export const db = getFirestore(app)
export const storage = getStorage(app)