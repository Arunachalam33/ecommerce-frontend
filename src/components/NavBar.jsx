import React, { useContext } from "react";
import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { AuthContext } from "../context/authContext";
import { Link } from "react-router-dom";
import { CartContext } from "../context/CartContext";

export default function Navbar() {
  const { cartItems } = useContext(CartContext);
  const { isAuthenticated, logout, user } = useContext(AuthContext);
  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <AppBar position="static">
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography variant="h6" component={Link} to="/products" color="inherit" sx={{ textDecoration: "none" }}>
          🛍️ MyShop
        </Typography>

        <Typography variant="subtitle1">Welcome, {user?.username}</Typography>

        <Box>
          <Button color="inherit" component={Link} to="/products">Products</Button>
          <Button color="inherit" component={Link} to="/cart">
            Cart ({cartCount})
          </Button>
          {isAuthenticated && (
        <Button variant="outlined" color="error" onClick={logout}>
          Logout
        </Button>)}
        </Box>
      </Toolbar>
    </AppBar>
  );
}
