import {useContext} from 'react'
import AppContext from '../../context/appContext'
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


const Timetable = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const {bookings} = useContext(AppContext);
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