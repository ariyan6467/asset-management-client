import React, { useState, useEffect } from "react";
import NavbarLogo from "./NavbarLogo";
import { NavLink } from "react-router";
import RightNav from "./RightPortion";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

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
          <button className="text-white hover:text-blue-200 font-semibold py-1.5 px-4 rounded-lg transition duration-200 text-sm mr-2">
            Login
          </button>
          <button
            id="menu-button"
            className="text-white focus:outline-none"
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
        <a
          href="#"
          className="block px-8 py-3 text-white hover:bg-white/10 font-medium"
        >
          Home
        </a>
        <a
          href="#"
          className="block px-8 py-3 text-white hover:bg-white/10 font-medium"
        >
          Join as Employee
        </a>
        <a
          href="#"
          className="block px-8 py-3 text-white hover:bg-white/10 font-medium"
        >
          Join as HR Manager
        </a>
      </div>
    </nav>
  );
};

export default Navbar;
