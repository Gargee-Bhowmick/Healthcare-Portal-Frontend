import React from "react";
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Grid,
  Chip,
  Divider,
  Stack,
  Avatar,
  List,
  ListItem,
  ListItemText,
  Rating,
  Paper,
  Button,
} from "@mui/material";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import StarIcon from "@mui/icons-material/Star";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import LanguageIcon from "@mui/icons-material/Language";
import SchoolIcon from "@mui/icons-material/School";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";

// Example doctor data (replace with real data or props as needed)
const doctor = {
  fullName: "Dr. Priya Sharma",
  photo:
    "https://randomuser.me/api/portraits/women/68.jpg",
  gender: "Female",
  contact: {
    phone: "+91 98765 43210",
    email: "priya.sharma@cityhospital.com",
  },
  qualifications: ["MBBS", "MD (Internal Medicine)", "FACP"],
  specialization: "Cardiologist",
  subSpecialization: "Interventional Cardiology",
  experience: 15,
  hospital: "City General Hospital",
  department: "Cardiology",
  designation: "Senior Consultant",
  languages: ["English", "Hindi", "Bengali"],
  consultingHours: [
    { day: "Mon-Fri", time: "10:00 AM - 2:00 PM" },
    { day: "Sat", time: "11:00 AM - 1:00 PM" },
  ],
  location: "123, Heart Avenue, City Center, New Delhi, India",
  telemedicine: true,
  appointmentSlots: [
    "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM", "12:00 PM", "12:30 PM", "1:00 PM"
  ],
  patientsTreated: 2500,
  license: {
    number: "DL-123456",
    state: "Delhi",
  },
  boardCertifications: [
    "Medical Council of India",
    "Delhi Medical Council",
    "American Board of Internal Medicine",
  ],
  memberships: [
    "Indian Medical Association",
    "American College of Physicians",
    "Cardiological Society of India",
  ],
  publications: [
    {
      title: "Advances in Cardiac Stent Technology",
      journal: "Indian Heart Journal",
      year: 2022,
    },
    {
      title: "Managing Hypertension in Urban India",
      journal: "Journal of Clinical Medicine",
      year: 2021,
    },
  ],
  awards: [
    {
      title: "Best Cardiologist Award",
      by: "Delhi Medical Association",
      year: 2023,
    },
    {
      title: "Excellence in Patient Care",
      by: "City General Hospital",
      year: 2021,
    },
  ],
};

export default function DocProfile() {
  return (
    <Box sx={{ p: { xs: 1, md: 4 }, bgcolor: "#f9fafb", minHeight: "100vh" }}>
      <Paper elevation={3} sx={{ p: { xs: 2, md: 4 }, borderRadius: 3, mb: 3 }}>
        <Grid container spacing={3}>
          {/* Left: Photo & Basic Info */}
          <Grid item xs={12} md={4}>
            <Card elevation={2} sx={{ borderRadius: 3, mb: 2 }}>
              <CardMedia
                component="img"
                height="260"
                image={doctor.photo}
                alt={doctor.fullName}
                sx={{ objectFit: "cover" }}
              />
              <CardContent>
                <Typography variant="h5" fontWeight={700} gutterBottom>
                  {doctor.fullName}
                </Typography>
                <Typography variant="subtitle1" color="text.secondary" gutterBottom>
                  {doctor.designation}, {doctor.department}
                </Typography>
                <Chip
                  icon={<LocalHospitalIcon />}
                  label={doctor.specialization}
                  color="primary"
                  sx={{ mb: 1 }}
                />
                <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                  {doctor.subSpecialization}
                </Typography>
                <Divider sx={{ my: 1 }} />
                <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 1 }}>
                  <PhoneIcon fontSize="small" color="action" />
                  <Typography variant="body2">{doctor.contact.phone}</Typography>
                </Stack>
                <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 1 }}>
                  <EmailIcon fontSize="small" color="action" />
                  <Typography variant="body2">{doctor.contact.email}</Typography>
                </Stack>
                <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 1 }}>
                  <LocationOnIcon fontSize="small" color="action" />
                  <Typography variant="body2">{doctor.location}</Typography>
                </Stack>
                <Stack direction="row" spacing={1} alignItems="center">
                  <VerifiedUserIcon fontSize="small" color="action" />
                  <Typography variant="body2">
                    License: {doctor.license.number} ({doctor.license.state})
                  </Typography>
                </Stack>
              </CardContent>
            </Card>
            <Card elevation={2} sx={{ borderRadius: 3 }}>
              <CardContent>
                <Typography variant="subtitle1" fontWeight={600} gutterBottom>
                  Languages Spoken
                </Typography>
                <Stack direction="row" spacing={1} flexWrap="wrap">
                  {doctor.languages.map((lang) => (
                    <Chip
                      key={lang}
                      icon={<LanguageIcon />}
                      label={lang}
                      color="info"
                      sx={{ mb: 1 }}
                    />
                  ))}
                </Stack>
              </CardContent>
            </Card>
          </Grid>

          {/* Right: Professional & Practice Info */}
          <Grid item xs={12} md={8}>
            <Card elevation={2} sx={{ borderRadius: 3, mb: 2 }}>
              <CardContent>
                <Typography variant="h6" fontWeight={700} gutterBottom>
                  Professional Credentials
                </Typography>
                <Stack direction="row" spacing={1} flexWrap="wrap" sx={{ mb: 1 }}>
                  {doctor.qualifications.map((q) => (
                    <Chip
                      key={q}
                      icon={<SchoolIcon />}
                      label={q}
                      color="success"
                      sx={{ mb: 1 }}
                    />
                  ))}
                </Stack>
                <Typography variant="body2" sx={{ mb: 1 }}>
                  <b>Experience:</b> {doctor.experience} years
                </Typography>
                <Typography variant="body2" sx={{ mb: 1 }}>
                  <b>Board Certifications:</b> {doctor.boardCertifications.join(", ")}
                </Typography>
                <Typography variant="body2" sx={{ mb: 1 }}>
                  <b>Memberships:</b> {doctor.memberships.join(", ")}
                </Typography>
                <Divider sx={{ my: 2 }} />
                <Typography variant="h6" fontWeight={700} gutterBottom>
                  Practice Information
                </Typography>
                <Typography variant="body2" sx={{ mb: 1 }}>
                  <b>Current Affiliation:</b> {doctor.hospital}
                </Typography>
                <Typography variant="body2" sx={{ mb: 1 }}>
                  <b>Department:</b> {doctor.department}
                </Typography>
                <Typography variant="body2" sx={{ mb: 1 }}>
                  <b>Role:</b> {doctor.designation}
                </Typography>
                <Typography variant="body2" sx={{ mb: 1 }}>
                  <b>Patients Treated:</b> {doctor.patientsTreated}
                </Typography>
                <Divider sx={{ my: 2 }} />
                <Typography variant="h6" fontWeight={700} gutterBottom>
                  Availability & Scheduling
                </Typography>
                <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 1 }}>
                  <AccessTimeIcon color="primary" />
                  <Stack>
                    {doctor.consultingHours.map((slot, idx) => (
                      <Typography key={idx} variant="body2">
                        <b>{slot.day}:</b> {slot.time}
                      </Typography>
                    ))}
                  </Stack>
                </Stack>
                <Typography variant="body2" sx={{ mb: 1 }}>
                  <b>Appointment Slots:</b>{" "}
                  {doctor.appointmentSlots.map((slot, idx) => (
                    <Chip
                      key={slot}
                      label={slot}
                      color="primary"
                      size="small"
                      sx={{ mr: 0.5, mb: 0.5 }}
                    />
                  ))}
                </Typography>
                <Typography variant="body2" sx={{ mb: 1 }}>
                  <b>Telemedicine:</b> {doctor.telemedicine ? "Available" : "Not Available"}
                </Typography>
              </CardContent>
            </Card>

            {/* Regulatory & Compliance */}
            <Card elevation={2} sx={{ borderRadius: 3, mb: 2 }}>
              <CardContent>
                <Typography variant="h6" fontWeight={700} gutterBottom>
                  Regulatory & Compliance
                </Typography>
                <Typography variant="body2" sx={{ mb: 1 }}>
                  <b>License Number:</b> {doctor.license.number} ({doctor.license.state})
                </Typography>
                <Typography variant="body2" sx={{ mb: 1 }}>
                  <b>Board Certifications:</b> {doctor.boardCertifications.join(", ")}
                </Typography>
                <Typography variant="body2" sx={{ mb: 1 }}>
                  <b>Memberships:</b> {doctor.memberships.join(", ")}
                </Typography>
              </CardContent>
            </Card>

            {/* Publications & Awards */}
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <Card elevation={2} sx={{ borderRadius: 3, mb: 2 }}>
                  <CardContent>
                    <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 1 }}>
                      <MenuBookIcon color="primary" />
                      <Typography variant="subtitle1" fontWeight={600}>
                        Research Publications
                      </Typography>
                    </Stack>
                    <List dense>
                      {doctor.publications.map((pub, idx) => (
                        <ListItem key={idx}>
                          <ListItemText
                            primary={pub.title}
                            secondary={`${pub.journal}, ${pub.year}`}
                          />
                        </ListItem>
                      ))}
                    </List>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} md={6}>
                <Card elevation={2} sx={{ borderRadius: 3, mb: 2 }}>
                  <CardContent>
                    <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 1 }}>
                      <EmojiEventsIcon color="secondary" />
                      <Typography variant="subtitle1" fontWeight={600}>
                        Awards & Recognitions
                      </Typography>
                    </Stack>
                    <List dense>
                      {doctor.awards.map((award, idx) => (
                        <ListItem key={idx}>
                          <ListItemText
                            primary={award.title}
                            secondary={`${award.by}, ${award.year}`}
                          />
                        </ListItem>
                      ))}
                    </List>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
}