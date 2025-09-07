import { createContext, useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import authService from "../../services/authService";
import {jwtDecode} from "jwt-decode";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const [token, setToken] = useState(authService.getToken());
  const [role, setRole] = useState(authService.getRole());
  const [userId, setUserId] = useState(authService.getUserId());
  const isAuthenticated = !!token;

  useEffect(() => {
    const handleUnauthorized = () => {
      authService.logout();
      setToken(null);
      setRole(null);
      setUserId(null);
      navigate("/login", { replace: true });
    };

    window.addEventListener("unauthorized", handleUnauthorized);

    // Redirect only if user is on public pages
    const publicPaths = ["/login", "/register"];
    if (token && role && publicPaths.includes(location.pathname)) {
      if (role === "doctor") navigate("/doctor", { replace: true });
      else if (role === "patient") navigate("/patient", { replace: true });
    }

    return () => window.removeEventListener("unauthorized", handleUnauthorized);
  }, [token, role, location.pathname, navigate]);

  const login = async (credentials) => {
    const data = await authService.login(credentials);

    setToken(data.access_token);
    setRole(data.role);

    // Decode JWT for userId
    const decoded = jwtDecode(data.access_token);
    const userIdFromToken = decoded.sub || "";
    setUserId(userIdFromToken);

    // Redirect only if on public pages
  // ✅ Always go to role root after login
  if (data.role === "doctor") {
    navigate("/doctor", { replace: true });
  } else if (data.role === "patient") {
    navigate("/patient", { replace: true });
  } else {
    navigate("/login", { replace: true });
  }

    return data;
  };

  const logout = () => {
    authService.logout();
    setToken(null);
    setRole(null);
    setUserId(null);
    navigate("/login", { replace: true });
  };

  return (
    <AuthContext.Provider value={{ token, role, userId, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
