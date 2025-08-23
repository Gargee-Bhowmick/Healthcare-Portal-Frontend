import React from "react";
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

// Example bookings: { [day]: { [time]: { patientName, patientId } } }
const bookings = {
  Monday: {
    "08:00": { patientName: "John Doe", patientId: 1 },
    "09:00": { patientName: "Jane Smith", patientId: 2 },
    "10:30": { patientName: "Alice Brown", patientId: 3 },
    "13:00": { patientName: "Night Owl", patientId: 6 },
    "15:30": { patientName: "Sam Carter", patientId: 11 },
  },
  Tuesday: {
    "08:30": { patientName: "Bob Lee", patientId: 4 },
    "09:30": { patientName: "Charlie Kim", patientId: 5 },
    "11:00": { patientName: "Diana Prince", patientId: 7 },
    "14:00": { patientName: "Eve Adams", patientId: 12 },
    "16:00": { patientName: "Frank Moore", patientId: 13 },
  },
  Wednesday: {
    "08:00": { patientName: "Grace Hall", patientId: 8 },
    "09:30": { patientName: "Henry Ford", patientId: 9 },
    "12:00": { patientName: "Ivy Lane", patientId: 10 },
    "13:30": { patientName: "Jack Frost", patientId: 14 },
    "15:00": { patientName: "Karen Page", patientId: 15 },
  },
  Thursday: {
    "08:30": { patientName: "Leo King", patientId: 16 },
    "10:00": { patientName: "Mona Ray", patientId: 17 },
    "11:30": { patientName: "Nina West", patientId: 18 },
    "14:30": { patientName: "Oscar Wilde", patientId: 19 },
    "16:30": { patientName: "Paul Young", patientId: 20 },
  },
  Friday: {
    "09:00": { patientName: "Quinn Fox", patientId: 21 },
    "10:30": { patientName: "Rita Stone", patientId: 22 },
    "12:30": { patientName: "Steve Nash", patientId: 23 },
    "14:00": { patientName: "Tina Bell", patientId: 24 },
    "15:30": { patientName: "Uma Dale", patientId: 25 },
  },
};

const Timetable = () => {
  const theme = useTheme();
  const navigate = useNavigate();

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
              <TableCell sx={{ width: 90, fontWeight: 700, fontSize: 15 }}>
                Time
              </TableCell>
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
                <TableCell sx={{ fontWeight: 600, color: "#1976d2" }}>
                  {slot}
                </TableCell>
                {days.map((day) => {
                  const booking = bookings[day]?.[slot];
                  return (
                    <TableCell
                      key={day + slot}
                      align="center"
                      sx={{
                        bgcolor: booking ? "#e3f2fd" : "transparent",
                        p: 0.5,
                        minWidth: 120,
                        borderBottom: "1px solid #f0f0f0",
                        borderLeft: "none",
                        borderRight: "none",
                        borderTop: "none",
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
                              transition: "background 0.2s",
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
      <Typography
        variant="caption"
        color="text.secondary"
        sx={{ mt: 2, display: "block", textAlign: "right" }}
      >
        * Click on a patient name to view their profile.
      </Typography>
    </Box>
    );
    };

    export default Timetable;