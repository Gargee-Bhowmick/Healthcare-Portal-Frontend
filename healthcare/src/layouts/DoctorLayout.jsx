import React from "react";
import Layout from "./Layout";
import { FaUserInjured, FaCalendarAlt, FaClipboardList } from "react-icons/fa";

  const navItems = [
    { title: "Dashboard", icon: <FaClipboardList className="text-xl" />, link: "" },
    { title: "Patient Details", icon: <FaUserInjured className="text-xl" />, link: "patient-details" },
    { title: "Timetable", icon: <FaCalendarAlt className="text-xl" />, link: "timetable" },
  ];

const DoctorLayout = () => {
    return <Layout navItems={navItems} />;
};

export default DoctorLayout;