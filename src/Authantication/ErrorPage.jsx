import React from 'react';
import styled, { keyframes } from 'styled-components';

const ErrorPage = () => {
  return (
    <StyledWrapper>
      <div className="main_wrapper">
        <div className="main">
          <div className="antenna">
            <div className="a1" />
            <div className="a2" />
          </div>
          <div className="tv">
            <div className="display_div">
              <div className="screen_out1">
                <div className="screen">
                  <span className="notfound_text">SIGNAL LOST</span>
                </div>
              </div>
            </div>
            <div className="buttons_div">
              <div className="b1" />
              <div className="b2" />
              <div className="speakers">
                <div className="g" />
                <div className="g" />
                <div className="g" />
              </div>
            </div>
          </div>
          <div className="bottom">
            <div className="base1" />
            <div className="base2" />
          </div>
        </div>
        <div className="text_404">
          <div className="outline_text">404</div>
        </div>
      </div>
    </StyledWrapper>
  );
}

const staticNoise = keyframes`
  0% { background-position: 0 0; }
  100% { background-position: 20px 20px; }
`;

const StyledWrapper = styled.div`
  background-color: #f8f9fa;
  background-image: radial-gradient(#dee2e6 0.5px, transparent 0.5px);
  background-size: 20px 20px; /* Subtle grid/dot background */
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  position: relative;
  font-family: 'Inter', sans-serif;

  .main_wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    z-index: 2;
  }

  .main {
    display: flex;
    flex-direction: column;
    align-items: center;
    filter: drop-shadow(20px 20px 60px #d1d9e6) drop-shadow(-20px -20px 60px #ffffff);
  }

  /* Antenna - Minimalist Style */
  .antenna {
    width: 4em;
    height: 4em;
    background: #e9ecef;
    border-radius: 50%;
    margin-bottom: -5em;
    position: relative;
    border: 4px solid #ffffff;
  }

  .a1, .a2 {
    position: absolute;
    width: 10em;
    height: 3px;
    background: #adb5bd;
    border-radius: 2px;
  }

  .a1 { top: -20%; left: -120%; transform: rotate(-30deg); }
  .a2 { top: -10%; left: 40%; transform: rotate(20deg); }

  /* TV Body - Soft Coral/Orange */
  .tv {
    width: 22em;
    height: 14em;
    background: #ff8e71; /* Modern soft coral */
    border-radius: 30px;
    display: flex;
    padding: 1.5em;
    border: 8px solid #ffffff;
    box-shadow: inset 6px 6px 12px #ff7654, inset -6px -6px 12px #ffa68e;
    position: relative;
  }

  .display_div {
    flex: 3;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .screen_out1 {
    width: 100%;
    height: 100%;
    background: #ffffff;
    border-radius: 20px;
    padding: 8px;
    box-shadow: inset 4px 4px 8px #d1d9e6;
  }

  .screen {
    width: 100%;
    height: 100%;
    background: 
      repeating-radial-gradient(#ffffff 0 0.0001%, #e9ecef 0 0.0002%) 50% 0/2500px 2500px;
    background-blend-mode: overlay;
    animation: ${staticNoise} 0.5s infinite linear;
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    overflow: hidden;
  }

  /* Glass Scanlines */
  .screen::after {
    content: "";
    position: absolute;
    top: 0; left: 0; width: 100%; height: 100%;
    background: linear-gradient(
      rgba(255, 255, 255, 0) 50%, 
      rgba(0, 0, 0, 0.02) 50%
    );
    background-size: 100% 4px;
  }

  .notfound_text {
    font-size: 0.8em;
    font-weight: 800;
    color: #495057;
    letter-spacing: 3px;
    background: rgba(255,255,255,0.9);
    padding: 0.6em 1.2em;
    border-radius: 50px;
    box-shadow: 0 4px 15px rgba(0,0,0,0.05);
  }

  /* Controls Panel */
  .buttons_div {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 1.2em;
    margin-left: 1em;
  }

  .b1, .b2 {
    width: 2.2em;
    height: 2.2em;
    background: #ffffff;
    border-radius: 50%;
    box-shadow: 4px 4px 8px #e67a5e, -2px -2px 6px #ffa284;
    cursor: pointer;
    transition: 0.3s;
  }
  .b1:hover { transform: scale(1.1); background: #f8f9fa; }

  .speakers {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 6px;
    padding: 0 10px;
  }
  .g {
    height: 3px;
    background: #e67a5e;
    border-radius: 10px;
  }

  /* Feet */
  .bottom {
    width: 100%;
    display: flex;
    justify-content: center;
    gap: 12em;
  }
  .base1, .base2 {
    height: 1.2em;
    width: 2.5em;
    background: #ffffff;
    border-radius: 0 0 12px 12px;
    box-shadow: 0 5px 10px rgba(0,0,0,0.05);
  }

  /* Background 404 Text */
  .text_404 {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 1;
    pointer-events: none;
  }

  .outline_text {
    font-size: 30vw;
    font-weight: 900;
    color: transparent;
    -webkit-text-stroke: 2px #e9ecef;
    opacity: 0.6;
    letter-spacing: -0.05em;
  }

  @media (max-width: 768px) {
    .tv { scale: 0.7; }
    .outline_text { font-size: 45vw; }
  }
`;

export default ErrorPage;