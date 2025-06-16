import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import {
  Typography,
  Card,
  CardContent,
  Grid,
  Box,
  CircularProgress,
  Alert
} from "@mui/material";
import { AuthContext } from "../context/AuthContext";

export default function OrderHistory() {
  const { isAuthenticated } = useContext(AuthContext);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
   const API="https://ecommerce-backend-lygx.onrender.com";

  useEffect(() => {
    if (!isAuthenticated) return;

    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(`${API}/api/orders`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        setOrders(response.data);
      } catch (err) {
        console.error("Failed to fetch orders", err);
        setError("Could not load your order history.");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [isAuthenticated]);

  if (!isAuthenticated) {
    return <Alert severity="error">Please login to view your order history.</Alert>;
  }

  if (loading) return <Box sx={{ mt: 4, textAlign: "center" }}><CircularProgress /></Box>;

  if (error) return <Alert severity="error">{error}</Alert>;

  if (orders.length === 0) {
    return <Alert severity="info">You haven't placed any orders yet.</Alert>;
  }

  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        🧾 Your Orders
      </Typography>

      <Grid container spacing={2}>
        {orders.map((order) => (
          <Grid item xs={12} key={order.order_id}>
            <Card>
              <CardContent>
                <Typography variant="h6">Order #{order.order_id}</Typography>
                <Typography variant="body2" color="text.secondary">
                  Placed on: {new Date(order.created_at).toLocaleString()}
                </Typography>
                <Typography variant="body1" sx={{ mt: 1 }}>
                  Total: ₹{order.total}
                </Typography>
                <Typography variant="subtitle2" sx={{ mt: 2 }}>
                  Items:
                </Typography>
                <ul>
                  {order.items.map((item, idx) => (
                    <li key={idx}>
                      {item.quantity} x {item.product_name} — ₹{item.price}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
