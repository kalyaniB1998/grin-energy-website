import React, { useEffect, useState } from "react";
import axios from "../../axios"; 
import { useParams, useNavigate } from "react-router-dom";

function EditProduct() {
  const { id } = useParams(); 
  const navigate = useNavigate();

  const [product, setProduct] = useState({
    title: "",
    price: "",
    rating: "",
    imageURL: "",
    image: null,
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
   
    const fetchProduct = async () => {
      try {
        const res = await axios.get('/products/get');
 const data = res.data;

        setProduct({
          title: data.title,
          price: data.price,
          rating: data.rating,
          imageURL: data.imageURL,
          image: null,
        });
        setLoading(false);
      } catch (error) {
        console.error("Error loading product:", error);
        alert("Product not found!");
        navigate("/ManageProduct");
      }
    };

    fetchProduct();
  },
   [id, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    setProduct((prev) => ({ ...prev, image: e.target.files[0] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", product.title);
    formData.append("price", product.price);
    formData.append("rating", product.rating);
    if (product.image) {
      formData.append("image", product.image);
    }

    try {
      await axios.put(`/products/update/${id}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
      alert("Product updated successfully.");
      navigate("/ManageProduct");
    } catch (err) {
      console.error("Update failed:", err.response?.data || err.message);
      alert("Failed to update product.");
    }
  };

  if (loading) {
    return <p style={{ textAlign: "center" }}>Loading product...</p>;
  }

  return (
    <div style={containerStyle}>
      <h2>Edit Product</h2>
      <form onSubmit={handleSubmit} encType="multipart/form-data" style={formStyle}>
        <label>Title:</label>
        <input
          type="text"
          name="title"
          value={product.title}
          onChange={handleChange}
          required
        />

        <label>Price:</label>
        <input
          type="number"
          name="price"
          value={product.price}
          onChange={handleChange}
          required
        />

        <label>Rating:</label>
        <input
          type="number"
          name="rating"
          value={product.rating}
          onChange={handleChange}
          required
        />

        <label>Image (optional):</label>
        <input
          type="file"
          name="image"
          onChange={handleImageChange}
          accept="image/*"
        />

        {product.imageURL && (
          <div style={{ marginTop: "10px" }}>
            <p>Current Image:</p>
            <img
              src={`http://localhost:8000${product.imageURL}`}
              alt="Current"
              style={{ width: "120px", borderRadius: "8px" }}
            />
          </div>
        )}

        <button type="submit" style={btnStyle}>Update Product</button>
      </form>
    </div>
  );
}


const containerStyle = {
  padding: "40px",
  maxWidth: "500px",
  margin: "0 auto",
  background: "#f9f9f9",
  borderRadius: "10px",
  boxShadow: "0 0 10px rgba(0,0,0,0.1)",
};

const formStyle = {
  display: "flex",
  flexDirection: "column",
  gap: "15px",
};

const btnStyle = {
  padding: "10px 20px",
  backgroundColor: "#28a745",
  color: "#fff",
  fontWeight: "bold",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer",
};

export default EditProduct;
