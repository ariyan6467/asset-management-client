import React from "react";
import { NavLink } from "react-router";
import UseAuth from "../../../hook/UseAuth";
import UseRole from "../../../hook/UseRole";

// Icons
import { VscAccount, VscGitPullRequestGoToChanges, VscRequestChanges } from "react-icons/vsc";
import { GrGroup, GrUserWorker } from "react-icons/gr";
import { AiOutlinePropertySafety } from "react-icons/ai";
import { CiLogout, CiViewList } from "react-icons/ci";
import { MdAddModerator } from "react-icons/md";
import { GiUpgrade } from "react-icons/gi";

const DropDownProfile = () => {
  const { handleLogeOut, user } = UseAuth();
  const { userRole } = UseRole();

  const signOut = () => {
    handleLogeOut()
      .then(() => alert("Signed out successfully"))
      .catch((err) => console.error(err.message));
  };

  // Define links based on roles
  const menuConfig = {
    Employee: [
      { to: "/dashboard/my-asset", label: "My Assets", icon: <AiOutlinePropertySafety /> },
      { to: "/dashboard/request-asset", label: "Request Asset", icon: <VscGitPullRequestGoToChanges /> },
      { to: "/dashboard/my-team", label: "My Team", icon: <GrGroup /> },
      { to: "/dashboard/my-profile", label: "Profile", icon: <VscAccount /> },
    ],
    "HR Manager": [
      { to: "/dashboard/asset-list", label: "Asset List", icon: <CiViewList /> },
      { to: "/dashboard/add-asset", label: "Add Asset", icon: <MdAddModerator /> },
      { to: "/dashboard/all-request", label: "All Requests", icon: <VscRequestChanges /> },
      { to: "/dashboard/my-employee", label: "Employees", icon: <GrUserWorker /> },
      { to: "/dashboard/upgrade-package", label: "Upgrade", icon: <GiUpgrade /> },
      { to: "hr-profile", label: "Profile", icon: <VscAccount /> },
    ],
  };

  const activeLinks = menuConfig[userRole] || [];

  return (
    <div className="dropdown dropdown-end">
      {/* Trigger: Profile Image */}
      <div
        tabIndex={0}
        role="button"
        className="avatar btn btn-ghost btn-circle hover:ring-2 ring-primary ring-offset-2 transition-all duration-300"
      >
        <div className="w-10 rounded-full">
          <img src={user?.photoURL || "https://via.placeholder.com/150"} alt="Profile" />
        </div>
      </div>

      {/* Dropdown Content */}
      <ul
        tabIndex={0}
        className="dropdown-content menu menu-sm mt-3 z-[100] p-2 shadow-2xl bg-base-100 border border-base-200 rounded-xl w-64 animate-in fade-in zoom-in duration-200"
      >
        {/* User Info Header */}
        <li className="px-4 py-3 mb-2 border-b border-base-200">
          <p className="text-xs font-semibold text-primary uppercase tracking-wider">{userRole}</p>
          <p className="text-sm font-bold truncate">{user?.displayName || "User Name"}</p>
          <p className="text-xs opacity-60 truncate">{user?.email}</p>
        </li>

        {/* Dynamic Navigation Links */}
        {activeLinks.map((item) => (
          <li key={item.to} className="my-0.5">
            <NavLink
              to={item.to}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-2 rounded-lg transition-colors ${
                  isActive ? "bg-primary text-primary-content" : "hover:bg-base-200"
                }`
              }
            >
              <span className="text-lg">{item.icon}</span>
              <span className="font-medium">{item.label}</span>
            </NavLink>
          </li>
        ))}

        {/* Action Section */}
        <div className="divider my-1 opacity-50"></div>
        <li>
          <button
            onClick={signOut}
            className="flex items-center gap-3 px-4 py-2 text-error hover:bg-error/10 rounded-lg transition-colors w-full text-left"
          >
            <CiLogout className="text-lg" />
            <span className="font-medium">Sign Out</span>
          </button>
        </li>
      </ul>
    </div>
  );
};

export default DropDownProfile;