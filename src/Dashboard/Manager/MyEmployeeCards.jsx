import React from "react";
import styled from "styled-components";
import { useQueryClient } from "@tanstack/react-query";
import UseAxiosSecure from "../../hook/UseAxiosSecure";
import Swal from "sweetalert2"; // Optional, for confirmation dialog

const MyEmployeeCard = ({ employee, onDelete }) => {
  const axiosSecure = UseAxiosSecure();
  const queryClient = useQueryClient();

  // Delete function
  const handleDelete = async (employeeId) => {
    try {
      // Confirm before deletion
      const confirmation = await Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to undo this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "No, cancel!",
      });

      if (confirmation.isConfirmed) {
        // Send DELETE request to the API
        const response = await axiosSecure.delete(`/remove-employee/${employeeId}`);
        
        // Check if deletion was successful
        if (response.data?.success === true || response.data?.deletedCount > 0) {
          // Invalidate and refetch the query to update the UI
          await queryClient.invalidateQueries({ queryKey: ["my-employees"] });
          
          // Show success toast
          Swal.fire("Deleted!", "The employee has been removed.", "success");

          // Call the onDelete prop function if provided
          if (onDelete) {
            onDelete();
          }
        } else {
          Swal.fire("Error", response.data?.message || "Employee was not found or could not be deleted.", "error");
        }
      }
    } catch (error) {
      console.error("Error deleting employee:", error);
      const errorMessage = error.response?.data?.message || "There was an issue deleting the employee.";
      Swal.fire("Error", errorMessage, "error");
    }
  };

  return (
    <StyledWrapper>
      <div className="card">
        <div className="card__img">
          <svg xmlns="http://www.w3.org/2000/svg" width="100%">
            <rect fill="#ffffff" width={540} height={450} />
          </svg>
        </div>
        <div className="card__avatar">
          <img className="rounded-full h-full w-full" src={employee?.companyLogo} alt="Employee Logo" />
        </div>
        <div className="card__title">{employee?.employeeName}</div>
        <div className="card__subtitle">{employee?.employeeEmail}</div>
        <div className="card__subtitle">{employee?.affiliationDate}</div>
        <div className="card__wrapper">
          <button
            onClick={() => handleDelete(employee?._id)}  // onClick handler for the delete button
            className="card__btn card__btn-solid"
          >
            Remove
          </button>
        </div>
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .card {
    --main-color: #000;
    --submain-color: #78858f;
    --bg-color: #fff;
    font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
    position: relative;
    width: 280px;
    height: 450px;
    display: flex;
    flex-direction: column;
    align-items: center;
    border-radius: 15px;
    background: var(--bg-color);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s ease, box-shadow 0.3s ease;
  }

  .card:hover {
    transform: translateY(-10px);
    box-shadow: 0 16px 32px rgba(0, 0, 0, 0.2);
  }

  .card__img {
    height: 160px;
    width: 100%;
    border-radius: 15px 15px 0 0;
  }

  .card__avatar {
    position: absolute;
    width: 100px;
    height: 100px;
    background: var(--bg-color);
    border-radius: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    top: 100px;
    border: 5px solid var(--bg-color);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }

  .card__title {
    margin-top: 120px;
    font-weight: 600;
    font-size: 18px;
    color: var(--main-color);
    text-align: center;
  }

  .card__subtitle {
    margin-top: 8px;
    font-weight: 400;
    font-size: 14px;
    color: var(--submain-color);
    text-align: center;
  }

  .card__btn {
    margin-top: 15px;
    width: 100px;
    height: 35px;
    border: 2px solid var(--main-color);
    border-radius: 4px;
    font-weight: 700;
    font-size: 12px;
    color: var(--main-color);
    background: var(--bg-color);
    text-transform: uppercase;
    transition: all 0.3s;
  }

  .card__btn-solid {
    background: var(--main-color);
    color: var(--bg-color);
  }

  .card__btn:hover {
    background: var(--main-color);
    color: var(--bg-color);
  }

  .card__btn-solid:hover {
    background: var(--bg-color);
    color: var(--main-color);
  }
`;

export default MyEmployeeCard;
