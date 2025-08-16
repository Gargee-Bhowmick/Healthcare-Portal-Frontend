
import { Link } from "react-router-dom";
import { FaUserMd, FaClipboardList, FaFileMedical, FaCalendarCheck, FaUpload } from "react-icons/fa";

export default function PatientDashboard() {
  const links = [
    { title: "Book Appointment", icon: <FaClipboardList className="text-xl" />, link: "book-appointment" },
    { title: "Doctors List", icon: <FaUserMd className="text-xl" />, link: "doctors-list" },
    { title: "Medical History", icon: <FaFileMedical className="text-xl" />, link: "medical-history" },
    { title: "My Appointments", icon: <FaCalendarCheck className="text-xl" />, link: "my-appointments" },
    { title: "Upload Records", icon: <FaUpload className="text-xl" />, link: "upload-medical-history" },
    { title: "Profile", icon: <FaUserMd className="text-xl" />, link: "profile" },
  ];

  return (
    <aside className="w-64 bg-indigo-700 text-white min-h-screen p-6 flex flex-col">
      <h2 className="text-4xl font-extrabold mb-10 bg-indigo-800 p-4 rounded shadow">
        Patient Portal
      </h2>
      <nav className="flex flex-col space-y-4">
        {links.map((c) => (
          <Link
            key={c.link}
            to={c.link}
            className="flex items-center space-x-3 p-2 rounded hover:bg-indigo-600 transition"
          >
            {c.icon}
            <span className="text-lg font-medium">{c.title}</span>
          </Link>
        ))}
      </nav>
    </aside>
  );
}
