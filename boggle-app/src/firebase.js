import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';
import { getFirestore, collection, addDoc, query, orderBy, limit, getDocs } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyBj3zrq4w1svw-i35j0-ITyN2hVfWi-EBY",
    authDomain: "riddle-game-ee264.firebaseapp.com",
    projectId: "riddle-game-ee264",
    storageBucket: "riddle-game-ee264.firebasestorage.app",
    messagingSenderId: "198497248973",
    appId: "1:198497248973:web:4d63dd827240da5fc9ab84"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app); // Get auth instance
const googleProvider = new GoogleAuthProvider(); // Create Google Auth provider
const db = getFirestore(app); // Get Firestore instance

export { auth, googleProvider, signInWithPopup, signOut, db, collection, addDoc, query, orderBy, limit, getDocs }; // Export necessary methods
