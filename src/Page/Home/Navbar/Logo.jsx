import React from 'react';

const Logo = () => {
    return (
        <svg 
    width="28" 
    height="28" 
    viewBox="0 0 24 24" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
    className="transform rotate-3" // Optional: A slight rotation for flair
  >
    {/* Define a linear gradient using your brand colors */}
    <defs>
      <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style={{stopColor: '#38BDF8', stopOpacity: 1}} /> {/* Light Blue */}
        <stop offset="100%" style={{stopColor: '#14B8A6', stopOpacity: 1}} /> {/* Teal */}
      </linearGradient>
    </defs>

    {/* Main Package/Hexagon shape (using the updated path with a slight outline) */}
    <path 
      d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" 
      fill="url(#logoGradient)" 
      stroke="#ffffff50" // A subtle white outline
      strokeWidth="0.5"
    />
    
    {/* Internal lines for dimension/depth */}
    <polyline 
      points="3.27 6.96 12 12.01 20.73 6.96" 
      stroke="#ffffff80" 
      strokeWidth="1.5" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
    />
    <line 
      x1="12" 
      y1="22.08" 
      x2="12" 
      y2="12" 
      stroke="#ffffff80" 
      strokeWidth="1.5" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
    />
  </svg>
    );
};

export default Logo;