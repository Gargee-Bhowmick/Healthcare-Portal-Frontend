// ProtectedRoute.jsx
import { Navigate, Outlet } from "react-router-dom";
import useAuth  from "./useAuth";

const ProtectedRoute = ({ allowedRoles }) => {
  const { isAuthenticated, role } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Check if role is permitted
  if (allowedRoles && !allowedRoles.includes(role)) {
    return role === "doctor" ? (
      <Navigate to="/doctor" replace />
    ) : (
      <Navigate to="/patient" replace />
    );
  }

  return <Outlet />;
};

export default ProtectedRoute;
