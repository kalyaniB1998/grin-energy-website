


import React, { useEffect, useState } from "react";
import axios from "../../axios";
import { useParams, useNavigate } from "react-router-dom";

function EditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState({
    title: null,
    description:null,
    price: null,
    gst: null,
    rating: null,
    imageURL: "",
    image: null,
  });

  const [originalProduct, setOriginalProduct] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`/products/get`);
        const data = res.data;

        setOriginalProduct(data); // Save original data
        setProduct({
          title: null,
          description:null,
          price: null,
          gst: null,
          rating: null,
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
  }, [id, navigate]);

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

    // Append fields ONLY if edited
    if (product.title !== null && product.title !== "")
      formData.append("title", product.title);

     if (product.description !== null && product.description !== "")
      formData.append("description", product.description);

    if (product.price !== null && product.price !== "")
      formData.append("price", product.price);

    if (product.gst !== null && product.gst !== "")
      formData.append("gst", product.gst);

    // if (product.rating !== null && product.rating !== "")
    //   formData.append("rating", product.rating);

    if (product.image) {
      formData.append("image", product.image);
    }

    try {
      await axios.put(`/products/update/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
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
      <h2>Edit Product (Optional Fields)</h2>

      <form onSubmit={handleSubmit} style={formStyle}>

        <label>Title (optional):</label>
        <input
          type="text"
          name="title"
          placeholder={originalProduct.title}
          onChange={handleChange}
        />
        <label>Description (optional):</label>
        <input
          type="text"
          name="description"
          placeholder={originalProduct.description}
          onChange={handleChange}
        />

        <label>Price (optional):</label>
        <input
          type="number"
          name="price"
          placeholder={originalProduct.price}
          onChange={handleChange}
        />

        <label>GST (optional):</label>
        <input
          type="number"
          name="gst"
          placeholder={originalProduct.gst}
          onChange={handleChange}
        />

        {/* <label>Rating (optional):</label>
        <input
          type="number"
          name="rating"
          placeholder={originalProduct.rating}
          onChange={handleChange}
        /> */}

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
             src={`${process.env.REACT_APP_API_URL}${product.imageURL}`}
              //  src={`http://localhost:8000${product.imageURL}`}
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

// --- STYLES ---
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
