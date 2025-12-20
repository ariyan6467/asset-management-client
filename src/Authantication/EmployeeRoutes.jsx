import React, { Children } from 'react';
import UseRole from '../hook/UseRole';
import { useNavigate } from 'react-router';
import Loader from './Loader';
import ForbiddenAccessPage from './ForbiddenAccessPage';

const EmployeeRoutes = ({children}) => {
    const { roleLoading, userRole } = UseRole();
  const navigate = useNavigate();

  if (roleLoading) {
    return <Loader></Loader>;
  }

  if(userRole !== "Employee" ){
     return <ForbiddenAccessPage></ForbiddenAccessPage>
  }

    return children;
};

export default EmployeeRoutes;