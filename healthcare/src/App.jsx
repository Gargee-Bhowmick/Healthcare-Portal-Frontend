import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";


// Patient Pages
import BookAppointment from "./pages/patient/BookAppointment";
import DoctorProfile from "./pages/patient/DoctorProfile";
import DoctorsList from "./pages/patient/DoctorsList";
import MedicalHistory from "./pages/patient/MedicalHistory";
import MyAppointments from "./pages/patient/MyAppointments";
import Profile from "./pages/patient/Profile";
import UploadMedicalHistory from "./pages/patient/UploadMedicalHistory";

// Doctor Pages
import PatientDetails from "./pages/doctor/PatientDetails";
import Timetable from "./pages/doctor/Timetable";

import Login from "./pages/auth/Login";
import PatientLayout from "./layouts/PatientLayout";
import DoctorLayout from "./layouts/DoctorLayout";
import PatientRegister from "./pages/auth/PatientRegister";

export default function App() {
  return (
    <Router>
      <Routes>
        {/* Default route redirects to patient dashboard */}
        <Route path="/" element={<Navigate to="/login" />} />

        <Route path="/login" element={<Login />} />
        <Route path="/register" element = {<PatientRegister/>} />
        {/* Patient Routes */}
        <Route path="/patient" element={<PatientLayout />}>
          <Route index element={<BookAppointment />} /> {/* Default page under patient */}
          <Route path="book-appointment" element={<BookAppointment />} />
          <Route path="doctor-profile" element={<DoctorProfile />} />
          <Route path="doctors-list" element={<DoctorsList />} />
          <Route path="medical-history" element={<MedicalHistory />} />
          <Route path="my-appointments" element={<MyAppointments />} />
          <Route path="profile" element={<Profile />} />
          <Route path="upload-medical-history" element={<UploadMedicalHistory />} />
        </Route>

        {/* Doctor Routes */}
        <Route path="/doctor" element={<DoctorLayout />}>
          <Route index element={<PatientDetails />} /> {/* Default page under doctor */}
          <Route path="patient-details" element={<PatientDetails />} />
          <Route path="timetable" element={<Timetable />} />
        </Route>
      </Routes>
    </Router>
  );
}
