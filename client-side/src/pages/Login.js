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
    <div className="flex lg:justify-end h-lvh bg-[#050505] relative w-lvw  md:justify-center sm:justify-center">
      <div className=" lg:w-[70%]  w-[90%] rounded-[0.5rem] bg-white p-[1.5%] m-[5%] lg:m-[1%] ">
        <div className=" h-[100%] flex flex-col justify-between">
          <div className=" mt-[5%] text-center m-auto w-[73%] lg:w-[100%] ">
            <h1 className="text-center lg:text-[80px] md:text-[60px] text-[40px] leading-none md:leading-[1] poppins-bold">Log In To Your Account</h1>
            <p className="text-center poppins-medium text-xl text-gray-500 lg:mt-[3%] mt-[5%]"> A super cool catchphrase </p>
          </div>

          <form onSubmit={logIn}>
            <div className="grid grid-rows-3 gap-[20%] mb-[2%]">
              <div className="">
                <p className="text-gray-600">Add your Email</p>
                <InputButton
                  placeholder="Enter an Email"
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                  type="email"
                />
              </div>

              <div>
                <p className="text-gray-600">Enter a Password</p>
                <InputButton
                  placeholder="Enter a Password"
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                  type="password"
                />
              </div>
              <Button 
              text="Log In" 
              type="submit" />
            </div>
          </form>
        </div>

        {message && <p className='relative bottom-[1.5%] lg:bottom-[1.5%] text-[#FC3434] lg:text-[1rem] text-sm'>{message}</p>}
      </div>
    </div>
  );
};
