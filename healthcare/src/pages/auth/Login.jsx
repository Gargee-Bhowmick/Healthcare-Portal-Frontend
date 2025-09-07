import React, { useState } from "react";
import { loginUser } from "../../services/authService";
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
} from "@mui/material";
import authService from "../../services/authService"; // <-- use the service we defined

const Login = () => {
  const [username, setUsername] = useState(""); // backend expects username, not email
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const data = await authService.login({ username, password });

      localStorage.setItem("access_token", data.access_token);
      localStorage.setItem("role", data.role);

      if (data.role === "doctor") {
        navigate("/doctor");
      } else if (data.role === "patient") {
        navigate("/patient");
      } else {
        setError("Unknown user role");
      }
    } catch (err) {
      setError("Invalid username or password", err);
    }
  };

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
          width: 380,
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
            Welcome Back
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            textAlign="center"
            mb={3}
          >
            Please login to continue
          </Typography>

          <form onSubmit={handleSubmit}>
            <TextField
              label="Username"
              fullWidth
              required
              margin="normal"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              autoComplete="username"
            />
            <TextField
              label="Password"
              type="password"
              fullWidth
              required
              margin="normal"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
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
              Login
            </Button>
          </form>

          {/* Register Option */}
          <Typography
            variant="body2"
            textAlign="center"
            mt={3}
            color="text.secondary"
          >
            New patient?{" "}
            <Link
              component={RouterLink}
              to="/register"
              underline="hover"
              sx={{ fontWeight: 500 }}
            >
              Register now
            </Link>
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Login;
