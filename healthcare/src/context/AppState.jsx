import AppContext from './appContext'
import {useState} from 'react'
import {s_patients, s_doctor, s_bookings} from './sampleData'
const AppState = (props) => {
  const [patients, setPatients] = useState(s_patients)
  const [doctor, setDoctor] = useState(s_doctor)
  const [bookings, setBookings] = useState(s_bookings)
  const state = {
    patients, setPatients,
    doctor, setDoctor,
    bookings, setBookings,
  }
  return (
    <AppContext.Provider value={state}>
      {props.children}
    </AppContext.Provider>
  )
}

export default AppState