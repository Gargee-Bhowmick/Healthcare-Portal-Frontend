import AppContext from './appContext'
import {useState} from 'react'
import {s_patients, s_doctor, s_bookings} from './sampleDoc'
import {s_doctors, s_timeSlots} from './samplePatient'
const AppState = (props) => {
  //for doctors
  const [patients, setPatients] = useState(s_patients)
  const [doctor, setDoctor] = useState(s_doctor)
  const [bookings, setBookings] = useState(s_bookings)


 // for patients
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


  const state = {
    patients, setPatients,
    doctor, setDoctor,
    bookings, setBookings,

    doctors, setDoctors,
    timeSlots, setTimeSlots,
    showAlert, setShowAlert,
    formData, setFormData,
  }
  return (
    <AppContext.Provider value={state}>
      {props.children}
    </AppContext.Provider>
  )
}

export default AppState