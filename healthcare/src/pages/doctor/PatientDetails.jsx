import { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Avatar,
  Card,
  CardContent,
  Grid,
  Divider,
  Paper,
  Stack,
  Select,
  MenuItem,
  CircularProgress,
} from "@mui/material";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import HomeIcon from "@mui/icons-material/Home";
import HistoryEduIcon from "@mui/icons-material/HistoryEdu";
import useLoading from "../../components/Provider/useLoading";
import patientService from "../../services/patientService";

export default function PatientDetails() {
  const [patients, setPatients] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(0); // ✅ use index instead of id
  const { loading, setLoading } = useLoading();

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        setLoading(true);
        const res = await patientService.getAll();
        if (Array.isArray(res.data)) {
          setPatients(res.data);
          //console.log("patients ", res.data);
          setSelectedIndex(0); // default to first
        } else {
          // If API gives a single patient object
          setPatients([res.data]);
          setSelectedIndex(0);
        }
      } catch (err) {
        console.error("Error fetching patient details:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPatients();
  }, [setLoading]);

  const patient = patients[selectedIndex]; // ✅ pick by index

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 8 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (!patient) {
    return (
      <Typography variant="h6" color="error" sx={{ mt: 4, textAlign: "center" }}>
        Patient not found
      </Typography>
    );
  }

  return (
    <Box sx={{ p: { xs: 2, md: 4 }, bgcolor: "#f9fafb", minHeight: "100vh" }}>
      {/* Header */}
      <Paper elevation={3} sx={{ p: { xs: 2, md: 4 }, borderRadius: 3, mb: 3 }}>
        <Stack
          direction={{ xs: "column", md: "row" }}
          alignItems="center"
          spacing={3}
          justifyContent="space-between"
        >
          <Stack direction="row" alignItems="center" spacing={2}>
            <AssignmentIndIcon color="primary" sx={{ fontSize: 40 }} />
            <Typography variant="h4" fontWeight={700} color="primary.dark">
              Patient Details
            </Typography>
          </Stack>

          {/* Dropdown if multiple patients */}
          {patients.length > 1 && (
            <Select
              value={selectedIndex}
              onChange={(e) => setSelectedIndex(Number(e.target.value))} // ✅ index
              size="small"
              sx={{ minWidth: 220, bgcolor: "#f5f7fa", borderRadius: 2 }}
            >
              {patients.map((p, index) => (
                <MenuItem key={index} value={index}>
                  {p.full_name}
                </MenuItem>
              ))}
            </Select>
          )}
        </Stack>
      </Paper>

      <Grid container spacing={3}>
        {/* Left Panel */}
        <Grid item xs={12} md={4}>
          <Card elevation={2} sx={{ borderRadius: 3 }}>
            <CardContent>
              <Stack direction="row" spacing={2} alignItems="center" mb={2}>
                <Avatar sx={{ width: 64, height: 64, bgcolor: "primary.light" }}>
                  {patient.full_name?.[0]}
                </Avatar>
                <Box>
                  <Typography variant="h6" fontWeight={700}>
                    {patient.full_name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Age: {patient.age} | Gender: {patient.gender}
                  </Typography>
                </Box>
              </Stack>
              <Divider sx={{ my: 2 }} />
              <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                <HomeIcon sx={{ fontSize: 16, mr: 1, verticalAlign: "middle" }} />
                Address
              </Typography>
              <Typography variant="body2">{patient.address}</Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Right Panel */}
        <Grid item xs={12} md={8}>
          <Card elevation={2} sx={{ borderRadius: 3 }}>
            <CardContent>
              <Stack direction="row" alignItems="center" spacing={1} mb={2}>
                <HistoryEduIcon color="primary" />
                <Typography variant="h6" fontWeight={600}>
                  Medical History
                </Typography>
              </Stack>
              <Typography variant="body1" sx={{ lineHeight: 1.6 }}>
                {patient.medical_history && patient.medical_history !== "NA"
                  ? patient.medical_history
                  : "No significant medical history reported."}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}
