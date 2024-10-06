import React from "react";
import { Navigate } from "react-router-dom";
import useProfile from "./hooks/useProfile";

const ProtectedRoute = ({ element }) => {
  const { profile, loading } = useProfile();

  if (loading) {
    return <div>Loading...</div>;
  }

  return profile ? element : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
