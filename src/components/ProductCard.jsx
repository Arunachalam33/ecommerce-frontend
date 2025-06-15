import React, { useContext } from "react";
import { Card, CardContent, CardMedia, Typography, Button } from "@mui/material";
import { CartContext } from "../context/CartContext"

function ProductCard({ product }) {
  const { addToCart } = useContext(CartContext);

  return (
    <Card>
      <CardMedia
        component="img"
        height="200"
        image={product.image_url || "https://via.placeholder.com/300"}
        alt={product.name}
      />
      <CardContent>
        <Typography variant="h6">{product.name}</Typography>
        <Typography variant="body2">{product.description}</Typography>
        <Typography variant="h6" color="primary">₹{product.price}</Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={() => addToCart(product)}
          sx={{ mt: 2 }}
        >
          Add to Cart
        </Button>
      </CardContent>
    </Card>
  );
}

export default ProductCard;

