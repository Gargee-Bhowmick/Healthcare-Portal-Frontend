import React, { useState } from "react";
import { Box, Typography, TextField, Button, Card, CardContent, LinearProgress, Alert, Grid } from "@mui/material";

const UploadMedicalHistory = () => {
  const [formData, setFormData] = useState({
    title: "",
    record_date: "",
    doctor_name: "",
    notes: "",
    file: null,
  });
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [showSuccess, setShowSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (error) setError("");
  };

  const handleFileChange = (e) => {
    setFormData(prev => ({ ...prev, file: e.target.files[0] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    
    const patientId = localStorage.getItem("patient_id");
    const token = localStorage.getItem("access_token");

    if (!patientId || !token) {
      setError("Patient not logged in. Please login again.");
      return;
    }

    if (!formData.title || !formData.record_date || !formData.doctor_name || !formData.file) {
      setError("Please fill all required fields and attach a file.");
      return;
    }

    const uploadData = new FormData();
    uploadData.append("title", formData.title);
    uploadData.append("record_date", formData.record_date);
    uploadData.append("doctor_name", formData.doctor_name);
    uploadData.append("notes", formData.notes || "");
    uploadData.append("file", formData.file);

    setUploading(true);
    setUploadProgress(0);

    try {
      const res = await fetch(`https://hms-b0e0ash9b3fda7ab.southeastasia-01.azurewebsites.net/patients/${patientId}/u_medical_records/`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: uploadData,
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.detail || "Upload failed");
      }

      setUploadProgress(100);
      setShowSuccess(true);

      setTimeout(() => {
        setFormData({ title: "", record_date: "", doctor_name: "", notes: "", file: null });
        setUploading(false);
        setUploadProgress(0);
        setShowSuccess(false);
      }, 3000);
    } catch (err) {
      console.error(err);
      setError(err.message);
      setUploading(false);
    }
  };

  return (
    <Box sx={{ maxWidth: 1200, mx: "auto", p: 3 }}>
      <Typography variant="h4" sx={{ fontWeight: 600, color: "#1976d2", mb: 2 }}>
        Upload Medical Record
      </Typography>

      {showSuccess && <Alert severity="success" sx={{ mb: 2 }}>Medical record uploaded successfully!</Alert>}
      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Title"
                fullWidth
                required
                value={formData.title}
                onChange={(e) => handleInputChange("title", e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Doctor Name"
                fullWidth
                required
                value={formData.doctor_name}
                onChange={(e) => handleInputChange("doctor_name", e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                type="date"
                label="Record Date"
                fullWidth
                required
                InputLabelProps={{ shrink: true }}
                value={formData.record_date}
                onChange={(e) => handleInputChange("record_date", e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Button variant="outlined" component="label" fullWidth>
                Upload File *
                <input type="file" hidden onChange={handleFileChange} />
              </Button>
              {formData.file && <Typography>{formData.file.name}</Typography>}
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Notes"
                fullWidth
                multiline
                rows={3}
                value={formData.notes}
                onChange={(e) => handleInputChange("notes", e.target.value)}
              />
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {uploading && (
        <LinearProgress variant="determinate" value={uploadProgress} sx={{ mb: 2 }} />
      )}

      <Box display="flex" justifyContent="flex-end" gap={2}>
        <Button disabled={uploading} onClick={() => setFormData({ title: "", record_date: "", doctor_name: "", notes: "", file: null })}>
          Reset
        </Button>
        <Button variant="contained" disabled={uploading} onClick={handleSubmit}>
          {uploading ? "Uploading..." : "Upload Record"}
        </Button>
      </Box>
    </Box>
  );
};

export default UploadMedicalHistory;
