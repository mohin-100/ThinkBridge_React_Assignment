import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Snackbar,
  IconButton,
  Box,
  Pagination,
  TextField,
  Grid,
} from "@mui/material";
import { Alert } from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import { deleteRestaurant, getRestaurants } from "../services/api";

const RestaurantList = ({ onEdit }) => {
  const [restaurants, setRestaurants] = useState([]);
  const [filteredRestaurants, setFilteredRestaurants] = useState([]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [restaurantsPerPage] = useState(5);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  //fetch restaurants list using API
  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const response = await getRestaurants();
        setRestaurants(response.data);
        setFilteredRestaurants(response.data);
      } catch (err) {
        setError("Failed to fetch restaurants");
      }
    };
    fetchRestaurants();
  }, []);

  //filtering records
  useEffect(() => {
    const result = restaurants.filter((restaurant) =>
      Object.values(restaurant).some((value) =>
        value.toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
    setFilteredRestaurants(result);
    setCurrentPage(1);
  }, [searchQuery, restaurants]);

  //custom pagination
  const indexOfLastRestaurant = currentPage * restaurantsPerPage;
  const indexOfFirstRestaurant = indexOfLastRestaurant - restaurantsPerPage;
  const currentRestaurants = filteredRestaurants.slice(
    indexOfFirstRestaurant,
    indexOfLastRestaurant
  );

  const handlePageChange = (event, pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const totalPages = Math.ceil(filteredRestaurants.length / restaurantsPerPage);

  //deleting using API and rendering updated data
  const handleDelete = async (id) => {
    try {
      await deleteRestaurant(id);
      setRestaurants(restaurants.filter((r) => r.id !== id));
      setSuccess("Restaurant deleted successfully!");
    } catch (err) {
      setError("Failed to delete restaurant");
    }
  };

  return (
    <Box sx={{ padding: 2 }}>
      <Grid
        container
        spacing={2}
        justifyContent="space-between"
        alignItems="center"
      >
        <Grid item xs={12} sm={8}>
          <Typography variant="h4" gutterBottom>
            Restaurants
          </Typography>
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            label="Search"
            variant="outlined"
            fullWidth
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </Grid>
      </Grid>
      {error && (
        <Snackbar
          open={Boolean(error)}
          autoHideDuration={1000}
          onClose={() => setError("")}
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
        >
          <Alert
            onClose={() => setError("")}
            severity="error"
            sx={{ width: "100%" }}
          >
            {error}
          </Alert>
        </Snackbar>
      )}
      {success && (
        <Snackbar
          open={Boolean(success)}
          autoHideDuration={1000}
          onClose={() => setSuccess("")}
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
        >
          <Alert
            onClose={() => setSuccess("")}
            severity="success"
            sx={{ width: "100%" }}
          >
            {success}
          </Alert>
        </Snackbar>
      )}
      <TableContainer component={Paper} sx={{ my: 2 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Location</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {currentRestaurants.map((restaurant) => (
              <TableRow key={restaurant.id}>
                <TableCell>{restaurant.name}</TableCell>
                <TableCell>{restaurant.description}</TableCell>
                <TableCell>{restaurant.location}</TableCell>
                <TableCell>
                  <IconButton
                    color="primary"
                    onClick={() => {
                      onEdit(restaurant);
                      navigate("/edit");
                    }}
                  >
                    <Edit />
                  </IconButton>
                  <IconButton
                    color="error"
                    onClick={() => handleDelete(restaurant.id)}
                  >
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginTop: 2,
        }}
      >
        <Typography variant="body2">
          Showing {indexOfFirstRestaurant + 1} to{" "}
          {Math.min(indexOfLastRestaurant, filteredRestaurants.length)} of{" "}
          {filteredRestaurants.length} records
        </Typography>
        <Pagination
          count={totalPages}
          page={currentPage}
          onChange={handlePageChange}
          color="primary"
          size="large"
        />
      </Box>
    </Box>
  );
};

export default RestaurantList;
