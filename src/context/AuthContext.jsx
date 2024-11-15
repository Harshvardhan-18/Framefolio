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

//   // Signup function
//   function signup(email, password) {
//     return createUserWithEmailAndPassword(auth, email, password);
//   }

//   // Login function
//   function login(email, password) {
//     return signInWithEmailAndPassword(auth, email, password);
//   }

//   // Logout function
//   function logout() {
//     return signOut(auth);
//   }

  // Effect to check for current user on mount
//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, (user) => {
//       setCurrentUser(user); // Set the current user
//       setLoading(false);    // Loading complete
//     });

//     // Cleanup subscription on unmount
//     return unsubscribe;
//   }, [auth]);
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
//   // Context value
//   const value = {
//     currentUser,
//     login,
//     signup,
//     logout,
//     isLoggedIn: !!currentUser // Boolean indicating if a user is logged in
//   };

  // Render children when loading is done
  return (
    <AuthContext.Provider value={value}>
      {loading ? <Spinner/> : children} 
    </AuthContext.Provider>
  );
}
