import React, { useState, useEffect } from "react";
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
  const [formData, setFormData] = useState({
    doctor: "",
    date: "",
    time: "",
    reason: "",
    notes: "",
  });
  const [doctors, setDoctors] = useState([]);
  const [showAlert, setShowAlert] = useState(false);
  const [error, setError] = useState("");

  // Fetch doctors
  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const res = await fetch(
          "https://hms-b0e0ash9b3fda7ab.southeastasia-01.azurewebsites.net/doctors/"
        );
        if (!res.ok) throw new Error("Failed to fetch doctors");
        const data = await res.json();
        setDoctors(data);
      } catch (err) {
        console.error(err);
        setError("Failed to load doctors. Try again later.");
      }
    };
    fetchDoctors();
  }, []);

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!formData.doctor || !formData.date || !formData.time || !formData.reason) {
      setError("Please fill all required fields");
      return;
    }

    try {
      const patient_id = localStorage.getItem("patient_id");
      if (!patient_id) throw new Error("Patient ID not found. Please login again.");

      const selectedDoctor = doctors.find((doc) => doc.id === formData.doctor);
      if (!selectedDoctor) throw new Error("Selected doctor is invalid");

      const body = {
        appointment_date: formData.date,
        appointment_time: formData.time,
        reason: formData.reason,
        notes: formData.notes,
      };

      const res = await fetch(
        `https://hms-b0e0ash9b3fda7ab.southeastasia-01.azurewebsites.net/appointments/${selectedDoctor.id}/${patient_id}/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
          body: JSON.stringify(body),
        }
      );

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.detail?.[0]?.msg || "Failed to book appointment");
      }

      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 5000);

      setFormData({
        doctor: "",
        date: "",
        time: "",
        reason: "",
        notes: "",
      });
    } catch (err) {
      console.error(err);
      setError(err.message);
    }
  };

  const selectedDoctor = doctors.find((doc) => doc.id === formData.doctor);

  return (
    <Box sx={{ maxWidth: 1000, mx: "auto", my: 4 }}>
      <Typography variant="h4" sx={{ fontWeight: 600, color: "#1976d2", mb: 3 }}>
        Book Appointment
      </Typography>

      {showAlert && <Alert severity="success" sx={{ mb: 3 }}>Appointment booked successfully!</Alert>}
      {error && <Alert severity="error" sx={{ mb: 3 }}>{error}</Alert>}

      <Grid container spacing={3}>
        {/* Form */}
        <Grid xs={12} md={8}>
          <Card sx={{ boxShadow: 3 }}>
            <CardContent sx={{ p: 4 }}>
              <form onSubmit={handleSubmit}>
                <Grid container spacing={3}>
                  {/* Doctor Selection */}
                  <Grid xs={12}>
                    <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                      <FaUserMd style={{ marginRight: 8, color: "#1976d2" }} />
                      <Typography variant="h6">Select Doctor</Typography>
                    </Box>
                    <FormControl fullWidth required>
                      <InputLabel>Choose a doctor</InputLabel>
                      <Select
                        value={formData.doctor || ""}
                        label="Choose a doctor"
                        onChange={(e) => handleInputChange("doctor", e.target.value)}
                      >
                        {doctors.map((doctor) => (
                          <MenuItem key={doctor.id} value={doctor.id}>
                            <Box sx={{ display: "flex", alignItems: "center" }}>
                              <Avatar sx={{ width: 32, height: 32, mr: 2 }}>
                                {doctor.full_name?.charAt(0) || "D"}
                              </Avatar>
                              <Box>
                                <Typography variant="body1">{doctor.full_name}</Typography>
                                <Typography variant="caption" color="text.secondary">
                                  {doctor.specialization}
                                </Typography>
                              </Box>
                            </Box>
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>

                  {/* Date */}
                  <Grid xs={12} sm={6}>
                    <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                      <FaCalendarAlt style={{ marginRight: 8, color: "#1976d2" }} />
                      <Typography variant="h6">Select Date</Typography>
                    </Box>
                    <TextField
                      fullWidth
                      type="date"
                      value={formData.date}
                      onChange={(e) => handleInputChange("date", e.target.value)}
                      required
                      InputLabelProps={{ shrink: true }}
                    />
                  </Grid>

                  {/* Time */}
                  <Grid xs={12} sm={6}>
                    <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                      <FaClock style={{ marginRight: 8, color: "#1976d2" }} />
                      <Typography variant="h6">Select Time</Typography>
                    </Box>
                    <TextField
                      fullWidth
                      type="time"
                      value={formData.time}
                      onChange={(e) => handleInputChange("time", e.target.value)}
                      required
                      InputLabelProps={{ shrink: true }}
                    />
                  </Grid>

                  {/* Reason */}
                  <Grid xs={12}>
                    <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                      <FaStickyNote style={{ marginRight: 8, color: "#1976d2" }} />
                      <Typography variant="h6">Reason for Visit</Typography>
                    </Box>
                    <FormControl fullWidth required>
                      <InputLabel>Reason</InputLabel>
                      <Select
                        value={formData.reason || ""}
                        label="Reason"
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

                  {/* Notes */}
                  <Grid xs={12}>
                    <TextField
                      fullWidth
                      multiline
                      rows={4}
                      label="Additional Notes (Optional)"
                      value={formData.notes}
                      onChange={(e) => handleInputChange("notes", e.target.value)}
                    />
                  </Grid>

                  {/* Submit Button */}
                  <Grid xs={12}>
                    <Button
                      type="submit"
                      variant="contained"
                      fullWidth
                      sx={{
                        py: 1.5,
                        fontSize: "1.1rem",
                        fontWeight: 600,
                        background: "linear-gradient(45deg, #1976d2, #42a5f5)",
                        "&:hover": { background: "linear-gradient(45deg, #1565c0, #1976d2)" },
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

        {/* Summary */}
        <Grid xs={12} md={4}>
          <Card sx={{ boxShadow: 3 }}>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2, color: "#1976d2" }}>
                Appointment Summary
              </Typography>
              <Divider sx={{ mb: 2 }} />
              {selectedDoctor && (
                <Box sx={{ mb: 2 }}>
                  <Typography variant="subtitle2" color="text.secondary">Doctor</Typography>
                  <Box sx={{ display: "flex", alignItems: "center", mt: 1 }}>
                    <Avatar sx={{ width: 40, height: 40, mr: 2 }}>
                      {selectedDoctor.full_name?.charAt(0)}
                    </Avatar>
                    <Box>
                      <Typography variant="body1" fontWeight={500}>{selectedDoctor.full_name}</Typography>
                      <Typography variant="caption" color="text.secondary">{selectedDoctor.specialization}</Typography>
                    </Box>
                  </Box>
                </Box>
              )}
              {formData.date && (
                <Box sx={{ mb: 2 }}>
                  <Typography variant="subtitle2" color="text.secondary">Date</Typography>
                  <Typography variant="body1">{formData.date}</Typography>
                </Box>
              )}
              {formData.time && (
                <Box sx={{ mb: 2 }}>
                  <Typography variant="subtitle2" color="text.secondary">Time</Typography>
                  <Typography variant="body1">{formData.time}</Typography>
                </Box>
              )}
              {formData.reason && (
                <Box sx={{ mb: 2 }}>
                  <Typography variant="subtitle2" color="text.secondary">Reason</Typography>
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
        </Grid>
      </Grid>
    </Box>
  );
};

export default BookAppointment;
