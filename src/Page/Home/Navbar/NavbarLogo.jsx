import React from 'react';
import Logo from './Logo';
import { NavLink } from 'react-router';

const NavbarLogo = () => {
    return (
       <NavLink to="/">
         <div className="flex items-center  gap-2 text-2xl font-bold tracking-tight">
            <div className="p-1.5 bg-white rounded-lg">
              <Logo></Logo>
            </div>
            <span className="text-blue-400">Asset</span><span className="text-blue-400">Verse</span>
        </div>
       </NavLink>
    );
};

export default NavbarLogo;
