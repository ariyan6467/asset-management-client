import { useQuery } from '@tanstack/react-query';
import React, { useMemo } from 'react';
import UseAxiosSecure from '../../hook/UseAxiosSecure';
import PieChart from './Pie/PieChart';
import BarChart from './Bar/BarChart';

const MainDashBoard = () => {
    const axiosSecure = UseAxiosSecure();
    
    // Get asset data for pie chart
    const {
        data: assets = [],
    } = useQuery({
        queryKey: ["all-assets"],
        queryFn: async () => {
            const result = await axiosSecure.get(`/all-assets`);
            return result.data;
        },
    });

    // Get requests data for bar chart
    const {
        data: requests = [],
    } = useQuery({
        queryKey: ["all-requests"],
        queryFn: async () => {
            const result = await axiosSecure.get(`/all-requests`);
            return result.data;
        },
    });

    // Calculate statistics
    const stats = useMemo(() => {
        const returnableCount = assets.filter(
            asset => asset.productType === 'returnable'
        ).length;
        const nonReturnableCount = assets.filter(
            asset => asset.productType === 'non-returnable'
        ).length;
        
        return {
            totalAssets: assets.length,
            returnable: returnableCount,
            nonReturnable: nonReturnableCount,
            totalRequests: requests.length,
        };
    }, [assets, requests]);

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
            {/* Dashboard Header */}
            <div className="mb-8">
                <h1 className="text-4xl font-bold text-gray-800 mb-2">Dashboard Overview</h1>
                <p className="text-gray-600">Monitor your assets and requests at a glance</p>
            </div>

            {/* Statistics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-blue-500 hover:shadow-xl transition-shadow duration-300">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-gray-500 text-sm font-medium">Total Assets</p>
                            <p className="text-3xl font-bold text-gray-800 mt-2">{stats.totalAssets}</p>
                        </div>
                        <div className="bg-blue-100 rounded-full p-3">
                            <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                            </svg>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-green-500 hover:shadow-xl transition-shadow duration-300">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-gray-500 text-sm font-medium">Returnable Items</p>
                            <p className="text-3xl font-bold text-gray-800 mt-2">{stats.returnable}</p>
                        </div>
                        <div className="bg-green-100 rounded-full p-3">
                            <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-red-500 hover:shadow-xl transition-shadow duration-300">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-gray-500 text-sm font-medium">Non-Returnable Items</p>
                            <p className="text-3xl font-bold text-gray-800 mt-2">{stats.nonReturnable}</p>
                        </div>
                        <div className="bg-red-100 rounded-full p-3">
                            <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-purple-500 hover:shadow-xl transition-shadow duration-300">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-gray-500 text-sm font-medium">Total Requests</p>
                            <p className="text-3xl font-bold text-gray-800 mt-2">{stats.totalRequests}</p>
                        </div>
                        <div className="bg-purple-100 rounded-full p-3">
                            <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                            </svg>
                        </div>
                    </div>
                </div>
            </div>

            {/* Charts Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Pie Chart Card */}
                <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
                    <PieChart assets={assets} />
                </div>

                {/* Bar Chart Card */}
                <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
                    <BarChart requests={requests} />
                </div>
            </div>
        </div>
    );
};

export default MainDashBoard;