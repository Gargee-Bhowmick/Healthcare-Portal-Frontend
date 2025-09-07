// authService.js
import apiClient from "./apiClient";

const TOKEN_KEY = "access_token";
const ROLE_KEY = "user_role";

const authService = {
  register: (userData) => apiClient.post("/register", userData),

  login: async ({ username, password }) => {
    const response = await apiClient.post(
      "/login",
      new URLSearchParams({
        username,
        password,
      }),
      { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
    );

    const { access_token, role } = response.data;

    // Save tokens in localStorage
    localStorage.setItem(TOKEN_KEY, access_token);
    localStorage.setItem(ROLE_KEY, role);

    return response.data;
  },

  logout: () => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(ROLE_KEY);
  },

  getToken: () => localStorage.getItem(TOKEN_KEY),
  getRole: () => localStorage.getItem(ROLE_KEY),
  isAuthenticated: () => !!localStorage.getItem(TOKEN_KEY),
};

export default authService;
