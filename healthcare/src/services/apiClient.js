// apiClient.js
import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://localhost:8000", // backend URL
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
      localStorage.removeItem("access_token"); // clear token
      window.dispatchEvent(new Event("unauthorized")); // custom event
    }
    return Promise.reject(error);
  }
);

export default apiClient;
