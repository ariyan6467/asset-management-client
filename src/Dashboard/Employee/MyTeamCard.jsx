import React from "react";

const MyTeamCard = ({ teamMember }) => {
  return (
    <div className="group relative flex w-full max-w-[20rem] flex-col rounded-2xl bg-white bg-clip-border text-gray-700 shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl">
      {/* Header Image Section */}
      <div className="relative mx-4 -mt-6 h-48 overflow-hidden rounded-xl bg-gradient-to-tr from-blue-600 to-blue-400 shadow-blue-500/40 shadow-lg group-hover:shadow-blue-500/60 transition-all duration-300">
        <img
          src={teamMember.companyLogo}
          alt={teamMember.employeeName}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        {/* Subtle Overlay */}
        <div className="absolute inset-0 bg-black/5 group-hover:bg-black/0 transition-colors"></div>
      </div>

      {/* Content Section */}
      <div className="p-6">
        <div className="mb-3 flex items-center justify-between">
          <h5 className="font-sans text-xl font-bold leading-snug tracking-normal text-slate-900">
            {teamMember.employeeName}
          </h5>
        </div>
        
        <p className="block font-sans text-sm font-medium uppercase tracking-wider text-blue-500 antialiased">
          {teamMember.companyName}
        </p>
        
        <p className="mt-2 block font-sans text-base font-light leading-relaxed text-gray-600 antialiased">
          {teamMember.employeeEmail}
        </p>
      </div>

      {/* Action Section */}
      <div className="p-6 pt-0">
        <button
          type="button"
          className="w-full select-none rounded-lg bg-slate-900 py-3.5 px-7 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md transition-all hover:bg-slate-800 hover:shadow-lg focus:opacity-[0.85] active:opacity-[0.85] disabled:pointer-events-none"
        >
          View Profile
        </button>
      </div>
    </div>
  );
};

export default MyTeamCard;