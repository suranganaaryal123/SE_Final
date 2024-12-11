import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';

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

export { auth, googleProvider, signInWithPopup, signOut }; // Export necessary methods
