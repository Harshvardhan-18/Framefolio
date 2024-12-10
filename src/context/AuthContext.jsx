import React, { createContext, useState, useContext, useEffect } from 'react';
import { getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut, createUserWithEmailAndPassword } from "firebase/auth";
import { app,auth } from "../context/Firebase"; // Adjust path if necessary
import Spinner from '../components/Loading';

const AuthContext = React.createContext();
 
// Custom hook to access the AuthContext
export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userLoggeddIn,setUserLoggedIn]=useState(false); 

    useEffect(()=>{
        const unsubscribe = onAuthStateChanged(auth,initializeUser);
        return unsubscribe;

    },[])

    async function initializeUser(user){
        if(user){
            setCurrentUser({...user});
            setUserLoggedIn(true);
        } else {
            setCurrentUser(null);
            setUserLoggedIn(false);
        }
        setLoading(false);
    }

    const value={
        currentUser,
        userLoggeddIn,
        loading
    }

  return (
    <AuthContext.Provider value={value}>
      {loading ? <Spinner/> : children} 
    </AuthContext.Provider>
  );
}
