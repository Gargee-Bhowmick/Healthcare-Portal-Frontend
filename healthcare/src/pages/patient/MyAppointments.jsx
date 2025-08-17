import React, { useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Chip,
  Avatar,
  Divider,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Tab,
  Tabs,
} from "@mui/material";
import {
  FaCalendarAlt,
  FaClock,
  FaUserMd,
  FaMapMarkerAlt,
  FaEye,
  FaPhone,
  FaEnvelope,
} from "react-icons/fa";

const MyAppointments = () => {
  const [tabValue, setTabValue] = useState(0);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);

  // Mock appointments data
  const appointments = [
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

  const getStatusColor = (status) => {
    switch (status) {
      case "confirmed":
        return "success";
      case "pending":
        return "warning";
      case "completed":
        return "info";
      case "cancelled":
        return "error";
      default:
        return "default";
    }
  };

  const getFilteredAppointments = () => {
    switch (tabValue) {
      case 0: // All
        return appointments;
      case 1: // Upcoming
        return appointments.filter(apt => apt.status === "confirmed" || apt.status === "pending");
      case 2: // Completed
        return appointments.filter(apt => apt.status === "completed");
      case 3: // Cancelled
        return appointments.filter(apt => apt.status === "cancelled");
      default:
        return appointments;
    }
  };

  const handleOpenDialog = (appointment) => {
    setSelectedAppointment(appointment);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedAppointment(null);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <Box sx={{ maxWidth: 1200, mx: "auto" }}>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: 600, color: "#1976d2", mb: 1 }}>
          My Appointments
        </Typography>
        <Typography variant="body1" color="text.secondary">
          View your scheduled appointments with our healthcare providers
        </Typography>
      </Box>

      {/* Tabs */}
      <Card sx={{ mb: 3 }}>
        <Tabs
          value={tabValue}
          onChange={(e, newValue) => setTabValue(newValue)}
          sx={{ px: 2, pt: 1 }}
        >
          <Tab label="All Appointments" />
          <Tab label="Upcoming" />
          <Tab label="Completed" />
          <Tab label="Cancelled" />
        </Tabs>
      </Card>

      {/* Appointments List */}
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        {getFilteredAppointments().map((appointment) => (
          <Card key={appointment.id} sx={{ boxShadow: 3, "&:hover": { boxShadow: 6 } }}>
            <CardContent sx={{ p: 3 }}>
              <Box sx={{ 
                display: 'flex', 
                flexDirection: { xs: 'column', md: 'row' }, 
                gap: 3, 
                alignItems: { xs: 'flex-start', md: 'center' } 
              }}>
                {/* Doctor Info */}
                <Box sx={{ display: "flex", alignItems: "center", minWidth: { md: 300 } }}>
                  <Avatar
                    src={appointment.doctor.avatar}
                    sx={{ width: 60, height: 60, mr: 2 }}
                  >
                    {appointment.doctor.name.charAt(3)}
                  </Avatar>
                  <Box>
                    <Typography variant="h6" sx={{ fontWeight: 600 }}>
                      {appointment.doctor.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {appointment.doctor.specialty}
                    </Typography>
                    <Chip
                      label={appointment.status}
                      color={getStatusColor(appointment.status)}
                      size="small"
                      sx={{ mt: 0.5, textTransform: "capitalize" }}
                    />
                  </Box>
                </Box>

                {/* Appointment Details */}
                <Box sx={{ 
                  flex: 1, 
                  display: 'flex', 
                  flexDirection: { xs: 'column', sm: 'row' }, 
                  gap: 2 
                }}>
                  <Box sx={{ flex: 1 }}>
                    <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                      <FaCalendarAlt style={{ marginRight: 8, color: "#1976d2" }} />
                      <Typography variant="body2">
                        {formatDate(appointment.date)}
                      </Typography>
                    </Box>
                    <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                      <FaClock style={{ marginRight: 8, color: "#1976d2" }} />
                      <Typography variant="body2">{appointment.time}</Typography>
                    </Box>
                  </Box>
                  <Box sx={{ flex: 1 }}>
                    <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                      <FaUserMd style={{ marginRight: 8, color: "#1976d2" }} />
                      <Typography variant="body2">{appointment.reason}</Typography>
                    </Box>
                    <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                      <FaMapMarkerAlt style={{ marginRight: 8, color: "#1976d2" }} />
                      <Typography variant="body2">
                        {appointment.location}
                      </Typography>
                    </Box>
                  </Box>
                </Box>

                {/* Action Button */}
                <Box sx={{ display: "flex", justifyContent: "center" }}>
                  <Button
                    variant="outlined"
                    size="small"
                    startIcon={<FaEye />}
                    onClick={() => handleOpenDialog(appointment)}
                  >
                    View Details
                  </Button>
                </Box>
              </Box>
            </CardContent>
          </Card>
        ))}
      </Box>

      {/* Empty State */}
      {getFilteredAppointments().length === 0 && (
        <Card sx={{ textAlign: "center", py: 8 }}>
          <CardContent>
            <Typography variant="h6" color="text.secondary" sx={{ mb: 2 }}>
              No appointments found
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {tabValue === 1 && "You don't have any upcoming appointments."}
              {tabValue === 2 && "You don't have any completed appointments."}
              {tabValue === 3 && "You don't have any cancelled appointments."}
              {tabValue === 0 && "You haven't booked any appointments yet."}
            </Typography>
          </CardContent>
        </Card>
      )}

      {/* View Details Dialog */}
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        {selectedAppointment && (
          <>
            <DialogTitle>
              <Typography variant="h6">Appointment Details</Typography>
            </DialogTitle>
            <DialogContent>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                  <Avatar
                    src={selectedAppointment.doctor.avatar}
                    sx={{ width: 60, height: 60, mr: 2 }}
                  >
                    {selectedAppointment.doctor.name.charAt(3)}
                  </Avatar>
                  <Box>
                    <Typography variant="h6">
                      {selectedAppointment.doctor.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {selectedAppointment.doctor.specialty}
                    </Typography>
                  </Box>
                </Box>
                <Divider sx={{ my: 2 }} />
                
                <Box sx={{ display: 'flex', gap: 4 }}>
                  <Box sx={{ flex: 1 }}>
                    <Typography variant="subtitle2" color="text.secondary">
                      Date
                    </Typography>
                    <Typography variant="body1">
                      {formatDate(selectedAppointment.date)}
                    </Typography>
                  </Box>
                  <Box sx={{ flex: 1 }}>
                    <Typography variant="subtitle2" color="text.secondary">
                      Time
                    </Typography>
                    <Typography variant="body1">{selectedAppointment.time}</Typography>
                  </Box>
                </Box>
                
                <Box sx={{ display: 'flex', gap: 4 }}>
                  <Box sx={{ flex: 1 }}>
                    <Typography variant="subtitle2" color="text.secondary">
                      Status
                    </Typography>
                    <Chip
                      label={selectedAppointment.status}
                      color={getStatusColor(selectedAppointment.status)}
                      size="small"
                      sx={{ textTransform: "capitalize" }}
                    />
                  </Box>
                  <Box sx={{ flex: 1 }}>
                    <Typography variant="subtitle2" color="text.secondary">
                      Type
                    </Typography>
                    <Typography variant="body1">
                      {selectedAppointment.appointmentType}
                    </Typography>
                  </Box>
                </Box>
                
                <Box>
                  <Typography variant="subtitle2" color="text.secondary">
                    Reason
                  </Typography>
                  <Typography variant="body1">{selectedAppointment.reason}</Typography>
                </Box>
                
                <Box>
                  <Typography variant="subtitle2" color="text.secondary">
                    Location
                  </Typography>
                  <Typography variant="body1">{selectedAppointment.location}</Typography>
                </Box>
                
                <Box>
                  <Typography variant="subtitle2" color="text.secondary">
                    Notes
                  </Typography>
                  <Typography variant="body1">{selectedAppointment.notes}</Typography>
                </Box>
                
                <Divider sx={{ my: 1 }} />
                <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 1 }}>
                  Doctor Contact
                </Typography>
                <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                  <FaPhone style={{ marginRight: 8, color: "#1976d2" }} />
                  <Typography variant="body2">
                    {selectedAppointment.doctor.phone}
                  </Typography>
                </Box>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <FaEnvelope style={{ marginRight: 8, color: "#1976d2" }} />
                  <Typography variant="body2">
                    {selectedAppointment.doctor.email}
                  </Typography>
                </Box>
              </Box>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseDialog}>Close</Button>
            </DialogActions>
          </>
        )}
      </Dialog>
    </Box>
  );
};

export default MyAppointments;