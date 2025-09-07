import { Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoute from "../components/common/ProtectedRoute";
import { AuthProvider } from "../components/common/AuthProvider";

// Patient Pages
import BookAppointment from "../pages/patient/BookAppointment";
import DoctorProfile from "../pages/patient/DoctorProfile";
import DoctorsList from "../pages/patient/DoctorsList";
import MedicalHistory from "../pages/patient/MedicalHistory";
import MyAppointments from "../pages/patient/MyAppointments";
import Profile from "../pages/patient/Profile";
import UploadMedicalHistory from "../pages/patient/UploadMedicalHistory";

// Doctor Pages
import PatientDetails from "../pages/doctor/PatientDetails";
import Timetable from "../pages/doctor/Timetable";
import DocProfile from "../pages/doctor/DocProfile";

// Auth Pages
import Login from "../pages/auth/Login";
import PatientRegister from "../pages/auth/PatientRegister";

// Layouts
import PatientLayout from "../layouts/PatientLayout";
import DoctorLayout from "../layouts/DoctorLayout";

export default function AppRoutes() {
  return (
    <AuthProvider>
      <Routes>
        {/* Default route redirects to login */}
        <Route path="/" element={<Navigate to="/login" />} />

        {/* Public routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<PatientRegister />} />

        {/* Protected Patient Routes */}
        <Route element={<ProtectedRoute allowedRoles={["patient"]} />}>
          <Route path="/patient" element={<PatientLayout />}>
            <Route index element={<Profile />} />
            <Route path="book-appointment" element={<BookAppointment />} />
            <Route path="doctor-profile" element={<DoctorProfile />} />
            <Route path="doctors-list" element={<DoctorsList />} />
            <Route path="medical-history" element={<MedicalHistory />} />
            <Route path="my-appointments" element={<MyAppointments />} />
            <Route path="profile" element={<Profile />} />
            <Route path="upload-medical-history" element={<UploadMedicalHistory />} />
          </Route>
        </Route>

        {/* Protected Doctor Routes */}
        <Route element={<ProtectedRoute allowedRoles={["doctor"]} />}>
          <Route path="/doctor" element={<DoctorLayout />}>
            <Route index element={<DocProfile />} />
            <Route path="patient-details/:id?" element={<PatientDetails />} />
            <Route path="timetable" element={<Timetable />} />
            <Route path="profile" element={<DocProfile />} />
          </Route>
        </Route>
      </Routes>
    </AuthProvider>
  );
}
