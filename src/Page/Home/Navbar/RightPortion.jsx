import React, { useContext } from "react";
import { BsPersonWorkspace } from "react-icons/bs";
import { FaHome } from "react-icons/fa";
import { FcManager } from "react-icons/fc";
import { IoIosLogIn } from "react-icons/io";
import { NavLink } from "react-router";
import styled from "styled-components";
import { AuthContext } from "../../../Authantication/Authprovider";
import { CiLogout } from "react-icons/ci";
import { MdDashboard } from "react-icons/md";
import UseAuth from "../../../hook/UseAuth";
const RightNav = () => {
  const { handleLogeOut } = UseAuth();
  console.log(handleLogeOut);
  function signOut(){
     handleLogeOut()
     .then(()=>{
      alert("signout successfull")
     })
     .catch((error)=> {
      console.error(error.message);
     })
  }
  return (
    <StyledWrapper>
     <div className="button-container">
  {/* Home Button */}
  <button className="button" data-tip="Home">
    <NavLink
      to="/"
      className="text-gray-600 font-serif hover:text-white font-medium transition duration-200 text-sm"
    >
      <FaHome />
    </NavLink>
  </button>

  {/* Employee Login Button */}
  <button className="button" data-tip="Employee Portal">
    <NavLink
      to="/employee-login"
      className="text-gray-600 font-serif hover:text-white font-medium transition duration-200 text-sm"
    >
      <BsPersonWorkspace />
    </NavLink>
  </button>

  {/* HR Login Button */}
  <button className="button" data-tip="HR Management">
    <NavLink
      to="/hr-login"
      className="text-gray-600 font-serif hover:text-white font-medium transition duration-200 text-sm"
    >
      <FcManager />
    </NavLink>
  </button>

  {/* Login Button */}
  <button className="button" data-tip="User Login">
    <NavLink to="/normal-login">
      <IoIosLogIn />
    </NavLink>
  </button>

  {/* Logout Button */}
  <button 
    onClick={signOut}
    className="button" 
    data-tip="Sign Out"
  >
    <CiLogout />
  </button>

  {/* Dashboard Button */}
  <button className="button" data-tip="Dashboard">
    <NavLink to="/dashboard">
      <MdDashboard />
    </NavLink>
  </button>
</div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .button-container {
    display: flex;
    background-color: #38b2ac; /* Teal-400 color */
    width: 250px;
    height: 40px;
    align-items: center;
    justify-content: space-around;
    border-radius: 10px;
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px,
      rgba(56, 178, 172, 0.5) 5px 10px 15px; /* Adjusted shadow to match teal color */
  }

  .button {
    outline: 0 !important;
    border: 0 !important;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background-color: transparent;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
    transition: all ease-in-out 0.3s;
    cursor: pointer;
  }

  .button:hover {
    transform: translateY(-3px);
  }

  .icon {
    font-size: 20px;
  }
`;

export default RightNav;

//  <NavLink
//             to="/"
//             className="text-gray-600 font-serif  hover:text-white font-medium transition duration-200 text-sm"
//           >
//             <FaHome />
//           </NavLink>
//           <NavLink
//             to="/employee-login"
//             className="text-gray-600 font-serif  hover:text-white font-medium transition duration-200 text-sm"
//           >
//               <BsPersonWorkspace />
//           </NavLink>
//           <NavLink
//             to="/hr-login"
//             className="text-gray-600 font-serif hover:text-white font-medium transition duration-200 text-sm"
//           >
//              <FcManager />
//           </NavLink>
//           <NavLink
//           to="/normal-login"
//           >
//              <button className="bg-white text-[#064BB5] hover:bg-blue-50 font-bold py-2.5 px-6 rounded-lg transition duration-200 shadow-lg text-sm">
//               <IoIosLogIn />
//           </button>
//           </NavLink>
