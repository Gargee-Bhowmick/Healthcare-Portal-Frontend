import React from "react";
import Layout from "./Layout";
import { FaUserInjured, FaCalendarAlt, FaUserMd } from "react-icons/fa";

  const navItems = [
    { title: "Patient Details", icon: <FaUserInjured className="text-xl" />, link: "patient-details" },
    { title: "Timetable", icon: <FaCalendarAlt className="text-xl" />, link: "timetable" },
    { title: "Profile", icon: <FaUserMd className="text-xl" />, link: "profile" }
  ];

const DoctorLayout = () => {
    return <Layout navItems={navItems} />;
};

export default DoctorLayout;