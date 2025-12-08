import React from 'react';

const AssetOverview = () => {
    return (
        <div className="relative flex justify-center lg:justify-end">
            <div className="w-full max-w-sm bg-white p-6 rounded-2xl shadow-2xl relative border border-gray-100">
                <h2 className="text-xl font-semibold text-dark-text">Asset Overview</h2>
                <p className="text-sm text-gray-500 mb-6">This Month</p>

                {/* Metric Cards Grid */}
                <div className="grid grid-cols-3 gap-3 mb-6">
                    {/* Total Assets */}
                    <div className="text-center p-3 rounded-xl bg-gray-50 border border-gray-200">
                        <div className="icon-box bg-blue-100/50 text-blue-600 mx-auto w-10 h-10 mb-2">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" />
                                <path d="m3.3 7 8.7 5 9.4-5" />
                                <path d="M12 22V12" />
                            </svg>
                        </div>
                        <p className="text-lg font-bold text-dark-text">248</p>
                        <p className="text-xs text-gray-500">Total Assets</p>
                    </div>

                    {/* Assigned */}
                    <div className="text-center p-3 rounded-xl bg-gray-50 border border-gray-200">
                        <div className="icon-box bg-green-100/50 text-green-600 mx-auto w-10 h-10 mb-2">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                                <circle cx="9" cy="7" r="4" />
                                <path d="M22 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" />
                            </svg>
                        </div>
                        <p className="text-lg font-bold text-dark-text">186</p>
                        <p className="text-xs text-gray-500">Assigned</p>
                    </div>

                    {/* Available */}
                    <div className="text-center p-3 rounded-xl bg-gray-50 border border-gray-200">
                        <div className="icon-box bg-green-100/50 text-green-600 mx-auto w-10 h-10 mb-2">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M22 11.08V12a10 10 0 1 1-5.69-8.98" />
                                <path d="M16 2l6 6" />
                            </svg>
                        </div>
                        <p className="text-lg font-bold text-dark-text">62</p>
                        <p className="text-xs text-gray-500">Available</p>
                    </div>
                </div>

                {/* Asset List */}
                <div className="space-y-4">
                    {/* Asset 1 */}
                    <div className="flex justify-between items-center py-2 border-b border-gray-100 last:border-b-0">
                        <p className="text-sm font-medium text-dark-text">MacBook Pro 14"</p>
                        <span className="text-xs font-semibold px-3 py-1 rounded-full text-green-700 bg-green-100">
                            Assigned
                        </span>
                    </div>

                    {/* Asset 2 */}
                    <div className="flex justify-between items-center py-2 border-b border-gray-100 last:border-b-0">
                        <p className="text-sm font-medium text-dark-text">Dell Monitor 27"</p>
                        <span className="text-xs font-semibold px-3 py-1 rounded-full text-yellow-700 bg-yellow-100">
                            Pending
                        </span>
                    </div>

                    {/* Asset 3 */}
                    <div className="flex justify-between items-center py-2">
                        <p className="text-sm font-medium text-dark-text">Wireless Headset</p>
                        <span className="text-xs font-semibold px-3 py-1 rounded-full text-blue-700 bg-blue-100">
                            Available
                        </span>
                    </div>
                </div>
            </div>

            {/* Floating Efficiency Badge */}
            <div className="absolute bottom-4 left-4 -translate-y-1/2 -translate-x-1/2 md:translate-x-0 md:left-auto md:bottom-auto md:top-2/3 md:right-[90%] lg:top-1/3 lg:right-full bg-white p-3 rounded-xl shadow-2xl border border-green-300 transform -rotate-1 transition-all duration-500 ease-out hover:rotate-0 hover:scale-105 hidden sm:flex items-center space-x-2">
                <div className="bg-secondary-green/20 text-secondary-green p-1 rounded-full">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="10" />
                        <path d="m9 12 2 2 4-4" />
                    </svg>
                </div>
                <div>
                    <p className="text-xs font-semibold text-dark-text leading-none">98% Efficiency</p>
                    <p className="text-xs text-gray-500">Asset utilization rate</p>
                </div>
            </div>
        </div>
    );
};

export default AssetOverview;
