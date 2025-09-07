import React, { useState } from "react";
import { useNavigate, Link as RouterLink } from "react-router-dom";
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
} from "@mui/material";
import authService from "../../services/authService"; // ✅ import service

const PatientRegister = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState(""); // backend expects number only
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

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

    // frontend validation
    if (!username.trim()) {
      return setError("Please enter a username.");
    }
    if (!validateEmail(email)) {
      return setError("Please enter a valid email address.");
    }
    if (password.length < 6) {
      return setError("Password must be at least 6 characters long.");
    }
    if (password !== confirmPassword) {
      return setError("Passwords do not match.");
    }
    if (!/^\d{7,15}$/.test(phone)) {
      return setError("Please enter a valid phone number (digits only).");
    }

    try {
      await authService.register({
        username,
        email,
        password,
        role: "patient", // ✅ backend requires role
        ph_number: Number(phone), // ✅ backend expects number
      });

      navigate("/login");
    } catch (err) {
      setError(err.response?.data?.detail || err.message || "Registration failed");
    }
  };

  const strength = getPasswordStrength(password);

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      bgcolor="#f5f7fa"
    >
      <Card
        sx={{
          width: 420,
          borderRadius: 3,
          boxShadow: 3,
          p: 2,
        }}
      >
        <CardContent>
          <Typography
            variant="h5"
            fontWeight="600"
            textAlign="center"
            gutterBottom
          >
            Create Account
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            textAlign="center"
            mb={3}
          >
            Register as a patient to get started
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

            <TextField
              label="Phone Number"
              type="tel"
              required
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              margin="normal"
              fullWidth
              inputProps={{ maxLength: 15 }}
            />

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
                <Typography
                  variant="caption"
                  color={`${strength.color}.main`}
                  display="block"
                  mt={0.5}
                >
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

            <Button
              type="submit"
              variant="contained"
              fullWidth
              sx={{
                mt: 3,
                py: 1.2,
                borderRadius: 2,
                textTransform: "none",
                fontSize: "1rem",
              }}
            >
              Register
            </Button>
          </form>

          <Typography
            variant="body2"
            textAlign="center"
            mt={3}
            color="text.secondary"
          >
            Already a user?{" "}
            <Link
              component={RouterLink}
              to="/login"
              underline="hover"
              sx={{ fontWeight: 500 }}
            >
              Login
            </Link>
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

export default PatientRegister;
