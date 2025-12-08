import React from 'react';
import { Quote, Star } from 'lucide-react'; // Icon for quote marks

// --- Metric Card Component ---
const MetricCard = ({ value, label }) => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100 flex flex-col items-center justify-center h-full">
      <div className="text-4xl font-extrabold text-blue-600 mb-1">{value}</div>
      <div className="text-sm text-gray-500 font-medium">{label}</div>
    </div>
  );
};

// --- Testimonial Card Component ---
const TestimonialCard = ({ quote, name, title, rating }) => {
  const renderStars = (count) => {
    return Array(5).fill(0).map((_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${i < count ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
      />
    ));
  };

  return (
    <div className="bg-white p-8 rounded-xl shadow-xl border border-gray-100 flex flex-col items-start text-left h-full">
      {/* Quote Icon */}
      <Quote className="w-8 h-8 text-gray-200 mb-4" />

      {/* Quote Text */}
      <p className="text-gray-700 text-base mb-6 italic">"{quote}"</p>

      {/* Star Rating */}
      <div className="flex space-x-0.5 mb-4">
        {renderStars(rating)}
      </div>

      {/* Divider */}
      <hr className="w-full border-t border-gray-100 mb-4" />

      {/* Customer Info */}
      <div className="flex items-center mt-auto">
        {/* Placeholder for Avatar */}
        <div className="w-10 h-10 bg-gray-200 rounded-full mr-3 flex items-center justify-center overflow-hidden">
          {/* In a real app, you'd use <img src="..." alt="Avatar" /> */}
          <span className="text-gray-600 text-lg font-semibold">{name.charAt(0)}</span>
        </div>
        <div>
          <p className="text-sm font-semibold text-gray-900">{name}</p>
          <p className="text-xs text-gray-500">{title}</p>
        </div>
      </div>
    </div>
  );
};

// --- Main Section Component ---
const TestimonialsAndMetricsSection = () => {
  const metrics = [
    { value: '500+', label: 'Companies Trust Us' },
    { value: '50K+', label: 'Assets Tracked' },
    { value: '99.9%', label: 'Uptime SLA' },
    { value: '24/7', label: 'Support Available' },
  ];

  const testimonials = [
    {
      quote:
        'AssetVerse transformed our asset management. We reduced tracking errors by 90% and save 20 hours per week on administrative tasks.',
      name: 'Sarah Johnson',
      title: 'HR Director at TechCorp Inc.',
      rating: 5,
    },
    {
      quote:
        'The best investment we made this year. Our employees love the easy request process, and HR loves the automated workflows.',
      name: 'Michael Chen',
      title: 'Operations Manager at InnovateTech',
      rating: 5,
    },
    {
      quote:
        'Finally, a platform that understands enterprise needs. The analytics dashboard gives us insights we never had before.',
      name: 'Emily Rodriguez',
      title: 'IT Administrator at GlobalFinance Ltd.',
      rating: 4,
    },
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* 1. Metrics Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20">
          {metrics.map((metric, index) => (
            <MetricCard key={index} value={metric.value} label={metric.label} />
          ))}
        </div>

        {/* 2. Testimonials Header */}
        <div className="text-center mb-12">
          <p className="text-sm font-medium text-teal-600 uppercase tracking-wider mb-2 bg-teal-100 py-1 px-3 inline-block rounded-full">
            Testimonials
          </p>
          <h2 className="text-4xl font-extrabold text-gray-900 mb-3">
            Loved by HR Teams Worldwide
          </h2>
          <p className="text-lg text-gray-600">
            See what our customers have to say about their experience with AssetVerse.
          </p>
        </div>

        {/* 3. Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard
              key={index}
              quote={testimonial.quote}
              name={testimonial.name}
              title={testimonial.title}
              rating={testimonial.rating}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsAndMetricsSection;