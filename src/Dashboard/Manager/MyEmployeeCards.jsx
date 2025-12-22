import React from "react";
import styled from "styled-components";
import { useQueryClient } from "@tanstack/react-query";
import UseAxiosSecure from "../../hook/UseAxiosSecure";
import Swal from "sweetalert2";

const MyEmployeeCard = ({ employee, onDelete }) => {
  const axiosSecure = UseAxiosSecure();
  const queryClient = useQueryClient();
   console.log(employee.employeeEmail);
  const handleDelete = async (employeeEmail) => {
    try {
      const confirmation = await Swal.fire({
        title: "Are you sure?",
        text: "This action cannot be undone.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#ef4444",
        cancelButtonColor: "#6b7280",
        confirmButtonText: "Yes, remove",
      });

      if (confirmation.isConfirmed) {
        const response = await axiosSecure.delete(`/remove-employee/${employeeEmail}`);
        if (response.data?.success === true || response.data?.deletedCount > 0) {
          await queryClient.invalidateQueries({ queryKey: ["my-employees"] });
          Swal.fire("Removed!", "Employee has been deleted.", "success");
          if (onDelete) onDelete();
        }
      }
    } catch (error) {
      Swal.fire("Error", "Failed to delete employee.", "error");
    }
  };

  return (
    <StyledWrapper>
      <div className="card">
        <div className="card__header-gradient" />
        <div className="card__avatar">
          <img src={employee?.companyLogo} alt="Avatar" />
        </div>
        <div className="card__content">
          <h3 className="card__name">{employee?.employeeName}</h3>
          <p className="card__email">{employee?.employeeEmail}</p>
          <div className="card__info">
            <span className="info-label">Member Affiliated</span>
            <span className="info-value">{employee?.affiliationDate}</span>
          </div>
          <div className="card__actions">
            <button
              onClick={() => handleDelete(employee?.employeeEmail)}
              className="card__btn-remove"
            >
              Remove Employee
            </button>
          </div>
        </div>
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  display: flex;
  justify-content: center;
  padding: 1rem;

  .card {
    --primary: #4f46e5;
    --danger: #ef4444;
    --text-main: #1f2937;
    --text-sub: #6b7280;
    --bg-card: #ffffff;

    position: relative;
    width: 100%;
    max-width: 320px;
    background: var(--bg-card);
    border-radius: 20px;
    overflow: hidden;
    box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1);
    transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    border: 1px solid #f3f4f6;
  }

  .card:hover {
    transform: translateY(-8px);
    box-shadow: 0 20px 35px -10px rgba(0, 0, 0, 0.15);
  }

  .card__header-gradient {
    height: 100px;
    background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%);
  }

  .card__avatar {
    position: absolute;
    top: 50px;
    left: 50%;
    transform: translateX(-50%);
    width: 90px;
    height: 90px;
    background: white;
    padding: 4px;
    border-radius: 50%;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  }

  .card__avatar img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 50%;
  }

  .card__content {
    padding: 60px 24px 24px 24px;
    text-align: center;
  }

  .card__name {
    font-size: 1.25rem;
    font-weight: 700;
    color: var(--text-main);
    margin-bottom: 4px;
    letter-spacing: -0.025em;
  }

  .card__email {
    font-size: 0.875rem;
    color: var(--text-sub);
    margin-bottom: 20px;
  }

  .card__info {
    background: #f9fafb;
    padding: 12px;
    border-radius: 12px;
    display: flex;
    flex-direction: column;
    gap: 4px;
    margin-bottom: 24px;
  }

  .info-label {
    font-size: 0.7rem;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    color: var(--text-sub);
    font-weight: 600;
  }

  .info-value {
    font-size: 0.9rem;
    color: var(--text-main);
    font-weight: 500;
  }

  .card__btn-remove {
    width: 100%;
    padding: 10px;
    border: 1.5px solid var(--danger);
    background: transparent;
    color: var(--danger);
    font-weight: 600;
    font-size: 0.875rem;
    border-radius: 10px;
    cursor: pointer;
    transition: all 0.3s ease;
  }

  .card__btn-remove:hover {
    background: var(--danger);
    color: white;
    box-shadow: 0 4px 12px rgba(239, 68, 68, 0.3);
  }

  /* Responsive Adjustments */
  @media (max-width: 480px) {
    .card {
      max-width: 100%;
    }
  }
`;

export default MyEmployeeCard;