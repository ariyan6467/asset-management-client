import React, { useState } from 'react';
import './FAQ.css'; // Necessary for the conditional styling

const AccordionItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="accordion-item">
      {/* Header/Question Row - Clickable */}
      <div className="accordion-header" onClick={toggleAccordion}>
        <div className="accordion-question">{question}</div>
        {/* The 'show' class helps the CSS rotate the icon */}
        <span className={`accordion-icon ${isOpen ? 'rotate' : ''}`}>
          {/* Unicode for down arrow / chevron */}
          &#8744; 
        </span>
      </div>

      {/* Content/Answer Row - Toggled Visibility */}
      <div className={`accordion-collapse ${isOpen ? 'show' : ''}`}>
        <div className="accordion-body">
          {answer}
        </div>
      </div>
    </div>
  );
};

export default AccordionItem;