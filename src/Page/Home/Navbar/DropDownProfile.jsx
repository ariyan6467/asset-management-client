import React from "react";
import UseAuth from "../../../hook/UseAuth";
import UseRole from "../../../hook/UseRole";
import { NavLink } from "react-router";
import { VscAccount, VscGitPullRequestGoToChanges, VscRequestChanges } from "react-icons/vsc";
import { GrGroup, GrUserWorker } from "react-icons/gr";
import { AiOutlinePropertySafety } from "react-icons/ai";
import { CiLogout, CiViewList } from "react-icons/ci";
import { MdAddModerator } from "react-icons/md";
import { GiUpgrade } from "react-icons/gi";

const DropDownProfile = () => {
  const { handleLogeOut, user } = UseAuth();
  const { userRole } = UseRole();

  function signOut() {
    handleLogeOut()
      .then(() => {
        alert("Signout successful");
      })
      .catch((error) => {
        console.error(error.message);
      });
  }

  return (
    <div className="avatar w-[30px] h-[30px] my-auto dropdown dropdown-end">
      <div
        tabIndex={0}
        role="button"
        className="ring-primary ring-offset-base-100 w-24 rounded-full ring-2 ring-offset-2"
      >
        <img
          src={user?.photoURL}
          alt="Profile"
          className="cursor-pointer"
        />
      </div>

      {/* Dropdown Menu */}
      {userRole === "Employee" && (
        <ul
          tabIndex="-1"
          className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm"
        >
          <li>
            <NavLink
              to="/dashboard/my-asset"
              className="btn btn-ghost btn-square text-lg tooltip tooltip-right"
              data-tip="My Asset"
            >
              <AiOutlinePropertySafety />
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/dashboard/request-asset"
              className="btn btn-ghost btn-square text-lg tooltip tooltip-right"
              data-tip="Request Asset"
            >
              <VscGitPullRequestGoToChanges />
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/dashboard/my-team"
              className="btn btn-ghost btn-square text-lg tooltip tooltip-right"
              data-tip="My Team"
            >
              <GrGroup />
            </NavLink>
          </li>
          <li>
            <NavLink to="/dashboard/my-profile">
              <button
                className="btn btn-ghost btn-square tooltip tooltip-right"
                data-tip="My Profile"
              >
                <VscAccount />
              </button>
            </NavLink>
          </li>
          <li>
            <button
              onClick={signOut}
              className="btn btn-ghost btn-square tooltip tooltip-right"
              data-tip="Sign Out"
            >
              <CiLogout />
            </button>
          </li>
        </ul>
      )}

      {/* Dropdown for HR Manager */}
      {userRole === "HR Manager" && (
        <ul
          tabIndex="-1"
          className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm"
        >
          <li>
            <NavLink to="/dashboard/asset-list">
                         <button
                           className="btn btn-ghost btn-square tooltip tooltip-right"
                           data-tip="asset-list"
                         >
                           <CiViewList />
                         </button>
                       </NavLink>
           
          </li>
          <li>
             <NavLink to="/dashboard/add-asset">
                          <button
                            className="btn btn-ghost btn-square tooltip tooltip-right"
                            data-tip="add-asset"
                          >
                            <MdAddModerator />
                          </button>
                        </NavLink>
          </li>
          <li>
            <NavLink to="/dashboard/all-request">
                         <button
                           className="btn btn-ghost btn-square tooltip tooltip-right"
                           data-tip="all-request"
                         >
                           <VscRequestChanges />
                         </button>
                       </NavLink>
          </li>
          <li>
             <NavLink to="/dashboard/my-employee">
                          <button
                            className="btn btn-ghost btn-square tooltip tooltip-right"
                            data-tip="my-employee"
                          >
                            <GrUserWorker />
                          </button>
                        </NavLink>
          </li>
          <li>
             <NavLink to="/dashboard/upgrade-package">
                          <button
                            className="btn btn-ghost btn-square tooltip tooltip-right"
                            data-tip="upgrade-package"
                          >
                            <GiUpgrade />
                          </button>
                        </NavLink>
          </li>
          <li>
             <button
              onClick={signOut}
              className="btn btn-ghost btn-square tooltip tooltip-right"
              data-tip="Sign Out"
            >
              <CiLogout />
            </button>
          </li>
        </ul>
      )}
    </div>
  );
};

export default DropDownProfile;
