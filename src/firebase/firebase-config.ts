// Import the functions you need from the SDKs you need
import { initializeApp, getApp } from "firebase/app";
import { getDatabase } from "firebase/database";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// Initialize Firebase
let app;

try {
  app = initializeApp(firebaseConfig);
} catch (e: any) {
  if (e.code === 'app/duplicate-app') {
    app = getApp();
  } else {
    console.error('Firebase initialization error', e);
  }
}

// Check if projectId exists before initializing the database
let database;
if (process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID && app) {
  try {
    database = getDatabase(app);
  } catch (error) {
    console.error("Error initializing Firebase Database:", error);
    database = null;
  }
} else {
  console.error("Firebase Project ID is not defined. Please set the NEXT_PUBLIC_FIREBASE_PROJECT_ID environment variable.");
  database = null;
  // Handle the error appropriately, e.g., display a message to the user or disable features that require the database.
}

export { database };
