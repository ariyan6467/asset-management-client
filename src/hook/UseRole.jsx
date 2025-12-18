import React from "react";
import UseAuth from "./UseAuth";
import UseAxiosSecure from "./UseAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const UseRole = () => {
  const { user } = UseAuth();
  const axiosSecure = UseAxiosSecure();
  const { data: userRole, isLoading: roleLoading } = useQuery({
    queryKey: ["user-role", user?.email],
    queryFn: async () => {
      const result = await axiosSecure.get(`/user-role/${user?.email}/role`);

      return result.data.role;
    },
  });
  console.log(userRole);
  return {
    roleLoading,
    userRole,
  };
};

export default UseRole;
