import React from "react";
import styled from "styled-components";
import { useQueryClient } from "@tanstack/react-query";
import UseAxiosSecure from "../../hook/UseAxiosSecure";
import Swal from "sweetalert2";

const MyEmployeeCard = ({ employee, onDelete }) => {
  const axiosSecure = UseAxiosSecure();
  const queryClient = useQueryClient();

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const handleDelete = async (employeeEmail) => {
    try {
      const confirmation = await Swal.fire({
        title: "Remove Employee?",
        text: `Are you sure you want to remove ${employee?.employeeName}?`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#ef4444",
        cancelButtonColor: "#6b7280",
        confirmButtonText: "Yes, Remove",
      });

      if (confirmation.isConfirmed) {
        const response = await axiosSecure.delete(`/remove-employee/${employeeEmail}`);
        if (response.data?.success || response.data?.deletedCount > 0) {
          await queryClient.invalidateQueries({ queryKey: ["my-employees"] });
          Swal.fire("Deleted!", "The employee has been removed.", "success");
          if (onDelete) onDelete();
        }
      }
    } catch (error) {
      Swal.fire("Error", "Failed to remove employee.", "error");
    }
  };

  return (
    <StyledWrapper>
      <div className="employee-card">
        {/* Banner Section with Product Image */}
        <div className="card-header">
          <img 
            src={employee?.productImage} 
            alt="Product" 
            className="product-banner" 
          />
          <div className={`status-badge ${employee?.status}`}>
            {employee?.status}
          </div>
        </div>

        {/* Overlapping Company Logo */}
        <div className="logo-overlay">
          <img src={employee?.companyLogo} alt="Company Logo" />
        </div>

        <div className="card-body">
          <div className="profile-info">
            <h3 className="name">{employee?.employeeName}</h3>
            <p className="email">{employee?.employeeEmail}</p>
            <span className="company-tag">{employee?.companyName}</span>
          </div>

          <div className="details-grid">
            <div className="detail-item">
              <span className="label">Joining Date</span>
              <span className="value">{formatDate(employee?.affiliationDate)}</span>
            </div>
          </div>

          <button
            onClick={() => handleDelete(employee?.employeeEmail)}
            className="remove-btn"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 6h18"></path>
              <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
              <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
            </svg>
            Remove Employee
          </button>
        </div>
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .employee-card {
    position: relative;
    width: 320px;
    background: #ffffff;
    border-radius: 24px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
    border: 1px solid #f0f0f0;
    transition: all 0.3s ease;
    overflow: hidden;
  }

  .employee-card:hover {
    transform: translateY(-8px);
    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.15);
  }

  /* Banner Styling */
  .card-header {
    position: relative;
    height: 120px;
    overflow: hidden;
  }

  .product-banner {
    width: 100%;
    height: 100%;
    object-fit: cover;
    filter: brightness(0.9);
    transition: transform 0.5s ease;
  }

  .employee-card:hover .product-banner {
    transform: scale(1.1);
  }

  .status-badge {
    position: absolute;
    top: 12px;
    right: 12px;
    padding: 4px 10px;
    border-radius: 8px;
    font-size: 0.65rem;
    font-weight: 800;
    text-transform: uppercase;
    background: rgba(255, 255, 255, 0.9);
    backdrop-filter: blur(4px);
    color: #10b981; /* Green for Active */
    box-shadow: 0 4px 10px rgba(0,0,0,0.1);
  }

  /* Logo Overlap */
  .logo-overlay {
    width: 70px;
    height: 70px;
    background: white;
    border-radius: 18px;
    padding: 4px;
    position: absolute;
    top: 85px;
    left: 24px;
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
    z-index: 2;
  }

  .logo-overlay img {
    width: 100%;
    height: 100%;
    object-fit: contain;
    border-radius: 14px;
  }

  .card-body {
    padding: 45px 24px 24px 24px;
  }

  .name {
    font-size: 1.25rem;
    font-weight: 800;
    color: #0f172a;
    margin: 0;
  }

  .email {
    font-size: 0.85rem;
    color: #64748b;
    margin: 4px 0 10px 0;
  }

  .company-tag {
    display: inline-block;
    padding: 3px 12px;
    background: #eff6ff;
    color: #2563eb;
    font-size: 0.75rem;
    font-weight: 700;
    border-radius: 20px;
    margin-bottom: 18px;
  }

  .details-grid {
    background: #f8fafc;
    border-radius: 16px;
    padding: 14px;
    margin-bottom: 20px;
    border: 1px dashed #e2e8f0;
  }

  .detail-item {
    display: flex;
    flex-direction: column;
  }

  .label {
    font-size: 0.65rem;
    color: #94a3b8;
    text-transform: uppercase;
    font-weight: 700;
    letter-spacing: 0.5px;
  }

  .value {
    font-size: 0.9rem;
    color: #334155;
    font-weight: 600;
  }

  .remove-btn {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    padding: 12px;
    border: none;
    background: #fff1f2;
    color: #e11d48;
    font-weight: 700;
    border-radius: 14px;
    cursor: pointer;
    transition: all 0.2s ease;
  }

  .remove-btn:hover {
    background: #e11d48;
    color: white;
    transform: scale(1.02);
  }
`;

export default MyEmployeeCard;