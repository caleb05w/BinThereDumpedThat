import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import useProfile from "../hooks/useProfile";

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
    <div>
      <h1>Log In</h1>
      <form onSubmit={logIn}>
        <input
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          type="email"
        />
        <input
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          type="password"
        />
        <button type="submit">Log In</button>
      </form>

      {message && <p>{message}</p>}
    </div>
  );
};
