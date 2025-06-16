import React, { useState, useContext } from "react";
import { TextField, Button, Typography, Box, Alert } from "@mui/material";
import { CartContext } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Checkout() {
  const { cartItems, removeFromCart } = useContext(CartContext);
  const [form, setForm] = useState({ name: "", email: "", address: "" });
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();
   const API= import.meta.env.VITE_API_URL;

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  if (!form.name || !form.email || !form.address) return;

  try {
    const token = localStorage.getItem("token");

    await axios.post(`${API}/api/orders`, {
      cartItems,
      total: cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0),
      name: form.name,
      email: form.email,
      address: form.address
    }, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    removeFromCart();
    setSuccess(true);

    setTimeout(() => {
      navigate("/products");
    }, 2000);
  } catch (err) {
    console.error("Order submission failed", err);
  }
};


  if (cartItems.length === 0 && !success) {
    return <Alert severity="warning">Your cart is empty!</Alert>;
  }

  return (
    <Box sx={{ maxWidth: 400, mx: "auto", mt: 4 }}>
      <Typography variant="h5" gutterBottom>
        Checkout
      </Typography>

      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          margin="normal"
          label="Name"
          name="name"
          value={form.name}
          onChange={handleChange}
        />
        <TextField
          fullWidth
          margin="normal"
          label="Email"
          name="email"
          value={form.email}
          onChange={handleChange}
        />
        <TextField
          fullWidth
          margin="normal"
          label="Address"
          name="address"
          value={form.address}
          onChange={handleChange}
        />

        <Button variant="contained" color="primary" type="submit" fullWidth sx={{ mt: 2 }}>
          Place Order
        </Button>
      </form>

      {success && (
        <Alert severity="success" sx={{ mt: 3 }}>
          🎉 Order placed successfully!
        </Alert>
      )}
    </Box>
  );
}
