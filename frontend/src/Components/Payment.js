


import React from "react";
import styled from "styled-components";
import { useStateValue } from "../StateProvider";
import { getBasketTotal } from "../reducer";
import axios from "../axios";
import HeaderM from "./HeaderM";
import { useNavigate } from "react-router-dom";  
function Payment() {
  const [{ address, basket, user },dispatch] = useStateValue();
  const navigate = useNavigate(); 

  const loadRazorpay = (src) => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const displayRazorpay = async () => {
    const res = await loadRazorpay("https://checkout.razorpay.com/v1/checkout.js");

    if (!res) {
      alert("Razorpay SDK failed to load. Are you online?");
      return;
    }

    // 1️⃣ Create order on backend
    const result = await axios.post("/payment/orders", {
      amount: getBasketTotal(basket) * 100,
    });

    const { id: order_id, amount, currency } = result.data;

    const options = {
      key: process.env.REACT_APP_RAZORPAY_KEY_ID, // from .env
      amount: amount.toString(),
      currency: currency,
      name: "GRIN ENERGY",
      description: "Payment for your order",
      order_id: order_id,
      handler: async function (response) {
        const data = {
          razorpay_order_id: response.razorpay_order_id,
          razorpay_payment_id: response.razorpay_payment_id,
          razorpay_signature: response.razorpay_signature,
        };

        // 2️⃣ Verify payment signature
        const verify = await axios.post("/payment/verify", data);

        if (verify.data.success) {
          alert("Payment successful!");
          // Save order in DB
          await axios.post("/orders/add", {
            basket,
            price: getBasketTotal(basket),
            email: user?.email,
            address,
          });
           // Empty cart
          dispatch({ type: "EMPTY_BASKET" });

          // ✅ Navigate to success page
          navigate("/paymentsuccess", {
            state: {
              razorpay_payment_id: response.razorpay_payment_id,
              amount: amount,
            },
          });
        } else {
          alert("Payment failed. Signature mismatch.");
        }
      },
      prefill: {
        name: address.fullName,
        email: user?.email,
        contact: address.phone,
         
      },
      notes: {
        address: `${address.flat}, ${address.area}, ${address.city}, ${address.state}`,
      },
      theme: {
        color: "#3399cc",
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  };

  return (
    <Container>
      <HeaderM />
      <Main>
        <button style={{padding:"6px"}} onClick={displayRazorpay}>Pay Now</button>
      </Main>
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  max-width: 1600px;
  background-color: rgb(234, 237, 237);
`;

const Main = styled.div`
  padding: 20px;
  text-align: center;
`;

export default Payment;
