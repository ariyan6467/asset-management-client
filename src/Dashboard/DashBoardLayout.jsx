import React, { useContext } from "react";
import Logo from "../Page/Home/Navbar/Logo";
import { NavLink, Outlet } from "react-router";
import { GiUpgrade } from "react-icons/gi";
import { GrUserWorker } from "react-icons/gr";
import { VscRequestChanges } from "react-icons/vsc";
import { MdAddModerator } from "react-icons/md";
import { CiViewList } from "react-icons/ci";
import { AuthContext } from "../Authantication/Authprovider";
// --- Utility Components for Reusability ---

/**
 * Renders a single Node icon and label on the canvas.
 * In a real app, this would be a draggable/connectable component (e.g., from React Flow).
 */
const WorkflowNode = ({
  icon,
  label,
  subLabel,
  colorClass,
  top,
  left,
  className = "",
}) => (
  <div className={`absolute ${top} ${left} ${className}`}>
    <div className="flex flex-col items-center p-2 cursor-pointer">
      {/* Node Shape */}
      <div
        className={`w-16 h-16 rounded-2xl flex items-center justify-center shadow-lg ${colorClass} transition-shadow hover:shadow-xl`}
      >
        <span className="text-3xl">{icon}</span>
      </div>
      {/* Node Label */}
      <span className="text-xs mt-1 text-gray-700 font-medium">{label}</span>
      {/* Optional Sub-label */}
      {subLabel && (
        <span className="text-[10px] text-gray-500">{subLabel}</span>
      )}
    </div>
  </div>
);

/**
 * Renders an item in the right-hand Tools/Modules list.
 */
const ToolListItem = ({ icon, title, description }) => (
  <div className="p-3 border border-base-200 rounded-lg flex items-start space-x-3 bg-white hover:bg-base-100 cursor-grab">
    <span className="text-xl mt-1">{icon}</span>
    <div>
      <p className="font-semibold text-sm text-gray-800">{title}</p>
      <p className="text-xs text-gray-500">{description}</p>
    </div>
  </div>
);

// --- Main Dashboard Component ---

const DashBoardLayout = () => {
  const { user } = useContext(AuthContext);
  console.log(user);
  return (
    // Main container: full screen height, flex row for the three columns
    <div className="flex h-screen overflow-hidden bg-gray-100">
      {/* === 1. Left Sidebar (Navigation) === */}
      <aside className="w-16 bg-base-300 flex flex-col items-center py-4 border-r border-gray-300 z-10 shadow-lg">
        <div className="mb-8">
          <Logo></Logo>
        </div>
        <nav className="flex flex-col space-y-4">
          <NavLink to="/">
            <button
              className="btn btn-ghost btn-square active:bg-base-200 tooltip tooltip-right"
              data-tip="Home"
            >
              🏠
            </button>
          </NavLink>
          {/* HR routes */}
          <div>
            <NavLink to="/dashboard/asset-list">
              <button
                className="btn btn-ghost btn-square tooltip tooltip-right"
                data-tip="asset-list"
              >
                <CiViewList />
              </button>
            </NavLink>

            <NavLink to="/dashboard/add-asset">
              <button
                className="btn btn-ghost btn-square tooltip tooltip-right"
                data-tip="add-asset"
              >
                <MdAddModerator />
              </button>
            </NavLink>
            <NavLink to="/dashboard/all-request">
              <button
                className="btn btn-ghost btn-square tooltip tooltip-right"
                data-tip="all-request"
              >
                <VscRequestChanges />
              </button>
            </NavLink>
            <NavLink to="/dashboard/my-employee">
              <button
                className="btn btn-ghost btn-square tooltip tooltip-right"
                data-tip="my-employee"
              >
                <GrUserWorker />
              </button>
            </NavLink>
            <NavLink to="/dashboard/upgrade-package">
              <button
                className="btn btn-ghost btn-square tooltip tooltip-right"
                data-tip="upgrade-package"
              >
                <GiUpgrade />
              </button>
            </NavLink>
          </div>
          {/* Divider */}
          <div className="border-t border-gray-400 w-1/2 mx-auto"></div>
          {/* Employee Routes */}
          <div>
            <NavLink
              to="/dashboard/my-asset"
              className="btn btn-ghost btn-square text-lg tooltip tooltip-right"
              data-tip="my-asset"
            >
              <button>N</button>
            </NavLink>

            <NavLink
              to="/dashboard/request-asset"
              className="btn btn-ghost btn-square text-lg tooltip tooltip-right"
              data-tip="request-asset"
            >
              <button>G</button>
            </NavLink>

            <NavLink
              to="/dashboard/my-team"
              className="btn btn-ghost btn-square text-lg tooltip tooltip-right"
              data-tip="my-team"
            >
              <button>D</button>
            </NavLink>

            <NavLink
              to="/dashboard/profile"
              className="btn btn-ghost btn-square text-lg tooltip tooltip-right"
              data-tip="profile"
            >
              <button>D</button>
            </NavLink>
          </div>
        </nav>

        {/* User Profile */}
        <div className="mt-auto pt-4">
          <div className="avatar cursor-pointer">
            <div className="w-8 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
              <img src={user?.photoURL} alt="User Profile" />
            </div>
          </div>
        </div>
      </aside>

      {/* === 2. Main Content Area (Canvas and Footer) === */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Top Header/Search */}
        <header className="p-3 bg-white border-b border-gray-300 flex justify-end">
          <div className="w-64">
            <label className="input input-bordered flex items-center gap-2 bg-base-100 input-sm">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="w-4 h-4 opacity-70"
              >
                <path
                  fillRule="evenodd"
                  d="M9.965 11.026a5 5 0 0 1-7.83-4.226 5 5 0 0 1 7.83 4.226ZM13.804 14.129 11 11.326l.707-.707 2.804 2.803-.707.707Z"
                  clipRule="evenodd"
                />
              </svg>
              <input type="text" className="grow" placeholder="Search" />
            </label>
          </div>
        </header>

        {/* Workflow Canvas Area */}
        <div
          className="flex-1 relative overflow-auto bg-white"
          // Subtle grid pattern for the canvas background
          style={{
            backgroundImage:
              "linear-gradient(to right, #e5e7eb 1px, transparent 1px), linear-gradient(to bottom, #e5e7eb 1px, transparent 1px)",
            backgroundSize: "20px 20px",
            backgroundPosition: "-1px -1px", // Adjust to make lines visible
          }}
        >
          <Outlet></Outlet>

          {/* NOTE: Lines are not included as they require SVG/Canvas/React Flow, 
             but their connecting points are visually apparent on the nodes. */}
        </div>

        {/* Footer (Run/Controls) */}
        <footer className="p-3 bg-base-200 flex justify-between items-center border-t border-gray-300">
          <button className="btn btn-sm btn-ghost flex items-center font-bold">
            ▶️ Run once
          </button>
          <div className="flex space-x-4 text-gray-500">
            <button
              className="btn btn-ghost btn-square btn-sm tooltip tooltip-top"
              data-tip="File"
            >
              📁
            </button>
            <button
              className="btn btn-ghost btn-square btn-sm tooltip tooltip-top"
              data-tip="Save"
            >
              💾
            </button>
            <button
              className="btn btn-ghost btn-square btn-sm tooltip tooltip-top"
              data-tip="Settings"
            >
              ⚙️
            </button>
            <button
              className="btn btn-ghost btn-square btn-sm tooltip tooltip-top"
              data-tip="Undo"
            >
              ↩️
            </button>
            <button
              className="btn btn-ghost btn-square btn-sm tooltip tooltip-top"
              data-tip="Redo"
            >
              ↪️
            </button>
            <div className="h-full border-r border-gray-400"></div>
            <button
              className="btn btn-ghost btn-square btn-sm tooltip tooltip-top"
              data-tip="Zoom Out"
            >
              -
            </button>
            <button
              className="btn btn-ghost btn-square btn-sm tooltip tooltip-top"
              data-tip="Zoom In"
            >
              +
            </button>
          </div>
        </footer>
      </main>

      {/* === 3. Right Sidebar (Tools/Modules Panel) === */}
      <aside className="w-80 bg-white border-l border-gray-300 p-4 overflow-y-auto z-10 shadow-lg">
        <h3 className="font-bold text-lg mb-4 text-gray-800">Flow Control</h3>

        <div className="space-y-3">
          {/* TRIGGERS Section */}
          <div className="mb-4">
            <h4 className="text-sm font-semibold text-gray-600 mb-2">
              TRIGGERS
            </h4>
            <ToolListItem
              icon="⚡"
              title="Basic trigger"
              description="Generates bundles with their own structure."
            />
          </div>

          {/* ACTIONS Section (Using DaisyUI collapse for visual style) */}
          <div className="collapse collapse-arrow bg-base-100 rounded-lg shadow-sm">
            <input type="checkbox" defaultChecked />
            <div className="collapse-title text-md font-medium px-4 py-2 text-gray-800">
              ACTIONS
            </div>
            <div className="collapse-content space-y-2 p-3 pt-0">
              <ToolListItem
                icon="🔢"
                title="Get multiple variables"
                description="Get values of a previously stored variables."
              />
              <ToolListItem
                icon="⬇️"
                title="Get variable"
                description="Get the value of a previously stored variable."
              />
              <ToolListItem
                icon="➕"
                title="Increment function"
                description="Returns a value of 1 after first run."
              />
              <ToolListItem
                icon="💤"
                title="Sleep"
                description="Delays execution for a specified period of time."
              />
            </div>
          </div>

          {/* Other Collapsible Sections */}
          <div className="collapse collapse-arrow bg-base-100 rounded-lg shadow-sm">
            <input type="checkbox" />
            <div className="collapse-title text-md font-medium px-4 py-2 text-gray-800">
              Text Parcel
            </div>
          </div>
          <div className="collapse collapse-arrow bg-base-100 rounded-lg shadow-sm">
            <input type="checkbox" />
            <div className="collapse-title text-md font-medium px-4 py-2 text-gray-800">
              Google Sheets
            </div>
          </div>
          <div className="collapse collapse-arrow bg-base-100 rounded-lg shadow-sm">
            <input type="checkbox" />
            <div className="collapse-title text-md font-medium px-4 py-2 text-gray-800">
              Tools
            </div>
          </div>
          <div className="collapse collapse-arrow bg-base-100 rounded-lg shadow-sm">
            <input type="checkbox" />
            <div className="collapse-title text-md font-medium px-4 py-2 text-gray-800">
              Google Drive
            </div>
          </div>

          {/* AI Help Button */}
          <div className="pt-4 flex justify-center">
            <button className="btn btn-sm btn-outline btn-primary normal-case">
              ✨ AI **Help**
            </button>
          </div>
        </div>
      </aside>
    </div>
  );
};

export default DashBoardLayout;
