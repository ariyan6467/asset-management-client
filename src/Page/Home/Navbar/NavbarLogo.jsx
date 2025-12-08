import React from 'react';
import Logo from './Logo';

const NavbarLogo = () => {
    return (
        <div className="flex items-center  gap-2 text-2xl font-bold tracking-tight">
            <div className="p-1.5 bg-white rounded-lg">
              <Logo></Logo>
            </div>
            <span className="text-white">Asset</span><span className="text-blue-200">Verse</span>
        </div>
    );
};

export default NavbarLogo;
