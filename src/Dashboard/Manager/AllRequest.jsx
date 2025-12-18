import React from "react";
import UseAxiosSecure from "../../hook/UseAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import UseAuth from "../../hook/UseAuth";
import Swal from "sweetalert2";

const AllRequest = () => {
  const axiosSecure = UseAxiosSecure();
  const { user } = UseAuth();
  console.log(user);
  const {
    isLoading,
    isError,
    data: requests = [],
    error,
    refetch,
  } = useQuery({
    queryKey: ["all-request", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const result = await axiosSecure.get(`/all-request/${user?.email}`);
      return result.data;
    },
  });

  // Update after approval or rejection
  function handleRequest(request, requestStatus) {
    console.log(request, requestStatus);
    let updateAsset = {
      requestStatus: requestStatus,
      employeeEmail: request.requesterEmail,
      employeeName: request.requesterName,
      hrEmail: request.hrEmail,
      companyName: request.companyName,
      status: "active",
      assetId: request.assetId,
      assetType: request.assetType,
      companyLogo: user.photoURL,
    };
    axiosSecure
      .patch(`/update-request/${request._id}`, updateAsset)
      .then((res) => {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: `Your request has been ${requestStatus}`,
          showConfirmButton: false,
          timer: 1500,
        });
        refetch();
      });
  }

  function handleApproval(request) {
    handleRequest(request, "approved");
  }

  function handleRejection(request) {
    handleRequest(request, "rejected");
  }

  console.log(requests);
  return (
    <div className="overflow-x-auto">
      <table className="table table-striped w-full shadow-lg border rounded-lg">
        {/* head */}
        <thead className="bg-gray-800 text-white">
          <tr>
            <th className="p-4">#</th>
            <th className="p-4">Employee Name</th>
            <th className="p-4">Asset</th>
            <th className="p-4">Status</th>
            <th className="p-4">Action</th>
          </tr>
        </thead>
        <tbody className="text-gray-700">
          {/* row 1 */}
          {Array.isArray(requests) &&
            requests.map((req, index) => (
              <tr key={req._id} className="hover:bg-gray-100">
                <td className="p-4">{index + 1}</td>
                <td className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="avatar">{/* Add avatar image */}</div>
                    <div>
                      <div className="font-semibold">{req.requesterName}</div>
                      <div className="text-sm text-gray-500">
                        {req.requesterEmail}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="p-4">
                  {req.assetName}
                  <br />
                  <span className="badge badge-ghost badge-sm bg-teal-100 text-teal-600">
                    {req.assetType}
                  </span>
                </td>
                <td className="p-4">
                  <span
                    className={`badge ${
                      req.requestStatus === "approved"
                        ? "bg-green-500 text-white"
                        : req.requestStatus === "rejected"
                        ? "bg-red-500 text-white"
                        : "bg-yellow-500 text-white"
                    }`}
                  >
                    {req.requestStatus}
                  </span>
                </td>
                <td className="p-4 space-x-5">
                  <button
                    onClick={() => handleApproval(req)}
                    className={`btn btn-success px-4 py-2 rounded-full bg-green-500 text-white hover:bg-green-600 ${
                      req.requestStatus === "approved"
                        ? "opacity-50 cursor-not-allowed"
                        : ""
                    }`}
                    disabled={req.requestStatus === "approved"}
                  >
                    Approve
                  </button>

                  <button
                    onClick={() => handleRejection(req)}
                    className={`btn btn-error px-4 py-2 rounded-full bg-red-500 text-white hover:bg-red-600 ${
                      req.requestStatus === "rejected"
                        ? "opacity-50 cursor-not-allowed"
                        : ""
                    }`}
                    disabled={req.requestStatus === "rejected"}
                  >
                    Reject
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default AllRequest;
