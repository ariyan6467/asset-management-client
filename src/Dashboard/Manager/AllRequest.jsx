import React from "react";
import UseAxiosSecure from "../../hook/UseAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const AllRequest = () => {
  const axiosSecure = UseAxiosSecure();

  const {
    isLoading,
    isError,
    data: requests = [],
    error,
    refetch,
  } = useQuery({
    queryKey: ["all-request"],
    queryFn: async () => {
      const result = await axiosSecure.get("/all-request");
      return result.data;
    },
  });
  console.log(requests);
  return (
    <div className="overflow-x-auto">
      <table className="table">
        {/* head */}
        <thead>
          <tr>
            <th></th>
            <th>Employee-Name</th>
            <th>Asset</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {/* row 1 */}
          {requests.map((req, index) => (
            <tr>
              <th>{index + 1}</th>
              <td>
                <div className="flex items-center gap-3">
                  <div className="avatar"></div>
                  <div>
                    <div className="font-bold">{req.requesterName}</div>
                    <div className="text-sm opacity-50">
                      {req.requesterEmail}
                    </div>
                  </div>
                </div>
              </td>
              <td>
                {req.assetName}
                <br />
                <span className="badge badge-ghost badge-sm">
                  {req.assetType}
                </span>
              </td>
              <td>{req.requestStatus}</td>
              <th className="space-x-5">
                <button className="btn btn-success">Approve</button>
                <button className="btn btn-error">Reject</button>
               
              </th>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AllRequest;
