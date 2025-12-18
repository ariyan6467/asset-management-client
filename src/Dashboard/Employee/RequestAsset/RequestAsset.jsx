import React, { useState, useEffect } from "react";
import UseAxiosSecure from "../../../hook/UseAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import styled from "styled-components";
import CardRequest from "./CardRequest";
import { useSearchParams } from "react-router-dom";

const Container = styled.div`
  padding: 20px;
  text-align: center;
  background-color: #f7f7f7;
  min-height: 100vh;
`;

const Title = styled.h1`
  font-size: 2rem;
  font-weight: 600;
  color: #333;
  margin-bottom: 20px;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 20px;
  justify-items: center;
  margin-top: 20px;
`;

const LoadingMessage = styled.p`
  font-size: 1.2rem;
  color: #999;
`;

const ErrorMessage = styled.p`
  font-size: 1.2rem;
  color: red;
`;

const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 30px;
  gap: 15px;
  flex-wrap: wrap;
`;

const PageButton = styled.button`
  padding: 8px 16px;
  border: 1px solid #ddd;
  background-color: ${(props) => (props.active ? "#1dbbb4" : "#fff")};
  color: ${(props) => (props.active ? "#fff" : "#333")};
  border-radius: 5px;
  cursor: pointer;
  transition: all 0.3s;

  &:hover {
    background-color: #1dbbb4;
    color: #fff;
    border-color: #1dbbb4;
  }

  &:disabled {
    background-color: #eee;
    color: #999;
    cursor: not-allowed;
    border-color: #eee;
  }
`;

const Select = styled.select`
  padding: 8px;
  border-radius: 5px;
  border: 1px solid #ddd;
  outline: none;
`;

const RequestAsset = () => {
  const axiosSecure = UseAxiosSecure();
  const [searchParams, setSearchParams] = useSearchParams();

  // Get pagination params from URL or default
  const initialPage = parseInt(searchParams.get("page")) || 1;
  const initialLimit = parseInt(searchParams.get("limit")) || 10;

  const [currentPage, setCurrentPage] = useState(initialPage);
  const [itemsPerPage, setItemsPerPage] = useState(initialLimit);

  const {
    isLoading,
    isError,
    data: assets = [],
    error,
  } = useQuery({
    queryKey: ["all-assets"],
    queryFn: async () => {
      const result = await axiosSecure.get("/asset-list");
      return result.data;
    },
  });
//  console.log(assets);
  // Update URL when page or limit changes
  useEffect(() => {
    setSearchParams({ page: currentPage, limit: itemsPerPage });
  }, [currentPage, itemsPerPage, setSearchParams]);

  // Calculate pagination data
  const totalItems = assets.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentAssets = assets.slice(startIndex, startIndex + itemsPerPage);

  const handlePageChange = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  const handleLimitChange = (e) => {
    setItemsPerPage(Number(e.target.value));
    setCurrentPage(1); // Reset to first page when limit changes
  };

  if (isLoading) {
    return (
      <Container>
        <LoadingMessage>Loading assets, please wait...</LoadingMessage>
      </Container>
    );
  }

  if (isError) {
    return (
      <Container>
        <ErrorMessage>Error loading assets: {error.message}</ErrorMessage>
      </Container>
    );
  }

  return (
    <Container>
      <Title>Request Assets</Title>

      <Grid>
        {currentAssets.map((asset, index) => (
          <CardRequest key={asset._id || index} asset={asset} />
        ))}
      </Grid>

      {/* Pagination Controls */}
      <PaginationContainer>
        <PageButton
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </PageButton>

        {[...Array(totalPages)].map((_, index) => (
          <PageButton
            key={index}
            active={currentPage === index + 1}
            onClick={() => handlePageChange(index + 1)}
          >
            {index + 1}
          </PageButton>
        ))}

        <PageButton
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </PageButton>

        <Select value={itemsPerPage} onChange={handleLimitChange}>
          <option value="5">5 per page</option>
          <option value="10">10 per page</option>
          <option value="20">20 per page</option>
          <option value="50">50 per page</option>
        </Select>
      </PaginationContainer>
    </Container>
  );
};

export default RequestAsset;
