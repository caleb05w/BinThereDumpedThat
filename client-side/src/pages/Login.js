import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import useProfile from "../hooks/useProfile";
import InputButton from "../components/InputButton";

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
    <div className='border-2 border-orange flex justify-end h-lvh bg-[#050505] relative w-lvw'>
    <div className='border-2 w-[75%]  border-black rounded-[0.25rem] bg-white p-[1%] '>
      
      
      <div className=' h-[100%] flex flex-col justify-between'>
        
        <div className=''>
          <h1 className='text-center'>Log In</h1>
          <p className='text-center'> A super cool catchphrase </p>
        </div>

      <div className='grid grid-rows-3 gap-[20%] border-2 h-fit'>
      <div className='border'>
        <p className='text-gray-600'>Add your Email</p>
         <InputButton placeholder="Enter an Email" onChange={(e) => setEmail(e.target.value)} value={email} type="email" />
        </div>

        <div>
            <form>
            <p className='text-gray-600'>Enter a Password</p>
            <InputButton placeholder="Enter a Password" onChange={(e) => setPassword(e.target.value)} value={password} type="password" />
            </form>
            </div>
            <button className='border-2 border-black bg-[#050505] text-white flex justify-center px-[1%] h-fit py-[1%] w-[100%] rounded-[0.25rem]' type="submit">Log In</button>
          </div>
        

      </div>

      {message && <p>{message}</p>}
    </div>
    </div>
  );
};
