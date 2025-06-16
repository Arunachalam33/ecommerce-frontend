import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Typography,
  Card,
  CardContent,
  Grid,
  Button,
  Box
} from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function AdminDashboard() {
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();
   const API= import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchOrders = async () => {
      const token = localStorage.getItem("token");
      const res = await axios.get(`${API}/api/admin/orders`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setOrders(res.data);
    };
    fetchOrders();
  }, []);

  const handleShip = async (orderId) => {
    const token = localStorage.getItem("token");
    await axios.patch(
      `${API}/api/admin/orders/${orderId}/ship`,
      {},
      { headers: { Authorization: `Bearer ${token}` } }
    );
    setOrders((prev) =>
      prev.map((o) =>
        o.order_id === orderId ? { ...o, shipped: true } : o
      )
    );
  };

  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>Admin Dashboard</Typography>
      <Grid container spacing={2}>
        {orders.map((order) => (
          <Grid item xs={12} md={6} key={order.order_id}>
            <Card>
              <CardContent>
                <Typography variant="h6">Order #{order.order_id}</Typography>
                <Typography>User ID: {order.user_id}</Typography>
                <Typography>Name: {order.name}</Typography>
                <Typography>Email: {order.email}</Typography>
                <Typography>Address: {order.address}</Typography>
                <Typography>Total: ₹{order.total}</Typography>
                <Typography>Shipped: {order.shipped ? "Yes" : "No"}</Typography>
                {!order.shipped && (
                  <Button
                    variant="contained"
                    sx={{ mt: 2 }}
                    onClick={() => handleShip(order.order_id)}
                  >
                    Mark as Shipped
                  </Button>
                )}
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
