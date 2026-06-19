import React, {useEffect}  from "react";
import { useStateValue } from "../StateProvider";
import styled from "styled-components";
import HeaderM from "./HeaderM";
import CurrencyFormat from "react-currency-format";
import { getBasketTotal } from "../reducer";
import { useNavigate } from "react-router-dom";
function Checkout() {
  const [{ basket }, dispatch] = useStateValue();
  const navigate = useNavigate();

  // useEffect(() => {
  //   const storedBasket = localStorage.getItem("basket");
  //   if (storedBasket) {
  //     dispatch({
  //       type: "SET_BASKET",
  //       basket: JSON.parse(storedBasket),
  //     });
  //   }
  // }, [dispatch]);

  const removeFromBasket = (e, id) => {
    e.preventDefault();

    dispatch({
      type: "REMOVE_FROM_BASKET",
      id: id,
    });
  };

  console.log("checkout >>>>>", basket);

    const subtotal = basket.reduce((acc, item) => acc + (Number(item.price) || 0), 0);
  const totalGST = basket.reduce((acc, item) => acc + ((Number(item.price) || 0) * (Number(item.gst) || 0)) / 100,
    0);
  const grandTotal = subtotal + totalGST;
  return (
    <Container>
     <HeaderM/>

      <Main>
        <ShoppingCart>
          <h2>Shopping Cart</h2>

          {basket?.map((product) => {
             const gst = Number(product.gst) || 0;
            const basePrice = Number(product.price) || 0;
            const gstAmount = (basePrice * gst) / 100;
            const totalPrice = basePrice + gstAmount;
          return(
            <Product>
              <Image>
                <img src={product.image} alt="" />
              </Image>
              <Description>
                <h4>{product.title}</h4>

                {/* <p>₹ {product.price}</p> */}
                {/* <p>Base Price: ₹ {product.price.toFixed(2)}</p>
                <p>GST ({product.gst}%): ₹ {product.gstAmount.toFixed(2)}</p>
                <p><strong>Total: ₹ {product.totalPrice.toFixed(2)}</strong></p> */}
                <p>Base Price: ₹ {basePrice.toFixed(2)}</p>
                  <p>GST ({gst}%): ₹ {gstAmount.toFixed(2)}</p>
                  <p><strong>Total: ₹ {totalPrice.toFixed(2)}</strong></p>
                <button onClick={(e) => removeFromBasket(e, product.id)}>
                  Remove
                </button>
              </Description>
            </Product>
          )})}
        </ShoppingCart>
        {/* <Subtotal>
          <CurrencyFormat
            renderText={(value) =>{
    const subtotal = getBasketTotal(basket);
    
    return (
              <>
                <p>
                  
                      <p>Subtotal (Base Price): ₹ {subtotal.toFixed(2)}</p>
                </p>
                  <p>Total GST: ₹ {totalGST.toFixed(2)}</p>
                <h3>Grand Total: ₹ {grandTotal.toFixed(2)}</h3>
                  
                <small>
                  <input type="checkbox" />
                  <span>This order contains a gift.</span>
                </small>
              </>
            )
          }}
            decimalScale={2}
            value={getBasketTotal(basket)}
            displayType="text"
            thousandSeparator={true}
            prefix={"₹ "}
          />

          <button onClick={() => navigate("/address")}>
            Proceed to Checkout
          </button>
        </Subtotal> */}

  <Subtotal>
          <p>Subtotal (Base Price): ₹ {subtotal.toFixed(2)}</p>
          <p>Total GST: ₹ {totalGST.toFixed(2)}</p>
          <h3>Grand Total: ₹ {grandTotal.toFixed(2)}</h3>

          <small>
            <input type="checkbox" />
            <span>This order contains a gift.</span>
          </small>

          <button onClick={() => navigate("/address")}>
            Proceed to Checkout
          </button>
        </Subtotal>


      </Main>
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  max-width: 1500px;
  height: fit-content;
  margin: auto;
  background-color: rgba(236, 237, 237, 1);
  border: 1px solid red;
  position: relative;
`;
const Main = styled.div`
  display: flex;
  padding: 15px;

  @media only screen and (max-width: 1200px) {
    flex-direction: column;
  }
`;
const ShoppingCart = styled.div`
  padding: 15px;
  background-color: #fff;
  flex: 0.7;

  @media only screen and (max-width: 1200px) {
    flex: none;
  }

  h2 {
    font-weight: 500;
    border-bottom: 1px solid lightgray;
    padding-bottom: 15px;
  }
`;
const Subtotal = styled.div`
  flex: 0.3;
  background-color: #fff;
  margin-left: 15px;
  height: 200px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  @media only screen and (max-width: 1200px) {
    flex: none;
    margin-top: 20px;
  }
  p {
    font-size: 20px;
  }

  small {
    display: flex;
    align-items: center;
    margin-top: 10px;

    span {
      margin-left: 10px;
    }
  }

  button {
    width: 65%;
    height: 33px;
    margin-top: 20px;
   
    border: none;
    outline: none;

    border-radius: 8px;
  }
`;

const Product = styled.div`
  display: flex;
  align-items: center;
`;

const Image = styled.div`
  flex: 0.3;
  img {
    width: 100%;
  }
`;
const Description = styled.div`
  flex: 0.7;

  h4 {
    font-weight: 600;
    font-size: 18px;
  }

  p {
    font-weight: 600;
    margin-top: 10px;
  }

  button {
    background-color: transparent;
    color: #1384b4;
    border: none;
    outline: none;
    margin-top: 10px;
    cursor: pointer;
    &:hover {
      text-decoration: underline;
    }
  }
`;
export default Checkout;
