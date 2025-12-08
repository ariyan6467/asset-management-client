import React from 'react';
import { ArrowRight, Mail } from 'lucide-react'; // Icons for the buttons

// --- Main CTA Section Component ---
const ReadyToTransformCTA = () => {
  return (
    <section className="py-20 bg-blue-900 overflow-hidden relative">
      {/* Background Pattern (subtle dots/crosshatch effect) */}
      <div 
        className="absolute inset-0 opacity-10" 
        style={{
          backgroundImage: `radial-gradient(#ffffff33 1px, transparent 1px)`,
          backgroundSize: '20px 20px',
        }}
      ></div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        
        {/* Title */}
        <h2 className="text-4xl sm:text-5xl font-extrabold text-white mb-6">
          Ready to Transform Your Asset Management?
        </h2>
        
        {/* Description */}
        <p className="text-lg text-blue-200 mb-10 max-w-2xl mx-auto">
          Join hundreds of companies that trust AssetVerse to manage their assets efficiently. Start your free trial today – no credit card required.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4">
          
          {/* Start Free Trial Button (Prominent, primary) */}
          <button className="flex items-center justify-center w-full sm:w-auto py-3 px-8 text-lg font-bold rounded-lg 
                             bg-teal-400 text-blue-900 hover:bg-teal-300 transition-colors duration-200 shadow-xl">
            Start Free Trial <ArrowRight className="w-5 h-5 ml-2" />
          </button>

          {/* Contact Sales Button (Secondary, outlined) */}
          <button className="flex items-center justify-center w-full sm:w-auto py-3 px-8 text-lg font-bold rounded-lg 
                             border-2 border-white text-white hover:bg-white hover:text-blue-900 transition-colors duration-200">
            <Mail className="w-5 h-5 mr-2" /> Contact Sales
          </button>
        </div>

        {/* Small Print/Disclaimer */}
        <p className="text-sm text-blue-300 mt-6">
          Free 14-day trial • No credit card required • Cancel anytime
        </p>
      </div>
    </section>
  );
};

export default ReadyToTransformCTA;