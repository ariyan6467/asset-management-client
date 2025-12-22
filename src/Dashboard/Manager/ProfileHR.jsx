import React from 'react';
import UseAuth from '../../hook/UseAuth';

const ProfileHR = () => {
    const { user, logOut } = UseAuth();

    // Loading State: Full screen spinner or pulse
    if (!user) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
            </div>
        );
    }

    const { displayName, email, photoURL } = user;

    return (
        <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                {/* Profile Card */}
                <div className="bg-white shadow-xl rounded-3xl overflow-hidden">
                    
                    {/* Upper Background/Banner */}
                    <div className="h-48 bg-gradient-to-r dark:from-blue-600 dark:to-indigo-700 from-blue-400 to-indigo-500"></div>

                    {/* Profile Content */}
                    <div className="relative px-6 pb-12">
                        <div className="flex flex-col items-center">
                            
                            {/* Large Avatar */}
                            <div className="relative -mt-24">
                                <img
                                    className="h-40 w-40 rounded-full border-8 border-white object-cover shadow-lg"
                                    src={photoURL || "https://via.placeholder.com/150"}
                                    alt={displayName}
                                />
                                <span className="absolute bottom-3 right-3 block h-6 w-6 rounded-full bg-green-400 border-4 border-white"></span>
                            </div>

                            {/* User Identity */}
                            <div className="mt-6 text-center">
                                <h2 className="text-3xl font-extrabold text-gray-900">
                                    {displayName || "User Name"}
                                </h2>
                                <p className="text-sm font-medium text-blue-600 uppercase tracking-wide">
                                    HR Manager
                                </p>
                                <p className="mt-2 text-gray-500">{email}</p>
                            </div>

                            {/* Stats/Info Grid */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full mt-10 border-t border-gray-100 pt-10">
                                <div className="text-center">
                                    <span className="block text-2xl font-bold text-gray-800">12</span>
                                    <span className="text-gray-500 text-sm">Active Postings</span>
                                </div>
                                <div className="text-center border-x border-gray-100">
                                    <span className="block text-2xl font-bold text-gray-800">45</span>
                                    <span className="text-gray-500 text-sm">Applicants</span>
                                </div>
                                <div className="text-center">
                                    <span className="block text-2xl font-bold text-gray-800">Verified</span>
                                    <span className="text-gray-500 text-sm">Account Status</span>
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex flex-wrap justify-center gap-4 mt-10 w-full">
                                <button className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-all duration-200 shadow-md">
                                    Edit Profile
                                </button>
                                
                                {logOut && (
                                    <button 
                                        onClick={logOut}
                                        className="px-8 py-3 bg-white border-2 border-red-500 text-red-500 hover:bg-red-50 font-semibold rounded-xl transition-all duration-200"
                                    >
                                        Log Out
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Additional Info Section (Optional) */}
                <div className="mt-8 bg-white p-8 rounded-3xl shadow-sm">
                    <h3 className="text-xl font-bold text-gray-800 mb-4">About Me</h3>
                    <p className="text-gray-600 leading-relaxed">
                        Welcome to your professional HR dashboard. Here you can manage company recruitment, 
                        update your personal credentials, and track your organizational performance.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default ProfileHR;