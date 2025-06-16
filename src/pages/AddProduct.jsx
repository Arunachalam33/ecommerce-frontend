import React, { useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/authContext";

export default function AddProduct() {
  const { isAuthenticated } = useContext(AuthContext);
  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    image: ""
  });

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      await axios.post("http://localhost:4000/api/product", form, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      alert("Product added successfully!");
    } catch (err) {
      alert(err.response?.data?.message || "Failed to add product");
    }
  };

  if (!isAuthenticated) return <p>Please log in as admin</p>;

  return (
    <form onSubmit={handleSubmit}>
      <input name="name" placeholder="Name" onChange={handleChange} />
      <input name="description" placeholder="Description" onChange={handleChange} />
      <input name="price" type="number" placeholder="Price" onChange={handleChange} />
      <input name="category" placeholder="Category" onChange={handleChange} />
      <input name="image" placeholder="Image URL" onChange={handleChange} />
      <button type="submit">Add Product</button>
    </form>
  );
}
