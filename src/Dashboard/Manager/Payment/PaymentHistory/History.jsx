import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { useSearchParams } from 'react-router-dom';
import UseAxiosSecure from '../../../../hook/UseAxiosSecure';
import UseAuth from '../../../../hook/UseAuth';
import HistoryCard from './HistoryCard';

const DEFAULT_LIMIT = 10;

const History = () => {
    const axiosSecure = UseAxiosSecure();
    const { user } = UseAuth();
    const [searchParams, setSearchParams] = useSearchParams();

    const page = Math.max(parseInt(searchParams.get('page') || '1', 10), 1);
    const limit = Math.max(parseInt(searchParams.get('limit') || `${DEFAULT_LIMIT}`, 10), 1);

    const { data, isFetching } = useQuery({
        queryKey: ["payments-history", user?.email, page, limit],
        queryFn: async () => {
            const result = await axiosSecure.get(`/payment-history/${user?.email}`, {
                params: { page, limit },
            });
            return result.data;
        },
        enabled: !!user?.email,
        keepPreviousData: true,
    });

    // Support both array response or paginated object: { payments, total }
    const payments = Array.isArray(data) ? data : data?.payments || [];
    const total = typeof data?.total === 'number' ? data.total : null;
    const totalCount = total ?? payments.length; // total payment collection number (fallback to current list length)
    const totalPages = total ? Math.max(Math.ceil(total / limit), 1) : null;
    const hasNextPage = totalPages ? page < totalPages : payments.length === limit;

    const updatePage = (nextPage) => {
      setSearchParams({ page: `${nextPage}`, limit: `${limit}` });
    };

    const updateLimit = (nextLimit) => {
      setSearchParams({ page: '1', limit: `${nextLimit}` });
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6 md:p-8 lg:p-10">
            <div className="max-w-7xl mx-auto space-y-8">
                {/* Header Section */}
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div>
                        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
                            Payment History
                        </h1>
                        <p className="text-gray-600 text-sm md:text-base">
                            {payments.length > 0
                                ? `Showing page ${page}${totalPages ? ` of ${totalPages}` : ''}`
                                : 'No payment records found'}
                        </p>
                        {payments.length > 0 && (
                            <p className="text-gray-500 text-xs md:text-sm mt-1">
                                Total payment collection: <span className="font-semibold">{totalCount}</span>
                            </p>
                        )}
                    </div>
                    <div className="flex items-center gap-3">
                        <label className="text-sm text-gray-600">Page size:</label>
                        <select
                          className="border border-gray-200 rounded-lg px-3 py-2 text-sm shadow-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#261a6b]/40"
                          value={limit}
                          onChange={(e) => updateLimit(Number(e.target.value))}
                        >
                          {[5, 10, 15, 20].map(size => (
                            <option key={size} value={size}>{size} per page</option>
                          ))}
                        </select>
                    </div>
                </div>

                {/* Cards Grid */}
                {payments.length > 0 ? (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
                        {payments.map(payment => (
                            <HistoryCard key={payment._id} payment={payment} />
                        ))}
                    </div>
                ) : (
                    <div className="bg-white rounded-xl shadow-sm p-12 text-center">
                        <div className="text-gray-400 mb-4">
                            <svg className="w-24 h-24 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                        </div>
                        <h3 className="text-xl font-semibold text-gray-700 mb-2">No Payment Records</h3>
                        <p className="text-gray-500">Your payment history will appear here once you make a payment.</p>
                    </div>
                )}

                {/* Pagination Controls */}
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div className="text-sm text-gray-600">
                    Page {page}{totalPages ? ` of ${totalPages}` : ''} • {payments.length} item{payments.length !== 1 ? 's' : ''} on this page
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      className="px-3 py-2 rounded-lg border border-gray-200 bg-white text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                      disabled={page === 1 || isFetching}
                      onClick={() => updatePage(page - 1)}
                    >
                      Previous
                    </button>

                    {totalPages ? (
                      Array.from({ length: totalPages }, (_, idx) => idx + 1).map((p) => (
                        <button
                          key={p}
                          className={`px-3 py-2 rounded-lg text-sm font-medium shadow-sm transition ${
                            p === page
                              ? 'bg-[#261a6b] text-white'
                              : 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-50'
                          }`}
                          onClick={() => updatePage(p)}
                          disabled={isFetching}
                        >
                          {p}
                        </button>
                      ))
                    ) : (
                      <span className="px-3 py-2 text-sm text-gray-500">…</span>
                    )}

                    <button
                      className="px-3 py-2 rounded-lg border border-gray-200 bg-white text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                      disabled={!hasNextPage || isFetching}
                      onClick={() => updatePage(page + 1)}
                    >
                      Next
                    </button>
                  </div>
                </div>
            </div>
        </div>
    );
};

export default History;