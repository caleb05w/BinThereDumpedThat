import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import useProfile from "../hooks/useProfile";
import InputButton from "../components/InputButton";
import Button from "../components/Button";

export const Login = () => {
  const { profile, refreshProfile } = useProfile();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const register = () => {
    navigate("/register");
  };

  const logIn = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_URL}/auth/login`,
        { email, password },
        { withCredentials: true }
      );
      if (data) {
        refreshProfile();
        navigate("/");
      }
    } catch (error) {
      if (error.response && error.response.data) {
        setMessage(error.response.data.error);
      } else {
        setMessage("Login failed. Please try again.");
      }
      console.error("Login failed", error);
    }
  };

  return (
    <div className="flex flex-col items-center w-screen h-screen justify-center">
      <div className="flex flex-col gap-2">
        <div className="text-center -mt-10 lg:mt-0">
          <h1 className="poppins-semibold text-3xl lg:text-6xl">
            Welcome Back
          </h1>
          <p className="poppins-regular text-sm lg:text-lg mt-2 text-black text-opacity-40 mb-4 lg:mb-10">
            {" "}
            Enter Your Log In Information Below{" "}
          </p>

          <form onSubmit={logIn}>
            <div className="grid grid-rows-3 gap-[20%] mb-[2%]">
              <div className="">
                <InputButton
                  placeholder="Enter your Email"
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                  type="email"
                />
              </div>

              <div>
                <InputButton
                  placeholder="Enter your Password"
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                  type="password"
                />
              </div>
              <Button text="Log In" type="submit" />
            </div>
          </form>
        </div>

        <button
          className="poppins-light fixed bottom-4 left-1/2 transform -translate-x-1/2"
          onClick={register}
        >
          Don't have an account?{" "}
          <span className="poppins-medium">Register Now</span>
        </button>

        {message && (
          <p className="relative bottom-[1.5%] lg:bottom-[1.5%] text-[#FC3434] lg:text-[1rem] text-sm">
            {message}
          </p>
        )}
      </div>
    </div>
  );
};
