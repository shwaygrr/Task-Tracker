// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, collection } from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyDzYUC_kbQv21xqyWgm-flHj8qJQN7WurQ",
  authDomain: "task-tracker-5bc58.firebaseapp.com",
  projectId: "task-tracker-5bc58",
  storageBucket: "task-tracker-5bc58.appspot.com",
  messagingSenderId: "1073677956263",
  appId: "1:1073677956263:web:5e0e7a3804d96d12f79782",
  measurementId: "G-GD2TDKH4T3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app)
export const tasksCollection = collection(db, "tasks")
