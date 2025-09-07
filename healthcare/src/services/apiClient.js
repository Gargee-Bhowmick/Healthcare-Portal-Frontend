// apiClient.js
import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://localhost:8000", // change to your backend URL
  headers: {
    "Content-Type": "application/json",
  },
});

// Request Interceptor: Attach token if available
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("access_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor: Handle errors
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      console.warn("Unauthorized - Redirecting to login");
      // optional: redirect to login page
    }
    return Promise.reject(error);
  }
);

export default apiClient;
