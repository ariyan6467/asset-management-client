import React, { useContext } from "react";
import styled from "styled-components";
import Logo from "../../Home/Navbar/Logo";
import { NavLink } from "react-router";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../../Authantication/Authprovider";
import axios from "axios";
import UseAxiosSecure from "../../../hook/UseAxiosSecure";
import UseAuth from "../../../hook/UseAuth";


const EmployeeSignupForm = () => {
  const axiosSecure = UseAxiosSecure();
  const { handleRegister, InsertInfo, user, setuser, handleGoogleSignUp } = UseAuth();
  console.log(user);

  const {
    register,
    handleSubmit,

    formState: { errors },
  } = useForm();

  function employeeRegister(data) {
    console.log(data);
    const CompanyLogoImg = data.logoImg[0];
    const email = data.email;
    const password = data.password;
    handleRegister(email, password)
      .then((res) => {
        const formData = new FormData();

        formData.append("image", CompanyLogoImg);

        const img_Api_Url = `https://api.imgbb.com/1/upload?key=${
          import.meta.env.VITE_image_host_key
        }`;

        axios
          .post(img_Api_Url, formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          })
          .then((imgRes) => {

 const userInfo = {
              email: data.email,
              displayName: data.name,
             
              birthday: data.dateOfBirth,
              role: "Employee",
             status:"not-affiliated",
              
              profileImg: imgRes.data.data.display_url,
            };

      axiosSecure.post("/users",userInfo)
          .then(res => {
           if(res.data.insertedId){
                console.log("user created successfully in database");
                alert("database");
              }
          })


















            const UserInfo = {
              displayName: data.name,

              photoURL: imgRes.data.data.display_url,
            };

            InsertInfo(UserInfo)
              .then(() => {
                console.log("updated info");
                alert("Registration completed successfully!");
              })
              .catch((err) => {
                console.error(err.message);
                alert("Registration failed: " + err.message);
              });
            setuser(res.user);
          })
          .catch((imgErr) => {
            console.error("Image upload error:", imgErr.message);
            alert("Image upload failed: " + imgErr.message);
          });
        console.log(res.user);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  function handleGoogleSignup() {
    handleGoogleSignUp()
      .then((res) => {
        const UserInfo = {
          displayName: res.user.displayName || "Employee",
          photoURL: res.user.photoURL || "",
        };

        InsertInfo(UserInfo)
          .then(() => {
            console.log("updated info");
            alert("Registration completed successfully!");
            setuser(res.user);
          })
          .catch((err) => {
            console.error(err.message);
            alert("Registration failed: " + err.message);
          });
      })
      .catch((error) => {
        console.error("Google signup error:", error.message);
        alert("Google signup failed: " + error.message);
      });
  }

  return (
    <div class="flex justify-center items-center h-screen">
      <StyledWrapper>
        <div className="container">
          <div className="flex flex-col justify-center items-center">
            {" "}
            <Logo></Logo>
            <div className="heading">Join as Employee</div>
          </div>
          <form onSubmit={handleSubmit(employeeRegister)} className="form">
          <fieldset className="fieldset">
              <input
              required
              className="input"
              type="text"
              name="email"
              id="name"
              placeholder="Full-name"
              {...register("name", { required: true })}
            />
            <input
              required
              className="input"
              type="email"
              name="email"
              id="email"
              placeholder="E-mail"
              {...register("email", { required: true })}
            />
            <input
              required
              className="input"
              type="file"
              id="name"
              placeholder="company Logo URL"
              {...register("logoImg", { required: true })}
            />
            <input
              required
              className="input"
              type="date"
              name="date"
              id="date"
              placeholder="Date of Birth"
              {...register("dateOfBirth", { required: true })}
            />
            <input
              required
              className="input"
              type="password"
              name="password"
              id="password"
              placeholder="Password min 6 character"
              {...register("password", { required: true })}
            />
            <span className="forgot-password">
              <a href="#">Forgot Password ?</a>
            </span>
            <input
              className="login-button"
              type="submit"
              defaultValue="Sign In"
            />
          </fieldset>
          </form>
          <div className="social-account-container">
            <span className="title">Or Sign in with</span>
            <div className="social-accounts">
              <button className="social-button google" onClick={handleGoogleSignup}>
                <svg
                  className="svg"
                  xmlns="http://www.w3.org/2000/svg"
                  height="1em"
                  viewBox="0 0 488 512"
                >
                  <path d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z" />
                </svg>
              </button>
              <button className="social-button apple">
                <svg
                  className="svg"
                  xmlns="http://www.w3.org/2000/svg"
                  height="1em"
                  viewBox="0 0 384 512"
                >
                  <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z" />
                </svg>
              </button>
              <button className="social-button twitter">
                <svg
                  className="svg"
                  xmlns="http://www.w3.org/2000/svg"
                  height="1em"
                  viewBox="0 0 512 512"
                >
                  <path d="M389.2 48h70.6L305.6 224.2 487 464H345L233.7 318.6 106.5 464H35.8L200.7 275.5 26.8 48H172.4L272.9 180.9 389.2 48zM364.4 421.8h39.1L151.1 88h-42L364.4 421.8z" />
                </svg>
              </button>
            </div>
          </div>
          <span className="text-center flex text-sm text-gray-500 my-2 items-center justify-center">
            <p>Already Have an acount?</p>
            <NavLink to="/normal-login" className="text-blue-800 font-semibold">
              Login
            </NavLink>
          </span>
          <span className="text-center flex text-sm text-gray-500 my-2 items-center justify-center">
            <p>Wanna Join as a HR Manager?</p>
            <NavLink to="/hr-login" className="text-blue-800 font-semibold">
              Signup
            </NavLink>
          </span>
        </div>
      </StyledWrapper>
    </div>
  );
};

const StyledWrapper = styled.div`
  .container {
    max-width: 380px;
    background: #f8f9fd;
    background: linear-gradient(
      0deg,
      rgb(255, 255, 255) 0%,
      rgb(244, 247, 251) 100%
    );
    border-radius: 40px;
    padding: 25px 35px;
    border: 5px solid rgb(255, 255, 255);
    box-shadow: rgba(133, 189, 215, 0.8784313725) 0px 30px 30px -20px;
    margin: auto;
  }

  .heading {
    text-align: center;
    font-weight: 900;
    font-size: 30px;
    color: rgb(16, 137, 211);
  }

  .form {
    margin-top: 20px;
  }

  .form .input {
    width: 100%;
    background: white;
    border: none;
    padding: 15px 20px;
    border-radius: 20px;
    margin-top: 15px;
    box-shadow: #cff0ff 0px 10px 10px -5px;
    border-inline: 2px solid transparent;
  }

  .form .input::-moz-placeholder {
    color: rgb(170, 170, 170);
  }

  .form .input::placeholder {
    color: rgb(170, 170, 170);
  }

  .form .input:focus {
    outline: none;
    border-inline: 2px solid #12b1d1;
  }

  .form .forgot-password {
    display: block;
    margin-top: 10px;
    margin-left: 10px;
  }

  .form .forgot-password a {
    font-size: 11px;
    color: #0099ff;
    text-decoration: none;
  }

  .form .login-button {
    display: block;
    width: 100%;
    font-weight: bold;
    background: linear-gradient(
      45deg,
      rgb(16, 137, 211) 0%,
      rgb(18, 177, 209) 100%
    );
    color: white;
    padding-block: 15px;
    margin: 20px auto;
    border-radius: 20px;
    box-shadow: rgba(133, 189, 215, 0.8784313725) 0px 20px 10px -15px;
    border: none;
    transition: all 0.2s ease-in-out;
  }

  .form .login-button:hover {
    transform: scale(1.03);
    box-shadow: rgba(133, 189, 215, 0.8784313725) 0px 23px 10px -20px;
  }

  .form .login-button:active {
    transform: scale(0.95);
    box-shadow: rgba(133, 189, 215, 0.8784313725) 0px 15px 10px -10px;
  }

  .social-account-container {
    margin-top: 25px;
  }

  .social-account-container .title {
    display: block;
    text-align: center;
    font-size: 10px;
    color: rgb(170, 170, 170);
  }

  .social-account-container .social-accounts {
    width: 100%;
    display: flex;
    justify-content: center;
    gap: 15px;
    margin-top: 5px;
  }

  .social-account-container .social-accounts .social-button {
    background: linear-gradient(
      45deg,
      rgb(0, 0, 0) 0%,
      rgb(112, 112, 112) 100%
    );
    border: 5px solid white;
    padding: 5px;
    border-radius: 50%;
    width: 40px;
    aspect-ratio: 1;
    display: grid;
    place-content: center;
    box-shadow: rgba(133, 189, 215, 0.8784313725) 0px 12px 10px -8px;
    transition: all 0.2s ease-in-out;
  }

  .social-account-container .social-accounts .social-button .svg {
    fill: white;
    margin: auto;
  }

  .social-account-container .social-accounts .social-button:hover {
    transform: scale(1.2);
  }

  .social-account-container .social-accounts .social-button:active {
    transform: scale(0.9);
  }

  .agreement {
    display: block;
    text-align: center;
    margin-top: 15px;
  }

  .agreement a {
    text-decoration: none;
    color: #0099ff;
    font-size: 9px;
  }
`;

export default EmployeeSignupForm;
