

// src/Components/ProductDetails.js
import React, { useEffect, useState } from "react";
import {  useNavigate, useParams } from "react-router-dom";
import axios from "../axios";
import styled from "styled-components";
import Header from "./Header";
import Footer from "./Footer";
import { useStateValue } from "../StateProvider";
import Rating from "@material-ui/lab/Rating";

function ProductDetails() {
   const navigate = useNavigate();
  const { id } = useParams();
  const [product, setProduct] = useState(null);
    const [, dispatch] = useStateValue();

  useEffect(() => {
    axios.get(`/products/update/${id}`) // your backend GET by ID
      .then(res => setProduct(res.data))
      .catch(err => console.error("Error fetching product:", err));
  }, [id]);

   if (!product) return <p>Loading product details...</p>;

    // ✅ Add to Basket function
  const addToBasket = () => {
    const gst = Number(product.gst || 0);
    const gstAmount = (product.price * gst) / 100;
    const totalPrice = product.price + gstAmount;

    dispatch({
      type: "ADD_TO_BASKET",
      item: {
        id: product._id,
        title: product.title,
       image: `http://localhost:8000${product.imageURL}`,
        // image: product.image,
        price: product.price,
        gst: gst,
        gstAmount: gstAmount,
        totalPrice: totalPrice,
        description: product.description,
      },
    });

    navigate("/cart");
  };

  const handleInquiry = () => {
  // navigate(`/inquiry/${product._id}`);
  navigate("/contactus");
};

  return (
     <Div>
    <Header/>
    {/* <a href="/Product"><img src="../back.png" style={{width:"50px",height:"50px",}}></img></a> */}

    <a href="/Product" style={{ display: "block", textAlign: "right" }}>
  <img
    src="../back.png"
    style={{ width: "50px", height: "50px",  position: "sticky",
  top:"0" }}
    alt="Back"
  />
</a>

    <DetailsContainer>
       <div className="details-container"
      //  style={{ padding: "20px"}}
       >
      {product ? (
        <div>
          
        <div className="details-header">
         <Image
             src={`http://localhost:8000${product.imageURL}`}
            //  src={`${process.env.REACT_APP_API_URL}${product.image}`}
            alt={product.title}
              // style={{ width: "300px", height: "auto" }}
          />
          <Info>
          <div className="detailsdiv" >
          <div className="details-info" >
               <h1 className="detailsh1">{product.title}</h1>
               <p><strong style={{marginBottom:"10px"}}>Description:</strong> {product.description}</p>
              {Number(product.price) > 100000 ? (

 <p
  style={{fontWeight:"bold", color:"red", cursor:"pointer"}}
  onClick={handleInquiry}
>
  Price on Request 
</p>

) : (

  <>
    <p>
      <strong>Base Price:</strong> ₹{Number(product.price).toFixed(2)}
    </p>

    <p>
      <strong>GST ({product.gst || 0}%):</strong> ₹
      {((product.price * (product.gst || 0)) / 100).toFixed(2)}
    </p>

    <p>
      <strong>Total (incl. GST):</strong> ₹
      {(
        product.price +
        (product.price * (product.gst || 0)) / 100
      ).toFixed(2)}
    </p>
  </>

)}
          {/* <p><strong>Price:</strong> ₹{product.price}</p> */}
         <Rating
  value={product.rating}
  precision={0.5}
  readOnly
/>
            </div>
          
          <ButtonGroup>

{product.price > 100000 ? (

  <InquiryButton onClick={handleInquiry}>
    Inquiry Now
  </InquiryButton>

) : (

  <>
    <CartButton onClick={addToBasket}>
      Add to Cart
    </CartButton>
  </>

)}

</ButtonGroup>
          </div>
         </Info>
          

          {/* 🔽🔽 Use this to show custom fields 🔽🔽 */}
        
          {product.customFields && (
             <div className="spec-section" >
              <p style={{margin:"5%"}}><strong>Specifications:</strong></p>
              {/* <div className="spec-grid" >
                 {Object.entries(product.customFields).map(([key, value]) => (
                <p key={key}> {key}  :-  {value}</p>
              ))}
              </div> */}
              </div>
          )}
          
        </div>
        </div>
       
      ) : (
        <p>Loading product details...</p>
      )}
    </div>
   
    </DetailsContainer>
    <Footer/>
    </Div>
  );
}

const DetailsContainer = styled.div`
  max-width: 1200px;
  margin: auto;
  display: flex;
  gap: 50px;
  padding: 40px;
  background: #f8f8f8;
  border-radius: 10px;

  @media (max-width: 768px) {
    flex-direction: column;
    padding: 20px;
  }
`;

const Image = styled.img`
  width: 450px;
  height: 450px;
  object-fit: contain;
  border-radius: 10px;
  background: white;
  padding: 20px;
  box-shadow: 0px 4px 15px rgba(0,0,0,0.1);

  @media (max-width:768px){
    width:100%;
    height:auto;
  }
`;

const Info = styled.div`
  flex: 1;

  h1 {
    font-size: 28px;
    margin-bottom: 15px;
    color: #222;
  }

  p {
    margin: 10px 0;
    font-size: 16px;
    color: #444;
    line-height: 1.6;
  }
`;
const Div= styled.div`
  // margin-bottom: 200px;
  //  position: sticky;
  // top: 0;
  z-index: 1000; 
`;
const ButtonGroup = styled.div`
  margin-top: 20px;
  display: flex;
  gap: 15px;
`;

const CartButton = styled.button`
 background: #28a745;
  color: white;
  padding: 12px 22px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 16px;
   margin-left:70px;

  &:hover{
    background:#1e7e34;
  }
`;

const InquiryButton = styled.button`
  background: #28a745;
  color: white;
  padding: 12px 22px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 16px;
   margin-left:70px;
  &:hover{
    background:#1e7e34;
  }
`;

export default ProductDetails;

