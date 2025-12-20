import React from 'react';
import { NavLink } from 'react-router';
import styled from 'styled-components';

const SocialIcons = () => {
  return (
    <StyledWrapper>
      <div className="button-container">
        {/* GitHub */}
       <NavLink to="https://github.com/ariyan6467">
             <button className="button flex-center" aria-label="GitHub">
          <svg viewBox="0 0 24 24" className="btn-svg" width="22px" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" fill="currentColor"/>
          </svg>
        </button>
        </NavLink>

        {/* LinkedIn */}
       <NavLink to="https://www.linkedin.com/in/nahian-jawad-ariyan/">
         <button className="button flex-center" aria-label="LinkedIn">
          <svg viewBox="0 0 24 24" className="btn-svg" width="22px" xmlns="http://www.w3.org/2000/svg">
            <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" fill="currentColor"/>
          </svg>
        </button>
       </NavLink>

        {/* Facebook */}
       <NavLink to="https://www.facebook.com/programmingHero">
         <button className="button flex-center" aria-label="Facebook">
          <svg viewBox="0 0 24 24" className="btn-svg" width="22px" xmlns="http://www.w3.org/2000/svg">
            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.469h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" fill="currentColor"/>
          </svg>
        </button>
       </NavLink>

        {/* Portfolio (Globe) */}
        <NavLink to="https://drive.google.com/file/d/11job6dEw8N7lzFn18M5AuVywJ-y6-0cM/view?usp=sharing">
            <button className="button flex-center" aria-label="Portfolio">
          <svg viewBox="0 0 24 24" className="btn-svg" width="22px" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm1 16.947v1.1c0 .539-.413.844-.954.661-1.341-.453-2.471-.433-3.692.016-.48.177-.854-.105-.854-.627v-1.15c0-1.442 1.411-2.434 2.75-2.434.341 0 .741.077 1.127.234 1.018.411 1.623 1.257 1.623 2.2zm0-4.947c0-1.657-1.343-3-3-3s-3 1.343-3 3 1.343 3 3 3 3-1.343 3-3zm9.143-2.143l-2.025 1.54c-.233.177-.384.453-.414.739-.126 1.159-.284 3.733-.284 3.733-.037.447-.385.834-.829.917l-1.902.355c-.443.084-.863-.162-.996-.588l-.73-2.333c-.092-.296-.285-.548-.545-.714l-1.503-.96c-.347-.221-.497-.655-.361-1.041l.933-2.625c.101-.284.316-.511.597-.63l2.85-1.21c.427-.181.921-.013 1.155.394l1.32 2.301c.148.258.412.441.713.493l2.436.417c.542.093.847.669.596 1.153z" fill="currentColor"/>
          </svg>
        </button>
        </NavLink>
      </div>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  .button-container {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 1.5rem;
  }

  .button {
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 45px;
    height: 45px;
    border-radius: 50%;
    background-color: #2d2e32;
    border: 2px solid #2d2e32;
    color: #ffffff;
    transition: all 0.45s ease-in-out;
    padding: 0;
  }

  .button:hover {
    transform: rotate(360deg);
    background-color: #ffffff;
    color: #2d2e32;
  }

  .btn-svg {
    transition: all 0.45s ease-in-out;
  }

  /* We use fill="currentColor" in the SVG paths so they 
     automatically change color when the button's color changes */
  .button:hover .btn-svg {
    fill: #2d2e32;
  }

  .flex-center {
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

export default SocialIcons;