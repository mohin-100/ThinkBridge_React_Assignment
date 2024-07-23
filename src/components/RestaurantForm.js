import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Link } from "react-router-dom";
import { addRestaurant, updateRestaurant } from "../services/api";
import {
  TextField,
  Button,
  Container,
  Typography,
  Box,
  Snackbar,
  Alert,
} from "@mui/material";

//validations using yup
const validationSchema = Yup.object({
  name: Yup.string().required("Name is required"),
  description: Yup.string().required("Description is required"),
  location: Yup.string().required("Location is required"),
});

const RestaurantForm = ({ restaurant }) => {
  const [successMessage, setSuccessMessage] = React.useState("");
  const [errorMessage, setErrorMessage] = React.useState("");

  const isEditMode = Boolean(restaurant);

  //form handling using formik
  const formik = useFormik({
    initialValues: {
      name: restaurant ? restaurant.name : "",
      description: restaurant ? restaurant.description : "",
      location: restaurant ? restaurant.location : "",
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        if (isEditMode) {
          await updateRestaurant(restaurant.id, values);
          setSuccessMessage("Restaurant updated successfully");
        } else {
          await addRestaurant(values);
          setSuccessMessage("Restaurant added successfully");
          formik.resetForm();
        }
      } catch (error) {
        setErrorMessage("Failed to submit the form");
      }
    },
  });

  return (
    <Container maxWidth="sm">
      <Box mt={5}>
        <Typography variant="h4" component="h1" gutterBottom>
          {isEditMode ? "Edit Restaurant" : "Add Restaurant"}
        </Typography>
        <form onSubmit={formik.handleSubmit}>
          {errorMessage && (
            <Snackbar
              open={Boolean(errorMessage)}
              autoHideDuration={1000}
              onClose={() => setErrorMessage("")}
              anchorOrigin={{ vertical: "top", horizontal: "right" }}
            >
              <Alert
                onClose={() => setErrorMessage("")}
                severity="error"
                sx={{ width: "100%" }}
              >
                {errorMessage}
              </Alert>
            </Snackbar>
          )}
          {successMessage && (
            <Snackbar
              open={Boolean(successMessage)}
              autoHideDuration={1000}
              onClose={() => setSuccessMessage("")}
              anchorOrigin={{ vertical: "top", horizontal: "right" }}
            >
              <Alert
                onClose={() => setSuccessMessage("")}
                severity="success"
                sx={{ width: "100%" }}
              >
                {successMessage}
              </Alert>
            </Snackbar>
          )}

          <Box mb={3}>
            <TextField
              fullWidth
              id="name"
              name="name"
              label="Name"
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.name && Boolean(formik.errors.name)}
              helperText={formik.touched.name && formik.errors.name}
            />
          </Box>
          <Box mb={3}>
            <TextField
              fullWidth
              id="description"
              name="description"
              label="Description"
              value={formik.values.description}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.description && Boolean(formik.errors.description)
              }
              helperText={
                formik.touched.description && formik.errors.description
              }
            />
          </Box>
          <Box mb={3}>
            <TextField
              fullWidth
              id="location"
              name="location"
              label="Location"
              value={formik.values.location}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.location && Boolean(formik.errors.location)}
              helperText={formik.touched.location && formik.errors.location}
            />
          </Box>
          <Box display="flex" justifyContent="space-between">
            <Button variant="contained" color="primary" type="submit">
              {isEditMode ? "Update Restaurant" : "Add Restaurant"}
            </Button>
            <Button
              variant="outlined"
              color="secondary"
              component={Link}
              to="/"
            >
              Back
            </Button>
          </Box>
        </form>
      </Box>
    </Container>
  );
};

export default RestaurantForm;
