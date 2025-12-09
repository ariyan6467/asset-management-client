// PaymentDeclinedPage.js
import React from 'react';

// You'll need to install an icon library like 'react-icons' for this to work:
// npm install react-icons
import { HiExclamation } from 'react-icons/hi';
import { NavLink } from 'react-router';

// Function to handle the 'Try Again' action
const handleTryAgain = () => {
  console.log("Attempting to try payment again...");

};

// Function to handle the 'Back to Campaign' action
const handleBackToCampaign = () => {
  console.log("Navigating back to the main campaign/product page...");
 
};

function PaymentDeclinedPage() {
  return (
    // Outer container to center the content on the screen
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      
      {/* Card/Container that holds the message (max-width for typical modal/card size) */}
      <div className="bg-white rounded-xl shadow-2xl p-8 md:p-12 w-full max-w-sm text-center">
        
        {/* --- 1. Iconic Warning Symbol --- */}
        <div className="flex justify-center mb-6">
          <div className="relative">
            {/* Outer pulsating/gradient ring (Light Pink/Red) */}
            <div className="w-24 h-24 rounded-full bg-red-100 opacity-60 flex items-center justify-center">
              {/* Inner Red Circle */}
              <div className="w-16 h-16 rounded-full bg-red-500 flex items-center justify-center shadow-lg">
                {/* Exclamation Mark Icon */}
                <HiExclamation className="w-10 h-10 text-white" />
              </div>
            </div>
          </div>
        </div>

        {/* --- 2. Text Content --- */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">
            Uh oh!
          </h2>
          <p className="text-gray-600 text-lg">
            Your credit card was declined.
          </p>
        </div>

        {/* --- 3. Action Buttons --- */}
        <div className="flex flex-col gap-3">
          
          {/* Primary Action: Try Again */}
 <NavLink to="/dashboard/upgrade-package">
              <button 
            className="btn btn-primary w-full text-white text-base font-semibold py-3"
            onClick={handleTryAgain}
          >
            Try again
          </button>
 </NavLink>

          {/* Secondary Action: Back to Campaign */}
          <NavLink to="/">
             <button 
            className="btn btn-ghost w-full bg-gray-100 hover:bg-gray-200 text-gray-600 text-base py-3 border-none"
            onClick={handleBackToCampaign}
          >
            Back to Home
          </button>
          </NavLink>
        </div>

      </div>
    </div>
  );
}

export default PaymentDeclinedPage;