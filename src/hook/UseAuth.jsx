import React, { useContext } from "react";
import { AuthContext } from "../Authantication/Authprovider";

const UseAuth = () => {
  const authInfo = useContext(AuthContext);
  return authInfo || {
      user: null,
      loading: true,
      packagePrice:0,
      handleRegister: () => {},
      handleSignIn: () => {},
      handleLogeOut: () => {},
      InsertInfo: () => {},
    
     setPackagePrice: () => {},
      handleGoogleSignIn: () => {},
      handleGoogleSignUp: () => {},
      setuser: () => {},
    };
 
};

export default UseAuth;
 