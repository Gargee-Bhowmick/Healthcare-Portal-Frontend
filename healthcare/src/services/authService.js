// authService.js
import apiClient from "./apiClient";

// Centralized keys (good practice)
const TOKEN_KEY = "myapp_access_token";
const ROLE_KEY = "myapp_user_role";

const authService = {
  register: (userData) => apiClient.post("/register", userData),

  login: async ({ username, password }) => {
    // FastAPI OAuth2 expects x-www-form-urlencoded
    const response = await apiClient.post(
      "/login",
      new URLSearchParams({
        grant_type: "password", // required by FastAPI spec
        username,
        password,
        scope: "", // empty unless you use scopes
        client_id: "", // ignored by FastAPI default
        client_secret: "", // ignored by FastAPI default
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
