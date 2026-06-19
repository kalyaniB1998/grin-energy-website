



import React from "react";
import styled from "styled-components";
import { useStateValue } from "../StateProvider";
import Rating from "@material-ui/lab/Rating";
import { Link } from "react-router-dom";
import HeaderM from "./HeaderM";

function Cart() {
  const [{ basket }, dispatch] = useStateValue();

  console.log("CART BASKET >>>", basket);

  const removeFromBasket = (id) => {
    dispatch({
      type: "REMOVE_FROM_BASKET",
      id,
    });
  };

  return (
    <CartContainer>
      <HeaderM />
      <h2>Your Cart</h2>

      {basket.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        basket.map((item, index) => {
          const gstAmount = item.gst
            ? (item.price * item.gst) / 100
            : 0;

          const totalPrice = item.price + gstAmount;

          return (
            <CartItem key={index}>
              <img src={item.image} alt={item.title} />

              <div>
                <h4>{item.title}</h4>
                <p>{item.description}</p>

                <Rating value={item.rating || 0} readOnly />

                <p>Base Price: ₹ {item.price.toFixed(2)}</p>
                <p>GST: ₹ {gstAmount.toFixed(2)}</p>
                <strong>Total: ₹ {totalPrice.toFixed(2)}</strong>

                <button onClick={() => removeFromBasket(item.id)}>
                  Remove
                </button>
              </div>
            </CartItem>
          );
        })
      )}

      {basket.length > 0 && <CheckoutLink to="/checkout">Checkout</CheckoutLink>}
    </CartContainer>
  );
}

const CartContainer = styled.div`
  width: 100%;
  max-width: 1200px;
  margin: auto;
  padding: 20px;
`;

const CartItem = styled.div`
  display: flex;
  gap: 20px;
  border-bottom: 1px solid #ddd;
  padding: 20px 0;

  img {
    width: 120px;
    height: 120px;
    object-fit: contain;
  }

  div {
    flex: 1;
  }

  button {
    margin-top: 10px;
    padding: 6px 12px;
    background: #d32f2f;
    color: white;
    border: none;
    border-radius: 6px;
    cursor: pointer;
  }

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;

    img {
      width: 100px;
      height: 100px;
    }
  }
`;

const CheckoutLink = styled(Link)`
  display: inline-block;
  margin-top: 20px;
  padding: 12px 25px;
  background: #0a8f08;
  color: white;
  text-decoration: none;
  border-radius: 8px;
  font-weight: bold;
`;
export default Cart;