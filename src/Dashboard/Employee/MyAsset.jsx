import React, { useState } from 'react';
import UseAuth from '../../hook/UseAuth';
import { useQuery } from '@tanstack/react-query';
import UseAxiosSecure from '../../hook/UseAxiosSecure';
import AssetCard from './MyAssetCard';

const MyAsset = () => {
  const { user } = UseAuth();
  const axiosSecure = UseAxiosSecure();
  
  // State for filter and search term
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

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
          <p className="text-xs sm:text-sm text-slate-400">
            Total items shown: <span className="font-semibold text-slate-600">{filteredAssets.length}</span>
          </p>
        </div>

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

        <div className="mt-8">
          {filteredAssets.length === 0 ? (
            <div className="flex items-center justify-center py-16">
              <p className="text-sm sm:text-base text-slate-500 text-center">
                No {filter !== 'all' ? filter : ''} assets found.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {filteredAssets.map((asset) => (
                <AssetCard key={asset._id || asset.assetId} asset={asset} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyAsset;
