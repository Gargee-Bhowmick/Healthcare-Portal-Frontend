import { Link } from "react-router-dom";
import { FaUserInjured, FaCalendarAlt, FaClipboardList } from "react-icons/fa";

export default function DoctorDashboard() {
  const links = [
    { title: "Dashboard", icon: <FaClipboardList className="text-xl" />, link: "" },
    { title: "Patient Details", icon: <FaUserInjured className="text-xl" />, link: "patient-details" },
    { title: "Timetable", icon: <FaCalendarAlt className="text-xl" />, link: "timetable" },
  ];

  return (
    <aside className="w-64 bg-green-600 text-white min-h-screen p-6 flex flex-col">
      <h2 className="text-4xl font-extrabold mb-10 bg-green-700 p-4 rounded shadow">
        Doctor Portal
      </h2>
      <nav className="flex flex-col space-y-4">
        {links.map((c) => (
          <Link
            key={c.link}
            to={c.link}
            className="flex items-center space-x-3 p-2 rounded hover:bg-green-500 transition"
          >
            {c.icon}
            <span className="text-lg font-medium">{c.title}</span>
          </Link>
        ))}
      </nav>
    </aside>
  );
}
