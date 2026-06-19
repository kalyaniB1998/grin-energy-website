import React from "react";
import styled from "styled-components";
import { useLocation, Link } from "react-router-dom";

function PaymentSuccess() {
  const location = useLocation();
  const { razorpay_payment_id, amount } = location.state || {};

  return (
    <Container>
      <Card>
        <h2>🎉 Payment Successful</h2>
        <p>Thank you for your order!</p>
        <Details>
          <p><strong>Payment ID:</strong> {razorpay_payment_id}</p>
          <p><strong>Amount Paid:</strong> ₹ {amount / 100}</p>
        </Details>
        <Link to="/">Go Back to Home</Link>
      </Card>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 90vh;
  background-color: #f5f5f5;
`;

const Card = styled.div`
  background: white;
  padding: 30px;
  border-radius: 12px;
  text-align: center;
  box-shadow: 0 4px 10px rgba(0,0,0,0.1);

  h2 {
    color: green;
    margin-bottom: 10px;
  }

  a {
    margin-top: 20px;
    display: inline-block;
    background: #3399cc;
    padding: 10px 20px;
    color: white;
    border-radius: 8px;
    text-decoration: none;
  }
`;

const Details = styled.div`
  margin-top: 20px;
  text-align: left;

  p {
    margin: 5px 0;
  }
`;

export default PaymentSuccess;
