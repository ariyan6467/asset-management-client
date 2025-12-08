import React from 'react';
import {
  Package,        // For Asset Inventory
  Users,          // For Employee Management
  FileText,       // For Request Workflows
  BarChart2,      // For Analytics & Reports
  Bell,           // For Smart Notifications
  Lock,           // For Secure & Compliant
} from 'lucide-react'; // Example icons from lucide-react

// --- Feature Card Component ---
const FeatureGridCard = ({ icon: Icon, title, description }) => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-100 flex flex-col items-start text-left h-full">
      {/* Icon Container */}
      <div className="p-3 mb-4 bg-blue-50 border border-blue-100 rounded-lg inline-flex items-center justify-center">
        <Icon className="w-6 h-6 text-blue-600" />
      </div>
      
      {/* Title */}
      <h3 className="text-xl font-semibold text-gray-900 mb-2">{title}</h3>
      
      {/* Description */}
      <p className="text-gray-600 text-sm">{description}</p>
    </div>
  );
};

// --- Main Section Component ---
const FeaturesSection = () => {
  const features = [
    {
      icon: Package,
      title: 'Asset Inventory',
      description:
        'Centralized repository for all company assets with detailed tracking and categorization.',
    },
    {
      icon: Users,
      title: 'Employee Management',
      description:
        'Seamlessly manage employee affiliations across multiple companies and departments.',
    },
    {
      icon: FileText,
      title: 'Request Workflows',
      description:
        'Streamlined approval process for asset requests with automated notifications.',
    },
    {
      icon: BarChart2,
      title: 'Analytics & Reports',
      description:
        'Comprehensive dashboards with real-time insights and exportable reports.',
    },
    {
      icon: Bell,
      title: 'Smart Notifications',
      description:
        'Instant alerts for pending requests, approvals, and asset returns.',
    },
    {
      icon: Lock,
      title: 'Secure & Compliant',
      description:
        'Enterprise-grade security with role-based access control and audit trails.',
    },
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Title and Subtitle */}
        <p className="text-sm font-medium text-blue-600 uppercase tracking-wider mb-2 bg-blue-100 py-1 px-3 inline-block rounded-full">
          Features
        </p>
        <h2 className="text-4xl font-extrabold text-gray-900 sm:text-5xl mb-4">
          Everything You Need to Manage Assets
        </h2>
        <p className="max-w-3xl mx-auto text-lg text-gray-600 mb-16">
          Powerful features designed to simplify asset management for HR teams and employees alike.
        </p>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <FeatureGridCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;