import React, { useEffect, useState } from "react";
import axios from "../../axios";
import styled from "styled-components";
import AdminHeader from "./AdminHeader";
function AdminOrders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = () => {
    axios
      .get("/orders/all")
      .then((res) => setOrders(res.data))
      .catch((err) => console.error(err));
  };
  const updatePaymentStatus = async (orderId, status) => {
  try {
    await axios.put(`/orders/${orderId}/payment-status`, { paymentStatus: status });
    alert("Payment status updated");
  } catch (err) {
    console.error(err);
  }
};
 const updateStatus = (orderId, newStatus) => {
    axios
      .post("/orders/updateStatus", { orderId, status: newStatus })
      .then(() => fetchOrders())
      .catch((err) => console.error(err));
  };


  
  return (
    <Container>
         <AdminHeader/>
      <h2>All Orders</h2>
      <Table>
        <thead>
          <tr>
            <th>Order ID</th>
            {/* <th>Date & Time</th> */}
              <th>Last Updated</th>
            <th>Customer</th>
            <th>Email</th>
            <th>Address</th>
            <th>Products</th>
            <th>Total Price</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order, index) => (
            <tr key={index}>
              <td>{order._id}</td>
              {/* <td>
                {new Date(order.createdAt).toLocaleDateString()}{" "}
                {new Date(order.createdAt).toLocaleTimeString()}
              </td> */}
              {/* <td>
  {new Date(order.createdAt).toLocaleDateString()}{" "}
  {new Date(order.createdAt).toLocaleTimeString()}
</td> */}
             {/* Order Date */}
        {/* <td>
          {order.createdAt
            ? `${new Date(order.createdAt).toLocaleDateString()} ${new Date(
                order.createdAt
              ).toLocaleTimeString()}`
            : "N/A"}
        </td> */}
          {/* Last Updated */}
        <td>
          {order.updatedAt
            ? `${new Date(order.updatedAt).toLocaleDateString()} ${new Date(
                order.updatedAt
              ).toLocaleTimeString()}`
            : "N/A"}
        </td>
              <td>{order.address.fullName}</td>
              <td>{order.email}</td>
              <td>
                {order.address.flat}, {order.address.area},{" "}
                {order.address.city} - {order.address.state} <br /> Phone:{" "}
                {order.address.phone}
              </td>
              <td>
                {order.products.map((product, i) => (
                  <div key={i}>
                    <strong>{product.title}</strong> - ₹{product.price}
                  </div>
                ))}
              </td>
              <td>₹ {order.price}</td>
              <td>
  <select
    value={order.paymentStatus}
    onChange={(e) => updatePaymentStatus(order._id, e.target.value)}
  >
    <option value="Success">Success</option>
    <option value="Decline">Decline</option>
  </select>
</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
}

const Container = styled.div`
//   padding: 20px;
  width: 100%;
  background: #f9f9f9;

  h2 {
    margin-bottom: 20px;
  }
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  background: white;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);

  th,
  td {
    border: 1px solid #ddd;
    padding: 12px;
    text-align: left;
    vertical-align: top;
  }

  th {
    background: #1384b4;
    color: white;
  }

  tr:nth-child(even) {
    background: #f2f2f2;
  }

  select {
    padding: 5px;
    border-radius: 5px;
  }
`;

export default AdminOrders;
