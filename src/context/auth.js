import { auth } from "./Firebase"; // Ensure auth is imported correctly
import { getAuth, onAuthStateChanged, signInWithPopup, signInWithEmailAndPassword, signOut, createUserWithEmailAndPassword, GoogleAuthProvider } from "firebase/auth";

// Create user with email and password




// Sign in with Google
export const doSignInWithGoogle = async () => {
  const provider = new GoogleAuthProvider();
  const result = await signInWithPopup(auth, provider);
  return result;
};
