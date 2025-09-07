// authService.js
import apiClient from "./apiClient";
import * as jwt_decode from "jwt-decode";

const TOKEN_KEY = "myapp_access_token";
const ROLE_KEY = "myapp_user_role";
const USER_ID_KEY = "myapp_user_id";

const authService = {
  register: async (userData) => {
    const response = await apiClient.post("/register", userData);
    const { user_id } = response.data;

    // Save user_id in localStorage
    localStorage.setItem(USER_ID_KEY, user_id);

    return response.data;
  },

  login: async ({ username, password }) => {
    const response = await apiClient.post(
      "/login",
      new URLSearchParams({
        grant_type: "password",
        username,
        password,
        scope: "",
        client_id: "",
        client_secret: "",
      }),
      { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
    );

    const { access_token, role } = response.data;

    // Save token and role
    localStorage.setItem(TOKEN_KEY, access_token);
    localStorage.setItem(ROLE_KEY, role);

    // Decode JWT to get user_id
    const decoded = jwt_decode(access_token);
    localStorage.setItem(USER_ID_KEY, decoded.sub || "");

    return response.data;
  },

  logout: () => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(ROLE_KEY);
    localStorage.removeItem(USER_ID_KEY);
  },

  getToken: () => localStorage.getItem(TOKEN_KEY),
  getRole: () => localStorage.getItem(ROLE_KEY),
  getUserId: () => localStorage.getItem(USER_ID_KEY),
  isAuthenticated: () => !!localStorage.getItem(TOKEN_KEY),
};

export default authService;
