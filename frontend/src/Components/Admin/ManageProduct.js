// src/pages/ManageProducts.js
import React, { useEffect, useState } from "react";
import axios from "../../axios";
import { useNavigate } from "react-router-dom";
import AdminHeader from "./AdminHeader";
function ManageProduct() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  
   
  const fetchProducts = async () => {
    try {
      const res = await axios.get("/products/get");
      setProducts(res.data);
    } catch (err) {
      console.error("Error fetching products:", err);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;
    try {
      await axios.delete(`/products/delete/${id}`);
      fetchProducts(); // Refresh the list
    } catch (err) {
      console.error("Error deleting product:", err);
    }
  };

  const handleEdit = (id) => {
    navigate(`/EditProduct/${id}`);
  };
   
  return (
    <div>
 <AdminHeader/>
    <div style={{ padding: "30px" }}>
       
      <h1 className="manageh1"><u>Manage Products</u></h1>
      <table className="managetable">
        <thead className="managehead">
          <tr style={{ backgroundColor: "#eee" }}>
            <th style={cellStyle}>Image</th>
            <th style={cellStyle}>Title</th>
            <th style={cellStyle}>Description</th>
            <th style={cellStyle}>Price</th>
             <th style={cellStyle}>GST(%)</th>
              <th style={cellStyle}>GST Amount (₹)</th>
              <th style={cellStyle}>Total Price</th>
            <th style={cellStyle}>Rating</th>
            <th style={cellStyle}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((prod) => (
            <tr key={prod._id}>
              <td style={cellStyle}>
                {/* <img src={`http://localhost:8000${prod.imageURL}`} alt="product" width="60" /> */}
                {/* <img
                      src={prod.image}
                      alt={prod.title}
                    
                    /> */}

                    <img
                src={`${axios.defaults.baseURL}${prod.imageURL}`}
                alt={prod.title}
                width="60"
              />
              </td>
              <td style={cellStyle}>{prod.title}</td>
              <td style={{width:"300px",height:"200px",textAlign:"center", overflow:"auto"}}>{prod.description}</td>
              {/* <td style={cellStyle}>₹{prod.price}</td>
              <td style={cellStyle}>{prod.gst}</td>
              <td style={cellStyle}>{prod.totalPrice}</td> */}
               <td>₹ {Number(prod.price).toFixed(2)}</td>
                  <td>{prod.gst ? prod.gst : 0}%</td>
                  <td>
                    ₹{" "}
                    {prod.gstAmount
                      ? Number(prod.gstAmount).toFixed(2)
                      : (prod.price * (prod.gst || 0) / 100).toFixed(2)}
                  </td>
                  <td>
                    ₹{" "}
                    {prod.totalPrice
                      ? Number(prod.totalPrice).toFixed(2)
                      : (Number(prod.price) +
                          Number(prod.price * (prod.gst || 0) / 100)
                        ).toFixed(2)}
                  </td>
              <td style={cellStyle}>{prod.rating}</td>
              <td style={cellStyle}>
                <button onClick={() => handleEdit(prod._id)}  className="editbutton">Edit</button>
                <button onClick={() => handleDelete(prod._id)} className="deletebutton">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </div>
  );
}

const cellStyle = {
  padding: "12px",
  borderBottom: "1px solid #ccc",
  textAlign: "center",
 
};


export default ManageProduct;
