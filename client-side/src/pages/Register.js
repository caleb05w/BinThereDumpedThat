import axios from "axios";
import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { FiAlertTriangle, FiEye, FiEyeOff, FiLogIn } from "react-icons/fi";
import InputButton from "../components/InputButton";
import Button from "../components/Button";

export const Register = () => {
  const [orgName, setOrgName] = useState("");
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
        { email, password, orgName }
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
    <div className="flex flex-col items-center w-screen h-screen justify-center">
      <div className="flex flex-col gap-2">
        <div className="text-center">
          <form className="mb-10" onSubmit={handleSubmit}>
            <div className="">
              <h1 className="poppins-semibold text-6xl">Create an Account</h1>
              <p className="poppins-regular text-lg mt-2 text-black text-opacity-40 mb-10">
                {" "}
                Enter Your Information Below{" "}
              </p>
            </div>

            <div className="flex flex-col gap-3">
              <InputButton
                placeholder={"Organization Name"}
                onChange={(e) => setOrgName(e.target.value)}
                value={orgName}
                type={"text"}
              />
              <InputButton
                placeholder={"Email"}
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                type={"email"}
              />
              <div>
                <InputButton
                  placeholder={"Password"}
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                  type={"password"}
                  button={
                    <button onClick={() => setShowPassword(!showPassword)}>
                      {showPassword ? <FiEye /> : <FiEyeOff />}
                    </button>
                  }
                />
              </div>

              <div>
                <InputButton
                  placeholder={"Confirm Password"}
                  onChange={(e) => setPasswordConfirm(e.target.value)}
                  value={passwordConfirm}
                  type={"password"}
                  button={
                    <button
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                    >
                      <div>
                        {showConfirmPassword ? <FiEye /> : <FiEyeOff />}
                      </div>
                    </button>
                  }
                />
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

            <button
              className="poppins-light fixed bottom-4 left-1/2 transform -translate-x-1/2"
              onClick={login}
            >
              Already have an account?{" "}
              <span className="poppins-medium">Log in</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
