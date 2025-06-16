import React, { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "../components/ProductCard";
import { Grid, Typography ,Button } from "@mui/material";
import { Link } from "react-router-dom";

function Products() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:4000/api/product")
      .then(res => setProducts(res.data))
      .catch(err => console.error("Error fetching products:", err));
  }, []);

   

  const handleProductDelete = (id) => {
    setProducts(prev => prev.filter(product => product.id !== id));
  };

  return (
    <div style={{ padding: "2rem" }}>
      <Typography variant="h4" gutterBottom>Our Products</Typography>
        <Button component={Link} to="/cart" variant="contained" color="secondary">
        Go to Cart
        </Button>
      <Grid container justifyContent="center" spacing={2}>
        {products.map(product => (
          <Grid item key={product.id}>
            <ProductCard product={product} onDelete={handleProductDelete} />
          </Grid>
        ))}
      </Grid>
    </div>
  );
}

export default Products;
