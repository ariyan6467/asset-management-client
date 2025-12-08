import React from 'react';
import AccordionItem from './AccordianItem';
import './FAQ.css'; 

const faqData = [
  {
    id: 1,
    question: "What is AssetVerse and who is it for?",
    answer: "AssetVerse is a comprehensive asset management platform designed for businesses of all sizes to track, manage, and optimize their physical and digital assets."
  },
  {
    id: 2,
    question: "How does the employee affiliation system work?",
    answer: "The employee affiliation system allows you to link specific assets directly to the employees responsible for them, simplifying accountability and tracking asset usage."
  },
  {
    id: 3,
    question: "What's included in the free Basic plan?",
    answer: "The Basic plan typically includes core tracking features, up to a certain number of assets, and standard reporting, perfect for small teams getting started."
  },
  {
    id: 4,
    question: "Can I upgrade or downgrade my plan anytime?",
    answer: "Yes, you can easily upgrade or downgrade your subscription plan at any time directly through your account settings."
  },
  {
    id: 5,
    question: "What's the difference between returnable and non-returnable assets?",
    answer: "Returnable assets (e.g., laptops, tools) are expected to be returned to the company. Non-returnable assets (e.g., promotional items, consumable supplies) are not."
  },
  {
    id: 6,
    question: "Is my data secure with AssetVerse?",
    answer: "We use industry-standard encryption and security protocols to ensure your data is safe and protected. More details are available in our privacy policy."
  },
];

const FAQ = () => {
  return (
    <div className="faq-container">
      <div className="faq-header">
        <span className="faq-tag">FAQ</span>
        <h1>Frequently Asked Questions</h1>
        <p>Got questions? We've got answers. If you can't find what you're looking for, feel free to contact us.</p>
      </div>

      <div className="accordion">
        {faqData.map(item => (
          <AccordionItem
            key={item.id}
            question={item.question}
            answer={item.answer}
          />
        ))}
      </div>
    </div>
  );
};

export default FAQ;