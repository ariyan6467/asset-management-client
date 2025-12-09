import React from 'react';
import styled from 'styled-components';

const RequestModal = () => {
  return (
    <StyledWrapper>
      <div className="card modal-box">
        <div className="card-content">
          <p className="card-heading">Delete File?</p>
          <p className="card-description">Are you sure you want to delete this file? This action cannot be undone.</p>
        </div>
        <div className="card-button-wrapper">
          <form method="dialog">
            <button className="card-button secondary">Cancel</button>
          </form>
          <button className="card-button primary">Delete</button>
        </div>
        <button className="exit-button">
          <svg height="20px" viewBox="0 0 384 512">
            <path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" />
          </svg>
        </button>
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .card {
    width: 320px;
    height: auto;
    background: #fff;
    border-radius: 12px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 20px;
    padding: 30px;
    position: relative;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
    animation: slideIn 0.3s ease-in-out;
  }

  @keyframes slideIn {
    from {
      opacity: 0;
      transform: translateY(-20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .card-content {
    width: 100%;
    text-align: center;
    display: flex;
    flex-direction: column;
    gap: 5px;
  }

  .card-heading {
    font-size: 22px;
    font-weight: 700;
    color: #333;
    margin-bottom: 10px;
  }

  .card-description {
    font-size: 14px;
    color: #555;
  }

  .card-button-wrapper {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    gap: 15px;
  }

  .card-button {
    width: 45%;
    height: 40px;
    border-radius: 10px;
    border: none;
    cursor: pointer;
    font-weight: 600;
    transition: background-color 0.3s ease;
  }

  .primary {
    background-color: #ff726d;
    color: white;
  }

  .primary:hover {
    background-color: #ff4a42;
  }

  .secondary {
    background-color: #ddd;
    color: #333;
  }

  .secondary:hover {
    background-color: #c5c5c5;
  }

  .exit-button {
    display: flex;
    align-items: center;
    justify-content: center;
    border: none;
    background-color: transparent;
    position: absolute;
    top: 15px;
    right: 15px;
    cursor: pointer;
    transition: transform 0.3s ease;
  }

  .exit-button:hover {
    transform: scale(1.1);
  }

  .exit-button svg {
    fill: #aaa;
    transition: fill 0.3s ease;
  }

  .exit-button:hover svg {
    fill: #333;
  }
`;

export default RequestModal;
