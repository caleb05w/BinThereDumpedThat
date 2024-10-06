import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FiAlertTriangle, FiEye, FiEyeOff, FiLogIn } from "react-icons/fi";

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
    <div>
      <div>
        <form onSubmit={handleSubmit}>
          <h2>
            Register Now
            <p>Enter your information below!</p>
          </h2>
          <div>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <div>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <div onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? <FiEye /> : <FiEyeOff />}
              </div>
            </div>

            <div>
              <input
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm Password"
                value={passwordConfirm}
                onChange={(e) => setPasswordConfirm(e.target.value)}
              />
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
          <button type="submit">Sign Up</button>
        </form>

        <button onClick={login}>
          Already have an account? <span>Log in</span>
        </button>
      </div>
    </div>
  );
};
