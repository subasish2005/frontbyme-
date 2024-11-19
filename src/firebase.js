import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Your web app's Firebase configuration
// Replace these values with the ones from your Firebase Console
const firebaseConfig = {
  apiKey: "AIzaSyA0RAx2IkfCn_gZ4vBL7nIXNUYvJFiYs1U",
  authDomain: "blocklearner-10453.firebaseapp.com",
  projectId: "blocklearner-10453",
  storageBucket: "blocklearner-10453.firebasestorage.app",
  messagingSenderId: "574419907918",
  appId: "1:574419907918:web:881cc924696b22d7feda1f",
  measurementId: "G-9GKHC3WC6M"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and Firestore
export const auth = getAuth(app);
export const db = getFirestore(app);

// Export the Firebase app instance
export default app;
