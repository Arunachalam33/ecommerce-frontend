import React, { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "../components/ProductCard";
import { Grid, Typography ,Button } from "@mui/material";
import { Link } from "react-router-dom";

function Products() {
  const [products, setProducts] = useState([]);
   const API= import.meta.env.VITE_API_URL;

  useEffect(() => {
    axios.get(`${API}/api/product`)
      .then(res => setProducts(res.data))
      .catch(err => console.error("Error fetching products:", err));
  }, []);

   

  const handleProductDelete = (id) => {
    setProducts(prev => prev.filter(product => product.id !== id));
  };

  return (
    <div style={{ padding: "2rem" }}>
      <Typography variant="h4"
  gutterBottom
  sx={{
    fontWeight: "bold",textAlign: "center",mb: 4,color: "primary.main", }}>
      Our Products
      </Typography>
      <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: "1.5rem" }}>
        <Button component={Link}to="/cart"variant="contained"color="secondary"sx={{mb: 4,px: 4,py: 1,fontWeight: "bold",borderRadius: 2,}}>
        Go to Cart
        </Button>
        </div>
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
