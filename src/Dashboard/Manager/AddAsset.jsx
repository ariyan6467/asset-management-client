import React, { useState } from "react";
import { useForm } from "react-hook-form";
import UseAxiosSecure from "../../hook/UseAxiosSecure";
import UseAuth from "../../hook/UseAuth";
import axios from "axios";

const AddAsset = () => {
  const { register, handleSubmit, reset } = useForm();
  const axiosSecure = UseAxiosSecure();
  const { user } = UseAuth();
  const [loading, setLoading] = useState(false);

  const addAsset = async (data) => {
    setLoading(true);
    try {
      // 1. Upload image to imgBB
      const productImageFile = data.productImage?.[0];
      const formData = new FormData();
      formData.append("image", productImageFile);

      const img_Api_Url = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_image_host_key}`;
      
      const imgRes = await axios.post(img_Api_Url, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (imgRes.data.success) {
        // 2. Prepare final object
        const finalAssetData = {
          productName: data.productName,
          productQuantity: parseInt(data.productQuantity),
          availableQuantity: parseInt(data.availableQuantity),
          productType: data.productType,
          companyName: data.companyName,
          email: user?.email,
          productImage: imgRes.data.data.display_url,
          addedDate: new Date().toLocaleDateString(),
        };

        // 3. Post to Database
        const res = await axiosSecure.post("/add-asset", finalAssetData);
        if (res.data.insertedId) {
          alert("Asset added successfully!");
          reset(); // Clear form
        }
      }
    } catch (error) {
      console.error("Error adding asset:", error);
      alert("Failed to add asset. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Common Input Style for cleaner code
  const inputClass = "block w-full px-4 py-3 text-sm text-slate-900 bg-white rounded-lg border border-slate-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all duration-200 peer placeholder-transparent";
  const labelClass = "absolute left-4 -top-2.5 bg-white px-1 text-xs text-indigo-600 transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:text-slate-400 peer-placeholder-shown:top-3.5 peer-focus:-top-2.5 peer-focus:text-xs peer-focus:text-indigo-600 pointer-events-none";

  return (
    <div className="max-w-4xl mx-auto my-10 bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden">
      {/* Header Section */}
      <div className="bg-slate-50 p-6 border-b border-slate-100 flex flex-col sm:flex-row items-center gap-4">
        <div className="h-16 w-16 rounded-full border-2 border-indigo-500 p-0.5">
          <img 
            src={user?.photoURL || "https://via.placeholder.com/150"} 
            alt="profile" 
            className="h-full w-full rounded-full object-cover"
          />
        </div>
        <div className="text-center sm:text-left">
          <h2 className="text-xl font-bold text-slate-800">{user?.displayName || "Admin User"}</h2>
          <p className="text-sm text-slate-500">Inventory Manager • {user?.email}</p>
        </div>
      </div>

      <form onSubmit={handleSubmit(addAsset)} className="p-8">
        <h3 className="text-lg font-semibold text-slate-700 mb-6">Asset Information</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
          {/* Product Name */}
          <div className="relative">
            <input {...register("productName", { required: true })} type="text" id="productName" className={inputClass} placeholder="Product Name" />
            <label htmlFor="productName" className={labelClass}>Product Name</label>
          </div>

          {/* Product Quantity */}
          <div className="relative">
            <input {...register("productQuantity", { required: true })} type="number" id="productQuantity" className={inputClass} placeholder="Quantity" />
            <label htmlFor="productQuantity" className={labelClass}>Total Quantity</label>
          </div>

          {/* Available Quantity */}
          <div className="relative">
            <input {...register("availableQuantity", { required: true })} type="number" id="availableQuantity" className={inputClass} placeholder="Available" />
            <label htmlFor="availableQuantity" className={labelClass}>Available Quantity</label>
          </div>

          {/* Company Name */}
          <div className="relative">
            <input {...register("companyName", { required: true })} type="text" id="companyName" className={inputClass} placeholder="Company" />
            <label htmlFor="companyName" className={labelClass}>Company Name</label>
          </div>

          {/* Product Type (Select) */}
          <div className="flex flex-col gap-1">
            <label className="text-xs font-medium text-slate-500 ml-1">Asset Category</label>
            <select
              {...register("productType")}
              className="w-full px-4 py-3 text-sm text-slate-900 bg-white rounded-lg border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none"
            >
              <option value="returnable">Returnable</option>
              <option value="non-returnable">Non-Returnable</option>
            </select>
          </div>

          {/* Image Upload */}
          <div className="flex flex-col gap-1">
            <label className="text-xs font-medium text-slate-500 ml-1">Product Image</label>
            <input
              {...register("productImage", { required: true })}
              type="file"
              className="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100 cursor-pointer"
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-10 pt-6 border-t border-slate-100 flex justify-end">
          <button
            disabled={loading}
            type="submit"
            className={`
              flex items-center gap-2 px-8 py-3 rounded-xl font-bold text-white transition-all
              ${loading ? "bg-slate-400 cursor-not-allowed" : "bg-indigo-600 hover:bg-indigo-700 hover:shadow-lg active:scale-95"}
            `}
          >
            {loading ? (
              <>
                <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                Processing...
              </>
            ) : (
              "Add Asset to Inventory"
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddAsset;