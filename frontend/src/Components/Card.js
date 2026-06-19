import React, {useState, useEffect} from "react";
import styled from "styled-components";
import Rating from "@material-ui/lab/Rating";
import { useStateValue } from "../StateProvider";
// import axios from "axios";
import { useNavigate } from "react-router-dom";
import axios from "../axios";
import { ButtonGroup } from "@material-ui/core";

function Card({ id, image, title,description, price, rating, gst }) {
  const [{ basket,user }, dispatch] = useStateValue();
  
   const [userRating, setUserRating] = useState(rating || 0);
  const navigate = useNavigate();
  console.log("basket >>>>", basket);
   
useEffect(() => {
  setUserRating(rating || 0);
}, [rating]);
  
 const handleRatingChange = async (event, newValue) => {
  try {
    setUserRating(newValue);

    await axios.post(`/products/rate/${id}`, {
     userId: user?.uid,      // replace with logged in user id
      rating: newValue,
    });

    alert("Rating submitted successfully ⭐");

  } catch (error) {
    console.error("Rating failed:", error);
  }
};
  const gstAmount = gst ? (price * gst) / 100 : 0; // ✅ fixed
  const totalPrice = price + gstAmount;
  const addToBasket = (e) => {
    e.preventDefault();

    dispatch({
      type: "ADD_TO_BASKET",
      item: {
        id,
        title,
        description,
        price,
        image,
       rating: userRating,
       gst,
        gstAmount,           
    totalPrice,   
      },
    });
     // ✅ wait for state update
    setTimeout(() => {
      navigate("/cart");
    }, 100);
  };

const goTocheckout = (e) => {
  e.preventDefault();
  e.stopPropagation();

  // Add item to basket before going to checkout
  dispatch({
    type: "ADD_TO_BASKET",
      item: {
        id,
        title,
        description,
        price,
        image,
         rating: userRating,
        gst,
        gstAmount,
        totalPrice,   // ✅ include total
      },
  });

  setTimeout(() => {
      navigate("/checkout");
    }, 100);
};
 // Inquiry button
  
const handleInquiry = (e) => {
  e.preventDefault();

  // const message = `Hello, I want inquiry for ${title}`;

  // window.open(
  //   `https://wa.me/918788449561?text=${encodeURIComponent(message)}`,
  //   "_blank"
  // );
  navigate("/Contactus");
};

  
  return (
    <Container>
      <div>
      <Image>
        <img src={image} alt="" title="click here for More Details" onClick={() => navigate(`/product/${id}`)}  />
      </Image>
    </div>
      <Description>
        <h5>{title}</h5>
       <Rating
  name={`rating-${id}`}
  value={userRating}
  precision={0.5}
  onChange={handleRatingChange}
   onClick={(e) => e.stopPropagation()} 
/>

        <p>{description}</p>

{/* Price */}
{Number(price) > 100000 ? (
  <p></p>
) : (
  <p>₹ {Number(price).toFixed(2)}</p>
)}

<h8 style={{ fontSize: "10px" }}>
  GST and Shipping Charges extra at actual
</h8>
{/* 
{Number(price) > 100000 ? (
  <InquiryButton onClick={handleInquiry}>
    Inquiry
  </InquiryButton>
) : (
  <>
    <BuyButton onClick={goTocheckout}>
      Buy Now
    </BuyButton>

    <CartButton onClick={addToBasket}>
      Add to Cart
    </CartButton>
  </>
)} */}

 <InquiryButton onClick={handleInquiry}>
    Inquiry
  </InquiryButton>
        
      </Description>
    </Container>


);
}

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  background-color: #fff;
  border-radius: 12px;
  transition: all 0.3s ease;
  box-shadow: 0 4px 10px rgba(0,0,0,0.1);

  &:hover{
    transform: translateY(-8px);
    box-shadow: 0 10px 20px rgba(0,0,0,0.2);
  }
      @media (max-width: 768px){
    border-radius: 10px;
    width: 90%;
  height: 90%;
  margin-top:-130%;
  }

`;
const Image = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;

  img {
    width: 220px;
    height: 220px;
    object-fit: contain;
    transition: transform 0.3s;
  }

  img:hover{
    transform: scale(1.05);
  }
     @media (max-width: 480px){
    img{
      width: 130px;
      height: 130px;
    }
  }
`;
const Description = styled.div`
  width: 80%;
  margin: auto;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  flex: 0.7;

  h5 {
    font-size: 16px;
    font-weight: 600;
   
  }

  p {
    font-weight: 600;
  }

  button {
    width: 80%;
    height: 30px;
   margin:3px;
  margin-bottom:5px;
     color:white;
    border: none;
    border-radius: 10px;
    cursor: pointer;
  }
    @media (max-width: 768px){
    h5{
      font-size:14px;
    }

    p{
      font-size:13px;
    }

    button{
      width:100%;
      height:32px;
      font-size:13px;
    }
  }
`;
const Stars = styled.div`
  cursor: pointer;
  font-size: 20px;
   @media (max-width:768px){
    font-size:10px;
  }

`;

const Star = styled.span`
  color: ${(props) => (props.filled ? "#ffc107" : "#ccc")};
  margin: 0 2px;
`;

const CartButton = styled.button`
  width: 80%;
  height: 30px;
  margin: 4px;
 background-color: #013c7a;
  color: white;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  
`;

const InquiryButton = styled.button`
  width: 80%;
  height: 30px;
  margin: 4px;
 
 background-color: #013c7a;
  color: white;
  border: none;
  border-radius: 10px;
  cursor: pointer;
`;
const BuyButton = styled.button`
  width: 80%;
  height: 30px;
  margin: 4px;
 background-color: #013c7a;
  color: white;
  border: none;
  
  border-radius: 10px;
  cursor: pointer;
`;
export default Card;


