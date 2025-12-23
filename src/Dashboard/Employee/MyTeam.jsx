import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import UseAxiosSecure from "../../hook/UseAxiosSecure";
import MyTeamCard from "./MyTeamCard";

const MyTeam = () => {
  const axiosSecure = UseAxiosSecure();
  const [searchParams, setSearchParams] = useSearchParams();
  
  // State for company filter (default: 'all' to show all cards)
  const [selectedCompany, setSelectedCompany] = useState('all');

  // Read pagination info from URL (with defaults)
  const pageFromUrl = parseInt(searchParams.get('page') || '1', 10);
  const limitFromUrl = parseInt(searchParams.get('limit') || '10', 10);

  const currentPage = Number.isNaN(pageFromUrl) || pageFromUrl < 1 ? 1 : pageFromUrl;
  const pageSize = Number.isNaN(limitFromUrl) || limitFromUrl < 1 ? 10 : limitFromUrl;

  const { data: myTeam = [], isLoading } = useQuery({
    queryKey: ["my-team"],
    queryFn: async () => {
      const result = await axiosSecure.get("/my-team");
      return result.data;
    },
  });

  // Get unique company names
  const companyNames = [...new Set(myTeam.map((team) => team.companyName).filter(Boolean))];

  // Filter team members by selected company
  const filteredTeam = myTeam.filter((teamMember) => {
    if (selectedCompany === 'all') {
      return true;
    }
    return teamMember.companyName === selectedCompany;
  });

  // Total pages based on filtered team
  const totalPages = Math.max(1, Math.ceil(filteredTeam.length / pageSize));

  // Ensure page in URL is within valid range whenever data/filter changes
  useEffect(() => {
    if (currentPage > totalPages && totalPages > 0) {
      const params = new URLSearchParams(searchParams);
      params.set('page', String(totalPages));
      params.set('limit', String(pageSize));
      setSearchParams(params);
    }
  }, [currentPage, totalPages, pageSize, searchParams, setSearchParams]);

  // Slice team members for current page
  const startIndex = (currentPage - 1) * pageSize;
  const paginatedTeam = filteredTeam.slice(startIndex, startIndex + pageSize);

  const handleChangePage = (page) => {
    const nextPage = Math.min(Math.max(page, 1), totalPages);
    const params = new URLSearchParams(searchParams);
    params.set('page', String(nextPage));
    params.set('limit', String(pageSize));
    setSearchParams(params);
  };

  const handleChangePageSize = (newLimit) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', '1'); // reset to first page on page-size change
    params.set('limit', String(newLimit));
    setSearchParams(params);
  };

  const handleCompanyFilter = (companyName) => {
    setSelectedCompany(companyName);
    // Reset to first page when filter changes
    const params = new URLSearchParams(searchParams);
    params.set('page', '1');
    params.set('limit', String(pageSize));
    setSearchParams(params);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-lg text-slate-600">Loading team members...</p>
        </div>
      </div>
    );
  }
console.log(filteredTeam);
  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3 border-b border-slate-200 pb-4">
          <div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900">My Team</h1>
            <p className="mt-1 text-sm text-slate-500">
              All team members in your organization.
            </p>
          </div>
          <div className="flex flex-col items-start sm:items-end gap-2">
            <p className="text-xs sm:text-sm text-slate-400">
              Total items: <span className="font-semibold text-slate-600">{filteredTeam.length}</span>
            </p>

           
          </div>
        </div>

        {/* Filter Dropdown */}
        <div className="mt-6 flex justify-between">
          <details className="dropdown">
            <summary className="btn m-1 capitalize">
              {selectedCompany === 'all' ? 'All Companies' : selectedCompany}
            </summary>
            <ul className="menu dropdown-content bg-base-100 rounded-box z-[1] w-52 p-2 shadow-lg">
              <li>
                <button onClick={() => handleCompanyFilter('all')}>
                  All Companies
                </button>
              </li>
              {companyNames.map((name, index) => (
                <li key={index}>
                  <button onClick={() => handleCompanyFilter(name)}>
                    {name}
                  </button>
                </li>
              ))}
            </ul>
          </details>

          {/* Page size selector */}
            <div className="flex items-center gap-2 text-xs sm:text-sm">
              <span className="text-slate-500">Items per page:</span>
              <select
                className="select select-xs sm:select-sm select-bordered"
                value={pageSize}
                onChange={(e) => handleChangePageSize(Number(e.target.value))}
              >
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={20}>20</option>
                <option value={50}>50</option>
              </select>
            </div>


        </div>

        {/* Team Cards Grid */}
        <div className="mt-8">
          {filteredTeam.length === 0 ? (
            <div className="flex items-center justify-center py-16">
              <p className="text-sm sm:text-base text-slate-500 text-center">
                No team members found{selectedCompany !== 'all' ? ` for ${selectedCompany}` : ''}.
              </p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
                {paginatedTeam.map((teamMember) => (
                  <MyTeamCard key={teamMember._id} teamMember={teamMember} />
                ))}
              </div>

              {/* Pagination controls */}
              <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
                <p className="text-xs sm:text-sm text-slate-500">
                  Showing{' '}
                  <span className="font-semibold text-slate-700">
                    {filteredTeam.length === 0 ? 0 : startIndex + 1}-
                    {Math.min(startIndex + pageSize, filteredTeam.length)}
                  </span>{' '}
                  of <span className="font-semibold text-slate-700">{filteredTeam.length}</span> items
                </p>

                <div className="flex items-center gap-2">
                  <button
                    className="btn btn-xs sm:btn-sm"
                    disabled={currentPage === 1}
                    onClick={() => handleChangePage(currentPage - 1)}
                  >
                    Previous
                  </button>

                  <div className="join">
                    {Array.from({ length: totalPages }, (_, idx) => {
                      const page = idx + 1;
                      return (
                        <button
                          key={page}
                          className={`join-item btn btn-xs sm:btn-sm ${
                            page === currentPage ? 'btn-active btn-primary' : ''
                          }`}
                          onClick={() => handleChangePage(page)}
                        >
                          {page}
                        </button>
                      );
                    })}
                  </div>

                  <button
                    className="btn btn-xs sm:btn-sm"
                    disabled={currentPage === totalPages}
                    onClick={() => handleChangePage(currentPage + 1)}
                  >
                    Next
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyTeam;
