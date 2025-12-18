import React, { useState, useEffect } from "react";
import UseAxiosSecure from "../../hook/UseAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import UseAuth from "../../hook/UseAuth";
import Swal from "sweetalert2";
import { useSearchParams } from "react-router-dom";

const AllRequest = () => {
  const axiosSecure = UseAxiosSecure();
  const { user } = UseAuth();
  const [searchParams, setSearchParams] = useSearchParams();

  // Pagination Initialization
  const initialPage = parseInt(searchParams.get("page")) || 1;
  const initialLimit = parseInt(searchParams.get("limit")) || 10;
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [itemsPerPage, setItemsPerPage] = useState(initialLimit);

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
  console.log(requests);
  // Sync URL with pagination state
  useEffect(() => {
    setSearchParams({ page: currentPage, limit: itemsPerPage });
  }, [currentPage, itemsPerPage, setSearchParams]);

  // Pagination Logic
  const totalItems = requests.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  // Fallback to empty array if requests is not array yet
  const safeRequests = Array.isArray(requests) ? requests : [];
  const currentRequests = safeRequests.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handleLimitChange = (e) => {
    setItemsPerPage(Number(e.target.value));
    setCurrentPage(1);
  };

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
      productImage: request.productImage,
      requestDate: request.requestDate,
      assetName: request.assetName,
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

  return (
    <div>
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
            {currentRequests.map((req, index) => (
              <tr key={req._id} className="hover:bg-gray-100">
                <td className="p-4">{startIndex + index + 1}</td>
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

      {/* Pagination Controls */}
      <div className="flex justify-center items-center mt-6 gap-4">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="btn btn-sm btn-outline"
        >
          Previous
        </button>

        <div className="join">
          {[...Array(totalPages)].map((_, index) => (
            <button
              key={index}
              onClick={() => handlePageChange(index + 1)}
              className={`join-item btn btn-sm ${
                currentPage === index + 1 ? "btn-active" : ""
              }`}
            >
              {index + 1}
            </button>
          ))}
        </div>

        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="btn btn-sm btn-outline"
        >
          Next
        </button>

        <select
          value={itemsPerPage}
          onChange={handleLimitChange}
          className="select select-bordered select-sm"
        >
          <option value="5">5 per page</option>
          <option value="10">10 per page</option>
          <option value="20">20 per page</option>
          <option value="50">50 per page</option>
        </select>
      </div>
    </div>
  );
};

export default AllRequest;
