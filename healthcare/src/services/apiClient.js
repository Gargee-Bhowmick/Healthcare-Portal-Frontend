// apiClient.js
import axios from "axios";

// Determine backend URL based on environment
const BASE_URL =
  import.meta.env.VITE_API_URL || "https://hms-b0e0ash9b3fda7ab.southeastasia-01.azurewebsites.net";

const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor: attach token if exists
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

// Response interceptor: handle 401
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("access_token");
      localStorage.removeItem("user_role");
      window.dispatchEvent(new Event("unauthorized"));
    }
    return Promise.reject(error);
  }
);

export default apiClient;


















// apiClient.js
// import axios from "axios";

// const apiClient = axios.create({
//   baseURL: "https://hms-b0e0ash9b3fda7ab.southeastasia-01.azurewebsites.net", // backend URL
//   headers: {
//     "Content-Type": "application/json",
//   },
// });

// Request Interceptor: Attach token if available
// apiClient.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem("access_token");
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => Promise.reject(error)
// );

 // Response Interceptor: Handle errors
// apiClient.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     if (error.response?.status === 401) {
//       localStorage.removeItem("access_token"); // clear token
//       window.dispatchEvent(new Event("unauthorized")); // custom event
//     }
//     return Promise.reject(error);
//   }
// );

// export default apiClient;
