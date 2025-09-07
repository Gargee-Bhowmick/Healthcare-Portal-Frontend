import { useEffect, useState, useMemo } from "react";
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
  Link,
  useTheme,
  Chip,
  Tooltip,
  Divider,
  Stack,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import PersonIcon from "@mui/icons-material/Person";
import { useNavigate } from "react-router-dom";
import appointmentService from "../../services/appointmentService";
import patientService from "../../services/patientService";
import useLoading from "../../components/Provider/useLoading";

// Generate 30-min slots for 9 hours (8:00 to 16:30)
const timeSlots = [];
for (let h = 8; h < 17; h++) {
  for (let m = 0; m < 60; m += 30) {
    const hour = h.toString().padStart(2, "0");
    const min = m.toString().padStart(2, "0");
    timeSlots.push(`${hour}:${min}`);
  }
}

const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

const Timetable = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const { setLoading } = useLoading();

  const [appointments, setAppointments] = useState([]);
  const [patients, setPatients] = useState({});
  const [error, setError] = useState(null);

  // Dialog state
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState(null);

  const handleOpenDialog = (patientData) => {
    setSelectedPatient(patientData);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setSelectedPatient(null);
    setOpenDialog(false);
  };

  // fetch appointments and patients
  useEffect(() => {
    const fetchAppointments = async () => {
      setLoading(true);
      setError(null);
      const doctorId = localStorage.getItem("user_id");

      if (!doctorId) {
        //console.log("doctor ID not found");
        return;
      }

      try {
        const response = await appointmentService.getByDoctor(doctorId);
        const data = response.data;
        setAppointments(data);
        //console.log("timetable", data);

        // fetch unique patient details
        const uniqueIds = [...new Set(data.map((a) => a.patient_id))];
        //console.log("unique ids", uniqueIds);
        const patientPromises = uniqueIds.map((id) =>
          patientService.getByIdPatient(id).then((res) => ({
            id,
            data: res.data,
          }))
        );

        const patientResults = await Promise.all(patientPromises);
        const patientMap = {};
        patientResults.forEach(({ id, data }) => {
          patientMap[id] = data;
        });
        setPatients(patientMap);
      } catch (err) {
        setError("Failed to fetch appointments");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, [setLoading]);

  // filter this week's appointments
  const weeklyBookings = useMemo(() => {
    const startOfWeek = new Date();
    startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay() + 1); // Monday
    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 4); // Friday

    const weekDaysMap = {};
    days.forEach((d) => (weekDaysMap[d] = {}));

    appointments.forEach((b) => {
      const date = new Date(b.appointment_date);
      if (date >= startOfWeek && date <= endOfWeek) {
        const dayOfWeek = days[date.getDay() - 1]; // map Monday=0
        const slot = b.appointment_time.slice(0, 5);
        const patient = patients[b.patient_id];
        if (dayOfWeek && timeSlots.includes(slot)) {
          weekDaysMap[dayOfWeek][slot] = {
            patientId: b.patient_id,
            patientName: patient?.full_name || "Patient",
            age: patient?.age,
            gender: patient?.gender,
            address: patient?.address,
            appointmentDate: b.appointment_date,
            appointmentTime: slot,
            reason: b.reason,
            medicalHistory: patient?.medical_history,
          };
        }
      }
    });

    return weekDaysMap;
  }, [appointments, patients]);

  return (
    <Box
      sx={{
        p: { xs: 1, md: 4 },
        bgcolor: "linear-gradient(135deg, #e3f0ff 0%, #fafcff 100%)",
        minHeight: "100vh",
      }}
    >
      <Stack direction="row" alignItems="center" spacing={1} mb={2}>
        <EventAvailableIcon color="primary" sx={{ fontSize: 32 }} />
        <Typography variant="h4" fontWeight={700} color="primary.dark">
          Patient Visit Timetable
        </Typography>
      </Stack>
      <Divider sx={{ mb: 3 }} />

      {error && (
        <Typography color="error" sx={{ mb: 2 }}>
          {error}
        </Typography>
      )}

      <Paper
        elevation={4}
        sx={{
          overflow: "auto",
          borderRadius: 3,
          boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.15)",
          border: `1px solid ${theme.palette.divider}`,
        }}
      >
        <Table
          sx={{
            minWidth: 900,
            borderCollapse: "separate",
            borderSpacing: 0,
            "& th, & td": { borderRight: "1px solid #f0f0f0" },
            "& th:last-child, & td:last-child": { borderRight: 0 },
            "& th": {
              bgcolor: "rgba(33, 150, 243, 0.08)",
              color: theme.palette.primary.main,
              fontWeight: 700,
              fontSize: 16,
              letterSpacing: 1,
              textTransform: "uppercase",
            },
          }}
          size="small"
        >
          <TableHead>
            <TableRow>
              <TableCell sx={{ width: 90, fontWeight: 700, fontSize: 15 }}>
                Time
              </TableCell>
              {days.map((day) => (
                <TableCell
                  key={day}
                  align="center"
                  sx={{ fontWeight: 700, fontSize: 15 }}
                >
                  {day}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {timeSlots.map((slot, idx) => (
              <TableRow
                key={slot}
                hover
                sx={{
                  bgcolor: idx % 2 === 0 ? "#f7fbff" : "#fff",
                  transition: "background 0.2s",
                }}
              >
                <TableCell sx={{ fontWeight: 600, color: "#1976d2" }}>
                  {slot}
                </TableCell>
                {days.map((day) => {
                  const booking = weeklyBookings[day]?.[slot];
                  return (
                    <TableCell
                      key={day + slot}
                      align="center"
                      sx={{
                        bgcolor: booking ? "#e3f2fd" : "transparent",
                        p: 0.5,
                        minWidth: 120,
                        borderBottom: "1px solid #f0f0f0",
                        transition: "background 0.2s",
                      }}
                    >
                      {booking ? (
                        <Tooltip
                          title={`Name: ${booking.patientName}, Reason: ${booking.reason}`}
                          arrow
                        >
                          <Link
                            component="button"
                            underline="none"
                            color="primary"
                            sx={{
                              fontWeight: 600,
                              fontSize: 15,
                              display: "inline-flex",
                              alignItems: "center",
                              gap: 0.5,
                              px: 1,
                              py: 0.5,
                              borderRadius: 2,
                              background: "rgba(33,150,243,0.08)",
                              "&:hover": {
                                background: "rgba(33,150,243,0.18)",
                                textDecoration: "underline",
                              },
                            }}
                            onClick={() => handleOpenDialog(booking)}
                          >
                            <PersonIcon sx={{ fontSize: 18, mr: 0.5 }} />
                            {booking.patientName}
                          </Link>
                        </Tooltip>
                      ) : (
                        <Chip
                          label="-"
                          size="small"
                          sx={{
                            bgcolor: "white",
                            color: "#90a4ae",
                            fontWeight: 500,
                            fontSize: 12,
                            borderRadius: 1,
                          }}
                        />
                      )}
                    </TableCell>
                  );
                })}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
      <Typography
        variant="caption"
        color="text.secondary"
        sx={{ mt: 2, display: "block", textAlign: "right" }}
      >
        * Click on a patient name to view their details.
      </Typography>

      {/* Patient Details Dialog */}
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <DialogTitle>Patient & Appointment Details</DialogTitle>
        <DialogContent dividers>
          {selectedPatient ? (
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
              {/* Patient Info */}
              <Typography variant="h6" color="primary">
                Patient Information
              </Typography>
              <Typography><b>Name:</b> {selectedPatient.patientName}</Typography>
              <Typography><b>Age:</b> {selectedPatient.age}</Typography>
              <Typography><b>Gender:</b> {selectedPatient.gender}</Typography>
              <Typography><b>Address:</b> {selectedPatient.address}</Typography>
              <Typography><b>ID:</b> {selectedPatient.patientId}</Typography>
              <Typography><b>Medical History:</b> {selectedPatient.medicalHistory || "N/A"}</Typography>

              <Divider sx={{ my: 2 }} />

              {/* Appointment Info */}
              <Typography variant="h6" color="primary">
                Appointment Information
              </Typography>
              <Typography>
                <b>Date:</b>{" "}
                {new Date(selectedPatient.appointmentDate).toDateString()}
              </Typography>
              <Typography>
                <b>Time:</b> {selectedPatient.appointmentTime}
              </Typography>
              <Typography>
                <b>Reason:</b> {selectedPatient.reason || "N/A"}
              </Typography>
            </Box>
          ) : (
            <Typography>No details available</Typography>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} variant="contained" color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Timetable;
