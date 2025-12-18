import React from 'react';
import { NavLink } from 'react-router';

// Define the colors used in the illustration for easier maintenance
const Colors = {
  // Wizard elements
  HAT: 'bg-indigo-600',
  ROBE: 'bg-indigo-400',
  BEARD: 'bg-white',
  SKIN: 'bg-orange-100',
  SWORD_HANDLE: 'bg-yellow-500',
  WAND_TIP: 'bg-red-500',
  // Webpage elements
  BG: 'bg-gray-100',
  BROWSER_BAR: 'bg-blue-800',
};

const ForbiddenAccessPage = () => {

  // Function to simulate clicking the Back to Dashboard link
  

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 text-gray-700 font-sans p-6">
      
      {/* --- Main Illustration Container --- */}
      <div className="relative w-[300px] h-[250px] mb-12">
        
        {/* Web Browser/Dashboard Background (Tailwind used for most) */}
        <div className={`absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-[180px] border-4 border-b-0 border-blue-800 rounded-t-lg shadow-xl ${Colors.BG}`}
             style={{ transform: 'translateX(-50%) rotate(-3deg)' }}>
          {/* Browser Top Bar */}
          <div className={`h-6 flex items-center p-2 rounded-t-lg ${Colors.BROWSER_BAR}`}>
            <div className="flex space-x-1">
              <span className="w-2 h-2 bg-red-500 rounded-full"></span>
              <span className="w-2 h-2 bg-yellow-400 rounded-full"></span>
              <span className="w-2 h-2 bg-green-500 rounded-full"></span>
            </div>
          </div>
          {/* Dashboard Content Mockup */}
          <div className="p-4 space-y-2">
            <div className="w-2/3 h-3 bg-white rounded"></div>
            <div className="flex space-x-2">
                <div className="w-1/3 h-16 bg-white rounded shadow-sm"></div>
                <div className="w-2/3 h-16 bg-white rounded shadow-sm relative">
                  {/* Small Item in Dashboard */}
                  <div className="absolute bottom-1 right-2 w-4 h-4 bg-gray-200 rounded"></div>
                </div>
            </div>
          </div>
        </div>
        
        {/* --- The Wizard Character --- */}
        <div className="absolute bottom-[20px] left-1/2 -translate-x-1/2 z-10 scale-90">
          
          {/* Robe/Body (Brown part) */}
          <div className="w-24 h-16 bg-amber-800 rounded-t-xl mx-auto absolute bottom-0 left-1/2 -translate-x-1/2"></div>

          {/* Wizard Robe (Blue part) */}
          <div className={`w-32 h-24 ${Colors.ROBE} rounded-t-3xl mx-auto relative overflow-hidden`} 
               style={{ top: '30px' }}>
             {/* Robe fold line */}
             <div className="absolute top-0 left-1/2 h-full w-0.5 bg-blue-700 opacity-20"></div>
          </div>

          {/* Beard and Face */}
          <div className="absolute top-[50px] left-1/2 -translate-x-1/2">
            {/* Beard */}
            <div className={`w-20 h-16 ${Colors.BEARD} rounded-b-full rounded-t-lg shadow-md`}></div>
            {/* Face */}
            <div className={`w-12 h-6 ${Colors.SKIN} rounded-t-full mx-auto absolute top-0 left-1/2 -translate-x-1/2 flex justify-around items-end`}>
              {/* Eyes */}
              <div className="w-1 h-1 bg-gray-800 rounded-full"></div>
              <div className="w-1 h-1 bg-gray-800 rounded-full"></div>
              {/* Smile */}
              <div className="w-4 h-1 bg-gray-800 rounded-b-full absolute bottom-0 left-1/2 -translate-x-1/2" style={{ borderTop: '1px solid white' }}></div>
            </div>
            {/* Moustache */}
            <div className={`w-12 h-2 ${Colors.BEARD} absolute top-4 left-1/2 -translate-x-1/2 rounded-full shadow-sm`}></div>
          </div>
          
          {/* Hat (Cone) */}
          <div className={`w-20 h-20 ${Colors.HAT} mx-auto absolute top-0 left-1/2 -translate-x-1/2`}
               style={{ clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)' }}>
          </div>
          
          {/* Arms and Props */}
          {/* Left Arm (holding sword) */}
          <div className={`w-4 h-12 ${Colors.ROBE} absolute top-12 -left-4 rounded-full`} style={{ transform: 'rotate(-25deg)' }}>
            {/* Hand */}
            <div className={`w-4 h-4 ${Colors.SKIN} absolute -right-0 -top-2 rounded-full`}></div>
          </div>
          
          {/* Right Arm (holding staff/wand) */}
          <div className={`w-4 h-12 ${Colors.ROBE} absolute top-12 -right-4 rounded-full`} style={{ transform: 'rotate(25deg)' }}>
            {/* Hand */}
            <div className={`w-4 h-4 ${Colors.SKIN} absolute -left-0 -top-2 rounded-full`}></div>
          </div>
          
          {/* The Sword */}
          <div className="absolute top-8 -left-12" style={{ transform: 'rotate(-10deg)' }}>
            {/* Blade */}
            <div className="w-1 h-16 bg-gray-400 rounded-t-sm"></div>
            {/* Guard */}
            <div className={`w-8 h-1 ${Colors.SWORD_HANDLE} absolute -left-3 top-14`}></div>
            {/* Handle */}
            <div className={`w-1 h-4 ${Colors.SWORD_HANDLE} absolute top-15 left-0`}></div>
          </div>

          {/* The Staff/Wand */}
          <div className="absolute top-12 -right-10" style={{ transform: 'rotate(15deg)' }}>
            {/* Staff Wood */}
            <div className="w-2 h-24 bg-amber-900 rounded-full"></div>
            {/* Red Tip */}
            <div className={`w-4 h-4 ${Colors.WAND_TIP} rounded-full absolute -top-1 left-1/2 -translate-x-1/2 border border-red-800 shadow-md`}></div>
          </div>

        </div>

      </div>

      {/* --- Text Messages --- */}
      <div className="mt-4">
        <h1 className="text-2xl md:text-3xl font-extrabold tracking-wider text-blue-900 mb-2">
          403 | YOU SHALL NOT PASS!
        </h1>
        <p className="text-base text-gray-500 mb-6">
          You don't have permission to access this page.
        </p>

        {/* --- Back to Dashboard Link --- */}
        <NavLink 
         to="/"
         
          className="text-sm font-semibold text-indigo-600 hover:text-indigo-800 transition duration-150 ease-in-out inline-flex items-center group"
        >
          <svg className="w-4 h-4 mr-1 transition-transform group-hover:-translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
          </svg>
          Back to 🏠
        </NavLink>
      </div>
    </div>
  );
};

export default ForbiddenAccessPage;