import { useEffect, useState } from "react";
import axios from "axios";

const useProfile = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getProfile = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_URL}/auth/profile`,
        { withCredentials: true }
      );
      setProfile(response.data);
      setError(null);
    } catch (error) {
      setProfile(null);
      setError(error.response?.data?.error || "Not logged in.");
    } finally {
      setLoading(false);
    }
  };

  // New logout function
  const logout = async () => {
    try {
      await axios.post(
        `${process.env.REACT_APP_URL}/auth/logout`,
        {},
        { withCredentials: true }
      );
      setProfile(null);
      setError(null);
      window.location.reload();
    } catch (error) {
      setError(error.response?.data?.error || "Logout failed.");
      console.error("Logout failed", error);
    }
  };

  useEffect(() => {
    getProfile();
  }, []);

  return { profile, loading, error, refreshProfile: getProfile, logout };
};

export default useProfile;
