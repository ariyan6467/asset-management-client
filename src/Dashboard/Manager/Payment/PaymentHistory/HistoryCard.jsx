import React from "react";

const HistoryCard = ({ payment }) => {
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  const formatTime = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 group">
      <div className="flex flex-col md:flex-row h-full">
        {/* Left Side - Employee Limit */}
        <div className="bg-gradient-to-br from-[#261a6b] to-[#3d2a8f] p-6 md:p-8 flex flex-col justify-center items-center md:items-start text-white min-w-[200px] md:w-[220px]">
          <div className="mb-4">
            <p className="text-xs font-semibold tracking-widest text-gray-300 uppercase mb-2">
              Employee Limit
            </p>
            <div className="flex items-baseline gap-2">
              <h2 className="text-4xl md:text-5xl font-bold">
                {payment.employeeLimit}
              </h2>
              <span className="text-lg text-gray-300">Employees</span>
            </div>
          </div>
        </div>

        {/* Right Side - Payment Details */}
        <div className="flex-1 p-6 md:p-8 flex flex-col justify-between relative">
          {/* Header Section */}
          <div className="mb-4">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-4">
              <div className="flex-1">
                <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">
                  Transaction ID
                </p>
                <p className="text-sm font-mono text-gray-700 break-all">
                  {payment.transactionId || "N/A"}
                </p>
              </div>
              <div className="flex flex-col items-end">
                <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">
                  Payment Date
                </p>
                <div className="text-right">
                  <p className="text-sm font-semibold text-gray-800">
                    {formatDate(payment.paymentDate)}
                  </p>
                  {payment.paymentDate && (
                    <p className="text-xs text-gray-500 mt-0.5">
                      {formatTime(payment.paymentDate)}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Package Name */}
          <div className="mb-6">
            <h3 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
              {payment.packageName || "Standard"} Plan
            </h3>
            <div className="w-16 h-1 bg-gradient-to-r from-[#261a6b] to-[#3d2a8f] rounded-full"></div>
          </div>

          {/* Footer Section */}
          <div className="flex items-center justify-between pt-4 border-t border-gray-100">
            <div>
              <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">
                Amount Paid
              </p>
              <p className="text-2xl font-bold text-[#261a6b]">
                ${payment.amount?.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) || "0.00"}
              </p>
            </div>
            <div className="px-4 py-2 bg-gradient-to-r from-[#261a6b] to-[#3d2a8f] text-white rounded-full text-sm font-semibold shadow-md group-hover:shadow-lg transition-shadow duration-300">
              ✓ Paid
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HistoryCard;
