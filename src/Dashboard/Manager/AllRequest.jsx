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

  // Sync URL with pagination state
  useEffect(() => {
    setSearchParams({ page: currentPage, limit: itemsPerPage });
  }, [currentPage, itemsPerPage, setSearchParams]);

  // Pagination Logic
  const totalItems = requests.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
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
    <div className="container mx-auto px-2">
      <div className="overflow-x-auto bg-white rounded-lg shadow-lg border border-gray-200">
        <table className="table w-full">
          {/* head */}
          <thead className="bg-gray-800 text-white">
            <tr>
              {/* Hide Index on mobile */}
              <th className="p-4 hidden md:table-cell">#</th>
              <th className="p-4">Employee & Asset</th>
              {/* Hide Asset & Status columns on mobile (info moved to col 1) */}
              <th className="p-4 hidden md:table-cell">Asset Details</th>
              <th className="p-4 hidden md:table-cell">Status</th>
              <th className="p-4 text-center">Action</th>
            </tr>
          </thead>
          <tbody className="text-gray-700">
            {currentRequests.map((req, index) => (
              <tr key={req._id} className="hover:bg-gray-50 border-b">
                {/* Index: Hidden on mobile */}
                <td className="p-4 hidden md:table-cell">
                  {startIndex + index + 1}
                </td>

                {/* Employee Info + Mobile View Details */}
                <td className="p-4">
                  <div className="flex items-center gap-3">
                    
                    <div className="flex flex-col">
                      <div className="font-bold text-gray-800">
                        {req.requesterName}
                      </div>
                      <div className="text-xs text-gray-500">
                        {req.requesterEmail}
                      </div>

                      {/* --- MOBILE ONLY VIEW --- */}
                      {/* This block is visible only on small screens to show asset info */}
                      <div className="md:hidden mt-2 pt-2 border-t border-gray-100">
                         <p className="text-sm font-semibold text-gray-700">Request: {req.assetName}</p>
                         <div className="flex gap-2 mt-1">
                            <span className="badge badge-xs bg-teal-100 text-teal-600 border-none">{req.assetType}</span>
                            <span className={`badge badge-xs border-none ${
                                req.requestStatus === "approved"
                                  ? "bg-green-100 text-green-600"
                                  : req.requestStatus === "rejected"
                                  ? "bg-red-100 text-red-600"
                                  : "bg-yellow-100 text-yellow-600"
                              }`}>
                              {req.requestStatus}
                            </span>
                         </div>
                      </div>
                      {/* ------------------------- */}
                    </div>
                  </div>
                </td>

                {/* Asset Details: Hidden on mobile */}
                <td className="p-4 hidden md:table-cell">
                  <div className="font-medium">{req.assetName}</div>
                  <span className="badge badge-ghost badge-sm bg-teal-50 text-teal-600 mt-1">
                    {req.assetType}
                  </span>
                </td>

                {/* Status: Hidden on mobile */}
                <td className="p-4 hidden md:table-cell">
                  <span
                    className={`badge border-none px-3 py-1 ${
                      req.requestStatus === "approved"
                        ? "bg-green-100 text-green-600"
                        : req.requestStatus === "rejected"
                        ? "bg-red-100 text-red-600"
                        : "bg-yellow-100 text-yellow-600"
                    }`}
                  >
                    {req.requestStatus}
                  </span>
                </td>

                {/* Action Buttons: Visible always, stacked on mobile */}
                <td className="p-4">
                  <div className="flex flex-col md:flex-row gap-2 justify-center items-center">
                    <button
                      onClick={() => handleApproval(req)}
                      disabled={req.requestStatus === "approved"}
                      className={`btn btn-sm w-full md:w-auto ${
                        req.requestStatus === "approved"
                          ? "btn-disabled bg-gray-200 text-gray-400"
                          : "bg-green-500 hover:bg-green-600 text-white border-none"
                      }`}
                    >
                      Approve
                    </button>

                    <button
                      onClick={() => handleRejection(req)}
                      disabled={req.requestStatus === "rejected"}
                      className={`btn btn-sm w-full md:w-auto ${
                        req.requestStatus === "rejected"
                          ? "btn-disabled bg-gray-200 text-gray-400"
                          : "bg-red-500 hover:bg-red-600 text-white border-none"
                      }`}
                    >
                      Reject
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls - Made Responsive */}
      <div className="flex flex-col md:flex-row justify-center items-center mt-6 gap-4 mb-10">
        <div className="join grid grid-cols-2">
            <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="join-item btn btn-sm btn-outline"
            >
            Previous
            </button>
            <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="join-item btn btn-sm btn-outline"
            >
            Next
            </button>
        </div>

        <div className="join hidden sm:flex">
          {[...Array(totalPages)].map((_, index) => (
            <button
              key={index}
              onClick={() => handlePageChange(index + 1)}
              className={`join-item btn btn-sm ${
                currentPage === index + 1 ? "btn-active bg-gray-800 text-white" : ""
              }`}
            >
              {index + 1}
            </button>
          ))}
        </div>

        <select
          value={itemsPerPage}
          onChange={handleLimitChange}
          className="select select-bordered select-sm w-full md:w-auto"
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