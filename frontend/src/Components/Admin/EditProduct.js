import React, { useEffect, useState } from "react";
import axios from "../../axios";
import { useParams, useNavigate } from "react-router-dom";

function EditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState({
    title: "",
    description: "",
    price: "",
    gst: "",
    imageURL: "",
    image: null,
  });

  const [originalProduct, setOriginalProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  // =========================================
  // GET PRODUCT BY ID
  // =========================================

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        console.log("Fetching product ID:", id);

        const res = await axios.get(`/products/update/${id}`);

        console.log("Product received:", res.data);

        const data = res.data;

        setOriginalProduct(data);

        setProduct({
          title: "",
          description: "",
          price: "",
          gst: "",
          imageURL: data.imageURL || "",
          image: null,
        });

        setLoading(false);
      } catch (error) {
        console.error(
          "Error loading product:",
          error.response?.data || error.message
        );

        alert("Product not found!");
        navigate("/ManageProduct");
      }
    };

    fetchProduct();
  }, [id, navigate]);

  // =========================================
  // INPUT CHANGE
  // =========================================

  const handleChange = (e) => {
    const { name, value } = e.target;

    setProduct((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // =========================================
  // IMAGE CHANGE
  // =========================================

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    setProduct((prev) => ({
      ...prev,
      image: file || null,
    }));
  };

  // =========================================
  // UPDATE PRODUCT
  // =========================================

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    if (product.title !== "") {
      formData.append("title", product.title);
    }

    if (product.description !== "") {
      formData.append("description", product.description);
    }

    if (product.price !== "") {
      formData.append("price", product.price);
    }

    // IMPORTANT: GST
    if (product.gst !== "") {
      formData.append("gst", product.gst);
    }

    if (product.image) {
      formData.append("image", product.image);
    }

    // Debug
    console.log("========== UPDATE DATA ==========");

    formData.forEach((value, key) => {
      console.log(key, value);
    });

    console.log("================================");

    try {
      setUpdating(true);

      const res = await axios.put(
        `/products/update/${id}`,
        formData
      );

      console.log("UPDATE RESPONSE:", res.data);

      alert("Product updated successfully!");

      navigate("/ManageProduct");
    } catch (error) {
      console.error(
        "UPDATE ERROR:",
        error.response?.data || error.message
      );

      alert(
        error.response?.data?.message ||
          "Failed to update product."
      );
    } finally {
      setUpdating(false);
    }
  };

  // =========================================
  // LOADING
  // =========================================

  if (loading) {
    return (
      <p
        style={{
          textAlign: "center",
          marginTop: "40px",
        }}
      >
        Loading product...
      </p>
    );
  }

  if (!originalProduct) {
    return (
      <p
        style={{
          textAlign: "center",
          marginTop: "40px",
        }}
      >
        Product not found.
      </p>
    );
  }

  // =========================================
  // UI
  // =========================================

  return (
    <div style={containerStyle}>
      <h2>Edit Product</h2>

      <form
        onSubmit={handleSubmit}
        style={formStyle}
      >

        {/* TITLE */}

        <label>Title:</label>

        <input
          type="text"
          name="title"
          value={product.title}
          placeholder={originalProduct.title || ""}
          onChange={handleChange}
        />


        {/* DESCRIPTION */}

        <label>Description:</label>

        <textarea
          name="description"
          value={product.description}
          placeholder={originalProduct.description || ""}
          onChange={handleChange}
          rows="4"
        />


        {/* PRICE */}

        <label>Price:</label>

        <input
          type="number"
          name="price"
          min="0"
          step="0.01"
          value={product.price}
          placeholder={originalProduct.price ?? ""}
          onChange={handleChange}
        />


        {/* GST */}

        <label>GST Rate (%):</label>

        <input
          type="number"
          name="gst"
          min="0"
          step="0.1"
          value={product.gst}
          placeholder={originalProduct.gst ?? "0"}
          onChange={handleChange}
        />

        <small>
          Current GST:{" "}
          <strong>
            {originalProduct.gst ?? 0}%
          </strong>
        </small>


        {/* GST AMOUNT */}

        <div style={gstBoxStyle}>
          <p>
            Current GST Amount: ₹{" "}
            {Number(
              originalProduct.gstAmount || 0
            ).toFixed(2)}
          </p>

          <strong>
            Current Total Price: ₹{" "}
            {Number(
              originalProduct.totalPrice ||
                originalProduct.price ||
                0
            ).toFixed(2)}
          </strong>
        </div>


        {/* IMAGE */}

        <label>Image:</label>

        <input
          type="file"
          name="image"
          accept="image/*"
          onChange={handleImageChange}
        />


        {/* CURRENT IMAGE */}

        {originalProduct.imageURL && (
          <div>
            <p>Current Image:</p>

            <img
              src={`${process.env.REACT_APP_API_URL}${originalProduct.imageURL}`}
              alt="Current Product"
              style={imageStyle}
            />
          </div>
        )}


        {/* BUTTON */}

        <button
          type="submit"
          style={{
            ...btnStyle,
            opacity: updating ? 0.6 : 1,
          }}
          disabled={updating}
        >
          {updating
            ? "Updating..."
            : "Update Product"}
        </button>

      </form>
    </div>
  );
}


// =========================================
// STYLES
// =========================================

const containerStyle = {
  padding: "40px",
  maxWidth: "500px",
  margin: "40px auto",
  background: "#f9f9f9",
  borderRadius: "10px",
  boxShadow: "0 0 10px rgba(0,0,0,0.1)",
};

const formStyle = {
  display: "flex",
  flexDirection: "column",
  gap: "15px",
};

const gstBoxStyle = {
  padding: "12px",
  background: "#f5f5f5",
  borderRadius: "6px",
};

const imageStyle = {
  width: "150px",
  height: "150px",
  objectFit: "contain",
  borderRadius: "8px",
  border: "1px solid #ddd",
};

const btnStyle = {
  padding: "12px 20px",
  backgroundColor: "#28a745",
  color: "#fff",
  fontWeight: "bold",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer",
  fontSize: "16px",
};

export default EditProduct;

// import React, { useEffect, useState } from "react";
// import axios from "../../axios";
// import { useParams, useNavigate } from "react-router-dom";

// function EditProduct() {
//   const { id } = useParams();
//   const navigate = useNavigate();

//   const [product, setProduct] = useState({
//     title: null,
//     description:null,
//     price: null,
//     gst: null,
//     rating: null,
//     imageURL: "",
//     image: null,
//   });

//   const [originalProduct, setOriginalProduct] = useState({});
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchProduct = async () => {
//       try {
//         const res = await axios.get(`/products/get`);
//         const data = res.data;

//         setOriginalProduct(data); // Save original data
//         setProduct({
//           title: null,
//           description:null,
//           price: null,
//           gst: null,
//           rating: null,
//           imageURL: data.imageURL,
//           image: null,
//         });

//         setLoading(false);
//       } catch (error) {
//         console.error("Error loading product:", error);
//         alert("Product not found!");
//         navigate("/ManageProduct");
//       }
//     };

//     fetchProduct();
//   }, [id, navigate]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setProduct((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleImageChange = (e) => {
//     setProduct((prev) => ({ ...prev, image: e.target.files[0] }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const formData = new FormData();

//     // Append fields ONLY if edited
//     if (product.title !== null && product.title !== "")
//       formData.append("title", product.title);

//      if (product.description !== null && product.description !== "")
//       formData.append("description", product.description);

//     if (product.price !== null && product.price !== "")
//       formData.append("price", product.price);

//     if (product.gst !== null && product.gst !== "")
//       formData.append("gst", product.gst);

//     // if (product.rating !== null && product.rating !== "")
//     //   formData.append("rating", product.rating);

//     if (product.image) {
//       formData.append("image", product.image);
//     }

//     try {
//       await axios.put(`/products/update/${id}`, formData, {
//         headers: { "Content-Type": "multipart/form-data" },
//       });

//       alert("Product updated successfully.");
//       navigate("/ManageProduct");
//     } catch (err) {
//       console.error("Update failed:", err.response?.data || err.message);
//       alert("Failed to update product.");
//     }
//   };

//   if (loading) {
//     return <p style={{ textAlign: "center" }}>Loading product...</p>;
//   }

//   return (
//     <div style={containerStyle}>
//       <h2>Edit Product (Optional Fields)</h2>

//       <form onSubmit={handleSubmit} style={formStyle}>

//         <label>Title (optional):</label>
//         <input
//           type="text"
//           name="title"
//           placeholder={originalProduct.title}
//           onChange={handleChange}
//         />
//         <label>Description (optional):</label>
//         <input
//           type="text"
//           name="description"
//           placeholder={originalProduct.description}
//           onChange={handleChange}
//         />

//         <label>Price (optional):</label>
//         <input
//           type="number"
//           name="price"
//           placeholder={originalProduct.price}
//           onChange={handleChange}
//         />

//         <label>GST (optional):</label>
//         <input
//           type="number"
//           name="gst"
//           step="0.1"
//           value={product.gst}
//           placeholder={originalProduct.gst ??"0"}
//           onChange={handleChange}
//         />

//         {/* <label>Rating (optional):</label>
//         <input
//           type="number"
//           name="rating"
//           placeholder={originalProduct.rating}
//           onChange={handleChange}
//         /> */}

//         <label>Image (optional):</label>
//         <input
//           type="file"
//           name="image"
//           onChange={handleImageChange}
//           accept="image/*"
//         />

//         {product.imageURL && (
//           <div style={{ marginTop: "10px" }}>
//             <p>Current Image:</p>
//             <img
//              src={`${process.env.REACT_APP_API_URL}${product.imageURL}`}
//               //  src={`http://localhost:8000${product.imageURL}`}
//               alt="Current"
//               style={{ width: "120px", borderRadius: "8px" }}
//             />
//           </div>
//         )}

//         <button type="submit" style={btnStyle}>Update Product</button>
//       </form>
//     </div>
//   );
// }

// // --- STYLES ---
// const containerStyle = {
//   padding: "40px",
//   maxWidth: "500px",
//   margin: "0 auto",
//   background: "#f9f9f9",
//   borderRadius: "10px",
//   boxShadow: "0 0 10px rgba(0,0,0,0.1)",
// };

// const formStyle = {
//   display: "flex",
//   flexDirection: "column",
//   gap: "15px",
// };

// const btnStyle = {
//   padding: "10px 20px",
//   backgroundColor: "#28a745",
//   color: "#fff",
//   fontWeight: "bold",
//   border: "none",
//   borderRadius: "6px",
//   cursor: "pointer",
// };

// export default EditProduct;


