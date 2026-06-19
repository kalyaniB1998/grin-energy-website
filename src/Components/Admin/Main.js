import React, { useState, useEffect } from "react";
import axios from "axios";
import AdminHeader from "./AdminHeader";

const Main = () => {
const [productCount, setProductCount] = useState(0);
const [enquiryCount, setEnquiryCount] = useState(0);
const [orderCount, setOrderCount] = useState(0);
  useEffect(() => {
    
  axios.get("http://localhost:8000/products/count")
.then((res) => setProductCount(res.data.count))
      .catch((err) => console.error("Error fetching product count:", err));

   
   axios.get("http://localhost:8000/orders/count")
      .then((res) => setOrderCount(res.data.count))
      .catch((err) => console.error("Error fetching order count:", err));

    
   axios.get("http://localhost:8000/enquiry/count")
      .then((res) => setEnquiryCount(res.data.count))
      .catch((err) => console.error("Error fetching enquiry count:", err));
  }, []);


  return (
    <div>
    <AdminHeader/>
    <div className="admin-dashboard">
      
      <aside className="sidebar">
        <h2 className="sidebar-title">Admin Panel</h2>
        <nav className="sidebar-nav">
          
          <a href="/ManageProduct">Manage Products</a>
          <a href="/Enquiry">Enquiries</a>
          <a href="/AddProduct">Add Product</a>
          <a href="/about">Edit About Us</a>
          <a href="/contact">Edit Contact Us</a>
           
        </nav>
      </aside>

      <main className="main-content">
        <header className="dashboard-header">
          <h1>Dashboard Overview</h1>
           
        </header>

        <section className="stats-section">
          <div className="stat-card">
            <h3>Total Products</h3>
            <p>{productCount}</p>
          </div>
          <div className="stat-card">
            <h3>Total Enquiries</h3>
            <p>{enquiryCount}</p>
          </div>
          <div className="stat-card">
            <h3>Orders</h3>
            <p>{orderCount}</p>
          </div>
        </section>

        <section className="activity-section">
          <h2>Recent Activity</h2>
          <p>You can show recent orders or logs here.</p>
        </section>
      </main>
    </div>
    </div>
  );
};

export default Main;
