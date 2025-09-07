// doctorService.js
import apiClient from "./apiClient";

const doctorService = {
  getAll: () => apiClient.get("/doctors/"),

  create: (data) => apiClient.post("/doctors/createDoctor", data),

  getById: (doctorId) => apiClient.get(`/doctors/${doctorId}`),
};

export default doctorService;
