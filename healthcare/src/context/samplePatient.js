  
// Book Appointments  
  export const s_doctors = [
    {
      id: 1,
      name: "Dr. Sarah Johnson",
      specialty: "Cardiologist",
      avatar: "/api/placeholder/40/40",
    },
    {
      id: 2,
      name: "Dr. Michael Brown",
      specialty: "Dermatologist",
      avatar: "/api/placeholder/40/40",
    },
    {
      id: 3,
      name: "Dr. Emily Davis",
      specialty: "Neurologist",
      avatar: "/api/placeholder/40/40",
    },
    {
      id: 4,
      name: "Dr. James Wilson",
      specialty: "Orthopedist",
      avatar: "/api/placeholder/40/40",
    },
  ];

  // Available time slots
  export const s_timeSlots = [
    "09:00 AM",
    "09:30 AM",
    "10:00 AM",
    "10:30 AM",
    "11:00 AM",
    "11:30 AM",
    "02:00 PM",
    "02:30 PM",
    "03:00 PM",
    "03:30 PM",
    "04:00 PM",
    "04:30 PM",
  ];

// Medical History
  export const s_medicalRecords = [
    {
      id: 1,
      title: "Blood Test Results",
      category: "Lab Results",
      date: "2024-12-15",
      doctorName: "Dr. Sarah Johnson",
      hospital: "City General Hospital",
      description: "Complete blood count and lipid profile",
      fileType: "pdf",
    },
    {
      id: 2,
      title: "Chest X-Ray",
      category: "X-Ray/Imaging",
      date: "2024-12-10",
      doctorName: "Dr. Michael Chen",
      hospital: "Metro Medical Center",
      description: "Routine chest examination",
      fileType: "image",
    },
    {
      id: 3,
      title: "Diabetes Medication",
      category: "Prescription",
      date: "2024-12-08",
      doctorName: "Dr. Emily Rodriguez",
      hospital: "Family Health Clinic",
      description: "Metformin 500mg twice daily",
      fileType: "pdf",
    },
    {
      id: 4,
      title: "Annual Physical Exam",
      category: "Medical Report",
      date: "2024-11-20",
      doctorName: "Dr. James Wilson",
      hospital: "Wellness Medical Group",
      description: "Complete physical examination and health assessment",
      fileType: "pdf",
    },
    {
      id: 5,
      title: "COVID-19 Vaccination",
      category: "Vaccination Record",
      date: "2024-10-15",
      doctorName: "Dr. Lisa Brown",
      hospital: "Community Health Center",
      description: "COVID-19 booster vaccination",
      fileType: "pdf",
    },
    {
      id: 6,
      title: "Knee Surgery Report",
      category: "Surgery Report",
      date: "2024-09-05",
      doctorName: "Dr. Robert Martinez",
      hospital: "Orthopedic Specialty Hospital",
      description: "Arthroscopic knee surgery - meniscus repair",
      fileType: "pdf",
    },
  ];


// Frontend specific
  export const s_categories = [
    "All",
    "Lab Results",
    "X-Ray/Imaging",
    "Prescription",
    "Medical Report",
    "Vaccination Record",
    "Surgery Report",
    "Discharge Summary",
  ];
  
// Frontend specific
  export const s_dateFilters = [
    "All",
    "Last 30 days",
    "Last 3 months",
    "Last 6 months",
    "Last year",
  ];


// My Appointments
  export const s_appointments = [
    {
      id: 1,
      doctor: {
        name: "Dr. Sarah Johnson",
        specialty: "Cardiologist",
        avatar: "/api/placeholder/60/60",
        phone: "+1 (555) 123-4567",
        email: "sarah.johnson@hospital.com",
      },
      date: "2025-08-20",
      time: "10:30 AM",
      status: "confirmed",
      reason: "Routine Checkup",
      location: "Room 205, Cardiology Wing",
      notes: "Regular heart checkup and blood pressure monitoring",
      appointmentType: "In-Person",
    },
    {
      id: 2,
      doctor: {
        name: "Dr. Michael Brown",
        specialty: "Dermatologist",
        avatar: "/api/placeholder/60/60",
        phone: "+1 (555) 234-5678",
        email: "michael.brown@hospital.com",
      },
      date: "2025-08-22",
      time: "02:15 PM",
      status: "pending",
      reason: "Skin Consultation",
      location: "Room 301, Dermatology Department",
      notes: "Follow-up for skin condition treatment",
      appointmentType: "In-Person",
    },
    {
      id: 3,
      doctor: {
        name: "Dr. Emily Davis",
        specialty: "Neurologist",
        avatar: "/api/placeholder/60/60",
        phone: "+1 (555) 345-6789",
        email: "emily.davis@hospital.com",
      },
      date: "2025-08-18",
      time: "09:00 AM",
      status: "completed",
      reason: "Headache Consultation",
      location: "Room 105, Neurology Wing",
      notes: "Discussed migraine treatment options",
      appointmentType: "In-Person",
    },
    {
      id: 4,
      doctor: {
        name: "Dr. James Wilson",
        specialty: "Orthopedist",
        avatar: "/api/placeholder/60/60",
        phone: "+1 (555) 456-7890",
        email: "james.wilson@hospital.com",
      },
      date: "2025-08-15",
      time: "11:45 AM",
      status: "cancelled",
      reason: "Knee Pain",
      location: "Room 402, Orthopedics Department",
      notes: "Patient cancelled due to scheduling conflict",
      appointmentType: "In-Person",
    },
  ];


//Profile
  export const s_user = [
  {
    id: 1,
    name: "John Doe",
    gender: "Male",
    age: 42,
    contact: "+1-555-123456",
    emergencyContact: "+1-555-987654",
    chiefComplaint: "Chest pain and shortness of breath",
    symptoms: "Fatigue, dizziness, occasional headache",
    insurance: "BlueCross Health Insurance",
    familyHistory: "Father: Hypertension, Mother: Diabetes",
    lifestyle: "Non-smoker, occasional alcohol, sedentary job",
    photo: "https://randomuser.me/api/portraits/men/32.jpg", // placeholder image
    allergies: ["Penicillin", "Dust"],
    chronic: ["Hypertension"],
    surgeries: ["Appendectomy (2005)"],
    medications: [
      { name: "Amlodipine", dosage: "5mg", frequency: "Once daily" },
      { name: "Metformin", dosage: "500mg", frequency: "Twice daily" },
    ],
    vitals: {
      temperature: "98.6",
      bp: "130/85",
      heartRate: "78",
      respRate: "16",
      spo2: "97",
      weight: "82",
      height: "175",
    },
  },
];
