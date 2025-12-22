import axios from "axios";
import React, { useEffect } from "react";
import UseAuth from "./UseAuth";
import { useNavigate } from "react-router";

const axiosSecure = axios.create({
  baseURL: "https://asset-management-server-teal.vercel.app/",
});

const UseAxiosSecure = () => {
  const { user, handleLogeOut } = UseAuth();
  // console.log(user?.accessToken);
  const navigate = useNavigate();
  useEffect(() => {
    if (!user?.accessToken) return;
    const reqInterceptor = axiosSecure.interceptors.request.use((config) => {
      config.headers.Authorization = `Bearer ${user?.accessToken}`;

      return config;
    });

    const resInterceptor = axiosSecure.interceptors.response.use(
      (response) => {
        return response;
      },
      (error) => {
        // console.log(error);
        const statuscode = error.status;
        if (statuscode === 401 || statuscode === 403) {
          handleLogeOut().then(() => {
            navigate("/normal-login");
          });
        }
        return Promise.reject(error);
      }
    );

    return () => {
      axiosSecure.interceptors.request.eject(reqInterceptor);
      axiosSecure.interceptors.response.eject(resInterceptor);
    };
  }, [user, handleLogeOut, navigate]);
  return axiosSecure;
};

export default UseAxiosSecure;
