import React, { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { Container, Typography, Card, CardContent, Button, Grid } from "@mui/material";
import { Link } from "react-router-dom";

export default function Cart() {
  const { cartItems, removeFromCart } = useContext(CartContext);

  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <Container>
      <Typography variant="h4" gutterBottom>🛒 Your Cart</Typography>
      {cartItems.length === 0 ? (
        <Typography>Your cart is empty.</Typography>
      ) : (
        <Grid container spacing={3}>
          {cartItems.map(item => (
            <Grid item xs={12} md={6} key={item.id}>
              <Card>
                <CardContent>
                  <Typography variant="h6">{item.name}</Typography>
                  <Typography>Price: ₹{item.price}</Typography>
                  <Typography>Quantity: {item.quantity}</Typography>
                  <Typography>Subtotal: ₹{item.price * item.quantity}</Typography>
                  <Button
                    variant="outlined"
                    color="error"
                    onClick={() => removeFromCart(item.id)}
                    sx={{ mt: 1 }}
                  >
                    Remove
                  </Button>
                </CardContent>
              </Card>
              
            </Grid>
          ))}
        </Grid>
      )}
      {cartItems.length > 0 && (
        <Typography variant="h5" sx={{ mt: 4 }}>
          Total: ₹{total.toFixed(2)}
        </Typography>
      )}
    <Button variant="contained" color="primary" component={Link} to="/checkout"sx={{ mt: 2 }}>
      Proceed to Checkout
    </Button>
    </Container>
  );
}
