import React, { useState, useEffect } from "react";
import { useNavigate, Link as RouterLink } from "react-router-dom";
import useLoading from "../../components/Provider/useLoading";
import {
  Box,
  Button,
  TextField,
  Typography,
  Card,
  CardContent,
  Alert,
  Link,
  LinearProgress,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  CircularProgress,
} from "@mui/material";
import authService from "../../services/authService";
import axios from "axios"; // ✅ to fetch country codes

const PatientRegister = () => {
  const { setLoading } = useLoading();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [countryCode, setCountryCode] = useState("+91");
  const [role, setRole] = useState("patient");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [countries, setCountries] = useState([]);
  const [loadingCountries, setLoadingCountries] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCountryCodes = async () => {
      try {
        const response = await axios.get(
          "https://restcountries.com/v3.1/all?fields=cca2,name,idd"
        );
        const sortedCountries = response.data
          .map((c) => ({
            name: c.name.common,
            code: c.idd.root
              ? c.idd.root + (c.idd.suffixes ? c.idd.suffixes[0] : "")
              : "",
          }))
          .filter((c) => c.code) // only keep countries with code
          .sort((a, b) => a.name.localeCompare(b.name));

        setCountries(sortedCountries);
      } catch (err) {
        console.error("Failed to fetch country codes:", err);
      } finally {
        setLoadingCountries(false);
      }
    };

    fetchCountryCodes();
  }, []);

  const validateEmail = (email) => /\S+@\S+\.\S+/.test(email);

  const getPasswordStrength = (pass) => {
    if (pass.length < 6) return { label: "Weak", value: 30, color: "error" };
    if (/^(?=.*[A-Z])(?=.*\d).{6,}$/.test(pass))
      return { label: "Strong", value: 100, color: "success" };
    return { label: "Medium", value: 65, color: "warning" };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true); 
    if (!username.trim()) {
      setLoading(false); 
      return setError("Please enter a username.");

    }
    if (!validateEmail(email)) 
      {
            setLoading(false); 
            return setError("Please enter a valid email.");
      }
    if (password.length < 6){
      setLoading(false);
      return setError("Password must be at least 6 characters long.");
    }
    if (password !== confirmPassword){
      setLoading(false);
      return setError("Passwords do not match.");
    }
    if (!/^\d{7,15}$/.test(phone)){
      setLoading(false);
      return setError("Please enter a valid phone number (digits only).");
    }

    try {
      await authService.register({
        username,
        email,
        password,
        role,
        ph_number: `${countryCode}${phone}`,
      });
      navigate("/login");
    } catch (err) {
      setError(err.response?.data?.detail || err.message || "Registration failed");
    } finally{
         setLoading(false); 
    }
  };

  const strength = getPasswordStrength(password);

  return (
    <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh" bgcolor="#f5f7fa">
      <Card sx={{ width: 420, borderRadius: 3, boxShadow: 3, p: 2 }}>
        <CardContent>
          <Typography variant="h5" fontWeight="600" textAlign="center" gutterBottom>
            Create Account
          </Typography>
          <Typography variant="body2" color="text.secondary" textAlign="center" mb={3}>
            Register as a patient or doctor to get started
          </Typography>

          <form onSubmit={handleSubmit}>
            <TextField
              label="Username"
              fullWidth
              required
              margin="normal"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />

            <TextField
              label="Email"
              type="email"
              fullWidth
              required
              margin="normal"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <FormControl fullWidth margin="normal" required>
              <InputLabel>Role</InputLabel>
              <Select value={role} onChange={(e) => setRole(e.target.value)} label="Role">
                <MenuItem value="patient">Patient</MenuItem>
                <MenuItem value="doctor">Doctor</MenuItem>
              </Select>
            </FormControl>

            <Box display="flex" gap={1} alignItems="center" margin="normal">
              <FormControl sx={{ minWidth: 120 }}>
                {loadingCountries ? (
                  <CircularProgress size={24} />
                ) : (
                  <Select value={countryCode} onChange={(e) => setCountryCode(e.target.value)}>
                    {countries.map((c) => (
                      <MenuItem key={c.code} value={c.code}>
                        {c.name} ({c.code})
                      </MenuItem>
                    ))}
                  </Select>
                )}
              </FormControl>

              <TextField
                label="Phone Number"
                type="tel"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                fullWidth
                inputProps={{ maxLength: 15 }}
              />
            </Box>

            <TextField
              label="Password"
              type="password"
              fullWidth
              required
              margin="normal"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            {password && (
              <Box sx={{ mt: 1 }}>
                <LinearProgress
                  variant="determinate"
                  value={strength.value}
                  color={strength.color}
                  sx={{ borderRadius: 2 }}
                />
                <Typography variant="caption" color={`${strength.color}.main`} display="block" mt={0.5}>
                  {strength.label} password
                </Typography>
              </Box>
            )}

            <TextField
              label="Confirm Password"
              type="password"
              fullWidth
              required
              margin="normal"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />

            {error && (
              <Alert severity="error" sx={{ mt: 2, borderRadius: 2 }}>
                {error}
              </Alert>
            )}

            <Button type="submit" variant="contained" fullWidth sx={{ mt: 3, py: 1.2, borderRadius: 2, textTransform: "none", fontSize: "1rem" }}>
              Register
            </Button>
          </form>

          <Typography variant="body2" textAlign="center" mt={3} color="text.secondary">
            Already a user?{" "}
            <Link component={RouterLink} to="/login" underline="hover" sx={{ fontWeight: 500 }}>
              Login
            </Link>
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

export default PatientRegister;
