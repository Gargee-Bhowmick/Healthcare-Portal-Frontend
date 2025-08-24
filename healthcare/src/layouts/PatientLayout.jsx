import React from "react";
import Layout from "./Layout";
import { FaUserMd, FaClipboardList, FaFileMedical, FaCalendarCheck, FaUpload } from "react-icons/fa";

const navItems = [
    { title: "Profile", icon: <FaUserMd className="text-xl" />, link: "profile" },
    { title: "Book Appointment", icon: <FaClipboardList className="text-xl" />, link: "book-appointment" },
    { title: "Doctors List", icon: <FaUserMd className="text-xl" />, link: "doctors-list" },
    { title: "Medical History", icon: <FaFileMedical className="text-xl" />, link: "medical-history" },
    { title: "My Appointments", icon: <FaCalendarCheck className="text-xl" />, link: "my-appointments" },
    { title: "Upload Records", icon: <FaUpload className="text-xl" />, link: "upload-medical-history" }
];

const PatientLayout = () => {
    return <Layout navItems={navItems} />;
};

export default PatientLayout;