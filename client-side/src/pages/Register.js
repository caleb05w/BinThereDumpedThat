import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FiAlertTriangle, FiEye, FiEyeOff, FiLogIn } from "react-icons/fi";
import InputButton from "../components/InputButton";
import Button from "../components/Button";

export const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [passwordMatch, setPasswordMatch] = useState(false);
  const [message, setMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  useEffect(() => {
    // Check if passwords match
    if (password && passwordConfirm) {
      setPasswordMatch(password === passwordConfirm);
    }
  }, [password, passwordConfirm]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (email == "" || email == "") {
      setMessage("Please enter your email!");
      return;
    }

    if (password == "" || password == "") {
      setMessage("Please enter a password!");
      return;
    }

    if (password != passwordConfirm) {
      setMessage("Passwords do not match!");
      return;
    }

    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_URL}/auth/register`,
        { email, password }
      );

      setMessage("");
      navigate("/");
    } catch (error) {
      if (error.response && error.response.data) {
        setMessage(error.response.data.error);
      } else {
        setMessage("Login failed. Please try again.");
      }
      console.error("Login failed", error);
    }
  };

  const login = () => {
    navigate("/login");
  };

  return (
    
    <div className="flex lg:justify-end h-lvh bg-[#050505] relative w-lvw  md:justify-center sm:justify-center">
      
      <div className=" lg:w-[70%] w-[90%] rounded-[0.5rem] bg-white p-[1.5%] m-[5%] lg:m-[1%] ">
        
        <div className=" h-[100%] justify-between">
        <form className='h-[100%] flex flex-col justify-between'onSubmit={handleSubmit}>
          
          <div className="  mt-[5%] text-center m-auto w-[73%] lg:w-[100%] ">
            <h1 className="text-center lg:text-[80px] md:text-[60px] text-[40px] leading-none md:leading-[1] poppins-bold">Create an Account</h1>
            <p className="text-center poppins-medium text-xl text-gray-500 lg:mt-[3%] mt-[5%]"> Enter Your Information Below </p>
          </div>
        
        <div className=''>
          <InputButton placeholder={"Email"} onChange={(e) => setEmail(e.target.value)} value={email} type={"email"} />
            <div>
            <InputButton placeholder={"Password"} onChange={(e) => setPassword(e.target.value)} value={password} type={"password"} />
              <div onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? <FiEye /> : <FiEyeOff />}
              </div>
            </div>

            <div>
              <InputButton placeholder={"Confirm Password"} onChange={(e) => setPasswordConfirm(e.target.value)} value={passwordConfirm} type={"password"} />
              <div onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                <div>{showConfirmPassword ? <FiEye /> : <FiEyeOff />}</div>
              </div>
            </div>

            <div>
              {passwordConfirm !== "" && !passwordMatch && (
                <p className="poppins-light rounded-none text-sm text-red-500">
                  Passwords do not match
                </p>
              )}
            </div>
          </div>
          <Button text={"Register"} type={"submit"} />
       
          <button onClick={login}>
          Already have an account? <span>Log in</span>
        </button> 
        </form>
      </div>
    </div>
    </div>
  );
};
