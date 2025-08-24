import { useState, useEffect, useContext } from "react";
import AppContext from "../../context/appContext";
import {
  Box,
  Typography,
  MenuItem,
  Select,
  Avatar,
  Card,
  CardContent,
  Grid,
  Chip,
  Divider,
  Tabs,
  Tab,
  Paper,
  List,
  ListItem,
  ListItemText,
  Tooltip,
  Alert,
  Stack,
  CardActions,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import MedicationIcon from "@mui/icons-material/Medication";
import HistoryEduIcon from "@mui/icons-material/HistoryEdu";
import AssignmentIcon from "@mui/icons-material/Assignment";
import InfoIcon from "@mui/icons-material/Info";
import Description from "@mui/icons-material/Description";
import Biotech from "@mui/icons-material/Biotech";
import MedicalServices from "@mui/icons-material/MedicalServices";
import Vaccines from "@mui/icons-material/Vaccines";
import CalendarToday from "@mui/icons-material/CalendarToday";
import Person from "@mui/icons-material/Person";
import Business from "@mui/icons-material/Business";
import Download from "@mui/icons-material/Download";
import Search from "@mui/icons-material/Search";
import { useParams, useNavigate } from "react-router-dom";

// Helper for BMI
function getBMI(weight, height) {
  if (!weight || !height) return "-";
  return (weight / ((height / 100) ** 2)).toFixed(1);
}

// Helper for file icon
const getFileIcon = (fileType, category) => {
  if (fileType === "pdf" && category === "Lab Results") return <Biotech color="primary" />;
  if (fileType === "image" || category === "X-Ray/Imaging") return <LocalHospitalIcon color="info" />;
  if (category === "Prescription") return <MedicalServices color="success" />;
  if (category === "Vaccination Record") return <Vaccines color="warning" />;
  if (fileType === "pdf") return <Description color="error" />;
  return <AssignmentIcon color="action" />;
};


export default function PatientDetails() {
  const {patients} = useContext(AppContext)
  const { id } = useParams();
  const navigate = useNavigate();
  const initialId = id ? Number(id) : patients[0].id;
  const [selectedId, setSelectedId] = useState(initialId);
  const [tab, setTab] = useState(0);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  // Sync dropdown with URL param
  useEffect(() => {
    if (id && Number(id) !== selectedId) setSelectedId(Number(id));
    // eslint-disable-next-line
  }, [id]);

  // When dropdown changes, update the route
  const handleSelectChange = (e) => {
    const newId = Number(e.target.value);
    setSelectedId(newId);
    navigate(`/doctor/patient-details/${newId}`);
  };

  const patient = patients.find((p) => p.id === selectedId);

  // Filter medical records by search
  const filteredRecords = patient.medicalRecords.filter((record) =>
    record.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    record.doctorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    record.hospital.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <Box sx={{ p: { xs: 1, md: 4 }, bgcolor: "#f9fafb", minHeight: "100vh" }}>
      <Paper elevation={3} sx={{ p: { xs: 2, md: 4 }, borderRadius: 3, mb: 3 }}>
        <Stack direction={{ xs: "column", md: "row" }} alignItems="center" spacing={3}>
          <AssignmentIndIcon color="primary" sx={{ fontSize: 40 }} />
          <Typography variant="h4" fontWeight={700} color="primary.dark" flex={1}>
            Patient Details
          </Typography>
          <Select
            value={selectedId}
            onChange={handleSelectChange}
            size="small"
            sx={{ minWidth: 220, bgcolor: "#f5f7fa", borderRadius: 2 }}
          >
            {patients.map((p) => (
              <MenuItem key={p.id} value={p.id}>
                <Stack direction="row" alignItems="center" spacing={1}>
                  <Avatar src={p.photo} alt={p.name} sx={{ width: 28, height: 28 }} />
                  <span>{p.name}</span>
                </Stack>
              </MenuItem>
            ))}
          </Select>
        </Stack>
      </Paper>

      <Grid container spacing={3}>
        {/* Left: Demographics & Vitals */}
        <Grid item xs={12} md={4}>
          <Card elevation={2} sx={{ mb: 2, borderRadius: 3 }}>
            <CardContent>
              <Stack direction="row" spacing={2} alignItems="center" mb={2}>
                <Avatar
                  src={patient.photo}
                  alt={patient.name}
                  sx={{ width: 64, height: 64, border: "2px solid #1976d2" }}
                />
                <Box>
                  <Typography variant="h6" fontWeight={700}>
                    {patient.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Age: {patient.age} | Gender: {patient.gender}
                  </Typography>
                </Box>
              </Stack>
              <Divider sx={{ my: 1 }} />
              <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                Contact
              </Typography>
              <Typography variant="body2">{patient.contact}</Typography>
              <Typography variant="body2" color="text.secondary">
                Emergency: {patient.emergencyContact}
              </Typography>
              <Divider sx={{ my: 1 }} />
              <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                Chief Complaint
              </Typography>
              <Typography variant="body2">{patient.chiefComplaint}</Typography>
              <Typography variant="body2" color="text.secondary">
                {patient.symptoms}
              </Typography>
            </CardContent>
          </Card>

          <Card elevation={2} sx={{ borderRadius: 3 }}>
            <CardContent>
              <Typography variant="subtitle1" fontWeight={600} mb={1}>
                Vital Signs
              </Typography>
              <Grid container spacing={1}>
                <Grid item xs={6}>
                  <Typography variant="body2">
                    <b>Temp:</b> {patient.vitals.temperature}°F
                  </Typography>
                  <Typography variant="body2">
                    <b>BP:</b> {patient.vitals.bp}
                  </Typography>
                  <Typography variant="body2">
                    <b>Heart Rate:</b> {patient.vitals.heartRate} bpm
                  </Typography>
                  <Typography variant="body2">
                    <b>Resp Rate:</b> {patient.vitals.respRate} /min
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body2">
                    <b>SpO₂:</b> {patient.vitals.spo2}%
                  </Typography>
                  <Typography variant="body2">
                    <b>Weight:</b> {patient.vitals.weight} kg
                  </Typography>
                  <Typography variant="body2">
                    <b>Height:</b> {patient.vitals.height} cm
                  </Typography>
                  <Typography variant="body2">
                    <b>BMI:</b> {getBMI(patient.vitals.weight, patient.vitals.height)}
                  </Typography>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>

        {/* Right: Main Info */}
        <Grid item xs={12} md={8}>
          {/* Alerts */}
          {patient.allergies.length > 0 && (
            <Alert
              severity="error"
              icon={<WarningAmberIcon />}
              sx={{ mb: 2, fontWeight: 600, fontSize: 15 }}
            >
              Allergies:{" "}
              {patient.allergies.map((a) => (
                <Chip
                  key={a}
                  label={a}
                  color="error"
                  size="small"
                  sx={{ mx: 0.5, fontWeight: 600 }}
                />
              ))}
            </Alert>
          )}

          <Card elevation={2} sx={{ mb: 2, borderRadius: 3 }}>
            <CardContent>
              <Stack direction="row" alignItems="center" spacing={1} mb={1}>
                <MedicationIcon color="primary" />
                <Typography variant="subtitle1" fontWeight={600}>
                  Current Medications
                </Typography>
              </Stack>
              {patient.medications.length === 0 ? (
                <Typography variant="body2" color="text.secondary">
                  No current medications.
                </Typography>
              ) : (
                <List dense>
                  {patient.medications.map((med, idx) => (
                    <ListItem key={idx} disablePadding>
                      <ListItemText
                        primary={
                          <span>
                            <b>{med.name}</b> — {med.dosage} ({med.frequency})
                          </span>
                        }
                      />
                    </ListItem>
                  ))}
                </List>
              )}
            </CardContent>
          </Card>

          <Card elevation={2} sx={{ mb: 2, borderRadius: 3 }}>
            <CardContent>
              <Stack direction="row" alignItems="center" spacing={1} mb={1}>
                <HistoryEduIcon color="primary" />
                <Typography variant="subtitle1" fontWeight={600}>
                  Past Medical History
                </Typography>
              </Stack>
              <Typography variant="body2" sx={{ mb: 1 }}>
                <b>Chronic Illnesses:</b>{" "}
                {patient.chronic.length === 0 ? (
                  <span style={{ color: "#90a4ae" }}>None</span>
                ) : (
                  patient.chronic.join(", ")
                )}
              </Typography>
              <Typography variant="body2" sx={{ mb: 1 }}>
                <b>Surgeries:</b>{" "}
                {patient.surgeries.length === 0 ? (
                  <span style={{ color: "#90a4ae" }}>None</span>
                ) : (
                  patient.surgeries.join(", ")
                )}
              </Typography>
            </CardContent>
          </Card>

          {/* Tabs for expandable info */}
          <Paper elevation={1} sx={{ borderRadius: 3 }}>
            <Tabs
              value={tab}
              onChange={(_, v) => setTab(v)}
              indicatorColor="primary"
              textColor="primary"
              variant="scrollable"
              scrollButtons="auto"
              sx={{ px: 2, pt: 1 }}
            >
              <Tab label="Insurance & Billing" icon={<InfoIcon />} iconPosition="start" />
              <Tab label="Family History" icon={<LocalHospitalIcon />} iconPosition="start" />
              <Tab label="Lifestyle" icon={<InfoIcon />} iconPosition="start" />
              <Tab label="Medical Files" icon={<Description />} iconPosition="start" />
            </Tabs>
            <Divider />
            <Box sx={{ p: 2 }}>
              {tab === 0 && (
                <Typography variant="body2">
                  <b>Insurance:</b> {patient.insurance}
                </Typography>
              )}
              {tab === 1 && (
                <Typography variant="body2">
                  <b>Family Medical History:</b> {patient.familyHistory}
                </Typography>
              )}
              {tab === 2 && (
                <Typography variant="body2">
                  <b>Lifestyle / Social History:</b> {patient.lifestyle}
                </Typography>
              )}
              {/* Medical Files Tab */}
              {tab === 3 && (
                <Box>
                  <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                    <Search sx={{ mr: 1, color: "text.secondary" }} />
                    <input
                      type="text"
                      placeholder="Search records, doctors, hospitals..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      style={{
                        border: "none",
                        outline: "none",
                        background: "#f5f7fa",
                        padding: "8px 12px",
                        borderRadius: 8,
                        fontSize: 14,
                        width: "100%",
                        maxWidth: 320,
                      }}
                    />
                  </Box>
                  <Grid container spacing={3}>
                    {filteredRecords.map((record) => (
                      <Grid item xs={12} sm={6} lg={4} key={record.id}>
                        <Card sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
                          <CardContent sx={{ flex: 1 }}>
                            <Box sx={{ display: "flex", alignItems: "flex-start", gap: 2, mb: 2 }}>
                              <Avatar sx={{ bgcolor: "primary.light" }}>
                                {getFileIcon(record.fileType, record.category)}
                              </Avatar>
                              <Box sx={{ flex: 1, minWidth: 0 }}>
                                <Typography variant="h6" noWrap sx={{ fontWeight: 600 }}>
                                  {record.title}
                                </Typography>
                                <Typography variant="body2" color="textSecondary" noWrap>
                                  {record.category}
                                </Typography>
                              </Box>
                            </Box>
                            <Typography variant="body2" sx={{ mb: 2, lineHeight: 1.5 }}>
                              {record.description}
                            </Typography>
                            <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                                <CalendarToday sx={{ fontSize: 16, color: "text.secondary" }} />
                                <Typography variant="body2" color="textSecondary">
                                  {formatDate(record.date)}
                                </Typography>
                              </Box>
                              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                                <Person sx={{ fontSize: 16, color: "text.secondary" }} />
                                <Typography variant="body2" color="textSecondary" noWrap>
                                  {record.doctorName}
                                </Typography>
                              </Box>
                              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                                <Business sx={{ fontSize: 16, color: "text.secondary" }} />
                                <Typography variant="body2" color="textSecondary" noWrap>
                                  {record.hospital}
                                </Typography>
                              </Box>
                            </Box>
                          </CardContent>
                          <CardActions sx={{ justifyContent: "center", px: 2, pb: 2 }}>
                            <Button
                              size="small"
                              onClick={() => {
                                setSelectedRecord(record);
                                setOpenDialog(true);
                              }}
                              variant="outlined"
                            >
                              View Details
                            </Button>
                          </CardActions>
                        </Card>
                      </Grid>
                    ))}
                  </Grid>
                  {filteredRecords.length === 0 && (
                    <Paper sx={{ p: 4, textAlign: "center", mt: 3 }}>
                      <Typography variant="h6" color="textSecondary">
                        No medical records found
                      </Typography>
                      <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
                        Try adjusting your search criteria
                      </Typography>
                    </Paper>
                  )}
                  {/* Record Details Dialog */}
                  <Dialog
                    open={openDialog}
                    onClose={() => setOpenDialog(false)}
                    maxWidth="md"
                    fullWidth
                  >
                    {selectedRecord && (
                      <>
                        <DialogTitle>
                          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                            {getFileIcon(selectedRecord.fileType, selectedRecord.category)}
                            <Box>
                              <Typography variant="h6">{selectedRecord.title}</Typography>
                              <Typography variant="body2" color="textSecondary">
                                {selectedRecord.category}
                              </Typography>
                            </Box>
                          </Box>
                        </DialogTitle>
                        <DialogContent>
                          <Grid container spacing={3} sx={{ mt: 1 }}>
                            <Grid item xs={12} sm={6}>
                              <Typography variant="subtitle2" gutterBottom>
                                Description
                              </Typography>
                              <Typography variant="body2" sx={{ mb: 2 }}>
                                {selectedRecord.description}
                              </Typography>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                              <Typography variant="subtitle2" gutterBottom>
                                Category
                              </Typography>
                              <Typography variant="body2" sx={{ mb: 2 }}>
                                {selectedRecord.category}
                              </Typography>
                            </Grid>
                            <Grid item xs={12}>
                              <Divider sx={{ my: 2 }} />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                              <Typography variant="subtitle2" gutterBottom>
                                Date
                              </Typography>
                              <Typography variant="body2" sx={{ mb: 2 }}>
                                {formatDate(selectedRecord.date)}
                              </Typography>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                              <Typography variant="subtitle2" gutterBottom>
                                File Type
                              </Typography>
                              <Typography variant="body2" sx={{ mb: 2 }}>
                                {selectedRecord.fileType.toUpperCase()}
                              </Typography>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                              <Typography variant="subtitle2" gutterBottom>
                                Doctor
                              </Typography>
                              <Typography variant="body2" sx={{ mb: 2 }}>
                                {selectedRecord.doctorName}
                              </Typography>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                              <Typography variant="subtitle2" gutterBottom>
                                Hospital/Clinic
                              </Typography>
                              <Typography variant="body2" sx={{ mb: 2 }}>
                                {selectedRecord.hospital}
                              </Typography>
                            </Grid>
                          </Grid>
                        </DialogContent>
                        <DialogActions>
                          <Button onClick={() => setOpenDialog(false)}>Close</Button>
                          <Button variant="outlined" startIcon={<Download />}>
                            Download
                          </Button>
                        </DialogActions>
                      </>
                    )}
                  </Dialog>
                </Box>
              )}
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}          