import { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Tabs,
  Tab,
  Card,
  CardContent,
  Avatar,
  Chip,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Divider,
} from "@mui/material";
import {
  Calendar as CalendarIcon,
  Clock,
  Phone,
  Mail,
  FileText,
} from "lucide-react";
import appointmentService from "../../services/appointmentService";
import useLoading from "../../components/Provider/useLoading";

export default function MyAppointments() {
  const { setLoading } = useLoading();
  const [tabValue, setTabValue] = useState(0);
  const [appointments, setAppointments] = useState([]);
  const [selectedAppointment, setSelectedAppointment] = useState(null);

  // fetch patient appointments
  useEffect(() => {
    const fetchAppointments = async () => {
      const patientId = localStorage.getItem("user_id");
      if (!patientId) return;

      setLoading(true);
      try {
        const response = await appointmentService.getByPatient(patientId);

        // ✅ transform API response to match UI
        const transformed = response.data.map((apt, index) => ({
          id: index,
          date: apt.date,
          time: apt.time,
          reason: apt.reason,
          status: apt.is_scheduled, // API field
          location: "Clinic Room 101", // placeholder
          notes: "",
          appointmentType: "Checkup", // placeholder
          doctor: {
            name: apt.doctor,
            specialty: apt.speciality,
            avatar: "",
            phone: "+91-9876543210", // placeholder
            email: "doctor@example.com", // placeholder
          },
        }));

        setAppointments(transformed);
      } catch (err) {
        console.error("❌ Failed to fetch appointments:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, [setLoading]);

  const handleTabChange = (_, newValue) => setTabValue(newValue);

  const getStatusColor = (status) => {
    switch (status) {
      case "scheduled":
        return "info";
      case "confirmed":
        return "success";
      case "pending":
        return "warning";
      case "completed":
        return "default";
      case "cancelled":
        return "error";
      default:
        return "default";
    }
  };

  const filteredAppointments = () => {
    try {
      switch (tabValue) {
        case 0: // All
          return appointments;
        case 1: // Upcoming (scheduled only)
          return appointments.filter((apt) => apt.status === "scheduled");
        case 2: // Completed
          return appointments.filter((apt) => apt.status === "completed");
        case 3: // Cancelled
          return appointments.filter((apt) => apt.status === "cancelled");
        default:
          return appointments;
      }
    } catch (err) {
      console.error("❌ Error filtering appointments:", err);
      return [];
    }
  };

  return (
    <Box sx={{ p: { xs: 2, md: 4 }, bgcolor: "#f9fafb", minHeight: "100vh" }}>
      <Typography variant="h4" fontWeight={700} mb={3} color="primary.dark">
        My Appointments
      </Typography>

      {/* Tabs */}
      <Tabs
        value={tabValue}
        onChange={handleTabChange}
        sx={{ mb: 3 }}
        textColor="primary"
        indicatorColor="primary"
      >
        <Tab label="All" />
        <Tab label="Upcoming" />
        <Tab label="Completed" />
        <Tab label="Cancelled" />
      </Tabs>

      {/* Appointment Cards */}
      <Box sx={{ display: "grid", gap: 2 }}>
        {filteredAppointments().map((apt) => (
          <Card
            key={apt.id}
            sx={{
              borderRadius: 3,
              boxShadow: "sm",
              cursor: "pointer",
              "&:hover": { boxShadow: 6 },
            }}
            onClick={() => setSelectedAppointment(apt)}
          >
            <CardContent sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <Avatar
                src={apt.doctor.avatar}
                alt={apt.doctor.name}
                sx={{ width: 56, height: 56 }}
              />
              <Box sx={{ flexGrow: 1 }}>
                <Typography variant="h6">{apt.doctor.name}</Typography>
                <Typography variant="body2" color="text.secondary">
                  {apt.doctor.specialty}
                </Typography>
                <Box sx={{ display: "flex", gap: 1, mt: 1 }}>
                  <Chip
                    icon={<CalendarIcon size={16} />}
                    label={apt.date}
                    size="small"
                  />
                  <Chip
                    icon={<Clock size={16} />}
                    label={apt.time}
                    size="small"
                  />
                </Box>
              </Box>
              <Chip
                label={apt.status}
                color={getStatusColor(apt.status)}
                sx={{ textTransform: "capitalize" }}
              />
            </CardContent>
          </Card>
        ))}
      </Box>

      {/* Appointment Details Dialog */}
      <Dialog
        open={!!selectedAppointment}
        onClose={() => setSelectedAppointment(null)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Appointment Details</DialogTitle>
        <Divider />
        <DialogContent>
          {selectedAppointment && (
            <Box>
              <Typography variant="h6" gutterBottom>
                {selectedAppointment.doctor.name}
              </Typography>
              <Typography color="text.secondary" gutterBottom>
                {selectedAppointment.doctor.specialty}
              </Typography>

              <Box sx={{ mt: 2 }}>
                <Typography variant="subtitle2">Date & Time</Typography>
                <Typography>
                  {selectedAppointment.date} at {selectedAppointment.time}
                </Typography>
              </Box>

              <Box sx={{ mt: 2 }}>
                <Typography variant="subtitle2">Reason</Typography>
                <Typography>{selectedAppointment.reason}</Typography>
              </Box>

              <Box sx={{ mt: 2 }}>
                <Typography variant="subtitle2">Status</Typography>
                <Chip
                  label={selectedAppointment.status}
                  color={getStatusColor(selectedAppointment.status)}
                  sx={{ textTransform: "capitalize" }}
                />
              </Box>

              <Box sx={{ mt: 2, display: "flex", gap: 2 }}>
                <IconButton>
                  <Phone size={20} />
                </IconButton>
                <IconButton>
                  <Mail size={20} />
                </IconButton>
                <IconButton>
                  <FileText size={20} />
                </IconButton>
              </Box>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setSelectedAppointment(null)}>Close</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
