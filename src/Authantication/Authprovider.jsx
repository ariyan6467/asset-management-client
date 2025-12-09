import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut, updateProfile, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import React, { createContext, useEffect, useState } from 'react';
import { auth } from '../firebase/firebase.config';



export const AuthContext = createContext(null);

const Authprovider = ({children}) => {
const [user,setuser] = useState(null);
 const [loading,setLoading] = useState(true);
 const [packagePrice,setPackagePrice] = useState(0)
    function handleRegister(email,password){
    return createUserWithEmailAndPassword(auth,email,password)
    
    }



   function handleSignIn(email,password){
    return signInWithEmailAndPassword(auth,email,password)
   }

   function handleGoogleSignIn(){
    const googleProvider = new GoogleAuthProvider();
    return signInWithPopup(auth, googleProvider);
   }

   function handleGoogleSignUp(){
    const googleProvider = new GoogleAuthProvider();
    return signInWithPopup(auth, googleProvider);
   }

    function handleLogeOut(){
        return signOut(auth);
    }

//Observe User State
useEffect(()=>{
    const unSubscribe = onAuthStateChanged(auth,(currentUser)=>{
          setuser(currentUser);
          setLoading(false);
    })
    return () => {
        unSubscribe();
    }
},[])

function InsertInfo(profile){
    return updateProfile(auth.currentUser,profile)
}

const authInfo = {
   handleRegister,
   InsertInfo,
   user,setuser,
   handleLogeOut,
  handleSignIn,
  handleGoogleSignIn,
  handleGoogleSignUp,
  packagePrice,setPackagePrice
}
    return (
        <AuthContext.Provider value={authInfo}>
              {children}
        </AuthContext.Provider>
    );
};

export default Authprovider;