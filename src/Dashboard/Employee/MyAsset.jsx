import React, { useEffect, useState } from 'react';
import UseAuth from '../../hook/UseAuth';
import { useQuery } from '@tanstack/react-query';
import UseAxiosSecure from '../../hook/UseAxiosSecure';
import AssetCard from './MyAssetCard';
import { useSearchParams } from 'react-router-dom';

const MyAsset = () => {
  const { user } = UseAuth();
  const axiosSecure = UseAxiosSecure();
  const [searchParams, setSearchParams] = useSearchParams();
  
  // State for filter and search term
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Read pagination info from URL (with defaults)
  const pageFromUrl = parseInt(searchParams.get('page') || '1', 10);
  const limitFromUrl = parseInt(searchParams.get('limit') || '10', 10);

  const currentPage = Number.isNaN(pageFromUrl) || pageFromUrl < 1 ? 1 : pageFromUrl;
  const pageSize = Number.isNaN(limitFromUrl) || limitFromUrl < 1 ? 10 : limitFromUrl;

  const { data: userAssets = [], isLoading } = useQuery({
    queryKey: ['user-assets', user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const result = await axiosSecure.get(`/assigned-asset/${user?.email}`);
      return result.data;
    },
  });

  // Derive the filtered and searched list based on the current state
  const filteredAssets = userAssets.filter(asset => {
    // Filter by asset type
    const matchesType = filter === 'all' || asset.assetType === filter;
    
    // If the search term is empty, show all assets (including null assetName)
    const matchesSearch = searchTerm === '' || (asset.assetName && asset.assetName.toLowerCase().includes(searchTerm.toLowerCase()));

    return matchesType && matchesSearch;
  });

  // Total pages based on filtered assets
  const totalPages = Math.max(1, Math.ceil(filteredAssets.length / pageSize));

  // Ensure page in URL is within valid range whenever data/filter/search changes
  useEffect(() => {
    if (currentPage > totalPages) {
      const params = new URLSearchParams(searchParams);
      params.set('page', String(totalPages));
      params.set('limit', String(pageSize));
      setSearchParams(params);
    }
  }, [currentPage, totalPages, pageSize, searchParams, setSearchParams]);

  // Slice assets for current page
  const startIndex = (currentPage - 1) * pageSize;
  const paginatedAssets = filteredAssets.slice(startIndex, startIndex + pageSize);

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

  if (isLoading) return <div className="p-10 text-center">Loading assets...</div>;

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3 border-b border-slate-200 pb-4">
          <div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900">My Assets</h1>
            <p className="mt-1 text-sm text-slate-500">
              All assets currently assigned to you.
            </p>
          </div>
          <div className="flex flex-col items-start sm:items-end gap-2">
            <p className="text-xs sm:text-sm text-slate-400">
              Total items: <span className="font-semibold text-slate-600">{filteredAssets.length}</span>
            </p>

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
              </select>
            </div>
          </div>
        </div>

       <div className='flex justify-between'>
          {/* Filter Dropdown */}
        <div className="dropdown mt-4">
          <div tabIndex={0} role="button" className="btn m-1 capitalize">
            Filter: {filter}
          </div>
          <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
            <li><button onClick={() => setFilter('all')}>All Assets</button></li>
            <li><button onClick={() => setFilter('returnable')}>Returnable</button></li>
            <li><button onClick={() => setFilter('non-returnable')}>Non-returnable</button></li>
          </ul>
        </div>

        {/* Search Bar */}
        <input 
          type="text" 
          className="input mt-4" 
          placeholder="Search by asset name..." 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)} 
        />

       </div>
        <div className="mt-8">
          {filteredAssets.length === 0 ? (
            <div className="flex items-center justify-center py-16">
              <p className="text-sm sm:text-base text-slate-500 text-center">
                No {filter !== 'all' ? filter : ''} assets found.
              </p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                {paginatedAssets.map((asset) => (
                  <AssetCard key={asset._id || asset.assetId} asset={asset} />
                ))}
              </div>

              {/* Pagination controls */}
              <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
                <p className="text-xs sm:text-sm text-slate-500">
                  Showing{' '}
                  <span className="font-semibold text-slate-700">
                    {filteredAssets.length === 0 ? 0 : startIndex + 1}-
                    {Math.min(startIndex + pageSize, filteredAssets.length)}
                  </span>{' '}
                  of <span className="font-semibold text-slate-700">{filteredAssets.length}</span> items
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

export default MyAsset;
