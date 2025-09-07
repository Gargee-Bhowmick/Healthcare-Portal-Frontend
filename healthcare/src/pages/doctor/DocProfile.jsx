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
import doctorService from "../../services/doctorService";
import useLoading from "../../components/Provider/useLoading"; // import hook

export default function DocProfile() {
  const { setLoading } = useLoading(); // ✅ global loading
  const [formData, setFormData] = useState({
    specialization: "",
    full_name: "",
    age: "",
    gender: "",
    experience_years: "",
  });

  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);

  // Fetch doctor details on page load
  useEffect(() => {
    const fetchDoctor = async () => {
      const doctorId = localStorage.getItem("user_id");
      if (!doctorId) {
        //console.log("doctor ID not found")
        return;
      }

      setLoading(true);
      try {
        const response = await doctorService.getById(doctorId);
        //console.log("Doctor details:", response.data);
        setFormData(response.data); // prefill form
      } catch (err) {
        setError("Failed to load doctor details.",err);
      } finally {
        setLoading(false);
      }
    };

    fetchDoctor();
  }, []);

const handleChange = (e) => {
  const { name, value, type } = e.target;
  
  setFormData((prev) => ({
    ...prev,
    [name]: type === "number" ? Number(value) : value,
  }));
};


  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccess(null);
    setError(null);

    const doctorId = localStorage.getItem("user_id");
    setLoading(true);
    try {
      if (doctorId) {
        //console.log("Form Data", formData)
        await doctorService.create(formData);
        setSuccess("Doctor profile updated successfully!");
      } else {
        await doctorService.create(formData);
        setSuccess("Doctor created successfully!");
      }
    } catch (err) {
      setError("Failed to save doctor details. Please try again.",err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ p: { xs: 2, md: 4 }, bgcolor: "#f9fafb", minHeight: "100vh" }}>
      <Paper elevation={3} sx={{ p: 4, borderRadius: 3, maxWidth: 600, mx: "auto" }}>
        <Typography variant="h4" fontWeight={700} mb={3} color="primary.dark">
          Doctor Profile
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
            />

            <TextField
              label="Specialization"
              name="specialization"
              value={formData.specialization}
              onChange={handleChange}
              required
              fullWidth
            />

            <TextField
              label="Age"
              name="age"
              type="number"
              value={formData.age}
              onChange={handleChange}
              required
              fullWidth
            />

            <TextField
              select
              label="Gender"
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              required
              fullWidth
            >
              <MenuItem value="male">Male</MenuItem>
              <MenuItem value="female">Female</MenuItem>
              <MenuItem value="other">Other</MenuItem>
            </TextField>

            <TextField
              label="Experience (Years)"
              name="experience_years"
              type="number"
              value={formData.experience_years}
              onChange={handleChange}
              required
              fullWidth
            />

            <Button type="submit" variant="contained" color="primary">
              Save Profile
            </Button>
          </Stack>
        </form>
      </Paper>
    </Box>
  );
}
