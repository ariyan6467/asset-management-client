import React from "react";

const MyTeamCard = ({ teamMember }) => {
  // Fallback image in case teamMember.avatar isn't provided
  const avatarUrl =
    teamMember.avatar ||
    "https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80";

  return (
    <div className="group relative flex w-full max-w-[20rem] flex-col rounded-2xl bg-white bg-clip-border text-gray-700 shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl">
      {/* Header Image Section */}
      <div className="relative mx-4 -mt-6 h-48 overflow-hidden rounded-xl bg-gradient-to-tr from-blue-600 to-blue-400 shadow-blue-500/40 shadow-lg group-hover:shadow-blue-500/60 transition-all duration-300">
        <img
          src={teamMember.productImage}
          alt={teamMember.employeeName}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
        />

        {/* Subtle Overlay */}
        <div className="absolute inset-0 bg-black/5 group-hover:bg-black/0 transition-colors"></div>

        {/* --- NEW SMALL IMAGE SECTION (Avatar/Logo) --- */}
        <div className="absolute bottom-3 right-3 z-10">
          <div className="h-12 w-12 rounded-full border-2 border-white shadow-md overflow-hidden">
            <img
              src={teamMember.companyLogo}
              alt="Small Avatar"
              className="h-full w-full object-cover"
            />
          </div>
        </div>
        {/* --------------------------------------------- */}
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
