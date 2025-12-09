// PaymentSuccessPage.js
import React, { useEffect } from "react";
// We'll use the HiOutlineHome icon, but you can choose any icon library.
import { HiOutlineHome } from "react-icons/hi";
import { NavLink, useSearchParams } from "react-router";
import UseAxiosSecure from "../../../hook/UseAxiosSecure";

// Function to simulate the Home navigation action
const handleGoHome = () => {
  // Replace this with your actual routing logic (e.g., using React Router's useNavigate)
  console.log("Navigating back to Home!");
 
};

function PaymentSuccessPage() {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get('session_id')
  console.log(sessionId);
const axiosSecure = UseAxiosSecure();

useEffect(()=>{
     if(sessionId){
        axiosSecure.patch(`/package-payment-successful?session_id=${sessionId}`)
        .then(res => {
            console.log(res.data);
        })
     }

},[sessionId,axiosSecure])



  return (
    // Outer container for centering and background
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      {/* Card/Page Container (White Background) */}
      <div className="bg-white rounded-xl shadow-2xl p-8 md:p-12 w-full max-w-2xl text-center border-t-8 border-yellow-400">
        {/* --- 1. Illustration Area --- */}
        <div className="relative mb-12 flex justify-center">
          {/* Large, transparent "Thank You!" background text */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <h1 className="text-8xl md:text-[10rem] font-extrabold text-gray-100 opacity-60 pointer-events-none whitespace-nowrap">
              Thank You!
            </h1>
          </div>

          {/* Placeholder for the main illustration */}
          {/* Note: In a real app, you would replace this with an SVG component */}
          <div className="w-56 h-56 z-10">
            {/* The actual illustration is complex. We use a placeholder DIV with colors 
               and a large yellow circle in the background to mimic the visual structure. */}
            <div className="relative w-full h-full">
              {/* Large Yellow Coin (Background) */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-40 h-40 bg-yellow-400 rounded-full opacity-60"></div>

              {/* Placeholder for the main mobile/card illustration */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-2 bg-blue-500 rounded-lg shadow-xl border-4 border-white">
                <p className="text-white text-sm font-bold">
                  Success graphic here
                </p>
                <div className="w-12 h-20 bg-green-400 rounded-md mt-1 mx-auto flex items-center justify-center text-xs text-blue-900 font-bold">
                  $
                </div>
              </div>

              {/* Red Credit Card Placeholder */}
              <div className="absolute bottom-10 left-0 w-24 h-14 bg-red-600 rounded-md shadow-lg">
                <p className="text-white text-[8px] mt-2 ml-1">
                  XXXX XXXX 2552
                </p>
              </div>

              {/* Floating Gold Coin 1 */}
              <div className="absolute top-4 right-1/4 w-8 h-8 bg-yellow-500 rounded-full shadow-md border-2 border-yellow-700 flex items-center justify-center text-xs font-bold">
                $
              </div>
              {/* Floating Gold Coin 2 */}
              <div className="absolute top-10 left-3/4 w-6 h-6 bg-yellow-500 rounded-full shadow-md border-2 border-yellow-700 flex items-center justify-center text-xs font-bold">
                $
              </div>
            </div>
          </div>
        </div>

        {/* --- 2. Text Content --- */}
        <div className="mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-3">
            Your Payment is Successful!
          </h2>
          <p className="text-gray-600 max-w-md mx-auto">
            Thank you for your payment. An automated payment receipt will be
            sent to your registered email.
          </p>
        </div>

        {/* --- 3. Home Navigation Button (Icon Only) --- */}
        <NavLink to="/">
          <div className="pt-4">
            <button
              className="btn btn-lg btn-circle btn-error text-white shadow-xl hover:bg-error-focus transition-all"
              onClick={handleGoHome}
              aria-label="Back to Home"
            >
              <HiOutlineHome className="w-7 h-7" />
            </button>
          </div>
        </NavLink>
        {/* --- Footer Accent (Mimicking the bottom yellow bar) --- */}
        <div className="absolute bottom-0 left-0 right-0 h-2 bg-yellow-400 rounded-b-xl"></div>
      </div>
    </div>
  );
}

export default PaymentSuccessPage;
