// authService.js
import apiClient from "./apiClient";
import { jwtDecode } from "jwt-decode";

const TOKEN_KEY = "access_token";
const ROLE_KEY = "role";
const USER_ID_KEY = "user_id";

const authService = {
  register: async (userData) => {
    try{
    const response = await apiClient.post("/register", userData);
    const { user_id } = response.data;

    // Save user_id in localStorage
    localStorage.setItem(USER_ID_KEY, user_id);

    return response.data;
    }
    catch(error){
      console.error("Registration error:", error);
      throw error;
    }
  },

  login: async ({ username, password }) => {
    try{
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
    // console.log("Login response:", response.data);
    const { access_token, role } = response.data;

    // Save token and role
    console.log("Saving token...");
    localStorage.setItem(TOKEN_KEY, access_token);

    localStorage.setItem(ROLE_KEY, role);

    // Decode JWT to get user_id
    const decoded = jwtDecode(access_token);
    localStorage.setItem(USER_ID_KEY, decoded.sub);
    // console.log("Token saved:", localStorage.getItem(TOKEN_KEY));
    // console.log("User ID saved:", localStorage.getItem(USER_ID_KEY));

    return response.data;
  }
  catch(error){
    console.error("Login error:", error);
    throw error;
  }
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
