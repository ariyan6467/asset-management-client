import React from 'react';
import Navbar from './Page/Home/Navbar/Navbar';
import Footer from './Page/Home/Footer/Footer';
import { Outlet } from 'react-router';

const Root = () => {
    return (
        <div>
             <Navbar></Navbar>
            <Outlet></Outlet>
            <Footer></Footer>
        </div>
    );
};

export default Root;