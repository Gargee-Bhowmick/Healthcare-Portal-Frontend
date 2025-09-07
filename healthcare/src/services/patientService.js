// patientService.js
import apiClient from "./apiClient";

const patientService = {
  getAll: () => apiClient.get("/patients/"),

  create: (data) => apiClient.post("/patients/createPatient", data),

  getByIdPatient: (patientId) => apiClient.get(`/patients/${patientId}`),

  uploadMedicalRecord: (patientId, recordData) => {
    const formData = new FormData();
    Object.entries(recordData).forEach(([key, value]) => {
      formData.append(key, value);
    });

    return apiClient.post(`/patients/${patientId}/u_medical_records/`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  },
};

export default patientService;
