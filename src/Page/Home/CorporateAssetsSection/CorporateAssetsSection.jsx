import React from 'react';
import { ShieldAlert, TrendingUp, Clock, Users } from 'lucide-react'; // Example icons from lucide-react

// --- Card Component ---
const FeatureCard = ({ icon: Icon, title, description }) => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100 flex flex-col">
      <div className="mb-4">
        {/* The icon container mimicking the original's style */}
        <div className="p-3 bg-blue-50 border border-blue-100 rounded-lg inline-flex items-center justify-center">
          <Icon className="w-6 h-6 text-blue-600" />
        </div>
      </div>
      <h3 className="text-xl font-semibold text-gray-900 mb-3">{title}</h3>
      <p className="text-gray-600 text-sm">{description}</p>
    </div>
  );
};

// --- Main Section Component ---
const CorporateAssetsSection = () => {
  const features = [
    {
      icon: ShieldAlert,
      title: 'Enhanced Accountability',
      description:
        'Track every asset from acquisition to disposal. Know exactly who has what at any given moment.',
    },
    {
      icon: TrendingUp,
      title: 'Improved Efficiency',
      description:
        'Automate asset requests, approvals, and returns. Reduce administrative overhead by up to 70%.',
    },
    {
      icon: Clock,
      title: 'Real-time Visibility',
      description:
        'Get instant insights into your asset inventory. Make data-driven decisions with live dashboards.',
    },
    {
      icon: Users,
      title: 'Seamless Collaboration',
      description:
        'Enable employees to request assets easily. HR managers approve with a single click.',
    },
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Title and Subtitle */}
        <p className="text-sm font-medium text-blue-600 uppercase tracking-wider mb-2">
          Why AssetVerse?
        </p>
        <h2 className="text-4xl font-extrabold text-gray-900 sm:text-5xl lg:text-6xl mb-12">
          Transform How You Manage Corporate Assets
        </h2>
        <p className="max-w-3xl mx-auto text-xl text-gray-600 mb-16">
          AssetVerse eliminates the chaos of asset tracking. Our platform brings
          clarity, accountability, and efficiency to your organization's asset
          management.
        </p>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <FeatureCard
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

export default CorporateAssetsSection;