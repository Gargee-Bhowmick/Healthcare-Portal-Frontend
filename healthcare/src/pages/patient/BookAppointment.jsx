import React, { useContext } from "react";
import AppContext from "../../context/appContext";
import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Alert,
  Chip,
  Avatar,
  Divider,
} from "@mui/material";
import { FaUserMd, FaCalendarAlt, FaClock, FaStickyNote } from "react-icons/fa";

const BookAppointment = () => {
  const { formData, setFormData, showAlert, setShowAlert, doctors, timeSlots } = useContext(AppContext)

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.doctor && formData.date && formData.time && formData.reason) {
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 5000);
      // Reset form
      setFormData({
        doctor: "",
        date: "",
        time: "",
        reason: "",
        notes: "",
      });
    }
  };

  const selectedDoctor = doctors.find((doc) => doc.id === formData.doctor);

  return (
    <Box sx={{ maxWidth: 1000, mx: "auto" }}>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: 600, color: "#1976d2", mb: 1 }}>
          Book Appointment
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Schedule your appointment with our experienced doctors
        </Typography>
      </Box>

      {showAlert && (
        <Alert severity="success" sx={{ mb: 3 }}>
          Appointment booked successfully! You will receive a confirmation email shortly.
        </Alert>
      )}

      <Grid container spacing={3}>
        {/* Main Form */}
        <Grid item xs={12} md={8}>
          <Card sx={{ boxShadow: 3 }}>
            <CardContent sx={{ p: 4 }}>
              <form onSubmit={handleSubmit}>
                <Grid container spacing={3}>
                  {/* Doctor Selection */}
                  <Grid item xs={12}>
                    <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                      <FaUserMd style={{ marginRight: 8, color: "#1976d2" }} />
                      <Typography variant="h6">Select Doctor</Typography>
                    </Box>
                    <FormControl fullWidth required>
                      <InputLabel>Choose a doctor</InputLabel>
                      <Select
                        value={formData.doctor}
                        label="Choose a doctor"
                        onChange={(e) => handleInputChange("doctor", e.target.value)}
                      >
                        {doctors.map((doctor) => (
                          <MenuItem key={doctor.id} value={doctor.id}>
                            <Box sx={{ display: "flex", alignItems: "center" }}>
                              <Avatar
                                src={doctor.avatar}
                                sx={{ width: 32, height: 32, mr: 2 }}
                              >
                                {doctor.name.charAt(3)}
                              </Avatar>
                              <Box>
                                <Typography variant="body1">{doctor.name}</Typography>
                                <Typography variant="caption" color="text.secondary">
                                  {doctor.specialty}
                                </Typography>
                              </Box>
                            </Box>
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>

                  {/* Date and Time Selection */}
                  <Grid item xs={12} sm={6}>
                    <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                      <FaCalendarAlt style={{ marginRight: 8, color: "#1976d2" }} />
                      <Typography variant="h6">Select Date</Typography>
                    </Box>
                    <TextField
                      fullWidth
                      type="date"
                      label="Appointment Date"
                      value={formData.date}
                      onChange={(e) => handleInputChange("date", e.target.value)}
                      required
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                      <FaClock style={{ marginRight: 8, color: "#1976d2" }} />
                      <Typography variant="h6">Select Time</Typography>
                    </Box>
                    <FormControl fullWidth required>
                      <InputLabel>Time Slot</InputLabel>
                      <Select
                        value={formData.time}
                        label="Time Slot"
                        onChange={(e) => handleInputChange("time", e.target.value)}
                      >
                        {timeSlots.map((time) => (
                          <MenuItem key={time} value={time}>
                            {time}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>

                  {/* Reason for Visit */}
                  <Grid item xs={12}>
                    <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                      <FaStickyNote style={{ marginRight: 8, color: "#1976d2" }} />
                      <Typography variant="h6">Reason for Visit</Typography>
                    </Box>
                    <FormControl fullWidth required>
                      <InputLabel>Select reason</InputLabel>
                      <Select
                        value={formData.reason}
                        label="Select reason"
                        onChange={(e) => handleInputChange("reason", e.target.value)}
                      >
                        <MenuItem value="routine-checkup">Routine Checkup</MenuItem>
                        <MenuItem value="follow-up">Follow-up Visit</MenuItem>
                        <MenuItem value="new-symptoms">New Symptoms</MenuItem>
                        <MenuItem value="medication-review">Medication Review</MenuItem>
                        <MenuItem value="consultation">Consultation</MenuItem>
                        <MenuItem value="emergency">Emergency</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>

                  {/* Additional Notes */}
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      multiline
                      rows={4}
                      label="Additional Notes (Optional)"
                      placeholder="Please describe your symptoms or any specific concerns..."
                      value={formData.notes}
                      onChange={(e) => handleInputChange("notes", e.target.value)}
                    />
                  </Grid>

                  {/* Submit Button */}
                  <Grid item xs={12}>
                    <Button
                      type="submit"
                      variant="contained"
                      size="large"
                      fullWidth
                      sx={{
                        py: 1.5,
                        fontSize: "1.1rem",
                        fontWeight: 600,
                        background: "linear-gradient(45deg, #1976d2, #42a5f5)",
                        "&:hover": {
                          background: "linear-gradient(45deg, #1565c0, #1976d2)",
                        },
                      }}
                    >
                      Book Appointment
                    </Button>
                  </Grid>
                </Grid>
              </form>
            </CardContent>
          </Card>
        </Grid>

        {/* Sidebar */}
        <Grid item xs={12} md={4}>
          <Card sx={{ boxShadow: 3, mb: 3 }}>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2, color: "#1976d2" }}>
                Appointment Summary
              </Typography>
              <Divider sx={{ mb: 2 }} />
              
              {selectedDoctor && (
                <Box sx={{ mb: 2 }}>
                  <Typography variant="subtitle2" color="text.secondary">
                    Doctor
                  </Typography>
                  <Box sx={{ display: "flex", alignItems: "center", mt: 1 }}>
                    <Avatar sx={{ width: 40, height: 40, mr: 2 }}>
                      {selectedDoctor.name.charAt(3)}
                    </Avatar>
                    <Box>
                      <Typography variant="body1" fontWeight={500}>
                        {selectedDoctor.name}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {selectedDoctor.specialty}
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              )}

              {formData.date && (
                <Box sx={{ mb: 2 }}>
                  <Typography variant="subtitle2" color="text.secondary">
                    Date
                  </Typography>
                  <Typography variant="body1">
                    {formData.date}
                  </Typography>
                </Box>
              )}

              {formData.time && (
                <Box sx={{ mb: 2 }}>
                  <Typography variant="subtitle2" color="text.secondary">
                    Time
                  </Typography>
                  <Typography variant="body1">{formData.time}</Typography>
                </Box>
              )}

              {formData.reason && (
                <Box sx={{ mb: 2 }}>
                  <Typography variant="subtitle2" color="text.secondary">
                    Reason
                  </Typography>
                  <Chip 
                    label={formData.reason.replace("-", " ").replace(/\b\w/g, l => l.toUpperCase())} 
                    color="primary" 
                    variant="outlined"
                    size="small"
                  />
                </Box>
              )}
            </CardContent>
          </Card>

          {/* Quick Tips */}
          <Card sx={{ boxShadow: 3 }}>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2, color: "#1976d2" }}>
                Appointment Tips
              </Typography>
              <Box sx={{ "& > *": { mb: 1 } }}>
                <Typography variant="body2" color="text.secondary">
                  • Arrive 15 minutes before your scheduled time
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  • Bring a valid ID and insurance card
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  • Prepare a list of current medications
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  • Note down symptoms and questions
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default BookAppointment;