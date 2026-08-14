

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
       image: `${process.env.REACT_APP_API_URL}${product.imageURL}`,
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
// Prepare custom specifications
const getSpecifications = () => {
  if (!product || !product.customFields) {
    return {};
  }

  let fields = product.customFields;

  // If customFields is stored as a JSON string
  if (typeof fields === "string") {
    try {
      fields = JSON.parse(fields);
    } catch (error) {
      console.error("Error parsing customFields:", error);
      return {};
    }
  }

  // Handle old data where customFields contains another customFields
  if (fields.customFields) {
    let nestedFields = fields.customFields;

    if (typeof nestedFields === "string") {
      try {
        nestedFields = JSON.parse(nestedFields);
      } catch (error) {
        console.error("Error parsing nested customFields:", error);
        return {};
      }
    }

    fields = nestedFields;
  }

  // Remove fields that should NOT be specifications
  const excludedFields = [
    "gst",
    "gstAmount",
    "totalPrice",
    "price",
    "rating",
    "title",
    "description",
    "image",
    "imageURL"
  ];

  const specifications = {};

  Object.entries(fields).forEach(([key, value]) => {
    if (!excludedFields.includes(key)) {
      specifications[key] = value;
    }
  });

  return specifications;
};

const specifications = getSpecifications();

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
            //  src={`http://localhost:8000${product.imageURL}`}
              src={`${process.env.REACT_APP_API_URL}${product.image}`}
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
  value={Number(product.averageRating) || 0}
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
        
          {/* {product.customFields && (
             <div className="spec-section" >
              <p style={{margin:"5%"}}><strong>Specifications:</strong></p>
              
              </div>
          )} */}

          {/* Specifications */}
{/* {product.customFields &&
  Object.keys(product.customFields).length > 0 && (
    <div className="spec-section">
      <h2>Specifications</h2>

      <div className="spec-grid">
        {Object.entries(product.customFields).map(([key, value]) => (
          <div className="spec-row" key={key}>
            <div className="spec-key">
              {key}
            </div>

            <div className="spec-value">
              {value}
            </div>
          </div>
        ))}
      </div>
    </div>
)} */}

{/* {product.customFields &&
  Object.entries(product.customFields).length > 0 && (
    <div className="spec-section">

      <h2>Specifications</h2>

      <div className="spec-grid">
        {Object.entries(product.customFields).map(([key, value]) => (
          <div className="spec-row" key={key}>

            <div className="spec-key">
              {key}
            </div>

            <div className="spec-value">
              {value}
            </div>

          </div>
        ))}
      </div>

    </div>
)} */}
       {Object.keys(specifications).length > 0 && (
  <SpecSection>
    <h2>Specifications</h2>

    <SpecGrid>
      {Object.entries(specifications).map(([key, value]) => (
        <SpecRow key={key}>

          <SpecKey>
            {key}
          </SpecKey>

          <SpecValue>
            {String(value)
              .split("\\n")
              .map((line, index) => (
                <React.Fragment key={index}>
                  {line}
                  {index <
                    String(value).split("\\n").length - 1 && <br />}
                </React.Fragment>
              ))}
          </SpecValue>

        </SpecRow>
      ))}
    </SpecGrid>
  </SpecSection>
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
const SpecSection = styled.div`
  margin-top: 40px;
  width: 100%;

  h2 {
    font-size: 28px;
    margin-bottom: 20px;
    color: #fdfbfb;
    padding:2px;
     border-radius: 8px;
    background: #48474d;
  }

  @media (max-width: 768px) {
    margin-top: 30px;

    h2 {
      font-size: 24px;
    }
  }
`;

const SpecGrid = styled.div`
  width: 100%;
  border: 1px solid #ddd;
  border-radius: 8px;
  overflow: hidden;
  background: white;
`;


const SpecRow = styled.div`
  display: flex;
  border-bottom: 1px solid #ddd;

  &:last-child {
    border-bottom: none;
  }

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const SpecKey = styled.div`
  width: 35%;
  padding: 16px 18px;

  font-weight: bold;
  color: #0a0a0a;

  background: #f5f5f5;

  word-break: break-word;

  @media (max-width: 768px) {
    width: 100%;
    padding: 12px 15px;
  }
`;

const SpecValue = styled.div`
  width: 65%;
  padding: 16px 18px;

  color: #333;
  background: white;

  line-height: 1.6;
  white-space: normal;
  word-break: break-word;

  @media (max-width: 768px) {
    width: 100%;
    padding: 12px 15px;
  }
`;

export default ProductDetails;

