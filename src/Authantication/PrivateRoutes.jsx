import React, { Children} from 'react';

import { Navigate, useLocation } from 'react-router';
import UseAuth from '../hook/UseAuth';
import Loader from './Loader';

const PrivateRoutes = ({children}) => {
   const {user,loading} = UseAuth();
    const location = useLocation();
    console.log(location,user);
   
    if(loading == true){
        return <Loader></Loader>
    }

    if(user == null){
        return <Navigate state={location.pathname} to="/normal-login"></Navigate>
    }else{
        return children
    }
};

export default PrivateRoutes;