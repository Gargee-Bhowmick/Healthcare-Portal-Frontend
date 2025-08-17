import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";

// Usage: <ProtectedRoute allowedRoles={["patient"]} />
const ProtectedRoute = ({ allowedRoles }) => {
  const location = useLocation();
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  if (!token) {
    // Not logged in, redirect to login
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (allowedRoles && !allowedRoles.includes(role)) {
    // Logged in but not authorized for this route
    // Redirect to their dashboard
    if (role === "doctor") return <Navigate to="/doctor" replace />;
    if (role === "patient") return <Navigate to="/patient" replace />;
    return <Navigate to="/login" replace />;
  }

  // Authorized, render the nested routes
  return <Outlet />;
};

export default ProtectedRoute;