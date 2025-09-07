import apiClient from "./apiClient";

const appointmentService = {
  book: (patientId, doctorId, data) =>
    apiClient.post(`/appointments/book_appointment/${patientId}/${doctorId}`, data),

  getByDoctor: (doctorId) => apiClient.get(`/appointments/doctor/${doctorId}`),

  getByPatient: (patientId) => apiClient.get(`/appointments/patient/${patientId}`),

  updateStatus: (patientId, appointmentId, status) =>
    apiClient.put(`/appointments/update_status/${patientId}/${appointmentId}`, null, {
      params: { status },
    }),
};

export default appointmentService;
