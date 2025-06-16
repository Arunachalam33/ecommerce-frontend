import React, { useContext } from "react";
import { CartContext } from "../context/CartContext";
import {
  Container,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Button,
  Grid,
  Paper,
  Box,
  Divider,IconButton
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { useNavigate, useLocation } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function Cart() {
  const navigate = useNavigate();
  const location = useLocation();

  const { cartItems, removeFromCart , increaseQuantity, decreaseQuantity} = useContext(CartContext);
  const { isAuthenticated } = useContext(AuthContext);

  const handleCheckout = () => {
    if (!isAuthenticated) {
      navigate("/login", { state: { from: location } });
      return;
    }
    navigate("/checkout");
  };

  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        🛒 Your Cart
      </Typography>

      {cartItems.length === 0 ? (
        <Typography>Your cart is empty.</Typography>
      ) : (
        <>
          <Grid container spacing={3}>
            {cartItems.map((item) => (
              <Grid item xs={12} md={6} key={item.id}>
                <Card sx={{ display: "flex", alignItems: "center", p: 2 }}>
                  {item.image_url && (
                    <CardMedia
                      component="img"
                      image={item.image_url}
                      alt={item.name}
                      sx={{
                        width: 120,
                        height: 120,
                        objectFit: "contain",
                        backgroundColor: "#f5f5f5",
                        borderRadius: 2,
                        mr: 2,
                      }}
                    />
                  )}
                  <CardContent sx={{ flex: 1 }}>
                    <Typography variant="h6">{item.name}</Typography>
                    <Typography variant="body2" color="text.secondary">
                      Price: ₹{item.price}
                    </Typography>
                    
                      <Box display="flex" alignItems="center" gap={1} sx={{ mt: 1 }}>
                     <Typography variant="body2">Quantity:</Typography>
                     <IconButton onClick={() => decreaseQuantity(item.id)} size="small" color="primary">
                    <RemoveIcon fontSize="small" />
                     </IconButton>
                     <Typography variant="body1">{item.quantity}</Typography>
                     <IconButton onClick={() => increaseQuantity(item.id)} size="small" color="primary">
                    <AddIcon fontSize="small" />
                     </IconButton>
                   </Box>
                    <Typography variant="body2" sx={{ mb: 1 }}>
                      Subtotal: ₹{item.price * item.quantity}
                    </Typography>
                    <Button
                      variant="outlined"
                      color="error"
                      onClick={() => removeFromCart(item.id)}
                      size="small"
                    >
                      Remove
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>

          {/* Total & Checkout */}
          <Paper elevation={3} sx={{ mt: 4, p: 3 }}>
            <Box display="flex" justifyContent="space-between" alignItems="center" flexWrap="wrap">
              <Typography variant="h5" sx={{ mb: { xs: 2, md: 0 } }}>
                Total: ₹{total.toFixed(2)}
              </Typography>
              <Button variant="contained" color="primary" onClick={handleCheckout}>
                Proceed to Checkout
              </Button>
            </Box>
          </Paper>
        </>
      )}
    </Container>
  );
}
