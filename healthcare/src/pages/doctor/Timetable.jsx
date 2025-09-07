import { useState, useEffect, useMemo } from "react";
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
} from "@mui/material";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import PersonIcon from "@mui/icons-material/Person";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import appointmentService from "../../services/appointmentService"; // add this
import useLoading from "../../components/Provider/useLoading"; // import hook


// Generate 30-min slots for 9 hours (8:00 to 16:30)
const timeSlots = [];
for (let h = 8; h < 17; h++) {
  for (let m = 0; m < 60; m += 30) {
    const hour = h.toString().padStart(2, "0");
    const min = m.toString().padStart(2, "0");
    timeSlots.push(`${hour}:${min}`);
  }
}

// Weekdays
const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

// Get start of current week (Monday)
const getWeekStart = () => dayjs().startOf("week").add(1, "day");

const Timetable = () => {
  const { loading, setLoading } = useLoading(); 
  const theme = useTheme();
  const navigate = useNavigate();
  const [appointments, setAppointments] = useState([]);
  const [error, setError] = useState(null);

  // Fetch appointments from backend
  useEffect(() => {
    const fetchAppointments = async () => {
      setLoading(true);
      setError(null);
      const doctorId = localStorage.getItem("user_id");
      if (!doctorId) {
        console.log("doctor ID not found")
        return;
      }
      try {
        const response = await appointmentService.getByDoctor(doctorId); 
        setAppointments(response.data); // assuming axios response
        console.log("Fetched appointments:", response.data);
      } catch (err) {
        setError("Failed to fetch appointments",err);
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, []);

  // Process bookings for this week
  const weeklyBookings = useMemo(() => {
    const weekStart = getWeekStart();
    const weekDaysMap = {};
    days.forEach((day) => (weekDaysMap[day] = {}));

    appointments.forEach((b) => {
      const date = dayjs(b.appointment_date);
      const dayOfWeek = date.format("dddd");
      if (date.isAfter(weekStart.subtract(1, "day")) && date.isBefore(weekStart.add(5, "day"))) {
        const slot = dayjs(b.appointment_time, "HH:mm:ss.SSSZ").format("HH:mm");
        weekDaysMap[dayOfWeek][slot] = {
          patientName: b.patient_name || "Patient",
          patientId: b.patient_id,
        };
      }
    });

    return weekDaysMap;
  }, [appointments]);

  if (loading) return <Typography>Loading timetable...</Typography>;
  if (error) return <Typography color="error">{error}</Typography>;

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
              <TableCell sx={{ width: 90, fontWeight: 700, fontSize: 15 }}>Time</TableCell>
              {days.map((day) => (
                <TableCell key={day} align="center" sx={{ fontWeight: 700, fontSize: 15 }}>
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
                <TableCell sx={{ fontWeight: 600, color: "#1976d2" }}>{slot}</TableCell>
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
                        <Tooltip title={`View ${booking.patientName}'s profile`} arrow>
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
                            onClick={() => navigate(`/doctor/patient-details/${booking.patientId}`)}
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
      <Typography variant="caption" color="text.secondary" sx={{ mt: 2, display: "block", textAlign: "right" }}>
        * Click on a patient name to view their profile.
      </Typography>
    </Box>
  );
};

export default Timetable;
