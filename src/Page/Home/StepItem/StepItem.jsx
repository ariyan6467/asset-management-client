import React from 'react';
import { UserPlus, Box, CheckCircle } from 'lucide-react'; // Example icons from lucide-react

// --- Step Item Component ---
const StepItem = ({ icon: Icon, stepNumber, title, description, isLast }) => {
  return (
    <div className="flex flex-col items-center text-center relative px-4">
      {/* Icon Container */}
      <div className="p-4 mb-4 bg-blue-50 border border-blue-100 rounded-lg inline-flex items-center justify-center">
        <Icon className="w-8 h-8 text-blue-600" />
      </div>

      {/* Title */}
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        {stepNumber}. {title}
      </h3>

      {/* Description */}
      <p className="text-sm text-gray-600 max-w-xs">{description}</p>

      {/* Connecting Line (Desktop Only) */}
      {!isLast && (
        <div className="hidden lg:block absolute top-10 transform -translate-y-1/2 left-1/2 w-[calc(100%+8rem)] h-px bg-gray-300 pointer-events-none z-0"></div>
      )}
    </div>
  );
};

// --- Main Section Component ---
const GetStartedStepsSection = () => {
  const steps = [
    {
      icon: UserPlus,
      title: 'Register Your Company',
      description:
        'Sign up as an HR Manager, add your company details, and get started with our free basic plan instantly.',
    },
    {
      icon: Box,
      title: 'Add Your Assets',
      description:
        'Upload your asset inventory, categorize items, and set quantities. Track returnable and non-returnable items separately.',
    },
    {
      icon: CheckCircle,
      title: 'Manage & Track',
      description:
        'Approve employee requests, assign assets directly, and get real-time visibility into your entire asset ecosystem.',
    },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Title and Subtitle */}
        <p className="text-sm font-medium text-blue-600 uppercase tracking-wider mb-2 bg-gray-100 py-1 px-3 inline-block rounded-full">
          How it Works
        </p>
        <h2 className="text-4xl font-extrabold text-gray-900 mb-4">
          Get Started in Three Simple Steps
        </h2>
        <p className="max-w-4xl mx-auto text-lg text-gray-600 mb-16">
          AssetVerse is designed to be intuitive. Get your asset management system up and running in minutes.
        </p>

        {/* Steps Grid */}
        {/* We use a flex container for alignment and to manage the pseudo-line */}
        <div className="flex justify-between relative">
          {steps.map((step, index) => (
            <StepItem
              key={index}
              icon={step.icon}
              stepNumber={index + 1}
              title={step.title}
              description={step.description}
              // The connecting line is visually handled by positioning the items in the flex container
              // and the StepItem component's absolute positioning logic.
              isLast={index === steps.length - 1}
            />
          ))}
        </div>
        {/* Simple visual line for mobile/tablet where the absolute line in StepItem is hidden */}
        <div className="lg:hidden w-full h-px bg-gray-300 mt-[-40px]"></div>

      </div>
    </section>
  );
};

export default GetStartedStepsSection;