import React, { useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/authContext";
import {
  TextField,
  Button,
  Typography,
  Paper,
  Box,
  Alert
} from "@mui/material";

export default function AddProduct() {
  const { isAuthenticated } = useContext(AuthContext);
  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    image: ""
  });

  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      await axios.post("http://localhost:4000/api/product", form, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setSuccess(true);
      setError("");
      setForm({
        name: "",
        description: "",
        price: "",
        category: "",
        image: "",
      });
    } catch (err) {
      setError(err.response?.data?.message || "Failed to add product");
      setSuccess(false);
    }
  };

  if (!isAuthenticated)
    return (
      <Alert severity="warning" sx={{ mt: 4, maxWidth: 500, mx: "auto" }}>
        Please log in as admin to access this page.
      </Alert>
    );

  return (
    <Box sx={{ mt: 4 }}>
      <Paper elevation={3} sx={{ maxWidth: 500, mx: "auto", p: 4 }}>
        <Typography variant="h5" gutterBottom>
          ➕ Add New Product
        </Typography>

        {success && (
          <Alert severity="success" sx={{ mb: 2 }}>
            ✅ Product added successfully!
          </Alert>
        )}

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        <form onSubmit={handleSubmit}>
          <TextField
            label="Product Name"
            name="name"
            value={form.name}
            onChange={handleChange}
            fullWidth
            required
            margin="normal"
          />
          <TextField
            label="Description"
            name="description"
            value={form.description}
            onChange={handleChange}
            fullWidth
            required
            multiline
            rows={3}
            margin="normal"
          />
          <TextField
            label="Price (₹)"
            name="price"
            type="number"
            value={form.price}
            onChange={handleChange}
            fullWidth
            required
            margin="normal"
          />
          <TextField
            label="Category"
            name="category"
            value={form.category}
            onChange={handleChange}
            fullWidth
            required
            margin="normal"
          />
          <TextField
            label="Image URL"
            name="image"
            value={form.image}
            onChange={handleChange}
            fullWidth
            required
            margin="normal"
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 2 }}
          >
            Add Product
          </Button>
        </form>
      </Paper>
    </Box>
  );
}
