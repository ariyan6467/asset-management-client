import React from "react";
import styled from "styled-components";
import UseAxiosSecure from "../../../hook/UseAxiosSecure";
import UseAuth from "../../../hook/UseAuth";
import Swal from "sweetalert2";

const CardRequest = ({ asset }) => {
  const axiosSecure = UseAxiosSecure();
  const { user } = UseAuth();
  
  // Logic remains unchanged
  let timerInterval;
  const requestInfo = {
    assetId: asset?._id,
    assetName: asset?.productName,
    assetType: asset?.productType,
    requesterName: user?.displayName,
    requesterEmail: user?.email,
    hrEmail: asset?.email,
    companyName: asset?.companyName,
    processedBy: user?.email,
    productImage: asset?.productImage
  };

  function handleRequest() {
    axiosSecure.post("/add-request", requestInfo).then((res) => {
      if (res.data) {
        Swal.fire({
          title: `${res.data.assetName} request done`,
          html: `${res.data.assetName} request is pending. Please wait for HR approval`,
          timer: 4000,
          timerProgressBar: true,
          didOpen: () => {
            Swal.showLoading();
            const timer = Swal.getPopup().querySelector("b");
            timerInterval = setInterval(() => {
              timer.textContent = `${Swal.getTimerLeft()}`;
            }, 100);
          },
          willClose: () => {
            clearInterval(timerInterval);
          }
        }).then((result) => {
          if (result.dismiss === Swal.DismissReason.timer) {
            console.log("I was closed by the timer");
          }
        });
      }
    });
  }

  return (
    <StyledWrapper>
      <div className="card">
        {/* Image Section */}
        <div className="card__img-container">
          <img
            src={asset.productImage}
            alt={asset?.productName}
          />
          <span className="card__type-badge">{asset?.productType}</span>
        </div>

        {/* Content Section */}
        <div className="card__content">
          <div className="card__header">
            <h3 className="card__title">{asset?.productName}</h3>
            <p className="card__status">
              Available: <span className="font-bold">{asset?.availableQuantity}</span>
            </p>
          </div>

          {/* Action Button - Replaces the confusing icon */}
          <button 
            className="card__btn" 
            onClick={handleRequest}
            type="button"
          >
            Request Asset
          </button>
        </div>
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .card {
    --bg-color: #ffffff;
    --main-text: #323232;
    --sub-text: #6b7280;
    --accent-color: #1dbbb4; /* Teal */
    --accent-hover: #159c96;
    
    position: relative;
    width: 280px;
    height: 380px; /* Fixed height for consistency */
    background: var(--bg-color);
    border-radius: 20px;
    padding: 1rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    box-shadow: 0 10px 30px -10px rgba(0, 0, 0, 0.1);
    transition: all 0.3s ease;
    font-family: 'Segoe UI', sans-serif;
  }

  /* Hover Card Effect */
  .card:hover {
    transform: translateY(-5px);
    box-shadow: 0 20px 40px -10px rgba(0, 0, 0, 0.2);
  }

  /* Decorative Background Element */
  .card::before {
    content: "";
    position: absolute;
    inset: 0;
    z-index: -1;
    border-radius: 20px;
    background: linear-gradient(135deg, #e0f7fa 0%, #fff 100%);
    transform: scale(0.95);
    transition: transform 0.3s;
  }
  
  .card:hover::before {
    transform: scale(1) rotate(2deg);
  }

  /* Image Container */
  .card__img-container {
    position: relative;
    width: 100%;
    height: 180px;
    border-radius: 15px;
    overflow: hidden;
  }

  .card__img-container img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.5s ease;
  }

  .card:hover .card__img-container img {
    transform: scale(1.05);
  }

  /* Floating Type Badge */
  .card__type-badge {
    position: absolute;
    top: 10px;
    left: 10px;
    background: rgba(255, 255, 255, 0.9);
    backdrop-filter: blur(4px);
    padding: 4px 10px;
    border-radius: 20px;
    font-size: 0.75rem;
    font-weight: 600;
    color: var(--accent-color);
    box-shadow: 0 2px 10px rgba(0,0,0,0.1);
  }

  /* Content Area */
  .card__content {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  .card__title {
    font-size: 1.25rem;
    font-weight: 700;
    color: var(--main-text);
    margin-bottom: 0.25rem;
    line-height: 1.2;
  }

  .card__status {
    font-size: 0.9rem;
    color: var(--sub-text);
  }

  /* The New Request Button */
  .card__btn {
    width: 100%;
    padding: 12px;
    background-color: var(--accent-color);
    color: white;
    border: none;
    border-radius: 12px;
    font-weight: 600;
    font-size: 1rem;
    cursor: pointer;
    transition: all 0.2s ease;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: auto; /* Pushes button to bottom */
  }

  .card__btn:hover {
    background-color: var(--accent-hover);
    transform: scale(1.02);
    box-shadow: 0 4px 12px rgba(29, 187, 180, 0.3);
  }

  .card__btn:active {
    transform: scale(0.98);
  }
`;

export default CardRequest;