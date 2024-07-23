import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ isAuthenticated, children }) => {
  //redirecting to login if user is not logged in
  return isAuthenticated ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
