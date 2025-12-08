import React from 'react';

import { Check, Zap } from 'lucide-react'; // Icons for checkmarks and the Premium badge

// --- Checkmark Feature Component ---
const FeatureListItem = ({ children, isIncluded = true }) => {
  return (
    <li className={`flex items-start mb-3 ${isIncluded ? 'text-gray-700' : 'text-gray-400'}`}>
      <Check className={`w-5 h-5 mr-2 flex-shrink-0 ${isIncluded ? 'text-green-500' : 'text-gray-400'}`} />
      <span className="text-sm">{children}</span>
    </li>
  );
};

// --- Pricing Card Component ---
const PricingCard = ({
  plan,
  description,
  price,
  employeeLimit,
  features,
  isPopular = false,
  buttonText = 'Get Started',
}) => {
  const cardClasses = isPopular
    ? 'bg-blue-600 text-white shadow-2xl scale-105 transition-transform duration-300'
    : 'bg-white text-gray-900 shadow-xl border border-gray-200';
  
  const titleClasses = isPopular ? 'text-white' : 'text-gray-900';
  const priceClasses = isPopular ? 'text-white' : 'text-gray-900';
  const buttonClasses = isPopular
    ? 'bg-teal-400 hover:bg-teal-300 text-blue-900 font-bold'
    : 'bg-blue-600 hover:bg-blue-700 text-white font-bold';

  return (
    <div className={`relative p-8 rounded-2xl flex flex-col ${cardClasses}`}>
      {/* Most Popular Badge */}
      {isPopular && (
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-teal-400 text-blue-900 text-xs font-semibold px-4 py-1.5 rounded-full shadow-lg">
          Most Popular
        </div>
      )}

      {/* Plan Header */}
      <div className="text-center mb-8">
        <h3 className={`text-2xl font-bold ${titleClasses}`}>{plan}</h3>
        <p className={`text-sm mb-4 ${isPopular ? 'text-blue-200' : 'text-gray-500'}`}>
          {description}
        </p>
        <div className="flex items-end justify-center">
          <span className={`text-4xl font-extrabold ${priceClasses}`}>
            ${price}
          </span>
          <span className={`text-xl font-medium ml-2 ${isPopular ? 'text-blue-200' : 'text-gray-500'}`}>
            /employee/month
          </span>
        </div>
        <p className={`mt-1 text-sm ${isPopular ? 'text-blue-200' : 'text-gray-500'}`}>
          Up to {employeeLimit} employees
        </p>
      </div>

      {/* Features List */}
      <ul className={`flex-grow space-y-3 ${isPopular ? 'text-blue-100' : 'text-gray-700'}`}>
        {features.map((feature, index) => (
          <li key={index} className="flex items-center">
            <Check className={`w-5 h-5 mr-3 flex-shrink-0 ${isPopular ? 'text-teal-400' : 'text-green-500'}`} />
            <span className="text-sm">{feature}</span>
          </li>
        ))}
      </ul>

      {/* Action Button */}
      <div className="mt-8">
        <button
          className={`w-full py-3 px-6 rounded-lg text-lg transition-colors duration-200 ${buttonClasses}`}
        >
          {buttonText}
        </button>
      </div>
    </div>
  );
};

const UpgradePackage = () => {
     const basicFeatures = [
    'Asset Tracking',
    'Employee Management',
    'Basic Support',
    'Email Notifications',
    'Basic Reports',
  ];

  const standardFeatures = [
    'All Basic features',
    'Advanced Analytics',
    'Priority Support',
    'Custom Categories',
    'Export Reports',
    'API Access',
  ];
  
  const premiumFeatures = [
    'All Standard features',
    'Custom Branding',
    '24/7 Support',
    'Advanced Integrations',
    'Dedicated Account Manager',
    'Unlimited Asset Types',
    'Audit Logs',
  ];

    return (
          <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Header */}
        <h2 className="text-4xl font-extrabold text-gray-900 sm:text-5xl mb-3">
          Choose the Perfect Plan for Your Team
        </h2>
        <p className="max-w-3xl mx-auto text-lg text-gray-600 mb-16">
          Start free and scale as you grow. All plans include core features with no hidden fees.
        </p>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-3 lg:gap-8">
          
          {/* Basic Plan */}
          <PricingCard
            plan="Basic"
            description="Perfect for small teams getting started"
            price={5}
            employeeLimit={5}
            features={basicFeatures}
          />

          {/* Standard Plan (Most Popular) */}
          <PricingCard
            plan="Standard"
            description="Ideal for growing businesses"
            price={8}
            employeeLimit={10}
            features={standardFeatures}
            isPopular={true}
          />

          {/* Premium Plan */}
          <PricingCard
            plan="Premium"
            description="For enterprises with complex needs"
            price={15}
            employeeLimit={20}
            features={premiumFeatures}
            // Note: Added a Zap icon in the image but not explicitly in the code structure for simplicity.
            // You can add a badge similar to the "Most Popular" one if needed.
          />
        </div>
      </div>
    </section>
    );
};

export default UpgradePackage;