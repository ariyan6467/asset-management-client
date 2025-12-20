import { useQuery } from "@tanstack/react-query";
import React from "react";
import UseAxiosSecure from "../../hook/UseAxiosSecure";
import UseAuth from "../../hook/UseAuth";
import MyEmployeeCard from "./MyEmployeeCards";

const MyEmployee = () => {
  const { user } = UseAuth();
  console.log(user.email);
  const axiosSecure = UseAxiosSecure();
  const { data: employees = [], refetch } = useQuery({
    queryKey: ["my-employees"],
    queryFn: async () => {
      const result = await axiosSecure.get(`/employee/${user?.email}`);
      return result.data;
    },
  });

  return (
    <div className="text-center p-5">
      <h1 className="text-4xl font-bold mb-6">Employee Count: {employees.length}</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {employees.map((employee) => (
          <MyEmployeeCard key={employee._id} employee={employee} />
        ))}
      </div>
    </div>
  );
};

export default MyEmployee;
