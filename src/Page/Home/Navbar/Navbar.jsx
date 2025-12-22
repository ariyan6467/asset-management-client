import React, { useState, useEffect } from "react";
import NavbarLogo from "./NavbarLogo";
import { NavLink } from "react-router";
import RightNav from "./RightPortion";
import { FaHome } from "react-icons/fa";
import { BsPersonWorkspace } from "react-icons/bs";
import { FcManager } from "react-icons/fc";
import { IoIosLogIn } from "react-icons/io";
import { CiLogout } from "react-icons/ci";
import { MdDashboard } from "react-icons/md";
import DropDownProfile from "./DropDownProfile";
import UseAuth from "../../../hook/UseAuth";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

   const { handleLogeOut, user } = UseAuth();

  function signOut() {
    handleLogeOut()
      .then(() => {
        alert("signout successfull");
      })
      .catch((error) => {
        console.error(error.message);
      });
  }




  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all  max-w-[1900px] text-blue rounded-b-full mx-auto duration-300 ${
        scrolled
          ? "   backdrop-blur-md shadow-lg py-2"
          : "mx-auto text-red py-4"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between  p-5 rounded-2xl items-center">
        {/* Logo */}
        <NavbarLogo />

        {/* Mobile Menu and Login Button Wrapper */}
        <div className="sm:hidden flex items-center">
         
          <button
            id="menu-button"
            className="text-blue-500 focus:outline-none"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {/* Hamburger Icon */}
            <svg
              id="icon-menu"
              className={`w-6 h-6 ${isMobileMenuOpen ? "hidden" : "block"}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16m-7 6h7"
              ></path>
            </svg>
            {/* Close Icon */}
            <svg
              id="icon-close"
              className={`w-6 h-6 ${isMobileMenuOpen ? "block" : "hidden"}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              ></path>
            </svg>
          </button>
        </div>

        {/* Desktop Links & Buttons */}
        <div className="hidden sm:flex items-center space-x-8">
         <RightNav></RightNav>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        id="mobile-menu"
        className={`${
          isMobileMenuOpen ? "block" : "hidden"
        } sm:hidden bg-[#064BB5] w-full border-t border-blue-400/30 py-4 absolute top-full left-0 shadow-xl`}
      >
       
 <div className="flex flex-col gap-2 px-6">
          <NavLink
            to="/"
            className="flex items-center gap-3 rounded-md px-3 py-2 text-white hover:bg-white/10 font-medium"
          >
            <FaHome className="text-lg" />
            <span>Home</span>
          </NavLink>

          <NavLink
            to="/employee-login"
            className="flex items-center gap-3 rounded-md px-3 py-2 text-white hover:bg-white/10 font-medium"
          >
            <BsPersonWorkspace className="text-lg" />
            <span>Join as Employee</span>
          </NavLink>

          <NavLink
            to="/hr-login"
            className="flex items-center gap-3 rounded-md px-3 py-2 text-white hover:bg-white/10 font-medium"
          >
            <FcManager className="text-lg" />
            <span>Join as HR Manager</span>
          </NavLink>

          <NavLink
            to="/normal-login"
            className="flex items-center gap-3 rounded-md px-3 py-2 text-white hover:bg-white/10 font-medium"
          >
            <IoIosLogIn className="text-lg" />
            <span>User Login</span>
          </NavLink>

          {user !== null && (
            <>
              <NavLink
                to="/dashboard"
                className="flex items-center gap-3 rounded-md px-3 py-2 text-white hover:bg-white/10 font-medium"
              >
                <MdDashboard className="text-lg" />
                <span>Dashboard</span>
              </NavLink>

              <button
                type="button"
                onClick={signOut}
                className="flex items-center gap-3 rounded-md px-3 py-2 text-white hover:bg-white/10 font-medium text-left"
              >
                <CiLogout className="text-lg" />
                <span>Sign Out</span>
              </button>

              <div className="flex items-center gap-3 px-3 py-2">
                <span className="text-sm text-white/80">Profile</span>
                <DropDownProfile />
              </div>
            </>
          )}
        </div>


      </div>
    </nav>
  );
};

export default Navbar;
