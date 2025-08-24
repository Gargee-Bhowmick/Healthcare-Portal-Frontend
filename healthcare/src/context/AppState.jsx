import AppContext from './appContext'
import {useState} from 'react'
import {s_patients, s_doctor, s_bookings} from './sampleDoc'
import {s_doctors, s_timeSlots,s_medicalRecords, s_categories, s_dateFilters} from './samplePatient'
const AppState = (props) => {
  //for doctors
  const [patients, setPatients] = useState(s_patients)
  const [doctor, setDoctor] = useState(s_doctor)
  const [bookings, setBookings] = useState(s_bookings)


 // for patients

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

  }
  return (
    <AppContext.Provider value={state}>
      {props.children}
    </AppContext.Provider>
  )
}

export default AppState