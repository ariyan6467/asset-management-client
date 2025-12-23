import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react"; // Added useState
import UseAxiosSecure from "../../../hook/UseAxiosSecure";
import { motion } from "framer-motion";
import { FaLaptop, FaEdit, FaTrashAlt, FaCalendarAlt, FaSpinner, FaBoxes, FaSearch } from "react-icons/fa"; 
import moment from "moment";
import Logo from "../../../Page/Home/Navbar/Logo";
import UseAuth from "../../../hook/UseAuth";

const AssetList = () => {
  const { user } = UseAuth();
  const axiosSecure = UseAxiosSecure();
  
  // 1. State for the search text
  const [searchTerm, setSearchTerm] = useState("");

  const {
    isLoading,
    isError,
    data: assets = [],
    error,
    refetch,
  } = useQuery({
    queryKey: ["all-assets"],
    queryFn: async () => {
      const result = await axiosSecure.get("/asset-list");
      return result.data;
    },
  });

  // 2. Logic to filter assets based on Product Name or Type
  const filteredAssets = assets.filter((asset) =>
    asset.productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    asset.productType.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.05 } },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  };

  if (isLoading) {
    return (
      <div className="flex flex-col justify-center items-center h-64 bg-base-100 rounded-xl shadow-lg">
        <FaSpinner className="animate-spin text-primary text-4xl mb-4" />
        <p className="text-lg font-semibold text-gray-600">Loading Assets...</p>
      </div>
    );
  }
 console.log(assets);
  return (
    <div className="p-2 sm:p-6 bg-base-100 rounded-2xl shadow-2xl min-h-screen">
      {/* --- Responsive Header & Search Bar --- */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8 gap-4">
        <h2 className="text-2xl md:text-3xl font-extrabold text-teal-500 flex items-center">
          <Logo className="mr-3 scale-90 md:scale-100" /> 
          <span>Asset Inventory</span>
        </h2>

        <div className="relative w-full lg:max-w-md">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <FaSearch className="text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search by name or type..."
            className="input input-bordered w-full pl-10 focus:border-teal-500 focus:ring-2 focus:ring-teal-200 transition-all rounded-full"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* --- Table Section --- */}
      <div className="overflow-x-auto rounded-xl border border-base-200">
        <motion.table
          className="table w-full table-zebra"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <thead className="bg-primary text-primary-content sticky top-0">
            <tr>
              <th className="py-4 text-center hidden sm:table-cell">#</th>
              <th className="py-4">Product Info</th>
              <th className="py-4 hidden lg:table-cell">Date Added</th>
              <th className="py-4 hidden md:table-cell">Type</th>
              <th className="py-4 text-center">Qty</th>
              <th className="py-4 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredAssets.length > 0 ? (
              filteredAssets.map((asset, index) => (
                <motion.tr
                  key={asset._id || index}
                  className="hover:bg-base-200 transition-colors group"
                  variants={itemVariants}
                >
                  <th className="text-center font-bold text-primary hidden sm:table-cell">
                    {index + 1}
                  </th>
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="avatar">
                        <div className="mask mask-squircle h-12 w-12 border border-primary/20">
                          <img src={asset?.productImage} alt="asset" />
                        </div>
                      </div>
                      <div>
                        <div className="font-bold text-sm md:text-base">{asset?.productName}</div>
                        <div className="text-xs opacity-50 hidden sm:block">{asset?.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="hidden lg:table-cell">
                    <span className="text-sm">{moment(asset.dataAdded).format("ll")}</span>
                  </td>
                  <td className="hidden md:table-cell">
                    <span className="badge badge-sm badge-outline">{asset?.productType}</span>
                  </td>
                  <td className="text-center font-bold">{asset?.availableQuantity || 0}</td>
                  <td className="text-center">
                    <div className="flex flex-col lg:flex-row gap-2 justify-center">
                      <button className="btn btn-xs btn-info"><FaEdit /></button>
                      <button className="btn btn-xs btn-error"><FaTrashAlt /></button>
                    </div>
                  </td>
                </motion.tr>
              ))
            ) : (
              /* --- Empty Search State --- */
              <tr>
                <td colSpan="6" className="text-center py-20">
                  <div className="flex flex-col items-center opacity-40">
                    <FaSearch className="text-6xl mb-4" />
                    <p className="text-xl font-semibold">No assets match "{searchTerm}"</p>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </motion.table>
      </div>
    </div>
  );
};

export default AssetList;