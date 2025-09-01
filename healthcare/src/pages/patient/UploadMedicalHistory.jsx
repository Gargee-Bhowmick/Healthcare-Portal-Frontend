import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  MenuItem,
  Button,
  Card,
  CardContent,
  LinearProgress,
  Alert,
  Grid,
} from "@mui/material";

const UploadMedicalRecords = () => {
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    date: "",
    doctorName: "",
    hospital: "",
    description: "",
  });

  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [showSuccess, setShowSuccess] = useState(false);
  const [errors, setErrors] = useState({});

  const categories = [
    "Lab Results",
    "X-Ray/Imaging",
    "Prescription",
    "Medical Report",
    "Vaccination Record",
    "Surgery Report",
    "Discharge Summary",
  ];

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.title.trim()) newErrors.title = "Title is required";
    if (!formData.category) newErrors.category = "Category is required";
    if (!formData.date) newErrors.date = "Date is required";
    if (!formData.doctorName.trim()) newErrors.doctorName = "Doctor name is required";
    if (!formData.hospital.trim()) newErrors.hospital = "Hospital/Clinic is required";
    if (!formData.description.trim()) newErrors.description = "Description is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setUploading(true);
    setUploadProgress(0);

    const progressInterval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 95) {
          clearInterval(progressInterval);
          return 95;
        }
        return prev + Math.random() * 15;
      });
    }, 200);

    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setUploadProgress(100);
      setShowSuccess(true);
      setTimeout(() => {
        setFormData({ title: "", category: "", date: "", doctorName: "", hospital: "", description: "" });
        setUploading(false);
        setUploadProgress(0);
        setShowSuccess(false);
      }, 3000);
    } catch (error) {
      setUploading(false);
    }
  };

  return (
    <Box sx={{ maxWidth: 1200, mx: "auto", p: 3 }}>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: 600, color: "#1976d2", mb: 1 }}>
          Upload Medical Records
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Add new medical records to your health history
        </Typography>
      </Box>

      {showSuccess && (
        <Alert severity="success" sx={{ mb: 2 }}>
          Medical record uploaded successfully!
        </Alert>
      )}

      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>Basic Information</Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Title"
                fullWidth
                value={formData.title}
                onChange={(e) => handleInputChange("title", e.target.value)}
                error={!!errors.title}
                helperText={errors.title}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                select
                label="Category"
                fullWidth
                value={formData.category}
                onChange={(e) => handleInputChange("category", e.target.value)}
                error={!!errors.category}
                helperText={errors.category}
              >
                {categories.map((c) => (
                  <MenuItem key={c} value={c}>{c}</MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                type="date"
                label="Date"
                fullWidth
                InputLabelProps={{ shrink: true }}
                value={formData.date}
                onChange={(e) => handleInputChange("date", e.target.value)}
                error={!!errors.date}
                helperText={errors.date}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Description"
                fullWidth
                multiline
                rows={3}
                value={formData.description}
                onChange={(e) => handleInputChange("description", e.target.value)}
                error={!!errors.description}
                helperText={errors.description}
              />
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>Healthcare Provider</Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Doctor Name"
                fullWidth
                value={formData.doctorName}
                onChange={(e) => handleInputChange("doctorName", e.target.value)}
                error={!!errors.doctorName}
                helperText={errors.doctorName}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Hospital/Clinic"
                fullWidth
                value={formData.hospital}
                onChange={(e) => handleInputChange("hospital", e.target.value)}
                error={!!errors.hospital}
                helperText={errors.hospital}
              />
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {uploading && (
        <Card sx={{ mb: 3 }}>
          <CardContent>
            <Typography gutterBottom>Uploading Medical Record...</Typography>
            <LinearProgress variant="determinate" value={uploadProgress} />
            <Typography variant="body2" align="center" sx={{ mt: 1 }}>
              {Math.round(uploadProgress)}% Complete
            </Typography>
          </CardContent>
        </Card>
      )}

      <Box display="flex" justifyContent="flex-end" gap={2}>
        <Button onClick={() => setFormData({ title: "", category: "", date: "", doctorName: "", hospital: "", description: "" })} disabled={uploading}>
          Reset
        </Button>
        <Button variant="contained" onClick={handleSubmit} disabled={uploading}>
          {uploading ? "Uploading..." : "Upload Record"}
        </Button>
      </Box>

      
    </Box>
  );
};

export default UploadMedicalRecords;
