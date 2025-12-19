import React from 'react';
import { Quote, Star, ShieldCheck, Zap, Globe, Users } from 'lucide-react';

// --- 1. Metric Card Component ---
const MetricCard = ({ value, label, icon: Icon }) => (
  <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center text-center transition-transform hover:scale-105">
    <div className="p-3 bg-blue-50 rounded-lg mb-4">
      <Icon className="w-6 h-6 text-blue-600" />
    </div>
    <div className="text-3xl font-extrabold text-gray-900 mb-1">{value}</div>
    <div className="text-sm text-gray-500 font-medium uppercase tracking-wide">{label}</div>
  </div>
);

// --- 2. Testimonial Card Component ---
const TestimonialCard = ({ quote, name, title, rating }) => {
  const renderStars = (count) => {
    return Array(5).fill(0).map((_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${i < count ? 'text-yellow-400 fill-yellow-400' : 'text-gray-200'}`}
      />
    ));
  };

  return (
    <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-50 flex flex-col h-full hover:border-blue-200 transition-colors">
      <Quote className="w-10 h-10 text-blue-100 mb-4" />
      <p className="text-gray-700 text-lg leading-relaxed mb-6 flex-grow">
        "{quote}"
      </p>
      <div className="flex space-x-1 mb-6">
        {renderStars(rating)}
      </div>
      <div className="flex items-center pt-6 border-t border-gray-100">
        <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full mr-4 flex items-center justify-center text-white font-bold text-lg shadow-inner">
          {name.charAt(0)}
        </div>
        <div>
          <p className="text-sm font-bold text-gray-900 leading-none mb-1">{name}</p>
          <p className="text-xs text-blue-600 font-medium">{title}</p>
        </div>
      </div>
    </div>
  );
};

// --- 3. Main Section Component ---
const TestimonialsAndMetricsSection = () => {
  const metrics = [
    { value: '500+', label: 'Companies Trust Us', icon: Globe },
    { value: '50K+', label: 'Assets Tracked', icon: Zap },
    { value: '99.9%', label: 'Uptime SLA', icon: ShieldCheck },
    { value: '24/7', label: 'Expert Support', icon: Users },
  ];

  const testimonials = [
    {
      quote: "AssetVerse transformed our asset management. We reduced tracking errors by 90% and save 20 hours per week on administrative tasks.",
      name: "Sarah Johnson",
      title: "HR Director @ TechCorp Inc.",
      rating: 5,
    },
    {
      quote: "The best investment we made this year. Our employees love the easy request process, and HR loves the automated workflows.",
      name: "Michael Chen",
      title: "Ops Manager @ InnovateTech",
      rating: 5,
    },
    {
      quote: "Finally, a platform that understands enterprise needs. The analytics dashboard gives us insights we never had before.",
      name: "Emily Rodriguez",
      title: "IT Admin @ GlobalFinance Ltd.",
      rating: 5,
    },
  ];

  return (
    <section className="py-24 bg-gray-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* --- PART 1: USAGE STATISTICS --- */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8 mb-24">
          {metrics.map((metric, index) => (
            <MetricCard key={index} {...metric} />
          ))}
        </div>

        {/* --- PART 2: LOGO CLOUD (Trust Building) --- */}
        <div className="mb-24">
          <p className="text-center text-gray-400 font-semibold mb-10 uppercase tracking-widest text-xs">
            Powering teams at world-class companies
          </p>
          <div className="flex flex-wrap justify-center items-center gap-12 md:gap-20 opacity-40 grayscale contrast-125">
            <span className="text-2xl font-black text-gray-800 tracking-tighter italic">TECHCORP</span>
            <span className="text-2xl font-bold text-gray-800 tracking-tight">innovate.</span>
            <span className="text-2xl font-serif font-bold text-gray-800 tracking-widest uppercase">Global</span>
            <span className="text-2xl font-mono font-extrabold text-gray-800">STARK_IND</span>
            <span className="text-2xl font-bold text-gray-800">Vortex-7</span>
          </div>
        </div>

        {/* --- PART 3: TESTIMONIALS HEADER --- */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-blue-600 font-bold tracking-tight uppercase text-sm mb-3">
            Customer Success
          </h2>
          <h3 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6 tracking-tight">
            Loved by HR Teams Worldwide
          </h3>
          <p className="text-xl text-gray-600">
            Join thousands of administrators who have automated their asset lifecycle.
          </p>
        </div>

        {/* --- PART 4: TESTIMONIALS GRID --- */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard key={index} {...testimonial} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsAndMetricsSection;