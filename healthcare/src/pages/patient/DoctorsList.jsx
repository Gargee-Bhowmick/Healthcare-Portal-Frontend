

import React, { useEffect, useState } from "react";
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Avatar,
} from "@mui/material";

function DoctorsList() {
  const [doctors, setDoctors] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [open, setOpen] = useState(false);

  // Fetch all doctors
  const fetchDoctors = async () => {
    try {
      const res = await fetch(
        "https://hms-b0e0ash9b3fda7ab.southeastasia-01.azurewebsites.net/doctors/"
      );
      if (!res.ok) throw new Error("Failed to fetch doctors");
      const data = await res.json();
      setDoctors(data);
    } catch (error) {
      console.error("Error fetching doctors:", error);
    }
  };

  // Fetch one doctor by ID
  const fetchDoctorDetails = async (doctorId) => {
    try {
      const res = await fetch(
        `https://hms-b0e0ash9b3fda7ab.southeastasia-01.azurewebsites.net/doctors/${doctorId}`
      );
      if (!res.ok) throw new Error("Failed to fetch doctor details");
      const data = await res.json();
      setSelectedDoctor(data);
      setOpen(true);
    } catch (error) {
      console.error("Error fetching doctor details:", error);
    }
  };

  useEffect(() => {
    fetchDoctors();
  }, []);

  return (
    <Box sx={{ p: 4 }}>
      <Typography
  variant="h4"
  align="center"
  sx={{
    fontWeight: 600,
    py: 1.5,
    mb: 4,
    fontSize: "1.8rem",
    background: "linear-gradient(45deg, #1976d2, #42a5f5)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
  }}
>
  Doctors List
</Typography>

      <Grid container spacing={3}>
        {doctors.map((doctor, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card sx={{ p: 2, borderRadius: 2, boxShadow: 3 }}>
              <CardContent>
                <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                  <Avatar sx={{ mr: 2 }}>
                    {doctor.full_name?.charAt(0) || "D"}
                  </Avatar>
                  <Box>
                    <Typography variant="h6">{doctor.full_name}</Typography>
                    <Typography variant="body2" color="text.secondary">
                      {doctor.specialization}
                    </Typography>
                  </Box>
                </Box>

                <Typography variant="body2">
                  Experience: {doctor.experience_years} years
                </Typography>
                <Typography variant="body2">Gender: {doctor.gender}</Typography>

                {/* View details button */}
                <Button
                  variant="contained"
                  sx={{ mt: 2 }}
                  onClick={() => fetchDoctorDetails(doctor.doctor_id)}
                >
                  View Details
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Doctor Details Dialog */}
      <Dialog open={open} onClose={() => setOpen(false)} fullWidth>
        <DialogTitle>Doctor Details</DialogTitle>
        <DialogContent>
          {selectedDoctor ? (
            <>
              <Typography variant="h6">{selectedDoctor.full_name}</Typography>
              <Typography>Specialization: {selectedDoctor.specialization}</Typography>
              <Typography>Age: {selectedDoctor.age}</Typography>
              <Typography>Gender: {selectedDoctor.gender}</Typography>
              <Typography>Experience: {selectedDoctor.experience_years} years</Typography>
            </>
          ) : (
            <Typography>Loading...</Typography>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Close</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
export default DoctorsList;