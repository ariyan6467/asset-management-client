import React from 'react';
import { motion } from 'framer-motion';
import { User, Briefcase, Mail, ShieldCheck, Clock } from 'lucide-react';

const AssetCard = ({ asset }) => {
  const {
    assetName,
    assetType,
    assignedDate,
    companyLogo,
    companyName,
    employeeEmail,
    employeeName,
    hrEmail,
    productImage,
    requestDate,
    returnDate,
    status,
  } = asset;

  const getStatusStyles = (status) => {
    const map = {
      approved: 'bg-emerald-500/10 text-emerald-600 border-emerald-200 shadow-emerald-100',
      pending: 'bg-amber-500/10 text-amber-600 border-amber-200 shadow-amber-100',
      rejected: 'bg-rose-500/10 text-rose-600 border-rose-200 shadow-rose-100',
      assigned: 'bg-blue-500/10 text-blue-600 border-blue-200 shadow-blue-100',
    };
    return (
      map[status?.toLowerCase()] ||
      'bg-slate-100 text-slate-600 border-slate-200'
    );
  };

  const formatDate = (date) =>
    date
      ? new Date(date).toLocaleDateString('en-US', {
          month: 'short',
          day: 'numeric',
          year: 'numeric',
        })
      : 'N/A';

  const handlePrint = () => {
    window.print(); // Trigger the browser's print dialog
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ y: -8 }}
      transition={{ duration: 0.25 }}
      className="w-full h-full bg-white rounded-3xl overflow-hidden shadow-[0_18px_45px_rgba(15,23,42,0.06)] border border-slate-100 group flex flex-col"
    >
      {/* Top Section: Image & Company Branding */}
      <div className="relative overflow-hidden">
        <div className="aspect-[4/3] w-full">
          <motion.img
            whileHover={{ scale: 1.04 }}
            transition={{ duration: 0.35 }}
            className="w-full h-full object-cover group-hover:brightness-95 transition-all"
            src={productImage || 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=600'}
            alt={assetName}
          />
        </div>

        {/* Floating Status Badge */}
        <div className="absolute top-4 left-4 sm:top-5 sm:left-5">
          <span
            className={`backdrop-blur-md border px-3 sm:px-4 py-1.5 rounded-full text-[10px] sm:text-xs font-bold uppercase tracking-wider shadow-sm ${getStatusStyles(status)}`}
          >
            {status}
          </span>
        </div>

        {/* Glassmorphism Company Overlay */}
        <div className="absolute bottom-3 left-3 right-3 sm:bottom-4 sm:left-4 sm:right-4 backdrop-blur-md bg-white/70 px-3 py-2.5 sm:px-3.5 sm:py-3 rounded-2xl flex items-center gap-3 border border-white/50 shadow-lg">
          <img
            src={companyLogo || 'https://via.placeholder.com/40'}
            alt="logo"
            className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl object-contain bg-white p-1"
          />
          <div className="min-w-0">
            <p className="text-[9px] sm:text-[10px] font-bold text-indigo-600 uppercase tracking-[0.18em] leading-none">
              Registered To
            </p>
            <h3 className="mt-0.5 text-xs sm:text-sm font-semibold text-slate-800 truncate">
              {companyName}
            </h3>
          </div>
        </div>
      </div>

      <div className="p-5 sm:p-6 lg:p-7 flex flex-col flex-1">
        {/* Title & Asset Type */}
        <div className="mb-5 sm:mb-6">
          <h2 className="text-lg sm:text-xl lg:text-2xl font-extrabold text-slate-900 tracking-tight leading-snug mb-1">
            {assetName}
          </h2>
          <div className="inline-flex items-center gap-2 text-indigo-500 bg-indigo-50/80 rounded-full px-3 py-1 mt-1">
            <Briefcase size={14} className="shrink-0" />
            <span className="text-[11px] sm:text-xs font-semibold uppercase tracking-wide">
              {assetType}
            </span>
          </div>
        </div>

        {/* Data Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mb-4 md:mb-5 flex-1">
          <div className="space-y-3">
            <div className="group/item">
              <div className="flex flex-wrap items-center gap-1.5 mb-1">
                <p className="flex items-center gap-1.5 text-[10px] sm:text-[11px] font-bold text-slate-400 uppercase tracking-[0.2em]">
                  <User size={13} className="text-slate-300 group-hover/item:text-indigo-500 transition-colors" />
                  Employee
                </p>
                <span className="hidden sm:inline text-slate-300">•</span>
                <p className="text-xs sm:text-sm font-semibold text-slate-700">
                  {employeeName}
                </p>
              </div>
              <p className="text-[11px] sm:text-xs text-slate-400 flex items-center gap-1.5 break-all">
                <Mail size={10} />
                {employeeEmail}
              </p>
            </div>

            <div className="group/item">
              <p className="flex items-center gap-1.5 text-[10px] sm:text-[11px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-1">
                <ShieldCheck size={13} className="text-slate-300 group-hover/item:text-emerald-500 transition-colors" />
                HR Support
              </p>
              <p className="text-[11px] sm:text-xs text-slate-500 italic truncate">
                {hrEmail}
              </p>
            </div>
          </div>

          <div className="space-y-3 md:border-l md:border-slate-100 md:pl-5">
            <div>
              <p className="flex items-center gap-1.5 text-[10px] sm:text-[11px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-1.5">
                <Clock size={13} />
                Dates
              </p>
              <div className="space-y-1.5">
                <p className="text-[11px] sm:text-[13px] text-slate-600 flex justify-between gap-2">
                  <span className="text-slate-400 font-medium">Requested</span>
                  <span className="font-semibold text-right">{formatDate(requestDate)}</span>
                </p>
                <p className="text-[11px] sm:text-[13px] text-slate-600 flex justify-between gap-2">
                  <span className="text-slate-400 font-medium">Assigned</span>
                  <span className="font-semibold text-right">{formatDate(assignedDate)}</span>
                </p>
                <p className="text-[11px] sm:text-[13px] text-rose-500 flex justify-between gap-2">
                  <span className="text-rose-300 font-medium">Return By</span>
                  <span className="font-bold underline decoration-rose-200 underline-offset-4 text-right">
                    {formatDate(returnDate)}
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>

<div className="flex w-full gap-3 mt-4 md:mt-0 md:flex-row flex-col">
  {status?.toLowerCase() === 'assigned' && assetType?.toLowerCase() === 'returnable' && (
    <div className="mt-auto w-1/2">
      <button className="w-full bg-rose-600 hover:bg-rose-700 text-white font-semibold py-3 px-6 rounded-full shadow-xl hover:shadow-2xl transition-all">
        Return Asset
      </button>
    </div>
  )}

  <button
    className="w-1/2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-6 rounded-lg shadow-lg hover:shadow-xl transition-all"
    onClick={handlePrint}
  >
    Print
  </button>
</div>

      </div>
    </motion.div>
  );
};

export default AssetCard;
