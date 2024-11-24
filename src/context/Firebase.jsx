// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_APIKEY,
  authDomain: "fir-project-1675e.firebaseapp.com",
  projectId: "fir-project-1675e",
  storageBucket: "fir-project-1675e.appspot.com",
  messagingSenderId: "147227258657",
  appId: "1:147227258657:web:97d98412481a1dfa4f5860"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage=getStorage(app);
export { auth, app, db ,storage};
