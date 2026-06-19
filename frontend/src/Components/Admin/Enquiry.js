import React, { useEffect, useState } from "react";
import axios from "../../axios";
import AdminHeader from "./AdminHeader";
function Enquiry() {
  const [enquiries, setEnquiries] = useState([]);

  useEffect(() => {
    axios
      .get("/enquiry/get")
      .then((res) => setEnquiries(res.data))
      .catch((err) => console.error("Fetch error:", err));
  }, []);

  return (
    <div style={{ padding: "20px" }}>
    <AdminHeader/>
      <h1>Enquiry Table</h1>
      {enquiries.length === 0 ? (
        <p>No enquiries found.</p>
      ) : (
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            marginTop: "20px",
          }}
        >
          <thead>
            <tr>
              <th style={thStyle}>#</th>
              <th style={thStyle}>Name</th>
              <th style={thStyle}>Contact</th>
              <th style={thStyle}>Email</th>
              <th style={thStyle}>Product Type</th>
              <th style={thStyle}>Message</th>
              <th style={thStyle}>Date</th>
            </tr>
          </thead>
          <tbody>
            {enquiries.map((item, i) => (
              <tr key={item._id}>
                <td style={tdStyle}>{i + 1}</td>
                <td style={tdStyle}>{item.name}</td>
                <td style={tdStyle}>{item.contact}</td>
                <td style={tdStyle}>{item.email}</td>
                <td style={tdStyle}>{item.title}</td>
                <td style={tdStyle}>{item.message}</td>
                <td style={tdStyle}>
                  {new Date(item.createdAt).toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

const thStyle = {
  border: "1px solid #ccc",
  padding: "10px",
  backgroundColor: "#f4f4f4",
};

const tdStyle = {
  border: "1px solid #ccc",
  padding: "10px",
};

export default Enquiry;

