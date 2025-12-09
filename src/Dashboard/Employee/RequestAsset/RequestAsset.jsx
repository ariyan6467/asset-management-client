import React from "react";
import UseAxiosSecure from "../../../hook/UseAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import styled from "styled-components";
import CardRequest from "./CardRequest";

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

const RequestAsset = () => {
  const axiosSecure = UseAxiosSecure();

  const {
    isLoading,
    isError,
    data: assets = [],
    error,
    refetch,
  } = useQuery({
    queryKey: ["all-assets"],
    queryFn: async () => {
      const result = await axiosSecure.get("/asset-list");
      return result.data;
    },
  });

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
        {assets.map((asset, index) => (
          <CardRequest key={index} asset={asset} />
        ))}
      </Grid>
    </Container>
  );
};

export default RequestAsset;
