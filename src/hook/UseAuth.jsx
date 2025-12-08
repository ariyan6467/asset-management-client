import React, { useContext } from "react";
import { AuthContext } from "../Authantication/Authprovider";

const UseAuth = () => {
  const authInfo = useContext(AuthContext);
  return authInfo || {
      user: null,
      loading: true,
      handleRegister: () => {},
      handleSignIn: () => {},
      handleLogeOut: () => {},
      InsertInfo: () => {},
      
      handleGoogleSignIn: () => {},
      handleGoogleSignUp: () => {},
      setuser: () => {},
    };
 
};

export default UseAuth;
