import React, { useEffect, useMemo, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import AppContext from "../../context/appContext";
import {
  Box,
  Grid,
  Card,
  CardContent,
  CardActions,
  Typography,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Chip,
  Stack,
  Divider,
  Button,
  IconButton,
  Avatar,
  Snackbar,
  Alert,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import UploadFileIcon from "@mui/icons-material/UploadFile";

function getBMI(weight, height) {
  if (!weight || !height) return "";
  const bmi = weight / Math.pow(height / 100, 2);
  return isFinite(bmi) ? bmi.toFixed(1) : "";
}

export default function PatientProfile() {
  const { patients, setPatients } = useContext(AppContext);
  const { id } = useParams();
  const navigate = useNavigate();

  const patientFromStore = useMemo(() => {
    const pid = Number(id) || (patients && patients[0]?.id);
    return patients?.find((p) => p.id === pid) || null;
  }, [patients, id]);

  const [form, setForm] = useState(() => ({
    id: patientFromStore?.id || null,
    name: patientFromStore?.name || "",
    gender: patientFromStore?.gender || "",
    age: patientFromStore?.age || "",
    contact: patientFromStore?.contact || "",
    emergencyContact: patientFromStore?.emergencyContact || "",
    chiefComplaint: patientFromStore?.chiefComplaint || "",
    symptoms: patientFromStore?.symptoms || "",
    insurance: patientFromStore?.insurance || "",
    familyHistory: patientFromStore?.familyHistory || "",
    lifestyle: patientFromStore?.lifestyle || "",
    photo: patientFromStore?.photo || "",
    allergies: patientFromStore?.allergies || [],
    chronic: patientFromStore?.chronic || [],
    surgeries: patientFromStore?.surgeries || [],
    medications: patientFromStore?.medications || [], // [{name,dosage,frequency}]
    vitals: {
      temperature: patientFromStore?.vitals?.temperature || "",
      bp: patientFromStore?.vitals?.bp || "",
      heartRate: patientFromStore?.vitals?.heartRate || "",
      respRate: patientFromStore?.vitals?.respRate || "",
      spo2: patientFromStore?.vitals?.spo2 || "",
      weight: patientFromStore?.vitals?.weight || "",
      height: patientFromStore?.vitals?.height || "",
    },
  }));

  const [newAllergy, setNewAllergy] = useState("");
  const [newChronic, setNewChronic] = useState("");
  const [newSurgery, setNewSurgery] = useState("");
  const [newMed, setNewMed] = useState({ name: "", dosage: "", frequency: "" });
  const [snack, setSnack] = useState({ open: false, msg: "", severity: "success" });

  useEffect(() => {
    if (!patientFromStore) return;
    setForm((f) => ({
      ...f,
      id: patientFromStore.id,
      name: patientFromStore.name || "",
      gender: patientFromStore.gender || "",
      age: patientFromStore.age || "",
      contact: patientFromStore.contact || "",
      emergencyContact: patientFromStore.emergencyContact || "",
      chiefComplaint: patientFromStore.chiefComplaint || "",
      symptoms: patientFromStore.symptoms || "",
      insurance: patientFromStore.insurance || "",
      familyHistory: patientFromStore.familyHistory || "",
      lifestyle: patientFromStore.lifestyle || "",
      photo: patientFromStore.photo || "",
      allergies: patientFromStore.allergies || [],
      chronic: patientFromStore.chronic || [],
      surgeries: patientFromStore.surgeries || [],
      medications: patientFromStore.medications || [],
      vitals: {
        temperature: patientFromStore?.vitals?.temperature || "",
        bp: patientFromStore?.vitals?.bp || "",
        heartRate: patientFromStore?.vitals?.heartRate || "",
        respRate: patientFromStore?.vitals?.respRate || "",
        spo2: patientFromStore?.vitals?.spo2 || "",
        weight: patientFromStore?.vitals?.weight || "",
        height: patientFromStore?.vitals?.height || "",
      },
    }));
  }, [patientFromStore]);

  const handleField = (key, value) => setForm((f) => ({ ...f, [key]: value }));
  const handleVitals = (key, value) =>
    setForm((f) => ({ ...f, vitals: { ...f.vitals, [key]: value } }));

  const addToArray = (key, value) => {
    if (!value?.trim()) return;
    setForm((f) => ({ ...f, [key]: Array.from(new Set([...(f[key] || []), value.trim()])) }));
  };
  const removeFromArray = (key, idx) =>
    setForm((f) => ({ ...f, [key]: f[key].filter((_, i) => i !== idx) }));

  const addMedication = () => {
    if (!newMed.name.trim()) return;
    setForm((f) => ({ ...f, medications: [...f.medications, { ...newMed }] }));
    setNewMed({ name: "", dosage: "", frequency: "" });
  };
  const removeMedication = (idx) =>
    setForm((f) => ({ ...f, medications: f.medications.filter((_, i) => i !== idx) }));

  const handlePhotoUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setForm((f) => ({ ...f, photo: url }));
  };

  const handleSubmit = async () => {
    try {
      console.log(form)
      const res = await fetch(`/api/patients/${form.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("Failed to update patient");

      if (setPatients) {
        setPatients((prev) =>
          prev.map((p) => (p.id === form.id ? { ...p, ...form } : p))
        );
      }
      setSnack({ open: true, msg: "Profile updated successfully.", severity: "success" });
    } catch (err) {
      setSnack({ open: true, msg: err.message || "Update failed.", severity: "error" });
    }
  };

  if (!patientFromStore) {
    return (
      <Box p={4}>
        <Alert severity="warning">Patient not found.</Alert>
        <Button sx={{ mt: 2 }} onClick={() => navigate(-1)} variant="outlined">
          Go Back
        </Button>
      </Box>
    );
  }

return (
  <Box sx={{ p: { xs: 2, md: 4 }, bgcolor: "#f9fafb", minHeight: "100vh" }}>
          <Typography variant="h4" fontWeight={700}>
          Patient Profile
        </Typography>
    <Grid container spacing={3}>
      {/* Left column */}
      <Grid item xs={12} md={4}>
        <Card elevation={2} sx={{ borderRadius: 3 }}>
          <CardContent>
            <Stack direction="column" alignItems="center" spacing={2}>
              <Avatar src={form.photo} sx={{ width: 96, height: 96 }} />
              <Button
                variant="outlined"
                startIcon={<UploadFileIcon />}
                component="label"
                size="small"
              >
                Upload Photo
                <input
                  type="file"
                  hidden
                  accept="image/*"
                  onChange={handlePhotoUpload}
                />
              </Button>
            </Stack>
            <Divider sx={{ my: 2 }} />
            <Stack spacing={2}>
              <TextField
                label="Full Name"
                value={form.name}
                onChange={(e) => handleField("name", e.target.value)}
                fullWidth
              />
              <FormControl fullWidth>
                <InputLabel>Gender</InputLabel>
                <Select
                  label="Gender"
                  value={form.gender}
                  onChange={(e) => handleField("gender", e.target.value)}
                >
                  <MenuItem value="Male">Male</MenuItem>
                  <MenuItem value="Female">Female</MenuItem>
                  <MenuItem value="Other">Other</MenuItem>
                </Select>
              </FormControl>
              <TextField
                label="Age"
                type="number"
                value={form.age}
                onChange={(e) => handleField("age", e.target.value)}
                fullWidth
              />
              <TextField
                label="Contact"
                value={form.contact}
                onChange={(e) => handleField("contact", e.target.value)}
                fullWidth
              />
              <TextField
                label="Emergency Contact"
                value={form.emergencyContact}
                onChange={(e) => handleField("emergencyContact", e.target.value)}
                fullWidth
              />
            </Stack>
          </CardContent>
        </Card>

        <Card elevation={2} sx={{ borderRadius: 3, mt: 2 }}>
          <CardContent>
            <Typography variant="h6" fontWeight={700} gutterBottom>
              Medical Overview
            </Typography>
            <TextField
              label="Chief Complaint"
              value={form.chiefComplaint}
              onChange={(e) => handleField("chiefComplaint", e.target.value)}
              fullWidth
              multiline
              minRows={2}
              sx={{ mb: 2 }}
            />
            <TextField
              label="Symptoms"
              value={form.symptoms}
              onChange={(e) => handleField("symptoms", e.target.value)}
              fullWidth
              multiline
              minRows={2}
            />
          </CardContent>
        </Card>
      </Grid>

      {/* Right column */}
      <Grid item xs={12} md={8}>
        <Card elevation={2} sx={{ borderRadius: 3 }}>
          <CardContent>
            <Typography variant="h6" fontWeight={700} gutterBottom>
              Vitals
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={6} md={3}>
                <TextField
                  label="Temperature (°F)"
                  value={form.vitals.temperature}
                  onChange={(e) => handleVitals("temperature", e.target.value)}
                  fullWidth
                />
              </Grid>
              <Grid item xs={6} md={3}>
                <TextField
                  label="BP"
                  placeholder="120/80"
                  value={form.vitals.bp}
                  onChange={(e) => handleVitals("bp", e.target.value)}
                  fullWidth
                />
              </Grid>
              <Grid item xs={6} md={3}>
                <TextField
                  label="Heart Rate (bpm)"
                  value={form.vitals.heartRate}
                  onChange={(e) => handleVitals("heartRate", e.target.value)}
                  fullWidth
                />
              </Grid>
              <Grid item xs={6} md={3}>
                <TextField
                  label="Resp Rate (/min)"
                  value={form.vitals.respRate}
                  onChange={(e) => handleVitals("respRate", e.target.value)}
                  fullWidth
                />
              </Grid>
              <Grid item xs={6} md={3}>
                <TextField
                  label="SpO₂ (%)"
                  value={form.vitals.spo2}
                  onChange={(e) => handleVitals("spo2", e.target.value)}
                  fullWidth
                />
              </Grid>
              <Grid item xs={6} md={3}>
                <TextField
                  label="Weight (kg)"
                  value={form.vitals.weight}
                  onChange={(e) => handleVitals("weight", e.target.value)}
                  fullWidth
                />
              </Grid>
              <Grid item xs={6} md={3}>
                <TextField
                  label="Height (cm)"
                  value={form.vitals.height}
                  onChange={(e) => handleVitals("height", e.target.value)}
                  fullWidth
                />
              </Grid>
              <Grid item xs={6} md={3}>
                <TextField
                  label="BMI"
                  value={getBMI(
                    Number(form.vitals.weight),
                    Number(form.vitals.height)
                  )}
                  fullWidth
                  disabled
                />
              </Grid>
            </Grid>
          </CardContent>
        </Card>

        <Grid container spacing={2} sx={{ mt: 1 }}>
          <Grid item xs={12} md={6}>
            <Card elevation={2} sx={{ borderRadius: 3 }}>
              <CardContent>
                <Typography variant="h6" fontWeight={700} gutterBottom>
                  Allergies
                </Typography>
                <Stack
                  direction="row"
                  spacing={1}
                  flexWrap="wrap"
                  sx={{ mb: 2 }}
                >
                  {form.allergies.map((a, idx) => (
                    <Chip
                      key={`${a}-${idx}`}
                      label={a}
                      onDelete={() => removeFromArray("allergies", idx)}
                    />
                  ))}
                </Stack>
                <Stack direction="row" spacing={1}>
                  <TextField
                    fullWidth
                    size="small"
                    placeholder="Add allergy"
                    value={newAllergy}
                    onChange={(e) => setNewAllergy(e.target.value)}
                  />
                  <IconButton
                    color="primary"
                    onClick={() => {
                      addToArray("allergies", newAllergy);
                      setNewAllergy("");
                    }}
                  >
                    <AddIcon />
                  </IconButton>
                </Stack>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={6}>
            <Card elevation={2} sx={{ borderRadius: 3 }}>
              <CardContent>
                <Typography variant="h6" fontWeight={700} gutterBottom>
                  Chronic Illnesses
                </Typography>
                <Stack
                  direction="row"
                  spacing={1}
                  flexWrap="wrap"
                  sx={{ mb: 2 }}
                >
                  {form.chronic.map((c, idx) => (
                    <Chip
                      key={`${c}-${idx}`}
                      label={c}
                      onDelete={() => removeFromArray("chronic", idx)}
                    />
                  ))}
                </Stack>
                <Stack direction="row" spacing={1}>
                  <TextField
                    fullWidth
                    size="small"
                    placeholder="Add chronic illness"
                    value={newChronic}
                    onChange={(e) => setNewChronic(e.target.value)}
                  />
                  <IconButton
                    color="primary"
                    onClick={() => {
                      addToArray("chronic", newChronic);
                      setNewChronic("");
                    }}
                  >
                    <AddIcon />
                  </IconButton>
                </Stack>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={6}>
            <Card elevation={2} sx={{ borderRadius: 3 }}>
              <CardContent>
                <Typography variant="h6" fontWeight={700} gutterBottom>
                  Surgeries
                </Typography>
                <Stack
                  direction="row"
                  spacing={1}
                  flexWrap="wrap"
                  sx={{ mb: 2 }}
                >
                  {form.surgeries.map((s, idx) => (
                    <Chip
                      key={`${s}-${idx}`}
                      label={s}
                      onDelete={() => removeFromArray("surgeries", idx)}
                    />
                  ))}
                </Stack>
                <Stack direction="row" spacing={1}>
                  <TextField
                    fullWidth
                    size="small"
                    placeholder="Add surgery"
                    value={newSurgery}
                    onChange={(e) => setNewSurgery(e.target.value)}
                  />
                  <IconButton
                    color="primary"
                    onClick={() => {
                      addToArray("surgeries", newSurgery);
                      setNewSurgery("");
                    }}
                  >
                    <AddIcon />
                  </IconButton>
                </Stack>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={6}>
            <Card elevation={2} sx={{ borderRadius: 3 }}>
              <CardContent>
                <Typography variant="h6" fontWeight={700} gutterBottom>
                  Family & Social History
                </Typography>
                <TextField
                  label="Father’s Medical History"
                  fullWidth
                  sx={{ mb: 2 }}
                  value={form.fatherHistory}
                  onChange={(e) => handleField("fatherHistory", e.target.value)}
                />
                <TextField
                  label="Mother’s Medical History"
                  fullWidth
                  sx={{ mb: 2 }}
                  value={form.motherHistory}
                  onChange={(e) => handleField("motherHistory", e.target.value)}
                />
                <TextField
                  label="Insurance"
                  fullWidth
                  sx={{ mb: 2 }}
                  value={form.insurance}
                  onChange={(e) => handleField("insurance", e.target.value)}
                />
                <TextField
                  label="Lifestyle / Social History"
                  fullWidth
                  value={form.lifestyle}
                  onChange={(e) => handleField("lifestyle", e.target.value)}
                />
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        <Card elevation={2} sx={{ borderRadius: 3, mt: 2 }}>
          <CardContent>
            <Typography variant="h6" fontWeight={700} gutterBottom>
              Medications
            </Typography>
            <Grid container spacing={1} sx={{ mb: 2 }}>
              {form.medications.map((m, idx) => (
                <Grid item xs={12} key={`${m.name}-${idx}`}>
                  <Stack direction="row" spacing={1} alignItems="center">
                    <TextField
                      label="Name"
                      size="small"
                      value={m.name}
                      onChange={(e) =>
                        setForm((f) => {
                          const meds = [...f.medications];
                          meds[idx] = { ...meds[idx], name: e.target.value };
                          return { ...f, medications: meds };
                        })
                      }
                      sx={{ minWidth: 200 }}
                    />
                    <TextField
                      label="Dosage"
                      size="small"
                      value={m.dosage}
                      onChange={(e) =>
                        setForm((f) => {
                          const meds = [...f.medications];
                          meds[idx] = { ...meds[idx], dosage: e.target.value };
                          return { ...f, medications: meds };
                        })
                      }
                      sx={{ minWidth: 160 }}
                    />
                    <TextField
                      label="Frequency"
                      size="small"
                      value={m.frequency}
                      onChange={(e) =>
                        setForm((f) => {
                          const meds = [...f.medications];
                          meds[idx] = { ...meds[idx], frequency: e.target.value };
                          return { ...f, medications: meds };
                        })
                      }
                      sx={{ minWidth: 160 }}
                    />
                    <IconButton color="error" onClick={() => removeMedication(idx)}>
                      <DeleteIcon />
                    </IconButton>
                  </Stack>
                </Grid>
              ))}
            </Grid>
            <Stack direction={{ xs: "column", sm: "row" }} spacing={1}>
              <TextField
                label="Name"
                size="small"
                value={newMed.name}
                onChange={(e) =>
                  setNewMed((nm) => ({ ...nm, name: e.target.value }))
                }
                sx={{ minWidth: 200 }}
              />
              <TextField
                label="Dosage"
                size="small"
                value={newMed.dosage}
                onChange={(e) =>
                  setNewMed((nm) => ({ ...nm, dosage: e.target.value }))
                }
                sx={{ minWidth: 160 }}
              />
              <TextField
                label="Frequency"
                size="small"
                value={newMed.frequency}
                onChange={(e) =>
                  setNewMed((nm) => ({ ...nm, frequency: e.target.value }))
                }
                sx={{ minWidth: 160 }}
              />
              <Button
                variant="outlined"
                startIcon={<AddIcon />}
                onClick={addMedication}
              >
                Add
              </Button>
            </Stack>
          </CardContent>
          <CardActions sx={{ justifyContent: "flex-end" }}>
            <Button variant="contained" onClick={handleSubmit}>
              Save Changes
            </Button>
          </CardActions>
        </Card>
      </Grid>
    </Grid>

    <Snackbar
      open={snack.open}
      autoHideDuration={3500}
      onClose={() => setSnack((s) => ({ ...s, open: false }))}
      anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
    >
      <Alert
        onClose={() => setSnack((s) => ({ ...s, open: false }))}
        severity={snack.severity}
        sx={{ width: "100%" }}
      >
        {snack.msg}
      </Alert>
    </Snackbar>
  </Box>
);
}
