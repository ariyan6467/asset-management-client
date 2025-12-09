import React from "react";
import styled from "styled-components";
import RequestModal from "./Modal";
import UseAxiosSecure from "../../../hook/UseAxiosSecure";
import UseAuth from "../../../hook/UseAuth";
import Swal from "sweetalert2";

const CardRequest = ({ asset }) => {
  const axiosSecure = UseAxiosSecure();
  const { user } = UseAuth();
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
  };

  // Move the handleRequest function inside the modal opening action to ensure it has access to the correct asset data
  function handleRequest() {
    axiosSecure.post("/add-request", requestInfo).then((res) => {
      console.log(res.data);
      if (res.data) {
        console.log("User created successfully in database");
      
        Swal.fire({
  title: `${res.data.assetName
} reaquest done`,
  html:  `${res.data.assetName} request is pending .Please wait for HR approval`,
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
        <div className="card__img mb-18">
          <img
            src={asset.productImage}
            alt=""
            className="rounded-2xl"
          />
        </div>
        <div className="card__subtitle">{asset?.productType}</div>
        <div className="card__wrapper">
          <div className="card__title">
            {asset?.productName} ({asset?.availableQuantity})
          </div>
          <div
            className="card__icon"
            onClick={
            
             handleRequest // Call handleRequest with the specific asset
            }
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 256 256"
              className="icon"
            >
              <g>
                <circle cx={128} cy={128} r={96} opacity="0.2" />
                <circle
                  cx={128}
                  cy={128}
                  r={96}
                  fill="none"
                  stroke="#1DBBB4"
                  strokeMiterlimit={10}
                  strokeWidth={16}
                />
                <polyline
                  points="134.1 161.9 168 128 134.1 94.1"
                  fill="none"
                  stroke="#1DBBB4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={16}
                />
                <line
                  x1={88}
                  y1={128}
                  x2={168}
                  y2={128}
                  fill="none"
                  stroke="#1DBBB4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={16}
                />
              </g>
            </svg>
          </div>
        </div>
      </div>

     
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .card {
    --main-color: #323232;
    --sub-color: #5b5b5b;
    --bg-color: #ffffff;
    --accent-color: #1dbbb4; /* Teal-400 */
    position: relative;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
      Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
    width: 270px;
    padding: 25px;
    border-radius: 20px;
    display: flex;
    flex-direction: column;
    gap: 5px;
    transition: all 0.3s;
    cursor: pointer;
    box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.1);
    background-color: var(--bg-color);
  }

  .card::before {
    content: "";
    width: 99%;
    height: 99%;
    background: var(--sub-color);
    position: absolute;
    z-index: -1;
    top: 1px;
    left: 1px;
    border-radius: 20px;
    transition: all 0.3s;
  }

  .card__wrapper {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }

  .card__img {
    width: 100%;
  }

  .card__title {
    color: var(--main-color);
    font-weight: 900;
    font-size: 22px;
  }

  .card__subtitle {
    color: var(--sub-color);
    font-weight: 600;
    font-size: 16px;
  }

  .card__icon {
    width: 40px;
    height: 40px;
    transform: rotate(-45deg);
    transition: all 0.3s;
    cursor: pointer;
  }

  .card__icon svg {
    width: 100%;
    height: 100%;
  }

  .card__icon g {
    fill: var(--main-color);
  }

  .card__icon circle,
  polyline,
  line {
    stroke: var(--main-color);
  }

  .card:hover .card__icon {
    transform: rotate(0);
  }

  .card:hover .card__icon circle,
  .card:hover .card__icon polyline,
  .card:hover .card__icon line {
    stroke: var(--accent-color);
  }

  .card:hover .card__icon g {
    fill: var(--accent-color);
  }

  .card:hover {
    box-shadow: 0px 4px 25px rgba(0, 0, 0, 0.15);
  }

  .card:hover::before {
    transform: rotate(10deg);
    box-shadow: 0px 4px 25px rgba(0, 0, 0, 0.15);
  }

  .modal-box {
    background-color: #ffffff;
    border-radius: 10px;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  }

  .btn {
    background-color: var(--accent-color);
    color: #ffffff;
    padding: 10px 15px;
    border-radius: 10px;
    font-weight: 600;
    transition: all 0.2s;
    cursor: pointer;
  }

  .btn:hover {
    background-color: #0b8e80;
  }
`;

export default CardRequest;
