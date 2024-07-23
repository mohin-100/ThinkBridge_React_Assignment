import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Box,
  Alert,
  InputAdornment,
} from "@mui/material";
import { Lock, Person } from "@mui/icons-material";

const Login = ({onLogin}) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.removeItem("token");
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (username === "admin" && password === "admin123") {
      setError("");
      onLogin();
      localStorage.setItem("token", "dummy-token");
      navigate("/");
    } else {
      setError("Invalid credentials. Please try again.");
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Container maxWidth="sm">
        <Grid container justifyContent="center">
          <Grid item xs={12}>
            <Card>
              <CardContent>
                <Typography variant="h4" component="h1" align="center">
                  Welcome Back!
                </Typography>
                <Typography
                  variant="body2"
                  align="center"
                  color="textSecondary"
                  gutterBottom
                >
                  Please sign in to your account
                </Typography>
                {error && <Alert severity="error">{error}</Alert>}
                <form onSubmit={handleSubmit}>
                  <Box mt={2}>
                    <TextField
                      fullWidth
                      variant="outlined"
                      margin="normal"
                      label="Username"
                      required={true}
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <Person />
                          </InputAdornment>
                        ),
                      }}
                    />
                    <TextField
                      fullWidth
                      variant="outlined"
                      margin="normal"
                      label="Password"
                      type="password"
                      required={true}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <Lock />
                          </InputAdornment>
                        ),
                      }}
                    />
                    <Box mt={2}>
                      <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                      >
                        Login
                      </Button>
                    </Box>
                  </Box>
                </form>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Login;
