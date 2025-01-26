// Import the necessary Firebase SDKs
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, doc, getDoc } from 'firebase/firestore';
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';

// Your Firebase configuration object
const firebaseConfig = {
  apiKey: "AIzaSyAPbk6PBYsKsCm7ScJyidnc2957j8lNkH4",
  authDomain: "careease-6b3cb.firebaseapp.com",
  databaseURL: "https://careease-6b3cb-default-rtdb.firebaseio.com",
  projectId: "careease-6b3cb",
  storageBucket: "careease-6b3cb.firebasestorage.app",
  messagingSenderId: "206986294313",
  appId: "1:206986294313:web:61e2b442dba4b6ffb39838",
  measurementId: "G-04R90Q79CV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore and Authentication
const db = getFirestore(app);
const auth = getAuth(app);  // Initialize Firebase Authentication

// Export necessary Firebase and Firestore functions
export { app, db, auth, collection, addDoc, doc, getDoc, onAuthStateChanged, signInWithEmailAndPassword };
