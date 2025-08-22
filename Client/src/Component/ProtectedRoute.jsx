import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../Hooks/useAuth";
import { hasRole } from "../Utils/roleutils";

const ProtectedRoute = ({ children, role }) => {
  const { user } = useAuth();

  if (!user) return <Navigate to="/" />;

 if (role && user.role !== role) {
  return <Navigate to="/tickets" />;
}


  return children;
};

export default ProtectedRoute;
