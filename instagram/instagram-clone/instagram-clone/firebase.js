// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDMblnk5FHlRwFQw6fLlz_RVj5Ym5Q46u8",
  authDomain: "diffusion-368905.firebaseapp.com",
  databaseURL: "https://diffusion-368905-default-rtdb.firebaseio.com",
  projectId: "diffusion-368905",
  storageBucket: "diffusion-368905.appspot.com",
  messagingSenderId: "509845638934",
  appId: "1:509845638934:web:fb7f20ee874dcf18ed4a37",
};

// Initialize Firebase
const app = !getApps()?.length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore();
const storage = getStorage();

export { app, db, storage };
