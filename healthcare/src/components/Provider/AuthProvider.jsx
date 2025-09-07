import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import authService from "../../services/authService";
import * as jwt_decode from 'jwt-decode';



const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
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
    return () => window.removeEventListener("unauthorized", handleUnauthorized);
  }, [navigate]);

  const login = async (credentials) => {
    const data = await authService.login(credentials);
    setToken(data.access_token);
    setRole(data.role);

    const decoded = jwt_decode(data.access_token);
    setUserId(decoded.sub);

    if (data.role === "doctor") navigate("/doctor", { replace: true });
    else if (data.role === "patient") navigate("/patient", { replace: true });
    else navigate("/login", { replace: true });

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
