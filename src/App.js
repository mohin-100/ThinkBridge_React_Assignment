import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
  Link,
} from "react-router-dom";
import {
  Container,
  Box,
  AppBar,
  Toolbar,
  Typography,
  Button,
} from "@mui/material";
import RestaurantList from "./components/RestaurantList";
import Login from "./components/Login";
import RestaurantForm from "./components/RestaurantForm";
import ProtectedRoute from "./components/ProtectedRoute";

const App = () => {
  const [currentRestaurant, setCurrentRestaurant] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(
    localStorage.getItem("token") || false
  );

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const handleEditRestaurant = (restaurant) => {
    setCurrentRestaurant(restaurant);
  };

  const handleClearCurrentRestaurant = () => {
    setCurrentRestaurant(null);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem("token");
  };

  return (
    <Router>
      <Box
        sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
      >
        {isAuthenticated ? (
          <>
            <AppBar position="static">
              <Toolbar>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                  FOODIE DELIGHT
                </Typography>
                <Button
                  color="inherit"
                  onClick={handleClearCurrentRestaurant}
                  component={Link}
                  to="/"
                >
                  Home
                </Button>
                <Button
                  color="inherit"
                  onClick={handleClearCurrentRestaurant}
                  component={Link}
                  to="/add"
                >
                  Add Restaurant
                </Button>
                <Button
                  color="inherit"
                  onClick={handleLogout}
                  component={Link}
                  to="/login"
                >
                  Logout
                </Button>
              </Toolbar>
            </AppBar>
          </>
        ) : null}
        <Container component="main" maxWidth="lg" sx={{ flexGrow: 1, py: 3 }}>
          <Box sx={{ mt: 0 }}>
            {/* protected routes: to prevent unauthenticated access*/}
            <Routes>
              <Route
                path="/"
                element={
                  <ProtectedRoute isAuthenticated={isAuthenticated}>
                    <RestaurantList onEdit={handleEditRestaurant} />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/add"
                element={
                  <ProtectedRoute isAuthenticated={isAuthenticated}>
                    <RestaurantForm />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/edit"
                element={
                  <ProtectedRoute isAuthenticated={isAuthenticated}>
                    {currentRestaurant ? (
                      <RestaurantForm restaurant={currentRestaurant} />
                    ) : (
                      <Navigate to="/" />
                    )}
                  </ProtectedRoute>
                }
              />
              <Route path="/login" element={<Login onLogin={handleLogin} />} />
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </Box>
        </Container>
      </Box>
    </Router>
  );
};

export default App;
