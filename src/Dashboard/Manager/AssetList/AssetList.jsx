import { useQuery } from "@tanstack/react-query";
import React from "react";
import UseAxiosSecure from "../../../hook/UseAxiosSecure";
import { motion } from "framer-motion";
import { FaLaptop, FaEdit, FaTrashAlt, FaCalendarAlt, FaSpinner } from "react-icons/fa"; // Added icons
import moment from "moment"; // Assuming moment or a similar library for date formatting
import Logo from "../../../Page/Home/Navbar/Logo";

const AssetList = () => {
  const axiosSecure = UseAxiosSecure();
  // Renamed 'asstes' to 'assets' for better clarity and corrected the refetch placement
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
  console.log(assets);
  // Framer Motion variants for staggered entry
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  };

  // --- Rendering States ---

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64 bg-base-100 rounded-xl shadow-lg">
        <FaSpinner className="animate-spin text-primary text-4xl mr-3" />
        <p className="text-xl font-semibold text-gray-600">Loading Assets...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="p-8 bg-error/10 border border-error text-error rounded-xl shadow-lg">
        <h2 className="text-2xl font-bold mb-2">Error</h2>
        <p>Could not fetch assets. Please try again. Error: {error.message}</p>
        <button onClick={() => refetch()} className="btn btn-sm btn-error mt-4">
          Retry
        </button>
      </div>
    );
  }

  if (assets.length === 0) {
    return (
      <div className="p-10 bg-info/10 border border-info text-info-content rounded-xl shadow-lg text-center">
        <FaLaptop className="text-5xl mx-auto mb-4" />
        <h2 className="text-2xl font-bold mb-2">No Assets Found</h2>
        <p>It looks like there are no assets available at the moment.</p>
      </div>
    );
  }

  // --- Main Component Render ---

  return (
    <div className="p-6 bg-base-100 rounded-2xl shadow-2xl">
      <h2 className="text-3xl font-extrabold mb-6 text-teal-500 flex items-center">
        <Logo className="mr-3" /> Asset Inventory
      </h2>
      <div className="overflow-x-auto rounded-xl border border-base-200">
        <motion.table
          className="table w-full table-zebra"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* head */}
          <thead className="bg-primary text-primary-content sticky top-0 shadow-md">
            <tr>
              <th className="py-4 text-center">#</th>
              <th className="py-4">Product Info</th>
              <th className="py-4">
                <FaCalendarAlt className="inline mr-1" /> Date Added
              </th>
              <th className="py-4">Type</th>
              <th className="py-4 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {assets.map((asset, index) => (
              <motion.tr
                key={asset.id || index} // Use a unique ID if available
                className="hover:bg-base-200 transition-colors duration-200 group"
                variants={itemVariants}
              >
                <th className="text-center font-bold text-lg text-primary">{index + 1}</th>
                <td>
                  <div className="flex items-center gap-4">
                    <div className="avatar">
                      <div className="mask mask-squircle h-14 w-14 border-2 border-primary/50 transition-transform group-hover:scale-105">
                        <img
                          src={asset?.productImage}
                          alt={`${asset?.productName} image`}
                          className="object-cover"
                        />
                      </div>
                    </div>
                    <div>
                      <div className="font-extrabold text-lg text-neutral-content transition-colors group-hover:text-primary">
                        {asset?.productName}
                      </div>
                      <div className="text-sm opacity-70 text-gray-500">
                        {asset?.email}
                      </div>
                    </div>
                  </div>
                </td>
                <td>
                  <span className="text-sm font-medium text-gray-600">
                    {/* Format the date for a better look */}
                    {moment(asset.dataAdded).format("MMM D, YYYY")} 
                  </span>
                </td>
                <td>
                  <span className="badge badge-lg badge-outline badge-secondary font-semibold transition-all group-hover:badge-secondary/80">
                    {asset?.productType}
                  </span>
                </td>
                <td className="text-center space-x-3.5">
                  <motion.button
                    className="btn btn-sm btn-info text-info-content hover:bg-info/90 border-0 shadow-md hover:shadow-lg transition-all"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <FaEdit />
                    Details
                  </motion.button>
                  <motion.button
                    className="btn btn-sm btn-error text-error-content hover:bg-error/90 border-0 shadow-md hover:shadow-lg transition-all"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <FaTrashAlt />
                    Remove
                  </motion.button>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </motion.table>
      </div>
    </div>
  );
};

export default AssetList;