import React from "react";
import UseAuth from "../hook/UseAuth";
import UseRole from "../hook/UseRole";
import { useNavigate } from "react-router";
import ForbiddenAccessPage from "./ForbiddenAccessPage";

const HrRoute = ({children}) => {
  
  const { roleLoading, userRole } = UseRole();
  const navigate = useNavigate();
  if (roleLoading) {
    return <h1>data Loading.....</h1>;
  }

  if(userRole !== "HR Manager" ){
     return <ForbiddenAccessPage></ForbiddenAccessPage>
  }
  return children;
};

export default HrRoute;
