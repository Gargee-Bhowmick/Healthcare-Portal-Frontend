import { useState, useEffect } from "react";
import {
  Box,
  TextField,
  Typography,
  Button,
  Paper,
  MenuItem,
  Alert,
  Stack,
} from "@mui/material";
import patientService from "../../services/patientService";
import useLoading from "../../components/Provider/useLoading";

export default function PatientProfile() {
  const { setLoading } = useLoading();
  const [formData, setFormData] = useState({
    full_name: "",
    age: "",
    gender: "",
    address: "",
    medical_history: "",
  });

  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);
  const [hasExistingProfile, setHasExistingProfile] = useState(false);

  // ✅ Fetch patient details on page load
  useEffect(() => {
    const fetchPatient = async () => {
      const patientId = localStorage.getItem("user_id");
      if (!patientId) return;

      setLoading(true);
      try {
        const response = await patientService.getByIdPatient(patientId);

        if (response.data) {
          setFormData(response.data);
          setHasExistingProfile(true); // ✅ patient already exists
        }
      } catch {
        setError("No patient profile found. Please create one.");
        setHasExistingProfile(false);
      } finally {
        setLoading(false);
      }
    };

    fetchPatient();
  }, []);

  // ✅ Handle input change
  const handleChange = (e) => {
    if (hasExistingProfile) return; // prevent edits when profile exists
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "number" ? Number(value) : value,
    }));
  };

  // ✅ Save patient profile
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccess(null);
    setError(null);

    setLoading(true);
    try {
      await patientService.create(formData);
      setSuccess("Patient profile created successfully!");
      setHasExistingProfile(true); // ✅ disable button after creation
    } catch {
      setError("Failed to save patient details. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ p: { xs: 2, md: 4 }, bgcolor: "#f9fafb", minHeight: "100vh" }}>
      <Paper elevation={3} sx={{ p: 4, borderRadius: 3, maxWidth: 600, mx: "auto" }}>
        <Typography variant="h4" fontWeight={700} mb={3} color="primary.dark">
          Patient Profile
        </Typography>

        {success && <Alert severity="success">{success}</Alert>}
        {error && <Alert severity="error">{error}</Alert>}

        <form onSubmit={handleSubmit}>
          <Stack spacing={2}>
            <TextField
              label="Full Name"
              name="full_name"
              value={formData.full_name}
              onChange={handleChange}
              required
              fullWidth
              disabled={hasExistingProfile}
            />

            <TextField
              label="Age"
              name="age"
              type="number"
              value={formData.age}
              onChange={handleChange}
              required
              fullWidth
              disabled={hasExistingProfile}
            />

            <TextField
              select
              label="Gender"
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              required
              fullWidth
              disabled={hasExistingProfile}
            >
              <MenuItem value="male">Male</MenuItem>
              <MenuItem value="female">Female</MenuItem>
              <MenuItem value="other">Other</MenuItem>
            </TextField>

            <TextField
              label="Address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              required
              fullWidth
              disabled={hasExistingProfile}
            />

            <TextField
              label="Medical History"
              name="medical_history"
              value={formData.medical_history}
              onChange={handleChange}
              multiline
              rows={3}
              fullWidth
              disabled={hasExistingProfile}
            />

            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={hasExistingProfile} // ✅ disabled if exists or after creation
            >
              {hasExistingProfile ? "Profile Already Exists" : "Save Profile"}
            </Button>
          </Stack>
        </form>
      </Paper>
    </Box>
  );
}
