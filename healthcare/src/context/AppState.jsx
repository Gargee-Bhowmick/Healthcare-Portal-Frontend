import AppContext from './appContext'
import {useState} from 'react'
import {s_patients, s_doctor, s_bookings} from './sampleDoc'
import {s_doctors, s_timeSlots,s_medicalRecords, s_categories, s_dateFilters, s_appointments} from './samplePatient'
const AppState = (props) => {
  //FOR DOCTORS
  const [patients, setPatients] = useState(s_patients)
  const [doctor, setDoctor] = useState(s_doctor)
  const [bookings, setBookings] = useState(s_bookings)


 // FOR PATIENTS

  //Book Appointments
  const [doctors, setDoctors] = useState(s_doctors)
  const [timeSlots, setTimeSlots] = useState(s_timeSlots)
  const [showAlert, setShowAlert] = useState(false);
  const [formData, setFormData] = useState({
      doctor: "",
      date: "",
      time: "",
      reason: "",
      notes: "",
    });

  
    //Medical History
    const [searchTerm, setSearchTerm] = useState("");
    const [categoryFilter, setCategoryFilter] = useState("All");
    const [dateFilter, setDateFilter] = useState("All");
    const [selectedRecord, setSelectedRecord] = useState(null);
    const [openDialog, setOpenDialog] = useState(false);
    const [medicalRecords, setMedicalRecords] = useState(s_medicalRecords)
    const [categories, setCategories] = useState(s_categories)
    const [dateFilters, setDateFilters] = useState(s_dateFilters)


    // My Appointments
    const [appointments, setAppointments] = useState(s_appointments)
    const [tabValue, setTabValue] = useState(0);
    // const [openDialog, setOpenDialog] = useState(false);
    const [selectedAppointment, setSelectedAppointment] = useState(null);


    //Upload Medical History
      const [files, setFiles] = useState([]);
      const [isDragOver, setIsDragOver] = useState(false);
      const [uploadProgress, setUploadProgress] = useState(0);
      const [isUploading, setIsUploading] = useState(false);
      const [selectedFile, setSelectedFile] = useState(null);
      const [recordDetails, setRecordDetails] = useState({
        title: "",
        category: "",
        description: "",
        date: "",
        doctorName: "",
        hospital: "",
      });
      const [records, setRecords] = useState([]);
      const [successMessage, setSuccessMessage] = useState("");

  const state = {
    patients, setPatients,
    doctor, setDoctor,
    bookings, setBookings,


    doctors, setDoctors,
    timeSlots, setTimeSlots,
    showAlert, setShowAlert,
    formData, setFormData,

    searchTerm, setSearchTerm,
    categoryFilter, setCategoryFilter,
    dateFilter, setDateFilter,
    selectedRecord, setSelectedRecord,
    openDialog, setOpenDialog,
    medicalRecords, setMedicalRecords,
    categories, setCategories,
    dateFilters, setDateFilters,

    appointments, setAppointments,
    tabValue, setTabValue,
    selectedAppointment, setSelectedAppointment,

    files, setFiles,
    isDragOver, setIsDragOver,
    uploadProgress, setUploadProgress,
    isUploading, setIsUploading,
    selectedFile, setSelectedFile,
    recordDetails, setRecordDetails,
    records, setRecords,
    successMessage, setSuccessMessage,

  }
  return (
    <AppContext.Provider value={state}>
      {props.children}
    </AppContext.Provider>
  )
}

export default AppState