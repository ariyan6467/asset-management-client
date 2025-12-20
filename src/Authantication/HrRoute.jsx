import React from "react";
import UseAuth from "../hook/UseAuth";
import UseRole from "../hook/UseRole";
import { useNavigate } from "react-router";
import ForbiddenAccessPage from "./ForbiddenAccessPage";
import Loader from "./Loader";

const HrRoute = ({children}) => {
  
  const { roleLoading, userRole } = UseRole();
  const navigate = useNavigate();
  if (roleLoading) {
    return <Loader></Loader>;
  }

  if(userRole !== "HR Manager" ){
     return <ForbiddenAccessPage></ForbiddenAccessPage>
  }
  return children;
};

export default HrRoute;
