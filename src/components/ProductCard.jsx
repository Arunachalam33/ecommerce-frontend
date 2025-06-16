import React, { useContext } from "react";
import { Card, CardContent, CardMedia, Typography, Button ,CardActions } from "@mui/material";
import { CartContext } from "../context/CartContext"
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";


function ProductCard({ product ,onDelete}) {
  const { addToCart } = useContext(CartContext);
  const { isAuthenticated ,user} = useContext(AuthContext);
  const navigate = useNavigate();

   const handleAddToCart = () => {
    const added = addToCart(product, isAuthenticated);
  };

   const handleDelete = async () => {
  try {
    const token = localStorage.getItem("token");
    await axios.delete(`http://localhost:4000/api/product/${product.id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    alert("Product deleted");
    onDelete(product.id); // <-- Optional: update parent state
  } catch (err) {
    console.error("Unable to delete",err);
    alert(err.response?.data?.message || "Failed to delete");
  }
};


  return (
    <Card sx={{ maxWidth: 300, m: 2, boxShadow: 3, borderRadius: 2 }}>
      <CardMedia
        component="img"
        height="200"
        image={product.image_url}
        alt={product.name}
        sx={{ objectFit: "cover" }}
      />
      <CardContent>
        <Typography variant="h6" gutterBottom>{product.name}</Typography>
        <Typography variant="body2" color="text.secondary" gutterBottom>{product.description}</Typography>
        <Typography variant="subtitle1" color="primary">₹{product.price}</Typography>
        <CardActions sx={{ display: "flex", justifyContent: "space-between", px: 2, pb: 2 }}>
        <Button
          variant="contained" color="primary" onClick={handleAddToCart}
        >
          Add to Cart
        </Button>
        {isAuthenticated && user?.is_admin && (
        <Button variant="outlined" color="error" onClick={handleDelete}>Delete</Button>
      )}
      </CardActions>
      </CardContent>
    </Card>
  );
}

export default ProductCard;

